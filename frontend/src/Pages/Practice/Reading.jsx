import ReadingApi from "../../api/ReadingApi";
import { api } from "@/utils/auth-service";
import { BookOpen, Clock, Lock, Check, X, BookOpenCheck } from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Reading = () => {
  const [data, setData] = useState([]);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const navigate = useNavigate();
  const handleOnClick = (test) => {
    if (hasPurchased) {
      navigate("/test-reading", {
        state: {
          id: test.id,
        },
      });
    } else {
      setSelectedTest(test);
      setShowModal(true);
    }
  };
  const handleOnClickHistory = (test) => {
    navigate("/test-history-reading", {
      state: {
        id: test.id,
      },
    });
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await ReadingApi.getReadingAip();
        const response = await api.get("/users/user-info");
        const role = response.data.body.role;
        setHasPurchased(role === "STUDENT" || role === "ADMIN");
        setData(res.body);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đề thi");
      }
    }
    fetchData();
  }, []);
  const handlePurchase = () => {
    navigate("/xay-dung");
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTest(null);
  };
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <BookOpen size={48} />
        <p className="mt-4 text-lg">Không có đề thi nào</p>
      </div>
    );
  }
  return (
    <div className="space-y-8 max-w-full mx-auto p-4">
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
                  src="https://storage.googleapis.com/materials-elements/test-set/avatar/nYG0D58qHDKQQrBfztO5kHIcT0bWATeZ6ulKER8f.png"
                  alt={item.title}
                />
              </div>

              {/* Description */}
              <div className="flex-1 space-y-5">
                <div className="flex items-center gap-2 font-bold">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    TOEIC
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    Reading
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
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
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
          <div className="p-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
            {item.tests.map((test) => (
              <div
                key={test.id}
                onClick={() => handleOnClick(test)}
                className={`relative flex items-center gap-4 border p-4 rounded-xl cursor-pointer transition-all duration-300
                     ${
                       hasPurchased
                         ? test.submitted === 1
                           ? "border-green-200 hover:border-green-300 hover:bg-green-50"
                           : "hover:shadow-md hover:border-blue-300 hover:bg-blue-50"
                         : "hover:shadow-md hover:border-orange-300 hover:bg-orange-50"
                     }
                   `}
              >
                <div
                  className={`h-12 w-12 flex justify-center items-center rounded-lg 
                     ${
                       !hasPurchased
                         ? "bg-orange-50"
                         : test.submitted === 1
                         ? "bg-green-50"
                         : "bg-blue-50"
                     }`}
                >
                  {!hasPurchased ? (
                    <Lock size={20} className="text-orange-500" />
                  ) : test.submitted === 1 ? (
                    <Check size={20} className="text-green-600" />
                  ) : (
                    <img
                      src="https://api.prep.vn/images/skills/test_practice/reading.png"
                      alt="Reading icon"
                      className="w-8 h-8"
                    />
                  )}
                </div>

                <div className="flex-1">
                  <p
                    className={`text-base font-medium 
                         ${
                           hasPurchased
                             ? test.submitted === 1
                               ? "text-green-700 hover:text-green-800"
                               : "text-gray-700 hover:text-blue-600"
                             : "text-gray-500 hover:text-orange-600"
                         }`}
                  >
                    {test.title}
                  </p>
                  {test.submitted === 1 && (
                    <span className="text-xs text-green-600 flex items-center mt-1">
                      <Check size={12} className="mr-1" /> Đã hoàn thành
                    </span>
                  )}
                </div>

                {hasPurchased && test.submitted === 1 && (
                  <button
                    onClick={() => handleOnClickHistory(test)}
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

      {/* Purchase Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl animate-fadeIn">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-gray-800">Mua khóa học</h2>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 mb-4">
                <div className="flex items-start">
                  <Lock size={20} className="text-orange-500 mr-3 mt-1" />
                  <div>
                    <p className="text-gray-700 font-medium">
                      Nội dung này yêu cầu đăng ký khóa học
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Hãy mua khóa học để truy cập tất cả nội dung
                    </p>
                  </div>
                </div>
              </div>

              {selectedTest && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Bài kiểm tra đã chọn:</p>
                  <p className="font-medium text-gray-700 mt-1">
                    {selectedTest.title}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                Hủy
              </button>
              <button
                onClick={handlePurchase}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reading;
