import Course from "../Pages/By_Course/Course";
import LoginPage from "../Pages/Login/Login_Page";
import ProtectedRoute from "../Pages/Login/protected-route";
import Commitment from "../Pages/Output_commitment/Output_commitment";
import AllSkill from "../Pages/Practice/All_skill";
import TestListening from "../Pages/Practice/Exam_set/TestListening";
import TestReading from "../Pages/Practice/Exam_set/TestReading";
import HistoryListening from "../Pages/Practice/History_test/HistoryListening";
import HistoryReaing from "../Pages/Practice/History_test/HistoryReaing";
import Listening from "../Pages/Practice/Listening";
import Practice from "../Pages/Practice/Practice";
import Reading from "../Pages/Practice/Reading";
import Speaking from "../Pages/Practice/Speaking";
import Writing from "../Pages/Practice/Writing";
import Roadmap from "../Pages/Roadmap/Roadmap";
import KT from "../Pages/test/Test";
import CheckInputListening from "../Pages/test/checkInputListening";
import CheckInputReading from "../Pages/test/checkInputReading";
import UseProfileData from "../Pages/useProfileData/useProfileData";
import Flashcard from "../Pages/user/Flashcard";
import MyCourses from "../Pages/user/MyCourses";
import Overview from "../Pages/user/Overview";
import TestPractice from "../Pages/user/TestPractice";
import Sidebar from "../components/Sidebar";
import RouterPrivate from "./RouterPrivate";
import RouterPublic from "./RouterPublic";
import { useAuth } from "@/hooks/auth-context";
import { Routes, Route, Navigate } from "react-router-dom";

const RoutersConfig = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <Routes>
      {/* Route đăng nhập - có thể truy cập mà không cần xác thực */}
      <Route path="/login" element={<LoginPage />} />
      {/* Route mặc định - chuyển hướng đến trang đăng nhập */}
      <Route
        path="/"
        element={<Navigate to={user ? "/xay-dung" : "/login"} replace />}
      />

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
        <Route path="/test-listening" element={<TestListening />} />
        <Route path="/test-reading" element={<TestReading />} />
        <Route path="/test-history-reading" element={<HistoryReaing />} />
        <Route path="/test-history-listening" element={<HistoryListening />} />
        <Route
          path="/check-input-listening"
          element={<CheckInputListening />}
        />
        <Route path="/check-input-reading" element={<CheckInputReading />} />
        <Route path="/profile" element={<UseProfileData />} />
        <Route path="/sidebar" element={<Sidebar />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="flashcard" element={<Flashcard />} />
          <Route path="my-course" element={<MyCourses />} />
          <Route path="test-practice" element={<TestPractice />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RoutersConfig;
