import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Star,
  Users,
  Calendar,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
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
const levelBgs = {
  "Cơ bản": "bg-green-50",
  "Trung cấp": "bg-blue-50",
  "Nâng cao": "bg-purple-50",
};

const test = [
  {
    id: 1,
    plantain: "Đề 1",
    skill: "Listening",
  },
  {
    id: 2,
    plantain: "Đề 2",
    skill: "Reading",
  },
  {
    id: 3,
    plantain: "Đề 3",
    skill: "Speaking",
  },
  {
    id: 4,
    plantain: "Đề 4",
    skill: "Writing",
  },
];

const allCourses = [...coursesLR, ...coursesSW];

const Overview = () => {
  const navigate = useNavigate();
  const hanldClickMyCoure = () => {
    navigate("/my-coursew");
  };
  const hanldClicTestPractice = () => {
    navigate("/test-practice");
  };
  return (
    <div className="p-7 font-sent h-full w-full ">
      <div className="h-[570px] w-full">
        <div className="flex w-full items-center pb-2">
          <div className="text-xl font-bold text-gray-800">
            Khóa học của tôi
          </div>
          <div
            onClick={hanldClickMyCoure}
            className="flex ml-auto hover:text-blue-500 cursor-pointer"
          >
            Xem chi tiết
          </div>
        </div>

        {allCourses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-white/70 rounded-xl">
            <BookOpen className="w-16 h-16 text-indigo-300 mb-4" />
            <h3 className="text-xl font-bold text-indigo-800 mb-2">
              Không tìm thấy khóa học
            </h3>
          </div>
        )}
        {allCourses.length > 0 && (
          <div className="max-h-[520px] overflow-y-auto pr-2 pb-6 rounded-lg hide-scrollbar border border-gray-100">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-clos-3 p-3 ">
              {allCourses.map((course, index) => (
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
                          {course.duration}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 space-y-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-indigo-500" />
                          <span>
                            <strong>{course.students}</strong> học viên đã ký
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
                    <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-xl text-sm transition-all shadow-md hover:shadow-lg">
                      Thông tin khóa học
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="h-[320px] w-full">
        <div className="flex w-full items-center py-3">
          <div className="text-xl font-bold text-gray-800">Test Practice</div>
          <div
            onClick={hanldClicTestPractice}
            className="flex ml-auto hover:text-blue-500 cursor-pointer"
          >
            Xem chi tiết
          </div>
        </div>
        {test.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-white/70 rounded-xl">
            <BookOpen className="w-16 h-16 text-indigo-300 mb-4" />
            <h3 className="text-xl font-bold text-indigo-800 mb-2">
              Không tìm thấy đề thi
            </h3>
          </div>
        )}
        {test.length > 0 && (
          <div className="h-[250px] overflow-y-auto pr-2 pb-6 rounded-lg border border-gray-100">
            <div className="p-4 grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 xl:gap-5 gap-3">
              {test.map((item) => (
                <>
                  {" "}
                  {/* đề thi listening */}
                  {item.skill === "Listening" && (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border hover:border-indigo-400 hover:shadow-2xl rounded-2xl overflow-hidden duration-300 hover:-translate-y-1 border-gray-200 p-4 2xl:w-[300px] lg:w-[200px] w-[300px] cursor-pointer"
                    >
                      <div className="h-12 w-12 bg-blue-50 flex justify-center items-center rounded-lg">
                        <img src="https://api.prep.vn/images/skills/test_practice/listening.png" />
                      </div>
                      <p className="text-base font-bold">{item.plantain}</p>
                    </div>
                  )}
                  {/* đề thi reading */}
                  {item.skill === "Reading" && (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border hover:border-indigo-400 hover:shadow-2xl rounded-2xl overflow-hidden duration-300 hover:-translate-y-1 border-gray-200 p-4 2xl:w-[300px] lg:w-[200px] w-[300px] cursor-pointer"
                    >
                      <div className="h-12 w-12 bg-blue-50 flex justify-center items-center rounded-lg">
                        <img src="https://api.prep.vn/images/skills/test_practice/reading.png" />
                      </div>
                      <p className="text-base font-bold">Đề 1</p>
                    </div>
                  )}
                  {/* đề thi writing */}
                  {item.skill === "Reading" && (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border hover:border-indigo-400 hover:shadow-2xl rounded-2xl overflow-hidden duration-300 hover:-translate-y-1 border-gray-200 p-4 2xl:w-[300px] lg:w-[200px] w-[300px] cursor-pointer"
                    >
                      <div className="h-12 w-12 bg-blue-50 flex justify-center items-center rounded-lg">
                        <img src="https://api.prep.vn/images/skills/test_practice/writing.png" />
                      </div>
                      <p className="text-base font-bold">Đề 1</p>
                    </div>
                  )}
                  {/* đề thi speaking */}
                  {item.skill === "Reading" && (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border hover:border-indigo-400 hover:shadow-2xl rounded-2xl overflow-hidden duration-300 hover:-translate-y-1 border-gray-200 p-4 2xl:w-[300px] lg:w-[200px] w-[300px] cursor-pointer"
                    >
                      <div className="h-12 w-12 bg-blue-50 flex justify-center items-center rounded-lg">
                        <img src="https://api.prep.vn/images/skills/test_practice/speaking.png" />
                      </div>
                      <p className="text-base font-bold">Đề 1</p>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
