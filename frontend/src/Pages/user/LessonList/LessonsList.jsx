import React, { useEffect, useState } from "react";
import { CheckCircle, Clock, Home, ChevronRight, BookOpen } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import LessonsListApi from "../../../api/LessonsListApi";

const LessonsList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const [activeLesson, setActiveLesson] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    async function fetchLessonsList() {
      try {
        setLoading(true);
        const req = await LessonsListApi.getLessonList(id);
        setData(req.body);
        if (req.body.length > 0 && req.body[0].course) {
          setCourseName(req.body[0].course.title || "Khóa học");
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bài học:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLessonsList();
  }, [id]);

  const handleNavigateToLesson = (lesson) => {
    navigate("/lesson-detail", {
      state: {
        id_i: lesson.id,
        id_ii: lesson.course.id,
      },
    });
  };

  const handleBackToHome = () => {
    navigate("/sidebar/my-course");
  };

  const completedLessons = data.filter((lesson) => lesson.isSubmitted).length;
  const totalLessons = data.length;
  const completionPercentage =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const handleLessonClick = (lesson) => {
    setActiveLesson(lesson.id === activeLesson ? null : lesson.id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans bg-gray-50 min-h-screen">
      {/* Header with back button */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{courseName}</h1>
            <div className="text-sm text-gray-600 mt-1">Tiến độ học tập</div>
          </div>
          <button
            onClick={handleBackToHome}
            className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <Home size={18} className="mr-2" />
            <span>Danh sách khóa học</span>
          </button>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">
              Đã hoàn thành {completedLessons}/{totalLessons} bài học
            </span>
            <span className="font-medium">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Lessons list */}
      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">
              Không có bài học nào trong khóa học này.
            </p>
          </div>
        ) : (
          data.map((lesson, index) => (
            <div
              key={lesson.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div
                className={`flex items-center p-4 cursor-pointer border-l-4 ${
                  lesson.isSubmitted
                    ? "border-l-green-500"
                    : "border-l-blue-500"
                } ${activeLesson === lesson.id ? "bg-blue-50" : "bg-white"}`}
                onClick={() => handleLessonClick(lesson)}
              >
                <div
                  className={`flex-shrink-0 h-14 w-14 rounded-full flex flex-col items-center justify-center ${
                    lesson.isSubmitted
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-blue-100 text-blue-700 border border-blue-200"
                  }`}
                >
                  <div className="text-lg font-bold">{index + 1}</div>
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="font-semibold text-gray-800">
                    {lesson.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    {lesson.isSubmitted && (
                      <span className="flex items-center ml-3 text-green-600">
                        <CheckCircle size={14} className="mr-1" />
                        <span>Đã hoàn thành</span>
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight
                  size={20}
                  className={`text-gray-400 transform transition-transform ${
                    activeLesson === lesson.id ? "rotate-90" : ""
                  }`}
                />
              </div>

              {activeLesson === lesson.id && (
                <div className="p-4 border-t border-gray-100 bg-white">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Nội dung bài học
                    </h4>
                    <p className="text-gray-600">
                      {lesson.description || "Không có mô tả cho bài học này."}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <div
                      className={`flex items-center px-3 py-1 rounded-full text-sm ${
                        lesson.isSubmitted
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {lesson.isSubmitted ? (
                        <>
                          <CheckCircle size={14} className="mr-1" />
                          <span>Đã hoàn thành</span>
                        </>
                      ) : (
                        <>
                          <Clock size={14} className="mr-1" />
                          <span>Chưa hoàn thành</span>
                        </>
                      )}
                    </div>

                    <button
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ml-auto ${
                        lesson.isSubmitted
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                      onClick={() => handleNavigateToLesson(lesson)}
                    >
                      {lesson.isSubmitted ? "Xem lại bài học" : "Tiếp tục học"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleBackToHome}
          className="flex items-center justify-center h-12 w-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors"
          title="Quay về trang chủ"
        >
          <Home size={24} />
        </button>
      </div>
    </div>
  );
};

export default LessonsList;
