import React from "react";
import { useState, useEffect } from "react";
import {
  BookOpen,
  Clock,
  Star,
  Users,
  Calendar,
  DollarSign,
  CheckCircle,
  Award,
  Bookmark,
  Book,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Tạo instance của axios
const axiosClient = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho request
axiosClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Interceptor cho response
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
const Background = () => {
  const [selectedCourse, setSelectedCourse] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await axiosClient.get("/api/courses");
        // Thêm features vào mỗi khóa học
        const coursesWithFeatures = res.body.map((course) => ({
          ...course,
          features: [
            "Giảng viên chuyên nghiệp",
            "Tài liệu độc quyền",
            "Bài tập thực hành",
          ],
          rating: "4.9",
        }));
        setCourses(coursesWithFeatures);
        console.log(coursesWithFeatures);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu khóa học:", error);
      }
    }

    fetchCourses();
  }, []);
  // Combined courses for "4 kỹ năng" option
  const allCourses = [...courses];

  // Get current courses based on selection
  const getCurrentCourses = () => {
    let filtered = [];

    if (selectedCourse === 1) {
      filtered = courses.filter((course) => course.type === "LR");
    } else if (selectedCourse === 2) {
      filtered = courses.filter((course) => course.type === "SW");
    } else {
      filtered = allCourses;
    }

    if (selectedLevel !== "all") {
      return filtered.filter((course) => course.level === selectedLevel);
    }

    return filtered;
  };

  // Mapping tag colors
  const tagColors = {
    "Phổ biến": "bg-blue-100 text-blue-600",
    Bestseller: "bg-amber-100 text-amber-600",
    Premium: "bg-purple-100 text-purple-600",
    Mới: "bg-green-100 text-green-600",
    "Đề xuất": "bg-rose-100 text-rose-600",
    VIP: "bg-indigo-100 text-indigo-600",
  };

  // Level backgrounds
  const levelBgs = {
    "Cơ bản": "bg-green-50",
    "Trung cấp": "bg-blue-50",
    "Nâng cao": "bg-purple-50",
  };

  // Get filtered courses
  const filteredCourses = getCurrentCourses();
  const navigate = useNavigate();
  const handleClickCourse = (course) => {
    navigate("/by-course", {
      state: {
        title: course.title,
        price: course.price,
      },
    });
  };
  return (
    <div className="flex flex-col py-20 px-12 bg-gradient-to-br from-blue-800 to-indigo-900 rounded-[48px] max-md:px-5 max-md:py-24 shadow-2xl">
      {/* Header section with enhanced styling */}
      <div className="flex justify-between items-center">
        <div className="text-white w-[60%] py-[62px] pr-[133px] max-md:py-10 max-md:pr-5">
          <div className="flex items-center mb-3">
            <Award className="w-6 h-6 text-yellow-300 mr-2" />
            <div className="text-xl font-semibold leading-snug max-md:ml-2.5 text-yellow-200">
              Xin chào Bạn!
            </div>
          </div>
          <div className="mt-5 text-5xl font-bold leading-[60px] max-md:max-w-full max-md:text-4xl max-md:leading-[56px] text-white drop-shadow-lg">
            Thiết kế lộ trình học{" "}
            <span className="text-yellow-300">dành riêng</span> cho bạn, ngay
            tại đây!
          </div>
          <p className="mt-4 text-blue-100 opacity-90 text-lg max-w-lg">
            Đạt mục tiêu TOEIC với lộ trình được cá nhân hóa và đội ngũ giảng
            viên chuyên nghiệp
          </p>
        </div>
        <div className="items-center w-[40%] relative">
          <div className="absolute -top-16 right-0 w-32 h-32 bg-yellow-300 rounded-full opacity-20 blur-xl"></div>
          <img
            src="https://prepedu.com/images/bee/bee_select_level_2.png"
            className="w-full relative z-10 drop-shadow-xl"
            alt="Bee mascot"
          />
        </div>
      </div>

      {/* Course type tabs with enhanced styling */}
      <div className="flex max-md:flex-col text-lg max-lg:text-base border border-solid shadow-lg font-bold gap-6 rounded-full max-md:rounded-md p-3 justify-around items-center bg-white/90 backdrop-blur-md mx-10 mb-8">
        <div
          onClick={() => {
            setSelectedCourse(1);
            setSelectedLevel("all");
          }}
          className={`px-[90px] py-[30px] max-lg:px-[50px] text-center rounded-full cursor-pointer duration-300 hover:shadow-md flex items-center justify-center gap-2 ${
            selectedCourse === 1
              ? "text-white bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg"
              : "text-blue-800 bg-blue-50 hover:bg-blue-100"
          }`}
        >
          <BookOpen className="w-5 h-5" />
          TOEIC Listening & Reading
        </div>
        <div
          onClick={() => {
            setSelectedCourse(2);
            setSelectedLevel("all");
          }}
          className={`px-[90px] py-[30px] max-lg:px-[50px] text-center rounded-full cursor-pointer duration-300 hover:shadow-md flex items-center justify-center gap-2 ${
            selectedCourse === 2
              ? "text-white bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg"
              : "text-blue-800 bg-blue-50 hover:bg-blue-100"
          }`}
        >
          <Book className="w-5 h-5" />
          TOEIC Speaking & Writing
        </div>
        <div
          onClick={() => {
            setSelectedCourse(3);
            setSelectedLevel("all");
          }}
          className={`px-[90px] py-[30px] max-lg:px-[50px] text-center rounded-full cursor-pointer duration-300 hover:shadow-md flex items-center justify-center gap-2 ${
            selectedCourse === 3
              ? "text-white bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg"
              : "text-blue-800 bg-blue-50 hover:bg-blue-100"
          }`}
        >
          <Bookmark className="w-5 h-5" />
          TOEIC 4 kỹ năng
        </div>
      </div>

      {/* Main content area */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-6 rounded-xl shadow-xl">
        <h2 className="text-4xl font-bold text-center mb-8 text-indigo-800 drop-shadow flex items-center justify-center gap-3">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          Danh sách khóa học TOEIC{" "}
          <span className="bg-indigo-700 text-white py-1 px-4 rounded-full text-2xl">
            {selectedCourse === 1 && "Listening & Reading"}
            {selectedCourse === 2 && "Speaking & Writing"}
            {selectedCourse === 3 && "4 kỹ năng"}
          </span>
        </h2>

        {/* Course filter section - now with active functionality */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-3xl flex flex-col md:flex-row gap-4 bg-white/60 backdrop-blur-md rounded-lg p-4 shadow-md">
            <div className="flex items-center text-indigo-800 font-medium">
              <Filter className="w-5 h-5 mr-2" />
              <p>Lọc theo cấp độ:</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span
                onClick={() => setSelectedLevel("all")}
                className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer hover:bg-blue-200 transition-all ${
                  selectedLevel === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                Tất cả
              </span>
              <span
                onClick={() => setSelectedLevel("Cơ bản")}
                className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer hover:bg-green-200 transition-all ${
                  selectedLevel === "Cơ bản"
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-700"
                }`}
              >
                Cơ bản
              </span>
              <span
                onClick={() => setSelectedLevel("Trung cấp")}
                className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer hover:bg-yellow-200 transition-all ${
                  selectedLevel === "Trung cấp"
                    ? "bg-yellow-600 text-white"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                Trung cấp
              </span>
              <span
                onClick={() => setSelectedLevel("Nâng cao")}
                className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer hover:bg-purple-200 transition-all ${
                  selectedLevel === "Nâng cao"
                    ? "bg-purple-600 text-white"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                Nâng cao
              </span>
            </div>
          </div>
        </div>

        {/* Courses count and results indicator */}
        <div className="px-4 mb-6">
          <p className="text-indigo-700 font-medium">
            Đang hiển thị {filteredCourses.length} khóa học{" "}
            {selectedLevel !== "all" ? `cấp độ "${selectedLevel}"` : ""}
          </p>
        </div>

        {/* Empty state when no courses match the filter */}
        {filteredCourses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-white/70 rounded-xl">
            <BookOpen className="w-16 h-16 text-indigo-300 mb-4" />
            <h3 className="text-xl font-bold text-indigo-800 mb-2">
              Không tìm thấy khóa học
            </h3>
            <p className="text-gray-600 text-center max-w-md">
              Không có khóa học nào phù hợp với bộ lọc hiện tại. Vui lòng thử
              lại với bộ lọc khác.
            </p>
            <button
              onClick={() => setSelectedLevel("all")}
              className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Xem tất cả khóa học
            </button>
          </div>
        )}

        {/* Vertical scrolling container with enhanced styling */}
        {filteredCourses.length > 0 && (
          <div className="max-h-[650px] overflow-y-auto pr-2 pb-6 hide-scrollbar rounded-lg">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 p-3">
              {filteredCourses.map((course, index) => (
                <div
                  key={index}
                  className={`${
                    levelBgs[course.level]
                  } bg-opacity-80 backdrop-blur-md border border-white/40 hover:border-indigo-400 hover:shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 flex flex-col`}
                >
                  {/* Course header */}
                  <div className="relative">
                    {/* Tag banner */}
                    <div
                      className={`absolute top-4 right-0 ${
                        tagColors[course.tag]
                      } px-3 py-1 rounded-l-full text-xs font-bold shadow z-10`}
                    >
                      {course.tag}
                    </div>

                    {/* Course type badge - only shown in "4 kỹ năng" view */}
                    {selectedCourse === 3 && (
                      <div className="absolute top-1 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow z-10">
                        {course.type === "LR" ? "L&R" : "S&W"}
                      </div>
                    )}

                    {/* Course header content */}
                    <div className="p-6 pb-4">
                      <h3 className="text-2xl font-bold text-indigo-800 mb-2 drop-shadow-sm">
                        {course.title}
                      </h3>
                      <p className="text-gray-700">{course.description}</p>
                    </div>
                  </div>

                  {/* Course details */}
                  <div className="p-6 pt-2 flex-grow">
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          course.level === "Cơ bản"
                            ? "bg-green-100 text-green-700"
                            : course.level === "Trung cấp"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {course.level}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        ⭐ {course.rating}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                        {course.duration} tuần
                      </span>
                    </div>

                    <div className="text-sm text-gray-700 space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-indigo-500" />
                        <span>
                          <strong>{course.students}</strong> học viên đã đăng ký
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span>
                          Học phí:{" "}
                          <strong className="text-green-600 font-semibold">
                            {course.price.toLocaleString("vi-VN")}đ
                          </strong>
                        </span>
                      </div>
                    </div>

                    {/* Course features */}
                    <div className="mt-4 space-y-2">
                      {course.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call to action */}
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-t border-indigo-100">
                    <button
                      onClick={() => handleClickCourse(course)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-xl text-sm transition-all shadow-md hover:shadow-lg"
                    >
                      Đăng ký ngay
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Background;
