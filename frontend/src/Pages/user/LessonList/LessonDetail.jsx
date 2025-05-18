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

const data = [
  {
    id: 1,
    videoUrl: "https://www.youtube.com/embed/vouvf8RMaWo?si=MigZ4WFVuxZjrrcX",
    materials: "https://hocmai.vn/kho-tai-lieu/documents/1590396216/page-1.png",
    grammar: {
      title: "Grammar Focus: Cấu trúc câu cơ bản",
      content:
        "Trong tiếng Anh, một câu đơn giản thường có cấu trúc chủ ngữ (Subject) + động từ (Verb) + tân ngữ (Object). Ví dụ: 'I (S) study (V) English (O)'.",
      quiz: [
        {
          question: "Đâu là cấu trúc câu cơ bản trong tiếng Anh?",
          options: [
            "Verb + Subject + Object",
            "Object + Subject + Verb",
            "Subject + Verb + Object",
            "Subject + Object + Verb",
          ],
          answer: "Subject + Verb + Object",
          userAnswer: null,
        },
        {
          question:
            "Trong câu 'They play soccer every weekend', đâu là chủ ngữ (Subject)?",
          options: ["play", "They", "soccer", "weekend"],
          answer: "They",
          userAnswer: null,
        },
        {
          question: "Trong câu 'She reads books', từ nào là động từ (Verb)?",
          options: ["She", "reads", "books", "She reads"],
          answer: "reads",
          userAnswer: null,
        },
        {
          question: "Câu nào sau đây có cấu trúc đúng?",
          options: [
            "Football play I",
            "Play I football",
            "I play football",
            "Football I play",
          ],
          answer: "I play football",
          userAnswer: null,
        },
      ],
    },
  },
  {
    id: 2,
    videoUrl: "https://www.youtube.com/embed/uTezoyEM_sE?si=1X9AHo2yDkZs6VJE",
    materials: "https://hocmai.vn/kho-tai-lieu/documents/1590396216/page-1.png",
    grammar: {
      title: "Grammar Focus: Tính từ mô tả",
      content:
        "Tính từ mô tả được sử dụng để diễn tả đặc điểm của người, vật. Trong tiếng Anh, tính từ thường đứng trước danh từ. Ví dụ: 'a tall man', 'beautiful flowers'.",
      quiz: [
        {
          question: "Vị trí của tính từ thường là ở đâu trong tiếng Anh?",
          options: ["Sau danh từ", "Trước danh từ", "Cuối câu", "Đầu câu"],
          answer: "Trước danh từ",
          userAnswer: null,
        },
        {
          question: "Trong cụm từ 'big blue house', từ nào là tính từ mô tả?",
          options: ["house", "big", "blue", "Cả big và blue"],
          answer: "Cả big và blue",
          userAnswer: null,
        },
        {
          question: "Câu nào sau đây sử dụng tính từ đúng cách?",
          options: [
            "She is a woman beautiful",
            "Car the is red",
            "The red car is new",
            "House big the",
          ],
          answer: "The red car is new",
          userAnswer: null,
        },
        {
          question: "Cụm từ nào sử dụng tính từ không đúng vị trí?",
          options: [
            "a cold day",
            "flowers beautiful",
            "delicious food",
            "heavy rain",
          ],
          answer: "flowers beautiful",
          userAnswer: null,
        },
      ],
    },
  },
  {
    id: 3,
    videoUrl: "https://www.youtube.com/embed/uTezoyEM_sE?si=1X9AHo2yDkZs6VJE",
    materials: "https://hocmai.vn/kho-tai-lieu/documents/1590396216/page-1.png",
    grammar: {
      title: "Grammar Focus: Các loại từ trong tiếng Anh",
      content:
        "Tiếng Anh có 8 loại từ chính: danh từ (nouns), động từ (verbs), tính từ (adjectives), trạng từ (adverbs), đại từ (pronouns), giới từ (prepositions), liên từ (conjunctions), và thán từ (interjections).",
      quiz: [
        {
          question: "Tiếng Anh có bao nhiêu loại từ chính?",
          options: ["6 loại", "7 loại", "8 loại", "9 loại"],
          answer: "8 loại",
          userAnswer: null,
        },
        {
          question:
            "Trong câu 'She quickly ran to the store', từ 'quickly' thuộc loại từ nào?",
          options: [
            "Danh từ (noun)",
            "Động từ (verb)",
            "Tính từ (adjective)",
            "Trạng từ (adverb)",
          ],
          answer: "Trạng từ (adverb)",
          userAnswer: null,
        },
        {
          question:
            "Từ nào trong câu 'The cat jumped over the fence' là giới từ?",
          options: ["cat", "jumped", "over", "fence"],
          answer: "over",
          userAnswer: null,
        },
        {
          question: "Loại từ nào biểu thị cảm xúc đột ngột?",
          options: [
            "Danh từ (noun)",
            "Đại từ (pronoun)",
            "Liên từ (conjunction)",
            "Thán từ (interjection)",
          ],
          answer: "Thán từ (interjection)",
          userAnswer: null,
        },
      ],
    },
  },
];

const LessonDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("video");
  const { id, title, sections, description, submitted } = location.state || {};
  const [localSubmitted, setLocalSubmitted] = useState(submitted || false);
  const [lesson, setLesson] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});

  // Khởi tạo dữ liệu bài học và trạng thái của đáp án
  useEffect(() => {
    if (id) {
      const foundLesson = data.find((item) => item.id === id);
      if (foundLesson) {
        // Tạo bản sao sâu của bài học để không ảnh hưởng đến dữ liệu gốc
        const lessonCopy = JSON.parse(JSON.stringify(foundLesson));

        // Nếu đã submitted, khôi phục userAnswer từ data
        // Nếu chưa submitted, đặt tất cả userAnswer về null
        if (!localSubmitted) {
          lessonCopy.grammar.quiz.forEach((q) => (q.userAnswer = null));
        }

        setLesson(lessonCopy);

        // Khởi tạo userAnswers từ đáp án người dùng trong data
        const initialAnswers = {};
        lessonCopy.grammar.quiz.forEach((q, index) => {
          if (q.userAnswer !== null) {
            initialAnswers[index] = q.userAnswer;
          }
        });
        setUserAnswers(initialAnswers);
      }
    }
  }, [id, localSubmitted]);

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  const handleAnswerSelect = (questionIndex, option) => {
    if (localSubmitted) return; // Nếu đã nộp bài thì không cho chọn nữa

    setUserAnswers({
      ...userAnswers,
      [questionIndex]: option,
    });

    // Cập nhật giá trị userAnswer trong lesson
    const updatedQuiz = [...lesson.grammar.quiz];
    updatedQuiz[questionIndex] = {
      ...updatedQuiz[questionIndex],
      userAnswer: option,
    };

    setLesson({
      ...lesson,
      grammar: {
        ...lesson.grammar,
        quiz: updatedQuiz,
      },
    });
  };

  const handleSubmitQuiz = () => {
    setLocalSubmitted(true);
  };

  const handleRetakeQuiz = () => {
    // Reset lại trạng thái
    setLocalSubmitted(false);

    // Reset các đáp án người dùng
    const resetQuiz = lesson.grammar.quiz.map((q) => ({
      ...q,
      userAnswer: null,
    }));

    setLesson({
      ...lesson,
      grammar: {
        ...lesson.grammar,
        quiz: resetQuiz,
      },
    });

    setUserAnswers({});
  };

  const calculateScore = () => {
    if (!lesson.grammar.quiz) return 0;

    let correct = 0;
    lesson.grammar.quiz.forEach((question, index) => {
      if (question.userAnswer === question.answer) {
        correct++;
      }
    });

    return correct;
  };

  const isOptionCorrect = (question, option) => {
    return option === question.answer;
  };

  const getOptionClassName = (question, option) => {
    if (!localSubmitted) {
      return question.userAnswer === option
        ? "bg-blue-50 border border-blue-300"
        : "bg-gray-50 border border-gray-200";
    }

    // Khi đã nộp bài
    if (option === question.answer) {
      // Đáp án đúng
      return "bg-green-100 border border-green-300";
    } else if (option === question.userAnswer) {
      // Đáp án người dùng chọn và sai
      return "bg-red-100 border border-red-300";
    } else {
      // Các lựa chọn khác
      return "bg-gray-50 border border-gray-200";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <div className="flex items-center mb-6">
        <button
          className="flex items-center text-gray-600 hover:text-blue-600 mr-4"
          onClick={() => navigate("/Lesson")}
        >
          <ChevronLeft size={20} />
          <span>Quay lại danh sách</span>
        </button>
        <h1 className="text-xl font-bold text-gray-800">
          Bài {lesson.id}: {title}
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
                src={lesson.videoUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <h2 className="text-lg font-medium mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
        )}
        {activeTab === "materials" && (
          <div>
            <h2 className="text-lg font-medium mb-4">Tài liệu học tập</h2>
            <img src={lesson.materials} alt="Tài liệu học tập" />
          </div>
        )}
        {activeTab === "grammar" && (
          <div>
            <h2 className="text-lg font-medium mb-4">{lesson.grammar.title}</h2>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <p className="text-gray-700">{lesson.grammar.content}</p>
            </div>

            {/* Phần trắc nghiệm */}
            {lesson.grammar.quiz && (
              <div className="mt-6">
                <h3 className="text-md font-medium mb-2">
                  Bài trắc nghiệm ngữ pháp
                </h3>
                <div className="p-4 border border-gray-200 rounded-lg">
                  {/* Kết quả khi đã nộp bài */}
                  {localSubmitted && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-700">
                        Kết quả: {calculateScore()}/{lesson.grammar.quiz.length}{" "}
                        câu đúng
                      </p>
                    </div>
                  )}

                  {/* Danh sách câu hỏi */}
                  <div>
                    {lesson.grammar.quiz.map((quizItem, qIndex) => (
                      <div key={qIndex} className="mb-6 border-b pb-4">
                        <p className="mb-3 font-medium">
                          {qIndex + 1}. {quizItem.question}
                        </p>
                        <div className="ml-4 space-y-2">
                          {quizItem.options.map((option, oIndex) => (
                            <div
                              key={oIndex}
                              className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${getOptionClassName(
                                quizItem,
                                option
                              )}`}
                              onClick={() => handleAnswerSelect(qIndex, option)}
                            >
                              <label className="flex items-center cursor-pointer">
                                <input
                                  type="radio"
                                  name={`question-${qIndex}`}
                                  checked={quizItem.userAnswer === option}
                                  onChange={() => {}}
                                  disabled={localSubmitted}
                                  className="mr-2"
                                />
                                <span>{option}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                        {/* Hiển thị đáp án đúng nếu người dùng chọn sai và đã nộp bài */}
                        {localSubmitted &&
                          quizItem.userAnswer !== null &&
                          quizItem.userAnswer !== quizItem.answer && (
                            <p className="text-red-600 mt-2 ml-4">
                              Đáp án đúng là: {quizItem.answer}
                            </p>
                          )}
                      </div>
                    ))}
                  </div>

                  {/* Nút hành động */}
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
