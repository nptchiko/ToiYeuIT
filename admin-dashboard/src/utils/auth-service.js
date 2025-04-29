// import { useToast } from "../components/toast-context";
import axios from "axios";
import Cookies from "universal-cookie";

// Cấu hình Axios
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081/api";

// Tạo instance Axios với cấu hình mặc định
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Khởi tạo cookies instance
const cookies = new Cookies();

// Tên cookies
const TOKEN_COOKIE_NAME = "jwt";
const REFRESH_TOKEN_COOKIE_NAME = "refresh_token";

// Thời gian hết hạn cookies (7 ngày)
const TOKEN_EXPIRY = 7;

// Improve the TokenService to ensure cookies are properly set
const TokenService = {
  // Lưu token vào cookies
  setToken: (token) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + TOKEN_EXPIRY);

    cookies.set(TOKEN_COOKIE_NAME, token, {
      expires: expiryDate,
      secure: import.meta.env.MODE === "production",
      path: "/",
      sameSite: "lax", // Add this to ensure cookies work across same-site requests
    });
    console.log("token set :", token);
  },

  // Lấy token từ cookies
  getToken: () => {
    const token = cookies.get(TOKEN_COOKIE_NAME);
    console.log("token Received :", token);
    return token;
  },

  // Xóa token khỏi cookies
  removeToken: () => {
    cookies.remove(TOKEN_COOKIE_NAME, { path: "/" });
  },

  // Lưu refresh token vào cookies
  setRefreshToken: (token) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + TOKEN_EXPIRY);

    cookies.set(REFRESH_TOKEN_COOKIE_NAME, token, {
      expires: expiryDate,
      path: "/",
      sameSite: "strict", // Add this to ensure cookies work across same-site requests
    });
  },

  // Lấy refresh token từ cookies
  getRefreshToken: () => {
    return cookies.get(REFRESH_TOKEN_COOKIE_NAME);
  },

  // Xóa refresh token khỏi cookies
  removeRefreshToken: () => {
    cookies.remove(REFRESH_TOKEN_COOKIE_NAME, { path: "/" });
  },

  // Xóa tất cả token
  clearTokens: () => {
    TokenService.removeToken();
    TokenService.removeRefreshToken();
  },
};

//  interceptor để tự động thêm token vào header của mỗi request
api.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Update the interceptor to better handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi là 401 hoặc 500 và chưa thử refresh token
    if (
      (error.response?.status === 401 || error.response?.status === 500) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Thử refresh token
        const refreshToken = TokenService.getRefreshToken();
        if (!refreshToken) {
          // Nếu không có refresh token, đăng xuất người dùng
          TokenService.clearTokens();
          return Promise.reject(error);
        }

        // Gọi API refresh token
        const response = await axios.post(`${API_URL}/auth/refresh-token`, {
          refreshToken,
        });

        // Lưu token mới
        const { token, refreshToken: newRefreshToken } = response.data;
        TokenService.setToken(token);
        TokenService.setRefreshToken(newRefreshToken);

        // Thực hiện lại request ban đầu với token mới
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token thất bại, đăng xuất người dùng
        TokenService.clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const AuthService = {
  // Đăng nhập
  login: async (email, password) => {
    try {
      // Sử dụng axios  thay vì api instance để không kèm token
      const response = await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { token, role } = response.data.body;
      console.log("Received token:", token);

      // Lưu token vào cookies
      TokenService.setToken(token);
      console.log("Token stored:", TokenService.getToken());

      return role;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Đăng ký
  register: async (email, password) => {
    try {
      const response = await api.post("/users/create-user", {
        email,
        password,
      });
      const { token, role } = response.data.body;

      // Lưu token vào cookies
      TokenService.setToken(token);

      return role;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  },

  // Đăng xuất
  logout: () => {
    try {
      const token = TokenService.getToken();

      // Gọi API đăng xuất
      if (token) {
        api.post("/auth/logout", { token });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Xóa token khỏi cookies
      TokenService.clearTokens();
    }
  },

  // Gửi yêu cầu đặt lại mật khẩu
  resetPassword: async (email) => {
    try {
      const response = await api.post(`/auth/forgot-password?email=${email}`);
      return response.data;
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  },

  // Xác minh mã code đặt lại mật khẩu
  verifyResetCode: async (email, code) => {
    try {
      const response = await api.get(`/verify/confirm?token=${code}`, {
        email,
        code,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Verify reset code error:", error);
      throw error;
    }
  },

  // Đặt mật khẩu mới
  setNewPassword: async (email, newPassword, confirmPassword) => {
    try {
      const response = await api.put("/auth/reset-password", {
        email,
        newPassword,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      console.error("Set new password error:", error);
      throw error;
    }
  },

  // Kiểm tra trạng thái đăng nhập
  getCurrentUser: async () => {
    try {
      const response = await api.get("/users/user-info");
      console.log("response data user info:", response.data);
      return response.data;
    } catch (error) {
      console.error("Get current user error:", error);

      // Chỉ xóa token nếu lỗi là 401 (Unauthorized)
      if (error.response && error.response.status === 401) {
        TokenService.clearTokens();
      }

      throw error;
    }
  },

  //Kiểm tra xem người dùng đã đăng nhập chưa
  isAuthenticated: () => {
    return !!TokenService.getToken();
  },
};

export { AuthService, TokenService, api };
