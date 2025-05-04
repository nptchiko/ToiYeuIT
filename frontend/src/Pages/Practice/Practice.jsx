import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  ChevronRight,
  Trophy,
  Star,
  Users,
  ArrowUpRight,
  Crown,
} from "lucide-react";

const data = [
  {
    id: 1,
    title: "Tất cả các kỹ năng",
    to: "all-skill",
    img: "https://app.prepedu.com/imgs/test-practice/ic-book.svg",
  },
  {
    id: 2,
    title: "Listening",
    to: "listening",
    img: "https://api.prep.vn/images/skills/test_practice/listening.png",
  },
  {
    id: 3,
    title: "Reading",
    to: "reading",
    img: "https://api.prep.vn/images/skills/test_practice/reading.png",
  },
  {
    id: 4,
    title: "Writing",
    to: "writing",
    img: "https://api.prep.vn/images/skills/test_practice/writing.png",
  },
  {
    id: 5,
    title: "Speaking",
    to: "speaking",
    img: "https://api.prep.vn/images/skills/test_practice/speaking.png",
  },
];

const Practice = () => {
  return (
    <div className="p-4 md:px-7 md:py-0 bg-gray-50 min-h-screen">
      <div className="w-full bg-gradient-to-r from-indigo-100 to-blue-50 rounded-2xl overflow-hidden shadow-md mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row">
            {/* Text Content */}
            <div className="px-3 py-8 md:px-10 md:w-1/2 flex flex-col justify-center space-y-5">
              <div className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-1">
                <Trophy size={16} className="mr-1" /> TOEIC Mastery
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                Phòng luyện đề ảo{" "}
                <span className="text-blue-600">4 kỹ năng TOEIC</span>
              </h1>

              <div className="text-gray-600 font-normal">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <ChevronRight
                      size={18}
                      className="text-blue-500 mt-1 mr-2 flex-shrink-0"
                    />
                    <span>
                      Thuần thục kỹ năng làm bài thi thật TOEIC thông qua việc
                      luyện đề hằng ngày
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight
                      size={18}
                      className="text-blue-500 mt-1 mr-2 flex-shrink-0"
                    />
                    <span>
                      Duy nhất tại Prep, bạn dễ dàng làm chủ kỹ năng Speaking,
                      Writing với bộ đôi Phòng Speaking & Writing ảo chuẩn
                      format kỳ thi TOEIC
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight
                      size={18}
                      className="text-blue-500 mt-1 mr-2 flex-shrink-0"
                    />
                    <span>
                      Luyện không giới hạn bộ đề, full 4 kỹ năng TOEIC quan
                      trọng chỉ với một tài khoản PRO
                    </span>
                  </li>
                </ul>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className=" flex items-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <Users size={22} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Học viên tích cực</p>
                    <p className="text-xl font-bold text-gray-800">10,000+</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <Star size={22} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Đánh giá trung bình</p>
                    <p className="text-xl font-bold text-gray-800">4.8/5</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <Trophy size={22} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Đề thi chuẩn TOEIC</p>
                    <p className="text-xl font-bold text-gray-800">200+ đề</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="md:w-1/2 flex items-end justify-center px-4 md:px-0">
              <img
                src="https://app.prepedu.com/imgs/test-practice/banner-toeic.png"
                className="h-full object-contain max-h-96"
                alt="TOEIC Practice"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Navigation */}
      <div className="bg-white rounded-xl shadow-sm mb-8 overflow-hidden border border-gray-100">
        <div className="px-4 py-4 border-b border-gray-100 flex items-center">
          <h2 className="text-lg font-bold text-gray-800">Kỹ năng luyện tập</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {data.map((item) => (
            <NavLink
              key={item.id}
              to={`/luyen-de/${item.to}`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-5 transition-all hover:bg-gray-50 ${
                  isActive ? "bg-blue-50" : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`h-12 w-12 rounded-lg flex justify-center items-center transition-all ${
                      isActive ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    <img
                      src={item.img}
                      className="h-8 w-8 object-contain"
                      alt={item.title}
                    />
                  </div>
                  <div>
                    <p
                      className={`font-medium ${
                        isActive ? "text-blue-500" : "text-gray-900"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">Luyện tập ngay</p>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Practice;
