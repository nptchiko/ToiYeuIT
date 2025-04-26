import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import HistoryListeningApi from "../../../api/HistoryListeningApi";
import TestListeningApi from "../../../api/TestListeningApi";

export default function HistoryInputListening() {
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [testData, setTestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const [dataApi, setDataAip] = useState("");

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [testRes, historyRes] = await Promise.all([
          TestListeningApi.getTestListening(id),
          HistoryListeningApi.getHistoryListening(id),
        ]);
        setDataAip(testRes.body.title);
        setTestData(testRes.body.context);
        setUserAnswers(historyRes.body.context);
      } catch (error) {
        setError("Không thể tải dữ liệu bài thi.");
        console.error("Lỗi khi lấy dữ liệu", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    const flattenedQuestions = [];
    let questionNumber = 0;

    testData.forEach((partData) => {
      partData.questions.forEach((question) => {
        questionNumber += 1;
        const userAnswerObj = userAnswers
          .find((part) => part.part === partData.part)
          ?.answers.find((ans) => ans.id === question.id);
        flattenedQuestions.push({
          ...question,
          part: partData.part,
          userAnswer: userAnswerObj?.answer || "",
          que: questionNumber,
        });
      });
    });

    setQuestions(flattenedQuestions);

    const correctAnswers = flattenedQuestions.filter(
      (q) => q.userAnswer === q.correctAnswer
    ).length;
    const totalQuestions = flattenedQuestions.length;
    const calculatedScore = totalQuestions
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;
    setScore(calculatedScore);
  }, [testData, userAnswers]);

  const questionsByPart = testData.map((partData) => ({
    part: partData.part,
    questions: questions.filter((q) => q.part === partData.part),
  }));

  if (isLoading) {
    return <div className="text-center p-4">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-4 py-2 border-b bg-white">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate("/kiem-tra")}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <div className="bg-blue-700 text-white p-1 rounded">
              <span className="font-bold text-xl">ET</span>
            </div>
            <span className="font-bold text-blue-700 text-xl ml-1">ENGHUB</span>
          </div>
        </div>
        <h1 className="text-lg font-bold">{dataApi}</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="bg-blue-50 text-blue-600 border-blue-100"
            onClick={() => navigate("/kiem-tra")}
          >
            Quay lại
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 max-w-5xl mx-auto overflow-y-auto hide-scrollbar w-full">
        <Card className="p-6 shadow-sm">
          <div className="text-center p-4 bg-gray-100 rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-2">Kết quả bài thi</h3>
            <p className="text-3xl font-bold text-blue-600">{score}/100 điểm</p>
            <p className="mt-2">
              Số câu đúng:{" "}
              {questions.filter((q) => q.userAnswer === q.correctAnswer).length}
              /{questions.length}
            </p>
          </div>

          <Tabs defaultValue="part1">
            <TabsList className="grid grid-cols-4 mb-4">
              {questionsByPart.map((part) => (
                <TabsTrigger key={part.part} value={`part${part.part}`}>
                  Part {part.part}
                </TabsTrigger>
              ))}
            </TabsList>
            {questionsByPart.map((part) => (
              <TabsContent
                key={part.part}
                value={`part${part.part}`}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold">PHẦN {part.part}</h3>
                {part.questions.map((question) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Câu {question.que}</span>
                      {question.userAnswer === question.correctAnswer ? (
                        <span className="text-green-600 font-medium">Đúng</span>
                      ) : (
                        <span className="text-red-600 font-medium">Sai</span>
                      )}
                    </div>
                    {question.imageSource && (
                      <div className="border rounded-lg overflow-hidden mb-4">
                        <img
                          src={question.imageSource}
                          alt={`Hình ảnh câu hỏi ${question.que}`}
                          className="w-full object-cover"
                        />
                      </div>
                    )}
                    <p className="mb-3">{question.text}</p>
                    {question.options.map((option, index) => {
                      const isCorrect = option === question.correctAnswer;
                      const isSelected = option === question.userAnswer;
                      return (
                        <div
                          key={index}
                          className={`p-2 mb-2 rounded-md ${
                            isCorrect
                              ? "bg-green-100 border-green-300 border"
                              : isSelected && !isCorrect
                              ? "bg-red-100 border-red-300 border"
                              : "bg-gray-50 border"
                          }`}
                        >
                          {option}
                          {isCorrect && (
                            <span className="ml-2 text-green-600 font-medium">
                              (Đáp án đúng)
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </main>
    </div>
  );
}
