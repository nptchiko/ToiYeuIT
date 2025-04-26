"use client";

// protected-route.jsx
import { useAuth } from "../hooks/auth-context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function AdminProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Add useEffect to handle navigation after loading completes
  useEffect(() => {
    if (!loading && (!user || user !== "ADMIN")) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  // Nếu đang loading, có thể hiển thị spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Nếu không phải admin hoặc chưa đăng nhập, không render gì cả (navigation handled by useEffect)
  if (!user || user !== "ADMIN") {
    return null;
  }

  // Nếu là admin, hiển thị nội dung
  return children;
}
