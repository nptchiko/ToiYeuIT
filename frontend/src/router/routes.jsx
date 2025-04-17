import Course from "../Pages/By_Course/Course";
import LoginPage from "../Pages/Login/Login_Page";
import ProtectedRoute from "../Pages/Login/protected-route";
import Commitment from "../Pages/Output_commitment/Output_commitment";
import AllSkill from "../Pages/Practice/All_skill";
import Listening from "../Pages/Practice/Listening";
import Practice from "../Pages/Practice/Practice";
import Reading from "../Pages/Practice/Reading";
import Speaking from "../Pages/Practice/Speaking";
import Writing from "../Pages/Practice/Writing";
import Roadmap from "../Pages/Roadmap/Roadmap";
import KT from "../Pages/test/Test";
import RouterPrivate from "./RouterPrivate";
import RouterPublic from "./RouterPublic";
// Đảm bảo đường dẫn chính xác
import { Routes, Route, Navigate } from "react-router-dom";

const RoutersConfig = () => {
  return (
    <Routes>
      {/* Route mặc định - chuyển hướng đến trang đăng nhập */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Route đăng nhập - có thể truy cập mà không cần xác thực */}
      <Route path="/login" element={<LoginPage />} />

      {/* Các trang chính cần xác thực */}
      <Route
        element={
          <ProtectedRoute>
            <RouterPublic />
          </ProtectedRoute>
        }
      >
        <Route path="/kiem-tra" element={<KT />} />
        <Route path="/xay-dung" element={<Roadmap />} />
        <Route path="/cam-ket" element={<Commitment />} />

        {/* Trang luyện tập có các trang con */}
        <Route path="/luyen-de" element={<Practice />}>
          <Route index element={<Navigate to="all-skill" replace />} />
          <Route path="all-skill" element={<AllSkill />} />
          <Route path="listening" element={<Listening />} />
          <Route path="reading" element={<Reading />} />
          <Route path="writing" element={<Writing />} />
          <Route path="speaking" element={<Speaking />} />
        </Route>
      </Route>

      {/* Router dành cho user đã đăng nhập */}
      <Route
        element={
          <ProtectedRoute>
            <RouterPrivate />
          </ProtectedRoute>
        }
      >
        <Route path="/by-course" element={<Course />} />
      </Route>
    </Routes>
  );
};

export default RoutersConfig;
