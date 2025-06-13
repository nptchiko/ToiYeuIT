import axios from "axios";
import Cookies from "js-cookie";

// Cấu hình Axios
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081/api";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8081";

// Cấu hình URL callback cho Google OAuth - Sử dụng cùng domain
const OAUTH_CALLBACK_URL = `${window.location.origin}/auth/callback`;

// Tạo instance Axios với cấu hình mặc định
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Tên cookies
const TOKEN_COOKIE_NAME = "token";
const REFRESH_TOKEN_COOKIE_NAME = "refresh_token";

// Thời gian hết hạn cookies (7 ngày)
const TOKEN_EXPIRY = 7;

const TokenService = {
  // Lưu token vào cookies với validation
  setToken: (token) => {
    if (!token) {
      console.error("Attempting to set empty token");
      return false;
    }

    try {
      Cookies.set(TOKEN_COOKIE_NAME, token, {
        expires: TOKEN_EXPIRY,
        secure: import.meta.env.MODE === "production",
        path: "/",
        sameSite: "lax",
      });

      // Verify token được lưu thành công
      const savedToken = Cookies.get(TOKEN_COOKIE_NAME);
      const success = savedToken === token;

      // console.log("Token save result:", {
      //   attempted: token,
      //   saved: savedToken,
      //   success: success,
      // });

      return success;
    } catch (error) {
      console.error("Error saving token:", error);
      return false;
    }
  },

  // Lấy token từ cookies với validation
  getToken: () => {
    const token = Cookies.get(TOKEN_COOKIE_NAME);
    // console.log(
    //   "Token retrieved:",
    //   token ? `${token.substring(0, 20)}...` : "null"
    // );
    return token;
  },

  // Xóa token khỏi cookies
  removeToken: () => {
    Cookies.remove(TOKEN_COOKIE_NAME, { path: "/" });
    // console.log("Token removed");
  },

  // Lưu refresh token vào cookies
  setRefreshToken: (token) => {
    if (!token) return false;

    Cookies.set(REFRESH_TOKEN_COOKIE_NAME, token, {
      expires: TOKEN_EXPIRY,
      secure: false,
      path: "/",
      sameSite: "lax",
    });

    return Cookies.get(REFRESH_TOKEN_COOKIE_NAME) === token;
  },

  // Lấy refresh token từ cookies
  getRefreshToken: () => {
    return Cookies.get(REFRESH_TOKEN_COOKIE_NAME);
  },

  // Xóa refresh token khỏi cookies
  removeRefreshToken: () => {
    Cookies.remove(REFRESH_TOKEN_COOKIE_NAME, { path: "/" });
  },

  // Xóa tất cả token
  clearTokens: () => {
    TokenService.removeToken();
    TokenService.removeRefreshToken();
    // console.log("All tokens cleared");
  },
};

// Thêm interceptor để tự động thêm token vào header của mỗi request
api.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor để xử lý lỗi 401 (Unauthorized) và tự động refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi là 401 và chưa thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
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

// Google OAuth Service
const GoogleOAuthService = {
  // Redirect-based OAuth
  initiateLoginWithRedirect: () => {
    // Store current location to redirect back after login
    const currentPath = window.location.pathname + window.location.search;
    localStorage.setItem("redirectAfterLogin", currentPath);

    // Redirect to Google OAuth với callback URL đúng
    const googleAuthUrl = `${BACKEND_URL}/oauth2/authorization/google?redirect_uri=${encodeURIComponent(
      OAUTH_CALLBACK_URL
    )}`;
    window.location.href = googleAuthUrl;
  },
  handleCallback: async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const error = urlParams.get("error");

    // Kiểm tra nếu đang ở callback URL
    if (window.location.pathname === "/auth/callback") {
      if (error) {
        throw new Error(`Google OAuth error: ${error}`);
      }

      if (code) {
        try {
          // console.log("Processing Google OAuth callback with code:", code);

          const response = await axios.post(
            `${API_URL}/auth/login/google?code=${code}`,
            {},
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );

          console.log("Google OAuth response:", response.data);
          const userData = response.data;

          // Kiểm tra và lưu token
          if (userData.body && userData.body.token) {
            const token = userData.body.token;

            // Lưu token với logging để debug
            TokenService.setToken(token);
            // console.log("Token saved successfully:", token);

            // Verify token đã được lưu
            const savedToken = TokenService.getToken();
            // console.log("Verified saved token:", savedToken);

            if (!savedToken || savedToken !== token) {
              throw new Error("Token không được lưu thành công");
            }

            // Clean up URL parameters
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname
            );

            return userData.body;
          } else {
            throw new Error("Không nhận được token từ server");
          }
        } catch (error) {
          console.error("Google OAuth authentication error:", error);
          // Clear any partial state
          TokenService.clearTokens();
          throw error;
        }
      }
    }

    return null;
  },
};

// Các hàm xác thực
const AuthService = {
  // Đăng nhập
  login: async (email, password) => {
    try {
      // Sử dụng axios thay vì api instance để không kèm token
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

      // Lưu token vào cookies
      TokenService.setToken(token);

      return role;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Google Login - Chỉ sử dụng redirect method
  loginWithGoogle: async () => {
    try {
      // Luôn sử dụng redirect method
      GoogleOAuthService.initiateLoginWithRedirect();
      return null; // Không return gì vì sẽ redirect
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  },

  // Alternative method using only redirect
  loginWithGoogleRedirect: () => {
    GoogleOAuthService.initiateLoginWithRedirect();
  },

  // Handle Google callback
  handleGoogleCallback: async () => {
    try {
      return await GoogleOAuthService.handleCallback();
    } catch (error) {
      console.error("Google callback error:", error);
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
      // Clear redirect path
      localStorage.removeItem("redirectAfterLogin");
      sessionStorage.removeItem("redirectAfterLogin");
    }
  },

  // Gửi yêu cầu đặt lại mật khẩu
  resetPassword: async (email) => {
    try {
      const response = await api.post(`/auth/forgot-password?email=${email}`);
      console.log(response.data);
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

  // Kiểm tra xem người dùng đã đăng nhập chưa
  isAuthenticated: () => {
    return !!TokenService.getToken();
  },
};

export { AuthService, TokenService, GoogleOAuthService, api };
