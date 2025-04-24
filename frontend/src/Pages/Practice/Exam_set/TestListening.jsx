import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Play,
  Pause,
  Rewind,
  FastForward,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";
import TestListeningApi from "../../../api/TestListeningApi";
const audioFiles = [
  {
    id: 1,
    name: "TOEIC Part 1",
    url: "https://storage.googleapis.com/estudyme/dev/2022/06/27/91254480.mp3",
  },
  {
    id: 2,
    name: "TOEIC Part 2",
    url: "https://storage.googleapis.com/estudyme/dev/2022/06/27/48822592.mp3",
  },
  {
    id: 3,
    name: "TOEIC Part 3",
    url: "https://storage.googleapis.com/estudyme/dev/2022/06/27/48822592.mp3",
  },
  {
    id: 4,
    name: "TOEIC Part 4",
    url: "https://storage.googleapis.com/estudyme/dev/2022/06/27/48822592.mp3",
  },
];

export default function TestListening() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState(50 * 60);
  const [activePart, setActivePart] = useState(1);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentAudioFile, setCurrentAudioFile] = useState(audioFiles[0]);
  const [exitScreen, setExitScreen] = useState(false);
  const [isAnswersSaved, setIsAnswersSaved] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [data, setData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const location = useLocation();
  const { id } = location.state;
  const audioRef = useRef(null);
  const { toast } = useToast();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await TestListeningApi.getTestListening(id);
        setData(res.body.context);
        setApiData(res.body);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đề thi index");
        setData([
          {
            part: 1,
            questions: [
              {
                id: "1",
                text: "Câu hỏi 1.",
                audioSource:
                  "https://storage.googleapis.com/estudyme/dev/2022/06/27/30449101.mp3",
                imageSource:
                  "https://estudyme.hoc102.com/legacy-data/kslearning/images/418922160-1620725865601-pic1.png",
                correctAnswer: "(D)",
                options: ["(D)", "(B)", "(A)", "(C)"],
              },
            ],
          },
          {
            part: 2,
            questions: [
              {
                id: "7",
                text: "Câu hỏi 7.",
                audioSource:
                  "https://storage.googleapis.com/estudyme/dev/2022/06/27/46972225.mp3",
                correctAnswer: "(B)",
                options: ["(A)", "(B)", "(C)"],
              },
            ],
          },
          {
            part: 3,
            questions: [
              {
                id: "32",
                text: "What does the woman want to find?",
                audioSource:
                  "https://storage.googleapis.com/estudyme/dev/2022/06/27/40438651.mp3",
                correctAnswer: "(B) A file",
                options: [
                  "(C) An office key",
                  "(A) Some money",
                  "(B) A file",
                  "(D) A check",
                ],
              },
              {
                id: "33",
                text: "Where most likely is Patrick?",
                audioSource:
                  "https://storage.googleapis.com/estudyme/dev/2022/06/27/40438651.mp3",
                correctAnswer: "(D) On a business trip",
                options: [
                  "(A) At his home",
                  "(D) On a business trip",
                  "(B) In his office",
                  "(C) At a restaurant",
                ],
              },
              {
                id: "34",
                text: "What will John most likely do next?",
                audioSource:
                  "https://storage.googleapis.com/estudyme/dev/2022/06/27/40438651.mp3",
                correctAnswer: "(A) Check his office",
                options: [
                  "(A) Check his office",
                  "(B) Bring Patrick",
                  "(C) Postpone a meeting",
                  "(D) Reply to a letter",
                ],
              },
            ],
          },
          {
            part: 4,
            questions: [
              {
                id: "71",
                text: "Who most likely is Ted Costello?",
                audioSource:
                  "https://storage.googleapis.com/estudyme/dev/2022/06/27/32759585.mp3",
                correctAnswer: "(C) A radio host",
                options: [
                  "(A) A newspaper reporter",
                  "(C) A radio host",
                  "(B) A computer scientist",
                  "(D) A research assistant",
                ],
              },
              {
                id: "72",
                text: "What does Dr. Alfson specialize in?",
                audioSource:
                  "https://storage.googleapis.com/estudyme/dev/2022/06/27/32759585.mp3",
                correctAnswer: "(D) The study of language",
                options: [
                  "(B) Market research",
                  "(A) Music education",
                  "(C) Mergers and acquisitions",
                  "(D) The study of language",
                ],
              },
              {
                id: "73",
                text: "What will happen on August 4?",
                audioSource:
                  "https://storage.googleapis.com/estudyme/dev/2022/06/27/32759585.mp3",
                correctAnswer: "(A) Dr. Alfson’s new book will be available.",
                options: [
                  "(C) The radio will broadcast an interview.",
                  "(D) The results of a study will be announced.",
                  "(B) A new research project will be launched.",
                  "(A) Dr. Alfson’s new book will be available.",
                ],
              },
            ],
          },
        ]);
      }
    }
    fetchData();
  }, []);
  const contestApi = () => {
    const context = [
      { part: 1, answers: [] },
      { part: 2, answers: [] },
      { part: 3, answers: [] },
      { part: 4, answers: [] },
    ];
    questions.forEach((partData) => {
      if (partData.part === 1) {
        context[0].answers.push({
          id: partData.id,
          answer: partData.userAnswer || "",
        });
      } else if (partData.part === 2) {
        context[1].answers.push({
          id: partData.id,
          answer: partData.userAnswer || "",
        });
      } else if (partData.part === 3) {
        context[2].answers.push({
          id: partData.id,
          answer: partData.userAnswer || "",
        });
      } else if (partData.part === 4) {
        context[3].answers.push({
          id: partData.id,
          answer: partData.userAnswer || "",
        });
      }
    });
    return context;
  };
  const handleReturnAnswer = async () => {
    try {
      const context = contestApi();
      await TestListeningApi.submitTesAnswers(apiData.testId, score, context);
      console.log("Nộp bài thành công:", response);
      return response;
    } catch (error) {
      console.error("Lỗi khi nộp bài:", error.message);
      console.log(error);
      throw error;
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    const flattenedQuestions = [];
    let i = 0;
    data.forEach((partData) => {
      partData.questions.forEach((question) => {
        i += 1;
        flattenedQuestions.push({
          ...question,
          part: partData.part,
          userAnswer: undefined,
          que: i,
        });
      });
    });
    setQuestions(flattenedQuestions);
  }, [data]);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("toeicAnswers");
    const savedTime = localStorage.getItem("toeicTimeLeft");

    if (savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) => {
            const savedQuestion = parsedAnswers.find((sq) => sq.id === q.id);
            return savedQuestion
              ? {
                  ...q,
                  userAnswer: savedQuestion.userAnswer,
                  que: savedQuestion.que,
                }
              : q;
          })
        );
        setIsAnswersSaved(true);
      } catch (error) {
        console.error("Lỗi khi phân tích câu trả lời đã lưu:", error);
      }
    }

    if (savedTime) {
      try {
        const parsedTime = JSON.parse(savedTime);
        setTimeLeft(parsedTime);
      } catch (error) {
        console.error("Lỗi khi phân tích thời gian đã lưu:", error);
      }
    }
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const formatTimerDisplay = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const newTime = Number.parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const rewind10 = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime - 10
      );
    }
  };

  const forward10 = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.duration,
        audioRef.current.currentTime + 10
      );
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.playbackRate = playbackRate;
    }
  }, [currentAudioFile, playbackRate]);

  const handleAnswerSelect = (questionId, answer) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, userAnswer: answer } : q
      )
    );

    toast({
      title: "Đã lưu câu trả lời",
      description:
        "Câu trả lời của bạn đã được lưu tạm thời. Nhấn 'Lưu nhập' để lưu lại.",
      duration: 2000,
    });
  };

  const saveProgress = () => {
    const answersToSave = questions.map((q) => ({
      id: q.id,
      part: q.part,
      que: q.que,
      userAnswer: q.userAnswer,
    }));
    localStorage.setItem("toeicAnswers", JSON.stringify(answersToSave));
    localStorage.setItem("toeicTimeLeft", JSON.stringify(timeLeft));
    setIsAnswersSaved(true);

    toast({
      title: "Đã lưu bài làm",
      description:
        "Bài làm của bạn đã được lưu thành công. Dữ liệu sẽ được giữ lại khi tải lại trang.",
      duration: 3000,
    });
  };
  const resetTest = () => {
    setQuestions(questions.map((q) => ({ ...q, userAnswer: undefined })));
    setShowResults(false);
    setActivePart(1);
    setTimeLeft(50 * 60);
    setIsAnswersSaved(false);

    localStorage.removeItem("toeicAnswers");
    localStorage.removeItem("toeicTimeLeft");

    toast({
      title: "Làm lại bài thi",
      description: "Bài thi đã được thiết lập lại.",
      duration: 3000,
    });
  };

  const completeTest = () => {
    setExitScreen(true);

    localStorage.removeItem("toeicAnswers");
    localStorage.removeItem("toeicTimeLeft");
  };
  const submitTest = () => {
    const correctAnswers = questions.filter(
      (q) => q.userAnswer === q.correctAnswer
    ).length;
    const totalQuestions = questions.length;
    const calculatedScore = Math.round((correctAnswers / totalQuestions) * 100);
    setScore(calculatedScore);
    setShowResults(true);
    setShowSubmitDialog(false);
    setActivePart(1);
    setCurrentAudioFile(audioFiles[0]);
    handleReturnAnswer();
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      setIsPlaying(false);
    }

    localStorage.removeItem("toeicAnswers");
    localStorage.removeItem("toeicTimeLeft");
  };

  useEffect(() => {
    if (showResults) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          submitTest();
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResults]);

  useEffect(() => {
    if (!isAnswersSaved || showResults) return;

    const saveTimer = setInterval(() => {
      localStorage.setItem("toeicTimeLeft", JSON.stringify(timeLeft));
    }, 30000);

    return () => clearInterval(saveTimer);
  }, [timeLeft, isAnswersSaved, showResults]);

  const currentPartQuestions = questions.filter((q) => q.part === activePart);

  const getAnsweredCount = (part) => {
    return questions.filter((q) => q.part === part && q.userAnswer).length;
  };

  const getTotalCount = (part) => {
    return questions.filter((q) => q.part === part).length;
  };

  const questionsByPart = [1, 2, 3, 4].map((part) => ({
    part,
    questions: questions.filter((q) => q.part === part),
  }));

  if (exitScreen) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <Card className="max-w-lg w-full p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Bài thi đã hoàn thành</h1>
          <p className="text-gray-600 mb-6">
            Cảm ơn bạn đã hoàn thành bài thi TOEIC.
          </p>
          <p className="text-3xl font-bold text-blue-600 mb-8">
            {score}/100 điểm
          </p>
          <Button
            className="w-full"
            onClick={() => {
              setExitScreen(false);
              resetTest();
            }}
          >
            Quay lại trang chủ
          </Button>
        </Card>
      </div>
    );
  }

  const handleResultsPartChange = (part) => {
    const newAudioFile =
      audioFiles.find((file) => file.id === part) || audioFiles[0];
    setCurrentAudioFile(newAudioFile);

    setCurrentTime(0);
    setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  };

  const setPartAndAudio = (part) => {
    setActivePart(part);

    const newAudioFile =
      audioFiles.find((file) => file.id === part) || audioFiles[0];
    setCurrentAudioFile(newAudioFile);

    setCurrentTime(0);
    setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  };
  const handleAudioEnded = () => {
    if (audioRef.current) {
      if (audioRef.current.currentTime === audioRef.current.duration) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }
  };

  const formatOptionDisplay = (option) => {
    if (typeof option === "object" && option.key && option.description) {
      return option.description;
    }
    return option;
  };

  const getOptionValue = (option) => {
    if (typeof option === "object" && option.key && option.description) {
      return option.description;
    }
    return option;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
        src={currentAudioFile.url}
      />

      <header className="flex items-center justify-between px-4 py-2 border-b bg-white">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate("/luyen-de/listening")}
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
            <div className="flex items-center bg-red-500 text-white px-3 py-1 rounded-md">
              <span className="font-semibold">
                {formatTimerDisplay(timeLeft)}
              </span>
            </div>
          )}
          <h1 className="text-lg font-bold">{apiData.title}</h1>
        </div>

        <div className="flex items-center gap-2">
          {!showResults ? (
            <>
              <Button
                variant="outline"
                className={`${
                  isAnswersSaved
                    ? "bg-green-50 text-green-600 border-green-100"
                    : "bg-blue-50 text-blue-600 border-blue-100"
                }`}
                onClick={saveProgress}
              >
                {isAnswersSaved ? "Đã lưu" : "Lưu nhập"}
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setShowSubmitDialog(true)}
              >
                Gửi bài
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
        </div>
      </header>

      <div className="flex items-center justify-between px-4 py-2 border-b bg-white">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={rewind10}
            className="rounded-full"
          >
            <Rewind className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            className="rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={forward10}
            className="rounded-full"
          >
            <FastForward className="h-5 w-5" />
          </Button>
          <span className="text-sm text-gray-600 ml-2">
            {currentAudioFile.name}
          </span>
        </div>

        <div className="flex-1 mx-4">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <span>
            {formatTime(Math.floor(currentTime))}/
            {formatTime(Math.floor(duration) || 0)}
          </span>
        </div>
      </div>

      <main className="flex-1 p-4 max-w-5xl mx-auto max-h-[550px] overflow-y-auto hide-scrollbar w-full">
        {!showResults ? (
          <Card className="p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">PART {activePart}</h2>

            {currentPartQuestions.map((question) => (
              <div key={question.id} className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-blue-500 text-white rounded-full w-20 h-7 flex items-center justify-center text-sm">
                    Câu {question.que}
                  </div>
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

                <p className="text-gray-800 mb-4">{question.text}</p>

                <RadioGroup
                  value={question.userAnswer || ""}
                  onValueChange={(value) =>
                    handleAnswerSelect(question.id, value)
                  }
                  className="space-y-3"
                >
                  {question.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50"
                    >
                      <RadioGroupItem
                        value={getOptionValue(option)}
                        id={`q${question.id}-option${index}`}
                      />
                      <Label
                        htmlFor={`q${question.id}-option${index}`}
                        className="flex-1 cursor-pointer"
                      >
                        {formatOptionDisplay(option)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </Card>
        ) : (
          <Card className="p-6 shadow-sm">
            <div className="text-center p-4 bg-gray-100 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-2">Kết quả bài thi</h3>
              <p className="text-3xl font-bold text-blue-600">
                {score}/100 điểm
              </p>
              <p className="mt-2">
                Số câu đúng:{" "}
                {
                  questions.filter((q) => q.userAnswer === q.correctAnswer)
                    .length
                }
                /{questions.length}
              </p>
            </div>

            <Tabs
              defaultValue="part1"
              onValueChange={(value) => {
                const part = Number.parseInt(value.replace("part", ""));
                handleResultsPartChange(part);
              }}
            >
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="part1">PHẦN 1</TabsTrigger>
                <TabsTrigger value="part2">PHẦN 2</TabsTrigger>
                <TabsTrigger value="part3">PHẦN 3</TabsTrigger>
                <TabsTrigger value="part4">PHẦN 4</TabsTrigger>
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
                          <span className="text-green-600 font-medium">
                            Đúng
                          </span>
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
                        const optionValue = getOptionValue(option);
                        const isCorrect =
                          optionValue === question.correctAnswer;
                        const isSelected = optionValue === question.userAnswer;

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
                            {formatOptionDisplay(option)}
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
        )}
      </main>

      {!showResults && (
        <footer className="border-t bg-white p-2">
          <div className="max-w-5xl mx-auto flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setPartAndAudio(Math.max(1, activePart - 1))}
              disabled={activePart === 1}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="flex-1 flex items-center justify-between px-4">
              {[1, 2, 3, 4].map((part) => (
                <div
                  key={part}
                  className={`border rounded-lg p-2 w-48 relative overflow-hidden cursor-pointer ${
                    activePart === part ? "bg-blue-50" : "bg-white"
                  }`}
                  onClick={() => setPartAndAudio(part)}
                >
                  {activePart === part && (
                    <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-r from-transparent to-yellow-400 rounded-r-lg"></div>
                  )}
                  <div className="relative z-10">
                    <div className="font-medium">PHẦN {part}</div>
                    <div className="text-sm text-gray-500">
                      {getAnsweredCount(part)}/{getTotalCount(part)} Câu hỏi
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setPartAndAudio(Math.min(4, activePart + 1))}
              disabled={activePart === 4}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </footer>
      )}

      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận nộp bài</DialogTitle>
            <DialogDescription>
              Bạn còn {formatTimerDisplay(timeLeft)} để hoàn thành bài thi.
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
  );
}
