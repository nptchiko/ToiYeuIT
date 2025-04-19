"use client";

import { useAuth } from "../../hooks/auth-context";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Hiển thị trạng thái loading nếu đang kiểm tra xác thực
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập và lưu đường dẫn hiện tại
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Nếu đã đăng nhập, hiển thị nội dung được bảo vệ
  return children;
}
