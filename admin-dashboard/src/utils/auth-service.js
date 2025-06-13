// import { useToast } from "../components/toast-context";
import axios from "axios";
import Cookies from "universal-cookie";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const cookies = new Cookies();

const TOKEN_COOKIE_NAME = "jwt";
const REFRESH_TOKEN_COOKIE_NAME = "refresh_token";

const TOKEN_EXPIRY = 7;

const TokenService = {
  setToken: (token) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + TOKEN_EXPIRY);

    cookies.set(TOKEN_COOKIE_NAME, token, {
      expires: expiryDate,
      secure: import.meta.env.MODE === "production",
      path: "/",
      sameSite: "lax",
    });
    // console.log("token set :", token);
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

  setRefreshToken: (token) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + TOKEN_EXPIRY);

    cookies.set(REFRESH_TOKEN_COOKIE_NAME, token, {
      expires: expiryDate,
      path: "/",
      sameSite: "strict",
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

//  handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 500) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = TokenService.getRefreshToken();
        if (!refreshToken) {
          TokenService.clearTokens();
          return Promise.reject(error);
        }

        const response = await axios.post(`${API_URL}/auth/refresh-token`, {
          refreshToken,
        });

        const { token, refreshToken: newRefreshToken } = response.data;
        TokenService.setToken(token);
        TokenService.setRefreshToken(newRefreshToken);

        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        TokenService.clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Google OAuth Service
// const GoogleOAuthService = {
//   // Xử lý callback từ Google OAuth
//   handleCallback: async () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get("code");
//     const error = urlParams.get("error");

//     if (window.location.pathname === "/auth/callback") {
//       if (error) {
//         // If this is in a popup, notify parent and close popup
//         if (window.opener) {
//           window.opener.postMessage(
//             {
//               type: "LOGIN_ERROR",
//               error: error,
//             },
//             window.location.origin
//           );
//           window.close();
//         }
//         throw new Error(`Google OAuth error: ${error}`);
//       }

//       if (code) {
//         try {
//           const response = await axios.post(
//             `${BACKEND_URL}/auth/outbound/authentication?code=${code}`,
//             null,
//             {
//               withCredentials: true,
//               headers: {
//                 Accept: "application/json",
//               },
//             }
//           );

//           const userData = response.data;

//           // Lưu token nếu có
//           if (userData.token) {
//             TokenService.setToken(userData.token);
//           }

//           // If this is in a popup, notify parent and close popup
//           if (window.opener) {
//             window.opener.postMessage(
//               {
//                 type: "LOGIN_SUCCESS",
//                 user: userData,
//               },
//               window.location.origin
//             );
//             // Đóng popup sau khi gửi thông báo thành công
//             setTimeout(() => {
//               window.close();
//             }, 100);
//           } else {
//             // Clean up URL if not in popup
//             window.history.replaceState(
//               {},
//               document.title,
//               window.location.pathname
//             );
//           }

//           return userData;
//         } catch (error) {
//           console.error("Google OAuth authentication error:", error);

//           if (window.opener) {
//             window.opener.postMessage(
//               {
//                 type: "LOGIN_ERROR",
//                 error: error.message,
//               },
//               window.location.origin
//             );
//             // Đóng popup ngay cả khi có lỗi
//             setTimeout(() => {
//               window.close();
//             }, 100);
//           }

//           throw error;
//         }
//       }
//     }

//     return null;
//   },

//   initiateLogin: () => {
//     return new Promise((resolve, reject) => {
//       const popup = window.open(
//         `${BACKEND_URL}/oauth2/authorization/google`,
//         "googleLogin",
//         "width=500,height=600,scrollbars=yes,resizable=yes"
//       );

//       // Kiểm tra nếu popup bị block
//       if (!popup) {
//         reject(
//           new Error(
//             "Popup bị chặn bởi trình duyệt. Vui lòng cho phép popup và thử lại."
//           )
//         );
//         return;
//       }

//       // Listen for messages from the popup
//       const messageListener = (event) => {
//         // Ensure the message is from the expected origin
//         if (event.origin !== window.location.origin) {
//           return;
//         }

//         if (event.data.type === "LOGIN_SUCCESS") {
//           // Đóng popup ngay lập tức
//           if (popup && !popup.closed) {
//             popup.close();
//           }
//           window.removeEventListener("message", messageListener);
//           resolve(event.data.user);
//         } else if (event.data.type === "LOGIN_ERROR") {
//           // Đóng popup khi có lỗi
//           if (popup && !popup.closed) {
//             popup.close();
//           }
//           window.removeEventListener("message", messageListener);
//           reject(new Error(event.data.error || "Google login failed"));
//         }
//       };

//       window.addEventListener("message", messageListener);

//       // Check if popup was closed manually
//       const checkClosed = setInterval(() => {
//         if (popup.closed) {
//           clearInterval(checkClosed);
//           window.removeEventListener("message", messageListener);
//           reject(new Error("Đăng nhập bị hủy bởi người dùng"));
//         }
//       }, 1000);
//     });
//   },
// };

const AuthService = {
  login: async (email, password) => {
    try {
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

      TokenService.setToken(token);
      console.log("Token stored:", TokenService.getToken());

      return role;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // loginWithGoogle: async () => {
  //   try {
  //     const userData = await GoogleOAuthService.initiateLogin();
  //     console.log("Google login successful:", userData);
  //     return userData;
  //   } catch (error) {
  //     console.error("Google login error:", error);
  //     throw error;
  //   }
  // },

  // handleGoogleCallback: async () => {
  //   try {
  //     return await GoogleOAuthService.handleCallback();
  //   } catch (error) {
  //     console.error("Google callback error:", error);
  //     throw error;
  //   }
  // },

  // register: async (email, password) => {
  //   try {
  //     const response = await api.post("/users/create-user", {
  //       email,
  //       password,
  //     });
  //     const { token, role } = response.data.body;

  //     // Lưu token vào cookies
  //     TokenService.setToken(token);

  //     return role;
  //   } catch (error) {
  //     console.error("Register error:", error);
  //     throw error;
  //   }
  // },

  logout: () => {
    try {
      const token = TokenService.getToken();

      if (token) {
        api.post("/auth/logout", { token });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      TokenService.clearTokens();
    }
  },

  resetPassword: async (email) => {
    try {
      const response = await api.post(`/auth/forgot-password?email=${email}`);
      return response.data;
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  },

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

  getCurrentUser: async () => {
    try {
      const response = await api.get("/users/user-info");
      console.log("response data user info:", response.data);
      return response.data;
    } catch (error) {
      console.error("Get current user error:", error);

      if (error.response && error.response.status === 401) {
        TokenService.clearTokens();
      }

      throw error;
    }
  },

  isAuthenticated: () => {
    return !!TokenService.getToken();
  },
};

export { AuthService, TokenService, api };
