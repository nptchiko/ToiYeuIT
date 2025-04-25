import React from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CheckInputReadingApi from "../../api/CheckInputReadingApi";
import { useNavigate } from "react-router-dom";
const checkInputReading = () => {
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [showResults, setShowResults] = useState(false);
  const [isAnswersSaved, setIsAnswersSaved] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [activePart, setActivePart] = useState(5);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [data, setData] = useState([]);
  const contestApi = () => {
    const context = [
      { part: 5, answers: [] },
      { part: 6, answers: [] },
      { part: 7, answers: [] },
    ];

    questions.forEach((partData) => {
      if (partData.part === 5) {
        partData.questions.forEach((q) => {
          context[0].answers.push({
            id: q.id,
            answer: q.userAnswer || "",
          });
        });
      } else if (partData.part === 6) {
        partData.questions.forEach((section) => {
          section.questions.forEach((q) => {
            context[1].answers.push({
              id: q.id,
              answer: q.userAnswer || "",
            });
          });
        });
      } else if (partData.part === 7) {
        partData.questions.forEach((section) => {
          section.questions.forEach((q) => {
            context[2].answers.push({
              id: q.id,
              answer: q.userAnswer || "",
            });
          });
        });
      }
    });

    return context;
  };

  const handleReturnAnswer = async () => {
    try {
      const context = contestApi();
      await CheckInputReadingApi.submitTesAnswers(data.testId, score, context);
      console.log("Nộp bài thành công:", response);
      return response;
    } catch (error) {
      console.error("Lỗi khi nộp bài:", error.message);
      throw error;
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await CheckInputReadingApi.getCheckInputReading();
        setData(res.body);
        setQuestions(res.body.context);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đề thi");
        setQuestions([
          {
            questions: [
              {
                id: 101,
                text: "Relative housing values have dropped more than 10 percent from ____ peak in the first half of the year.",
                correctAnswer: "(B) their",
                options: ["(A) they", "(B) their", "(C) them", "(D) theirs"],
              },
              {
                id: 102,
                text: "All employees must submit their expense reports ____ the end of the month.",
                correctAnswer: "(C) by",
                options: ["(A) in", "(B) on", "(C) by", "(D) at"],
              },
              {
                id: 103,
                text: "The company plans to ____ a new product line next quarter.",
                correctAnswer: "(A) launch",
                options: [
                  "(A) launch",
                  "(B) cancel",
                  "(C) delay",
                  "(D) reduce",
                ],
              },
            ],
            part: 5,
          },
          {
            part: 6,
            questions: [
              {
                paragraph:
                  "NOTICE TO EMPLOYEES\nThe IT department maintains the proper working order of all on-site computers. Please report any issues promptly.\nWe will (131) ____ contact you to set up a time for a visit from one of our technicians.\nThank you for your cooperation.",
                questions: [
                  {
                    id: 185,
                    text: "Question 131.",
                    correctAnswer: "(D) is functioning",
                    options: [
                      "(A) functionally",
                      "(B) functional",
                      "(C) to function",
                      "(D) is functioning",
                    ],
                  },
                  {
                    id: 186,
                    text: "Question 132.",
                    correctAnswer: "(A) problem",
                    options: [
                      "(A) problem",
                      "(B) charge",
                      "(C) meeting",
                      "(D) decision",
                    ],
                  },
                  {
                    id: 187,
                    text: "Question 133.",
                    correctAnswer:
                      "(B) Also tell us what you were doing immediately prior to it.",
                    options: [
                      "(A) Turning your computer off and back on won’t address the issue.",
                      "(B) Also tell us what you were doing immediately prior to it.",
                      "(C) Moreover, improper connections could be responsible for the error.",
                      "(D) We will try to answer any questions you have about your device.",
                    ],
                  },
                  {
                    id: 188,
                    text: "Question 134.",
                    correctAnswer: "(D) promptly",
                    options: [
                      "(A) casually",
                      "(B) collectively",
                      "(C) frequently",
                      "(D) promptly",
                    ],
                  },
                ],
              },
            ],
          },
          {
            part: 7,
            questions: [
              {
                paragraph:
                  "Thank you for purchasing the TechRight 1400 Scanner. In this publication, you will find everything you need to know to start scanning documents and images into a computer running any common operating system. You can learn about the various parts of your scanner, its advanced features, and review our start-up guide. For more detailed instructions on how to use your TechRight scanner, visit us at www.techright.com.",
                questions: [
                  {
                    id: 189,
                    text: "Where would this information most likely be found?",
                    correctAnswer: "(A) In a user manual",
                    options: [
                      "(A) In a user manual",
                      "(B) On a receipt",
                      "(C) On a product’s packaging",
                      "(D) In an advertisement",
                    ],
                  },
                  {
                    id: 190,
                    text: "According to the information, what is provided on the Web site?",
                    correctAnswer: "(C) Operating instructions",
                    options: [
                      "(A) Antivirus software",
                      "(B) A copy of a publication",
                      "(C) Operating instructions",
                      "(D) Detailed images",
                    ],
                  },
                ],
              },
              {
                paragraph:
                  "Thank you for purchasing the TechRight 1400 Scanner. To ensure optimal performance, please install the latest software update from our website. This update includes enhanced scanning features and improved compatibility with new operating systems. Visit www.techright.com for the update and additional support resources.",
                questions: [
                  {
                    id: 191,
                    text: "What is the purpose of the software update?",
                    correctAnswer: "(B) Enhance scanning features",
                    options: [
                      "(A) Fix hardware issues",
                      "(B) Enhance scanning features",
                      "(C) Reduce power consumption",
                      "(D) Increase warranty period",
                    ],
                  },
                  {
                    id: 192,
                    text: "Where can users find the software update?",
                    correctAnswer: "(C) www.techright.com",
                    options: [
                      "(A) In the user manual",
                      "(B) On the product packaging",
                      "(C) www.techright.com",
                      "(D) At a retail store",
                    ],
                  },
                ],
              },
            ],
          },
        ]);
      }
    }
    fetchData();
  }, []);
  // Flatten questions for easier processing
  const getFlattenedQuestions = () => {
    const flattened = [];
    let questionIndex = 1; // Sequential question numbering
    questions.forEach((partData) => {
      if (partData.part === 5) {
        partData.questions.forEach((q) => {
          flattened.push({ ...q, part: 5, que: questionIndex++ });
        });
      } else if (partData.part === 6 || partData.part === 7) {
        partData.questions.forEach((section) => {
          section.questions.forEach((q) => {
            flattened.push({
              ...q,
              part: partData.part,
              paragraph: section.paragraph,
              que: questionIndex++,
            });
          });
        });
      }
    });
    return flattened;
  };

  const flattenedQuestions = getFlattenedQuestions();
  // Timer for the test
  useEffect(() => {
    if (showResults) return;
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showResults]);

  // Format time (HH:MM:SS)
  const formatTimeLeft = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };
  // Calculate score and show results
  const submitTest = () => {
    const correctAnswers = flattenedQuestions.filter(
      (question) => question.userAnswer === question.correctAnswer
    ).length;
    const totalQuestions = flattenedQuestions.length;
    const scorePercentage = (correctAnswers / totalQuestions) * 100;
    setScore(scorePercentage);
    setShowResults(true);
    setShowSubmitDialog(false);
    handleReturnAnswer();
  };

  // Reset test
  const resetTest = () => {
    const resetQuestions = questions.map((partData) => {
      if (partData.part === 5) {
        return {
          ...partData,
          questions: partData.questions.map((q) => ({
            ...q,
            userAnswer: undefined,
          })),
        };
      } else {
        return {
          ...partData,
          questions: partData.questions.map((section) => ({
            ...section,
            questions: section.questions.map((q) => ({
              ...q,
              userAnswer: undefined,
            })),
          })),
        };
      }
    });
    setQuestions(resetQuestions);
    setTimeLeft(60 * 60);
    setShowResults(false);
    setIsAnswersSaved(false);
    setActivePart(5);
  };

  const completeTest = () => {};

  // Count answered questions per part
  const getAnsweredCount = (part) => {
    return flattenedQuestions.filter(
      (question) => question.part === part && question.userAnswer
    ).length;
  };

  // Get total questions per part
  const getTotalCount = (part) => {
    return flattenedQuestions.filter((question) => question.part === part)
      .length;
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId, answer) => {
    const updatedQuestions = questions.map((partData) => {
      if (partData.part === 5) {
        return {
          ...partData,
          questions: partData.questions.map((q) =>
            q.id === questionId ? { ...q, userAnswer: answer } : q
          ),
        };
      } else {
        return {
          ...partData,
          questions: partData.questions.map((section) => ({
            ...section,
            questions: section.questions.map((q) =>
              q.id === questionId ? { ...q, userAnswer: answer } : q
            ),
          })),
        };
      }
    });
    setQuestions(updatedQuestions);
  };

  // Group questions by paragraph for Parts 6 and 7
  const groupQuestionsBySection = (questions) => {
    const grouped = {};
    questions.forEach((q) => {
      if (q.paragraph) {
        const paragraphKey = q.paragraph; // Use paragraph text as key
        if (!grouped[paragraphKey]) {
          grouped[paragraphKey] = { paragraph: q.paragraph, questions: [] };
        }
        grouped[paragraphKey].questions.push(q);
      } else {
        grouped["part5"] = grouped["part5"] || { questions: [] };
        grouped["part5"].questions.push(q);
      }
    });
    return grouped;
  };

  const currentPartQuestions = flattenedQuestions.filter(
    (question) => question.part === activePart
  );
  const groupedQuestions = groupQuestionsBySection(currentPartQuestions);
  const questionsByPart = [5, 6, 7].map((part) => ({
    part: part,
    questions: flattenedQuestions.filter((question) => question.part === part),
  }));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
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
        <div className="flex items-center gap-2">
          {!showResults && (
            <div className="flex items-center bg-red-500 py-1 rounded-md font-semibold text-white px-3">
              {formatTimeLeft(timeLeft)}
            </div>
          )}
          <h1 className="text-lg font-bold">
            {data.title ? data.title : "toeic 7000+"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {!showResults ? (
            <>
              <Button
                variant="outline"
                className={`${
                  isAnswersSaved
                    ? "text-green-600 bg-green-50 border-green-100"
                    : "bg-blue-50 text-blue-600 border-blue-100"
                }`}
                onClick={() => setIsAnswersSaved(true)}
              >
                {isAnswersSaved ? "Đã lưu" : "Lưu nháp"}
              </Button>
              <Button
                onClick={() => setShowSubmitDialog(true)}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Nộp bài
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="bg-blue-50 text-blue-600 border-blue-100"
                onClick={resetTest}
              >
                Làm lại
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={completeTest}
              >
                Hoàn thành
              </Button>
            </>
          )}
          <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Xác nhận nộp bài</DialogTitle>
                <DialogDescription>
                  Bạn còn {formatTimeLeft(timeLeft)} để hoàn thành bài thi.
                  <br />
                  Bạn có chắc chắn muốn nộp bài không?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowSubmitDialog(false)}
                >
                  Tiếp tục làm bài
                </Button>
                <Button onClick={submitTest}>Nộp bài</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 p-4 max-w-5xl mx-auto max-h-[600px] overflow-y-auto hide-scrollbar w-full">
        {!showResults ? (
          <Card className="p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">PART {activePart}</h2>
            {Object.keys(groupedQuestions).map((sectionKey) => (
              <div key={sectionKey} className="mb-8">
                {/* Display paragraph for Parts 6 and 7 */}
                {groupedQuestions[sectionKey].paragraph && (
                  <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                    <p className="text-gray-800 whitespace-pre-line">
                      {groupedQuestions[sectionKey].paragraph}
                    </p>
                  </div>
                )}
                {groupedQuestions[sectionKey].questions.map((question) => (
                  <div key={question.id} className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                        <div>{question.que}</div>
                      </div>
                      <div className="font-medium">Question {question.que}</div>
                    </div>
                    <p className="text-gray-800 mb-4 whitespace-pre-line">
                      {question.text}
                    </p>
                    <RadioGroup
                      value={question.userAnswer || ""}
                      onValueChange={(value) =>
                        handleAnswerSelect(question.id, value)
                      }
                      className="space-y-3"
                    >
                      {question.options.map((option, index) => (
                        <div
                          onClick={() =>
                            handleAnswerSelect(question.id, option)
                          }
                          key={index}
                          className="flex cursor-pointer items-center space-x-2 border p-3 rounded-md hover:bg-gray-50"
                        >
                          <RadioGroupItem value={option} />
                          <Label className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
            ))}
          </Card>
        ) : (
          // Results
          <Card className="p-6 shadow-sm">
            <div className="text-center p-4 bg-gray-100 rounded-lg mb-4">
              <h3 className="text-xl font-bold mb-2">Kết quả bài thi</h3>
              <p className="text-3xl font-bold text-blue-600">
                {score.toFixed(2)} /100 điểm
              </p>
              <p className="mt-2">
                Số câu đúng:{" "}
                {
                  flattenedQuestions.filter(
                    (question) => question.userAnswer === question.correctAnswer
                  ).length
                }
                /{flattenedQuestions.length}
              </p>
            </div>
            <Tabs defaultValue="part5">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="part5">PART 5</TabsTrigger>
                <TabsTrigger value="part6">PART 6</TabsTrigger>
                <TabsTrigger value="part7">PART 7</TabsTrigger>
              </TabsList>
              {questionsByPart.map((part) => (
                <TabsContent
                  key={part.part}
                  value={`part${part.part}`}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold">PART {part.part}</h3>
                  {Object.values(groupQuestionsBySection(part.questions)).map(
                    (section, index) => (
                      <div key={index} className="mb-8">
                        {section.paragraph && (
                          <div className="mb-3 p-3 bg-gray-100 rounded-lg">
                            <p className="text-gray-800 whitespace-pre-line">
                              {section.paragraph}
                            </p>
                          </div>
                        )}
                        {section.questions.map((question) => (
                          <div
                            className="border rounded-lg p-4 mb-4"
                            key={question.id}
                          >
                            <div className="flex justify-between mb-2">
                              <span className="font-medium">
                                Câu {question.que}
                              </span>
                              {question.userAnswer ===
                              question.correctAnswer ? (
                                <span className="text-green-600 font-medium">
                                  Đúng
                                </span>
                              ) : (
                                <span className="text-red-600 font-medium">
                                  Sai
                                </span>
                              )}
                            </div>
                            <p className="mb-3 whitespace-pre-line">
                              {question.text}
                            </p>
                            {question.options.map((option, index) => (
                              <div
                                key={index}
                                className={`p-2 mb-2 rounded-md ${
                                  option === question.correctAnswer
                                    ? "bg-green-100 border-green-300 border"
                                    : option === question.userAnswer &&
                                      option !== question.correctAnswer
                                    ? "bg-red-100 border-red-300 border"
                                    : "bg-gray-50 border"
                                }`}
                              >
                                {option}
                                {option === question.correctAnswer && (
                                  <span className="ml-2 text-green-600 font-medium">
                                    (Đáp án đúng)
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        )}
      </main>
      {/* Navigation Footer */}
      {!showResults && (
        <footer className="border-t bg-white p-2">
          <div className="max-w-5xl mx-auto flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              disabled={activePart === 5}
              onClick={() => setActivePart(activePart - 1)}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div className="flex-1 flex items-center justify-between px-4">
              {[5, 6, 7].map((part) => (
                <div
                  key={part}
                  className={`border rounded-lg p-2 w-48 relative overflow-hidden cursor-pointer ${
                    activePart === part ? "bg-blue-50" : "bg-white"
                  }`}
                  onClick={() => setActivePart(part)}
                >
                  {activePart === part && (
                    <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-r from-transparent to-yellow-400 rounded-r-lg"></div>
                  )}
                  <div className="relative z-10">
                    <div className="font-medium">PART {part}</div>
                    <div className="text-sm text-gray-500">
                      {getAnsweredCount(part)} / {getTotalCount(part)} Questions
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              disabled={activePart === 7}
              onClick={() => setActivePart(activePart + 1)}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
};

export default checkInputReading;
