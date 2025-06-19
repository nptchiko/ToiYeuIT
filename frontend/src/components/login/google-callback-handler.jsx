"use client";

import { AuthService, TokenService } from "../../../src/utils/auth-service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallbackHandler = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("Đang xử lý đăng nhập...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log("Starting Google callback handling...");
        const userData = await AuthService.handleGoogleCallback();

        if (userData) {
          setStatus("success");
          setMessage("Đăng nhập thành công! Đang chuyển hướng...");

          // Kiểm tra token ngay lập tức
          const isAuthenticated = AuthService.isAuthenticated();
          // console.log("Is authenticated after login:", isAuthenticated);

          if (isAuthenticated) {
            const redirectPath =
              localStorage.getItem("redirectAfterLogin") || "/xay-dung";
            localStorage.removeItem("redirectAfterLogin");
            // console.log("Redirecting to:", redirectPath);

            // Sử dụng navigate thay vì window.location.replace
            if (TokenService.setToken()) {
              navigate(redirectPath, { replace: true });
            }
            window.location.reload();
          } else {
            throw new Error("Token không được lưu thành công");
          }
        } else {
          console.warn("No user data, redirecting to home");
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error("Google callback error:", error);
        setStatus("error");
        setMessage("Đăng nhập không thành công. Vui lòng thử lại.");
        AuthService.logout();
      }
    };

    handleCallback();
  }, [navigate]);

  const handleReturnToLogin = () => {
    if (window.opener) {
      window.close();
    } else {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
        <div className="mb-6">
          {status === "processing" && (
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          )}
          {status === "success" && (
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          )}
          {status === "error" && (
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {status === "processing" && "Đang xử lý..."}
          {status === "success" && "Thành công!"}
          {status === "error" && "Có lỗi xảy ra"}
        </h2>

        <p className="text-gray-600">{message}</p>

        {status === "error" && (
          <button
            onClick={handleReturnToLogin}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại đăng nhập
          </button>
        )}
      </div>
    </div>
  );
};

export default GoogleCallbackHandler;
