import Layout from "./components/layout";
import { AdminProtectedRoute } from "./components/protected-route";
import { ToastProvider } from "./components/toast-provider";
import { AuthProvider } from "./hooks/auth-provider";
import Courses from "./page/Courses";
import Home from "./page/Home";
import ProfilePage from "./page/Profile";
import TestManagement from "./page/TestManagerment";
import Users from "./page/User";
import LoginPage from "./page/loginPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Route đăng nhập - có thể truy cập mà không cần xác thực */}
            <Route path="/login" element={<LoginPage />} />

            {/* Route mặc định - chuyển hướng đến trang chủ */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Các route yêu cầu admin access */}
            <Route
              path="/dashboard"
              element={
                <AdminProtectedRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/test-management"
              element={
                <AdminProtectedRoute>
                  <Layout>
                    <TestManagement />
                  </Layout>
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <AdminProtectedRoute>
                  <Layout>
                    <Users />
                  </Layout>
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <AdminProtectedRoute>
                  <Layout>
                    <Courses />
                  </Layout>
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <AdminProtectedRoute>
                  <ProfilePage />
                </AdminProtectedRoute>
              }
            />

            {/* Trang không tìm thấy */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
