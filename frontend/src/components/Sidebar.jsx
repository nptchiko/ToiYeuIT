import React from "react";
import { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import {
  FaHome,
  FaProjectDiagram,
  FaBookOpen,
  FaRegCommentDots,
  FaUserCircle,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth-context";
import { LogOut, User } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [show, setShow] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
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
        <FaHamburger onClick={() => setIsOpen(!isOpen)} />
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
                    Nguyễn Văn Hậu
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
        {/* Sidebar */}
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
          <div>
            {isOpen && (
              <div
                onClick={() => navigate("/")}
                className="px-5 py-2 mt-10 text-base text-center cursor-pointer font-semibold rounded-xl bg-gray-100 hover:bg-gray-200"
              >
                Về trang chủ
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
