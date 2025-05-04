import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock, Check, BookOpenCheck } from "lucide-react";
import ListeningApi from "../../../api/ListeningApi";
const TestPracticeReading = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleTestClick = (test) => {
    navigate("/test-listening", {
      state: {
        id: test.id,
      },
    });
  };

  const handleHistoryClick = (test, e) => {
    e.stopPropagation();
    navigate("/test-history-listening", {
      state: {
        id: test.id,
      },
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await ListeningApi.getListeningAip();
        setData(res.body);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đề thi:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <BookOpen size={48} />
        <p className="mt-4 text-lg">Không có đề thi nào</p>
      </div>
    );
  }
  const completedTestsCount = data.reduce((count, item) => {
    return count + item.tests.filter((test) => test.submitted === 1).length;
  }, 0);
  if (completedTestsCount === 0) {
    return (
      <div className="flex items-center justify-center h-40 bg-gray-100 rounded-xl shadow-md">
        <p className="text-gray-500 text-lg font-medium">
          Chưa có thông tin bài tập nào được hoàn thành.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-full mx-auto p-1">
      {data.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white"
        >
          <div className="p-6 lg:flex justify-between items-center border-b relative">
            <div className="lg:flex gap-6 items-center">
              {/* Image */}
              <div className="w-full lg:w-48 mb-4 lg:mb-0 overflow-hidden rounded-xl">
                <img
                  className="w-full h-32 object-cover"
                  src="https://storage.googleapis.com/materials-elements/test-set/avatar/xcR2arp8IiLzwhqTcg82x1vRCpchlR2IaeXeSZbi.png"
                  alt={item.title}
                />
              </div>

              {/* Description */}
              <div className="flex-1 space-y-5">
                <div className="flex items-center gap-2 font-bold">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    TOEIC
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    Listening
                  </span>
                </div>

                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-gray-800">
                    {item.title}
                  </h1>
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full ml-3">
                    {item.tests.length} Đề
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="flex items-center mr-4 font-bold">
                    <BookOpenCheck size={16} className="mr-1" />
                    <span>
                      {item.tests.filter((test) => test.submitted === 1).length}{" "}
                      đã hoàn thành
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Test grid */}
          <div className="p-4 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {item.tests.map((test) => (
              <div
                key={test.id}
                onClick={() => handleTestClick(test)}
                className={`relative flex items-center gap-4 border p-4 rounded-xl cursor-pointer transition-all duration-300
                  ${
                    test.submitted === 1
                      ? "border-green-200 hover:border-green-300 hover:bg-green-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
              >
                <div
                  className={`h-12 w-12 flex justify-center items-center rounded-lg ${
                    test.submitted === 1 ? "bg-green-50" : "bg-gray-50"
                  }`}
                >
                  <img
                    src="https://api.prep.vn/images/skills/test_practice/listening.png"
                    alt="Reading icon"
                    className="w-8 h-8"
                  />
                </div>

                <div className="flex-1">
                  <p
                    className={`text-base font-medium ${
                      test.submitted === 1
                        ? "text-green-700 hover:text-green-800"
                        : "text-gray-700 hover:text-gray-800"
                    }`}
                  >
                    {test.title}
                  </p>
                  <span
                    className={`text-xs flex items-center mt-1 ${
                      test.submitted === 1 ? "text-green-600" : "text-gray-600"
                    }`}
                  >
                    <Check
                      size={12}
                      className={`mr-1 ${
                        test.submitted === 1 ? "visible" : "invisible"
                      }`}
                    />
                    {test.submitted === 1 ? "Đã hoàn thành" : "Chưa làm"}
                  </span>
                </div>
                {test.submitted === 1 && (
                  <button
                    onClick={(e) => handleHistoryClick(test, e)}
                    className="absolute top-3 right-3 p-1 hover:bg-green-100 rounded-full transition-colors"
                    title="Xem lịch sử"
                  >
                    <Clock size={18} className="text-green-600" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestPracticeReading;
