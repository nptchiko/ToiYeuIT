import React, { useEffect, useState } from "react";
import {
  FaHamburger,
  FaHome,
  FaProjectDiagram,
  FaBookOpen,
  FaRegCommentDots,
  FaUserCircle,
} from "react-icons/fa";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth-context";
import { LogOut, User, MessageCircle, Menu } from "lucide-react";
import { api } from "@/utils/auth-service";
import Chatbot from "../Pages/Chat_ai/Chatbot";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [show, setShow] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy dữ liệu người dùng
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/users/user-info");
        const userData = response.data.body;
        setProfileData({
          name: userData.username || "",
        });
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Lỗi tải thông tin người dùng.");
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center bg-white p-4 border-b-2 border-gray-200 gap-3 sticky top-0 z-50">
        <Menu className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
        <div className="flex items-center">
          <div className="bg-blue-700 text-white p-1 rounded">
            <span className="font-bold text-xl">ET</span>
          </div>
          <span className="font-bold text-blue-700 text-xl ml-1">ENGHUB</span>
        </div>
        <div
          className="flex items-center ml-auto text-blue-700 relative"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <FaUserCircle className="h-10 w-10 cursor-pointer" />
          {show && (
            <div className="absolute top-10 right-0 bg-white border-gray-100 border shadow-lg rounded-lg w-[220px] p-4 z-50">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-4">
                  <FaUserCircle className="h-10 w-10" />
                  <div className="text-gray-800 font-semibold">
                    {profileData.name || "Guest"}
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-primary hover:bg-primary/10 transition-colors px-3 py-2 rounded-lg"
                >
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">View Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-destructive hover:bg-destructive/10 transition-colors px-3 py-2 rounded-lg"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Menu */}
        <div
          className={`flex flex-col space-y-6 p-5 bg-white border-r-2 border-gray-200 sticky top-16 transition-all duration-300`}
        >
          <div className="text-lg font-semibold text-gray-600 text-center">
            TOEIC
          </div>
          <NavLink
            to="overview"
            className={({ isActive }) =>
              `flex items-center gap-4 font-semibold py-2 px-5 rounded-xl ${
                isActive
                  ? "text-blue-600 bg-sky-50"
                  : "text-indigo-900 hover:bg-sky-50"
              }`
            }
          >
            <FaHome />
            {isOpen && <div>Overview</div>}
          </NavLink>
          <NavLink
            to="flashcard"
            className={({ isActive }) =>
              `flex items-center gap-4 font-semibold py-2 px-5 rounded-xl ${
                isActive
                  ? "text-blue-600 bg-sky-50"
                  : "text-indigo-900 hover:bg-sky-50"
              }`
            }
          >
            <FaProjectDiagram />
            {isOpen && <div>Flashcard</div>}
          </NavLink>
          <NavLink
            to="my-course"
            className={({ isActive }) =>
              `flex items-center gap-4 font-semibold py-2 px-5 rounded-xl ${
                isActive
                  ? "text-blue-600 bg-sky-50"
                  : "text-indigo-900 hover:bg-sky-50"
              }`
            }
          >
            <FaBookOpen />
            {isOpen && <div className="w-[100px]">My Courses</div>}
          </NavLink>
          <NavLink
            to="test-practice"
            className={({ isActive }) =>
              `flex items-center gap-4 font-semibold py-2 px-5 rounded-xl ${
                isActive
                  ? "text-blue-600 bg-sky-50"
                  : "text-indigo-900 hover:bg-sky-50"
              }`
            }
          >
            <FaRegCommentDots />
            {isOpen && <div>Test Practice</div>}
          </NavLink>
          {isOpen && (
            <div
              onClick={() => navigate("/")}
              className="px-5 py-2 mt-10 text-base text-center cursor-pointer font-semibold rounded-xl bg-gray-100 hover:bg-gray-200"
            >
              Về trang chủ
            </div>
          )}
        </div>
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setShowChat(!showChat)}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Khung chat */}
        {showChat && (
          <div className="fixed bottom-20 right-6 w-[360px] z-50">
            <div className="bg-white shadow-xl rounded-lg border border-gray-200">
              {/* Nút đóng chat */}
              <div className="flex justify-between items-center px-4 py-2 border-b">
                <span className="font-semibold text-gray-700">ET Chatbot</span>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-red-500 font-bold text-xl hover:text-red-600"
                >
                  &times;
                </button>
              </div>
              <Chatbot />
            </div>
          </div>
        )}
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
