import { NavLink } from "react-router-dom";
import React from "react";
import { FaHamburger } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  FaHome,
  FaProjectDiagram,
  FaBookOpen,
  FaRegCommentDots,
  FaUserCircle,
} from "react-icons/fa";

const layout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [show, setShow] = useState(false);
  return (
    <div className="h-full">
      <div className="flex items-center bg-white p-4 border-b-2 border-gray-200 gap-3">
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
                <button className="text-gray-600 font-medium text-sm text-left hover:text-blue-500 px-4 py-1 hover:bg-blue-100 rounded-xl">
                  Hồ sơ
                </button>
                <button className="text-gray-600 text-sm font-medium text-left hover:text-red-600 px-4 py-1 hover:bg-red-100 rounded-xl">
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex h-[924px] w-full">
        <div className="flex flex-col h-full space-y-6 p-5 bg-white border-r-2 border-gray-20">
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
              <div className="px-5 py-2 mt-10 text-base text-center font-semibold rounded-xl bg-gray-100 hover:bg-gray-200">
                Về trang chủ
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default layout;
