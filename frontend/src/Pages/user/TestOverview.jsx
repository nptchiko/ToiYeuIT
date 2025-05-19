import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Check } from "lucide-react";
import ListeningApi from "../../api/ListeningApi";
import ReadingApi from "../../api/ReadingApi";

const TestOverview = () => {
  const [dataReading, setDataReading] = useState([]);
  const [dataListening, setDataListening] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTestClickListening = (test) => {
    navigate("/test-listening", { state: { id: test.id } });
  };

  const handleHistoryClickListening = (test, e) => {
    e.stopPropagation();
    navigate("/test-history-listening", { state: { id: test.id } });
  };

  const handleTestClickReading = (test) => {
    navigate("/test-reading", { state: { id: test.id } });
  };

  const handleHistoryClickReading = (test, e) => {
    e.stopPropagation();
    navigate("/test-history-reading", { state: { id: test.id } });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await ListeningApi.getListeningAip();
        const rest = await ReadingApi.getReadingAip();
        setDataListening(
          res.body.flatMap((item) =>
            item.tests.filter((test) => test.submitted === 1)
          )
        );
        setDataReading(
          rest.body.flatMap((item) =>
            item.tests.filter((test) => test.submitted === 1)
          )
        );
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

  if (dataListening.length === 0 && dataReading.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 bg-gray-100 rounded-xl shadow-md">
        <p className="text-gray-500 text-lg font-medium">
          Chưa có thông tin bài tập nào được hoàn thành.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
      {/* Listening */}
      {dataListening.map((test) => (
        <div
          key={test.id}
          onClick={() => handleTestClickListening(test)}
          className="relative flex items-center gap-4 border p-4 rounded-xl cursor-pointer transition-all duration-300 border-green-200 hover:border-green-300 hover:bg-green-50"
        >
          <div className="h-12 w-12 flex justify-center items-center rounded-lg bg-green-50">
            <img
              src="https://api.prep.vn/images/skills/test_practice/listening.png"
              alt="Listening icon"
              className="w-8 h-8"
            />
          </div>
          <div className="flex-1">
            <p className="text-base font-medium text-green-700 hover:text-green-800">
              {test.title}
            </p>
            <span className="text-xs flex items-center mt-1 text-green-600">
              <Check size={12} className="mr-1" />
              Đã hoàn thành
            </span>
          </div>
          <button
            onClick={(e) => handleHistoryClickListening(test, e)}
            className="absolute top-3 right-3 p-1 hover:bg-green-100 rounded-full transition-colors"
            title="Xem lịch sử"
          >
            <Clock size={18} className="text-green-600" />
          </button>
        </div>
      ))}

      {/* Reading */}
      {dataReading.map((test) => (
        <div
          key={test.id}
          onClick={() => handleTestClickReading(test)}
          className="relative flex items-center gap-4 border p-4 rounded-xl cursor-pointer transition-all duration-300 border-green-200 hover:border-green-300 hover:bg-green-50"
        >
          <div className="h-12 w-12 flex justify-center items-center rounded-lg bg-green-50">
            <img
              src="https://api.prep.vn/images/skills/test_practice/reading.png"
              alt="Reading icon"
              className="w-8 h-8"
            />
          </div>
          <div className="flex-1">
            <p className="text-base font-medium text-green-700 hover:text-green-800">
              {test.title}
            </p>
            <span className="text-xs flex items-center mt-1 text-green-600">
              <Check size={12} className="mr-1" />
              Đã hoàn thành
            </span>
          </div>
          <button
            onClick={(e) => handleHistoryClickReading(test, e)}
            className="absolute top-3 right-3 p-1 hover:bg-green-100 rounded-full transition-colors"
            title="Xem lịch sử"
          >
            <Clock size={18} className="text-green-600" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TestOverview;
