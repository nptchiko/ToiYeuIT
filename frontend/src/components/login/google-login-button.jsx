"use client";

// Client component
import { AuthService } from "@/utils/auth-service";
import { useState } from "react";

const GoogleLoginButton = ({
  onSuccess,
  onError,
  className = "",
  disabled = false,
  useRedirect = true, // Thêm prop để chọn phương thức
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (disabled || isLoading) return;

    setIsLoading(true);

    try {
      if (useRedirect) {
        // Sử dụng redirect method thay vì popup
        // console.log("Redirecting to Google OAuth...");
        AuthService.loginWithGoogleRedirect();
        // Không cần setIsLoading(false) vì trang sẽ redirect
      } else {
        // Giữ lại popup method nếu cần
        const result = await AuthService.loginWithGoogle();

        if (result) {
          console.log("Google login successful:", result);
          if (onSuccess) {
            onSuccess(result);
          }
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Google login failed:", error);
      setIsLoading(false);
      if (onError) {
        onError(error);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={isLoading || disabled}
      className={`w-full py-3 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all duration-300 hover:border-gray-400 hover:-translate-y-0.5 ${
        isLoading || disabled ? "opacity-70 cursor-not-allowed" : ""
      } ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {useRedirect ? "Đang chuyển hướng..." : "Đang xử lý..."}
        </div>
      ) : (
        <>
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path
                fill="#4285F4"
                d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
              />
              <path
                fill="#34A853"
                d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
              />
              <path
                fill="#FBBC05"
                d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
              />
              <path
                fill="#EA4335"
                d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
              />
            </g>
          </svg>
          Đăng nhập với Google
        </>
      )}
    </button>
  );
};

export default GoogleLoginButton;
