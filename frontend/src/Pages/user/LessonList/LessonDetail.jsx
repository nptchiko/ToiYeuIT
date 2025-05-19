import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Video,
  FileText,
  BookOpen,
  Download,
  Play,
  List,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import LessonDetailApi from "../../../api/LessonDetailApi";

const LessonDetail = () => {
  const location = useLocation();
  const { id_i, id_ii } = location.state;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("video");
  const [lessonDetail, setLessonDetail] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [localSubmitted, setLocalSubmitted] = useState(false);

  useEffect(() => {
    async function fetchLessonDetail() {
      try {
        const req = await LessonDetailApi.getLessonDetail(id_i, id_ii);
        setLessonDetail(req.body);

        // Initialize user answers
        if (req.body && req.body.quizQuestions) {
          const initialAnswers = {};
          req.body.quizQuestions.forEach((q) => {
            // Check if there are user submissions
            if (q.userSubmissions && q.userSubmissions.length > 0) {
              initialAnswers[q.id] = q.userSubmissions[0].id;
            }
          });
          setUserAnswers(initialAnswers);
        }

        // Initialize submitted state from the lesson
        if (req.body && req.body.lesson) {
          setLocalSubmitted(req.body.lesson.isSubmitted || false);
        }
      } catch (error) {
        console.error("Error when loading lesson detail:", error);
      }
    }

    fetchLessonDetail();
  }, [id_i, id_ii]);
  const handleClickLesson = (id_ii) => {
    navigate("/lesson-list", {
      state: {
        id: id_ii,
      },
    });
  };
  if (!lessonDetail) {
    return (
      <div className="max-w-4xl mx-auto p-4 font-sans">Loading lesson...</div>
    );
  }

  const handleAnswerSelect = (questionId, optionId) => {
    if (localSubmitted) return; // If already submitted, don't allow selection

    setUserAnswers({
      ...userAnswers,
      [questionId]: optionId,
    });
  };

  const handleSubmitQuiz = async () => {
    try {
      const courseId = id_ii;
      const lessonId = id_i;

      // Submit each answer sequentially
      const submissionPromises = Object.entries(userAnswers).map(
        ([questionId, optionId]) =>
          LessonDetailApi.submitAnswer(
            courseId,
            lessonId,
            questionId,
            optionId,
          ),
      );

      await Promise.all(submissionPromises);

      setLocalSubmitted(true);

      setLessonDetail({
        ...lessonDetail,
        lesson: {
          ...lessonDetail.lesson,
          isSubmitted: true,
        },
      });

      alert("Bài trắc nghiệm đã được nộp thành công!");
    } catch (error) {
      console.error("Error submitting quiz answers:", error);
      alert("Có lỗi xảy ra khi nộp bài. Vui lòng thử lại sau!");
    }
  };

  const handleRetakeQuiz = () => {
    // Reset the state
    setLocalSubmitted(false);
    setUserAnswers({});
  };

  const calculateScore = () => {
    if (!lessonDetail.quizQuestions) return 0;

    let correct = 0;
    lessonDetail.quizQuestions.forEach((question) => {
      const selectedOptionId = userAnswers[question.id];
      if (selectedOptionId) {
        const selectedOption = question.options.find(
          (opt) => opt.id === selectedOptionId,
        );
        if (selectedOption && selectedOption.isCorrect) {
          correct++;
        }
      }
    });

    return correct;
  };

  const isOptionCorrect = (question, optionId) => {
    const option = question.options.find((opt) => opt.id === optionId);
    return option && option.isCorrect;
  };

  const getOptionClassName = (question, optionId) => {
    const isSelected = userAnswers[question.id] === optionId;

    if (!localSubmitted) {
      return isSelected
        ? "bg-blue-50 border border-blue-300"
        : "bg-gray-50 border border-gray-200";
    }

    // When quiz is submitted
    const option = question.options.find((opt) => opt.id === optionId);

    if (option && option.isCorrect) {
      // Correct answer
      return "bg-green-100 border border-green-300";
    } else if (isSelected) {
      // User selected this option and it's wrong
      return "bg-red-100 border border-red-300";
    } else {
      // Other options
      return "bg-gray-50 border border-gray-200";
    }
  };

  // Get the correct answer text for a question
  const getCorrectAnswerText = (question) => {
    const correctOption = question.options.find((opt) => opt.isCorrect);
    return correctOption ? correctOption.optionText : "No correct answer found";
  };

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <div className="flex items-center mb-6">
        <button
          className="flex items-center text-gray-600 hover:text-blue-600 mr-4"
          onClick={() => handleClickLesson(id_ii)}
        >
          <ChevronLeft size={20} />
          <span>Quay lại danh sách</span>
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          Bài {lessonDetail.lesson.orderIndex}: {lessonDetail.lesson.title}
        </h1>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <div className="flex gap-4 items-center">
          <span className="text-gray-600">Tiến độ: </span>
          <div
            className={`px-3 py-1 rounded-full text-sm ${
              localSubmitted
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {localSubmitted ? "Đã hoàn thành" : "Đang học"}
          </div>
        </div>
      </div>
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 ${
            activeTab === "video"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("video")}
        >
          <Video size={16} className="inline mr-1" /> Video bài giảng
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "materials"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("materials")}
        >
          <FileText size={16} className="inline mr-1" /> Tài liệu
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "grammar"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("grammar")}
        >
          <BookOpen size={16} className="inline mr-1" /> Ngữ pháp
        </button>
      </div>
      <div className="mb-6">
        {activeTab === "video" && (
          <div>
            <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden mb-4">
              <iframe
                src={lessonDetail.lesson.videoUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <h2 className="text-lg font-medium mb-2">
              {lessonDetail.lesson.title}
            </h2>
            <p className="text-gray-600">{lessonDetail.lesson.description}</p>
          </div>
        )}
        {activeTab === "materials" && (
          <div>
            <h2 className="text-lg font-medium mb-4">Tài liệu học tập</h2>
            <img
              src={lessonDetail.lesson.materialsUrl}
              alt="Tài liệu học tập"
            />
          </div>
        )}
        {activeTab === "grammar" && (
          <div>
            <h2 className="text-lg font-medium mb-4">{lessonDetail.title}</h2>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <p className="text-gray-700">{lessonDetail.content}</p>
            </div>

            {/* Quiz section */}
            {lessonDetail.quizQuestions &&
              lessonDetail.quizQuestions.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-md font-medium mb-2">
                    Bài trắc nghiệm ngữ pháp
                  </h3>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    {/* Results when quiz is submitted */}
                    {localSubmitted && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p className="font-medium text-blue-700">
                          Kết quả: {calculateScore()}/
                          {lessonDetail.quizQuestions.length} câu đúng
                        </p>
                      </div>
                    )}

                    {/* Questions list */}
                    <div>
                      {lessonDetail.quizQuestions
                        .sort((a, b) => a.orderIndex - b.orderIndex)
                        .map((question) => (
                          <div key={question.id} className="mb-6 border-b pb-4">
                            <p className="mb-3 font-medium">
                              {question.orderIndex}. {question.questionText}
                            </p>
                            <div className="ml-4 space-y-2">
                              {question.options.map((option) => (
                                <div
                                  key={option.id}
                                  className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${getOptionClassName(
                                    question,
                                    option.id,
                                  )}`}
                                  onClick={() =>
                                    handleAnswerSelect(question.id, option.id)
                                  }
                                >
                                  <label className="flex items-center cursor-pointer">
                                    <input
                                      type="radio"
                                      name={`question-${question.id}`}
                                      checked={
                                        userAnswers[question.id] === option.id
                                      }
                                      onChange={() => {}}
                                      disabled={localSubmitted}
                                      className="mr-2"
                                    />
                                    <span>{option.optionText}</span>
                                  </label>
                                </div>
                              ))}
                            </div>
                            {/* Show correct answer if user selected wrong and quiz is submitted */}
                            {localSubmitted &&
                              userAnswers[question.id] &&
                              !isOptionCorrect(
                                question,
                                userAnswers[question.id],
                              ) && (
                                <p className="text-red-600 mt-2 ml-4">
                                  Đáp án đúng là:{" "}
                                  {getCorrectAnswerText(question)}
                                </p>
                              )}
                          </div>
                        ))}
                    </div>

                    {/* Action buttons */}
                    {localSubmitted ? (
                      <button
                        onClick={handleRetakeQuiz}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Làm lại bài
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitQuiz}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Nộp bài
                      </button>
                    )}
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonDetail;
