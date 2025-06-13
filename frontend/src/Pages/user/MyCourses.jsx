import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import OverviewApi from "../../api/OverviewApi";
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

function MyCourses() {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [allCourses, setAllCoures] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await OverviewApi.getUserOverview();
        const coursesWith = res.body.courses.map((course) => ({
          ...course,
          features: [
            "Giảng viên chuyên nghiệp",
            "Tài liệu độc quyền",
            "Bài tập thực hành",
          ],
        }));
        console.log(allCourses);
        setAllCoures(coursesWith);
      } catch (error) {
        console.error("Lỗi khi lấy dứ liệu khóa học đã mua");
      }
    }
    fetchCourses();
  }, []);
  const getCurrentCourses = () => {
    if (selectedLevel !== "all") {
      return allCourses.filter((item) => item.level === selectedLevel);
    }
    return allCourses;
  };
  const findCourse = getCurrentCourses();
  const handleClickLesson = (course) => {
    navigate("/lesson-list", {
      state: {
        id: course.id,
      },
    });
  };
  return (
    <div className="p-10 ">
      <div className="flex justify-between">
        <div className="text-2xl font-sent font-bold">Khóa học của tôi</div>
        <div
          onClick={() => navigate("/history-order")}
          className="text-lg font-sent font-bold hover:text-blue-600 cursor-pointer"
        >
          Xem lịch sử giao dịch
        </div>
      </div>
      {/* Course filter section - now with active functionality */}
      <div className="flex justify-center mb-5">
        <div className="w-full max-w-3xl flex flex-col md:flex-row gap-4 bg-white/60 backdrop-blur-md rounded-lg p-4 border border-gray-200 shadow-md">
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
      <div className="px-4 mb-6">
        <p className="text-indigo-700 font-medium">
          Đang hiển thị {findCourse.length} khóa học{" "}
          {selectedLevel !== "all" ? `cấp độ "${selectedLevel}"` : ""}
        </p>
      </div>
      {/* Empty state when no courses match the filter */}
      {findCourse.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white/70 rounded-xl">
          <BookOpen className="w-16 h-16 text-indigo-300 mb-4" />
          <h3 className="text-xl font-bold text-indigo-800 mb-2">
            Không tìm thấy khóa học
          </h3>
          <p className="text-gray-600 text-center max-w-md">
            Không có khóa học nào phù hợp với bộ lọc hiện tại. Vui lòng thử lại
            với bộ lọc khác.
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
      {findCourse.length > 0 && (
        <div className="max-h-[520px] overflow-y-auto pr-2 pb-6 rounded-lg hide-scrollbar border border-gray-100">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-clos-3 p-3 ">
            {findCourse.map((course, index) => (
              <div
                key={index}
                className={`${
                  levelBgs[course.level]
                } bg-opacity-80 backdrop-blur-md border border-white/40 hover:border-indigo-400 hover:shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 flex flex-col`}
              >
                <div className="relative">
                  <div
                    className={`absolute top-4 right-0 ${
                      tagColors[course.tag]
                    } px-3 py-1 rounded-l-full text-xs font-bold shadow z-10`}
                  >
                    {course.tag}
                  </div>
                  <div className="p-6 pb-4">
                    <h3 className="text-2xl font-bold text-indigo-800 mb-2 drop-shadow-sm">
                      {course.title}
                    </h3>
                    <p className="text-gray-700">{course.description}</p>
                  </div>
                  <div className="p-6 pt-2 flex-grow">
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          course.level === "Cơ bản"
                            ? "bg-green-100 text-green-700"
                            : course.level === "Trung cấp"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {course.level}
                      </span>
                      <span className="flex items-center  gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-400">
                        <Star className="h-4 w-4" />
                        {course.rating}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                        {course.duration} tuần
                      </span>
                    </div>
                    <div className="text-sm text-gray-700 space-y-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span>
                          Học phí:{" "}
                          <strong className="text-green-600 font-semibold">
                            {course.price}
                          </strong>
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      {course.features.map((features, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>{features}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-t border-indigo-100">
                  <button
                    onClick={() => handleClickLesson(course)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-xl text-sm transition-all shadow-md hover:shadow-lg"
                  >
                    Thông tin khóa học
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCourses;
