import React from "react";
import { useState } from "react";
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
const coursesLR = [
  {
    title: "TOEIC 450+ Cơ Bản",
    description: "Nền tảng từ vựng, ngữ pháp và kỹ năng làm bài cơ bản.",
    level: "Cơ bản",
    duration: "6 tuần",
    rating: "4.5",
    students: 1200,
    price: "1.200.000đ",
    startDate: "15/04/2025",
    tag: "Phổ biến",
    features: [
      "Giảng viên chuyên nghiệp",
      "Tài liệu độc quyền",
      "Bài tập thực hành",
    ],
  },
  {
    title: "TOEIC 650+ Trung Cấp",
    description: "Rèn luyện kỹ năng Part 3-4-5-6, chiến thuật xử lý câu hỏi.",
    level: "Trung cấp",
    duration: "8 tuần",
    rating: "4.7",
    students: 950,
    price: "1.800.000đ",
    startDate: "22/04/2025",
    tag: "Bestseller",
    features: [
      "Phân tích chuyên sâu",
      "Bài tập tương tác",
      "Mô phỏng thi thật",
    ],
  },
  {
    title: "TOEIC 800+ Nâng Cao",
    description: "Tăng tốc luyện đề và kỹ năng phản xạ đề thi thực tế.",
    level: "Nâng cao",
    duration: "10 tuần",
    rating: "4.9",
    students: 620,
    price: "2.400.000đ",
    startDate: "01/05/2025",
    tag: "Premium",
    features: ["Giáo trình quốc tế", "Đảm bảo đầu ra", "Hỗ trợ 1-1"],
  },
];
const coursesSW = [
  {
    title: "TOEIC 750+ Cơ Bản",
    description:
      "Nền tảng từ vựng, ngữ pháp và kỹ thuật làm bài Speaking & Writing.",
    level: "Cơ bản",
    duration: "6 tuần",
    rating: "4.5",
    students: 1200,
    price: "1.200.000đ",
    startDate: "15/04/2025",
    tag: "Mới",
    features: ["Rèn luyện phát âm", "Kỹ thuật viết mẫu", "Bài tập theo chủ đề"],
  },
  {
    title: "TOEIC 850+ Trung Cấp",
    description:
      "Rèn luyện kỹ năng phản xạ và chiến thuật làm bài thi thực tế.",
    level: "Trung cấp",
    duration: "8 tuần",
    rating: "4.7",
    students: 950,
    price: "1.800.000đ",
    startDate: "22/04/2025",
    tag: "Đề xuất",
    features: ["Phản hồi chi tiết", "Bài tập tương tác", "Hỗ trợ trực tuyến"],
  },
  {
    title: "TOEIC 900+ Nâng Cao",
    description: "Tăng tốc luyện đề và kỹ năng phản xạ đề thi thực tế.",
    level: "Nâng cao",
    duration: "10 tuần",
    rating: "4.9",
    students: 620,
    price: "2.400.000đ",
    startDate: "01/05/2025",
    tag: "VIP",
    features: ["Luyện thi trọng tâm", "Tư vấn cá nhân hóa", "Bảo đảm điểm số"],
  },
];
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
const myCourse = [...coursesLR, ...coursesSW];

function MyCourses() {
  const [selectedLevel, setSelectedLevel] = useState("all");
  const getCurrentCourses = () => {
    if (selectedLevel !== "all") {
      return myCourse.filter((item) => item.level === selectedLevel);
    }
    return myCourse;
  };
  const findCourse = getCurrentCourses();
  return (
    <div className="p-10 ">
      <div className="text-2xl font-sent font-bold">Khóa học của tôi</div>
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
        <div className="max-h-[650px] overflow-y-auto pr-2 pb-6 hide-scrollbar rounded-lg">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 p-3">
            {findCourse.map((course, index) => (
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
                      {course.duration}
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
                      <Calendar className="w-4 h-4 text-indigo-500" />
                      <span>
                        Khai giảng: <strong>{course.startDate}</strong>
                      </span>
                    </div>
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
                  <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-xl text-sm transition-all shadow-md hover:shadow-lg">
                    Đăng ký ngay
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
