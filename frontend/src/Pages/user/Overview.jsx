import React, { useEffect, useState } from "react";
import TestOverview from "./TestOverview";
import {
  BookOpen,
  Star,
  Users,
  Calendar,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import OverviewAip from "../../api/OverviewApi";
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

const Overview = () => {
  const navigate = useNavigate();
  const [allCourses, setAllCoures] = useState([]);
  const [test, setTest] = useState([]);
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await OverviewAip.getUserOverview();
        const coursesWith = res.body.courses.map((course) => ({
          ...course,
          features: [
            "Giảng viên chuyên nghiệp",
            "Tài liệu độc quyền",
            "Bài tập thực hành",
          ],
        }));
        setTest(res.body.tests);
        setAllCoures(coursesWith);
      } catch (error) {
        console.error("Lỗi khi lấy dứ liệu khóa học đã mua");
      }
    }
    fetchCourses();
  }, []);

  const hanldClickMyCoure = () => {
    navigate("/sidebar/my-course");
  };
  const hanldClicTestPractice = () => {
    navigate("/sidebar/test-practice");
  };
  const handleClickLesson = (course) => {
    navigate("/lesson-list", {
      state: {
        id: course.id,
      },
    });
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
        <TestOverview />
      </div>
    </div>
  );
};

export default Overview;
