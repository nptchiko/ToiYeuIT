// protected-route.jsx

import { useAuth } from "../hooks/auth-context";
import { Navigate } from "react-router-dom";

export function AdminProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Nếu đang loading, có thể hiển thị spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Nếu không phải admin hoặc chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (!user || user !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  // Nếu là admin, hiển thị nội dung
  return children;
}
