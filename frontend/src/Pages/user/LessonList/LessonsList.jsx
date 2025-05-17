import React, { useState } from "react";
import { CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
const data = [
  {
    id: 1,
    title: "Giới thiệu về khóa học",
    submitted: true,
    sections: "2",
    description:
      "Bài học giới thiệu tổng quan về khóa học TOEIC, các phần thi và chiến lược học tập hiệu quả.",
  },
  {
    id: 2,
    title: "Listening: Tranh tả người",
    submitted: false,
    sections: "3",
    description:
      "Học cách nghe và hiểu các bức tranh mô tả người trong phần thi Listening.",
  },
  {
    id: 3,
    title: "Reading: Giới thiệu chung về Part 5",
    submitted: true,
    sections: "3",
    description:
      "Tìm hiểu về cấu trúc và chiến lược làm bài trong Reading Part 5.",
  },
];

const LessonsList = () => {
  const navigate = useNavigate();
  const [activeLesson, setActiveLesson] = useState(null);
  const completedLessons = data.filter((lesson) => lesson.submitted).length;
  const totalLessons = data.length;

  const handleClick = (lesson) => {
    navigate("/lessonDetail", {
      state: {
        id: lesson.id,
        title: lesson.title,
        sections: lesson.sections,
        description: lesson.description,
        submitted: lesson.submitted,
      },
    });
  };

  const handleLessonClick = (lesson) => {
    setActiveLesson(lesson.id === activeLesson ? null : lesson.id);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Danh sách bài học</h1>
        <div className="text-right text-gray-600">
          Đã học {completedLessons}/{totalLessons} Units
        </div>
      </div>
      <div className="h-px bg-gray-200 mb-4"></div>
      <div className="space-y-4">
        {data.map((lesson) => (
          <div key={lesson.id}>
            <div
              className={`flex items-center p-4 cursor-pointer border rounded-lg ${
                lesson.submitted ? "bg-white" : "bg-gray-50"
              } ${
                activeLesson === lesson.id
                  ? "border-blue-500"
                  : "border-gray-200"
              }`}
              onClick={() => handleLessonClick(lesson)}
            >
              <div
                className={`flex-shrink-0 h-16 w-16 rounded-lg flex flex-col items-center justify-center ${
                  lesson.submitted
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <div className="text-xl font-bold">
                  {lesson.id.toString().padStart(2, "0")}
                </div>
                <div className="text-xs uppercase">Lesson</div>
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="font-medium text-gray-800">{lesson.title}</h3>
                <div className="text-sm text-gray-500 mt-1">
                  {lesson.sections} Sections
                </div>
              </div>
            </div>
            {activeLesson === lesson.id && (
              <div className="mt-2 p-4 border border-gray-200 rounded-lg bg-white">
                <h4 className="font-medium mb-2">Nội dung bài học</h4>
                <p className="text-gray-600">{lesson.description}</p>
                <div className="mt-4 flex items-center">
                  {lesson.submitted ? (
                    <div className="flex items-center text-green-600 mr-4">
                      <CheckCircle size={16} className="mr-1" />
                      <span className="text-sm">Đã hoàn thành</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-yellow-600 mr-4">
                      <Clock size={16} className="mr-1" />
                      <span className="text-sm">Chưa hoàn thành</span>
                    </div>
                  )}
                  <button
                    className={`px-4 py-2 rounded-lg font-medium ${
                      lesson.submitted
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                    onClick={() => handleClick(lesson)}
                  >
                    {lesson.submitted ? "Xem lại bài học" : "Tiếp tục học"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonsList;
