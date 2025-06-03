import React, { useState } from "react";
import TestPractiveListening from "./MyTestPractive/TestPractiveListening";
import TestPractiveReading from "./MyTestPractive/TestPractiveReading";
const data = [
  {
    id: 1,
    title: "Listening",
    to: "listening",
    img: "https://api.prep.vn/images/skills/test_practice/listening.png",
  },
  {
    id: 2,
    title: "Reading",
    to: "reading",
    img: "https://api.prep.vn/images/skills/test_practice/reading.png",
  },
  {
    id: 3,
    title: "Writing",
    to: "writing",
    img: "https://api.prep.vn/images/skills/test_practice/writing.png",
  },
  {
    id: 4,
    title: "Speaking",
    to: "speaking",
    img: "https://api.prep.vn/images/skills/test_practice/speaking.png",
  },
];
function TestPractice() {
  const [activeTab, setActiveTab] = useState("listening");
  return (
    <div className="p-5">
      <div className="bg-white rounded-xl shadow-sm mb-8 overflow-hidden border border-gray-100">
        <div className="px-4 py-4 border-b border-gray-100 flex items-center">
          <h2 className="text-lg font-bold text-gray-800">Kỹ năng luyện tập</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {data.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.to)}
              className={`flex items-center cursor-pointer gap-3 px-4 py-5 transition-all hover:bg-gray-50 ${
                activeTab === item.to ? "bg-blue-50" : ""
              }`}
            >
              <>
                <div
                  className={`h-12 w-12 rounded-lg flex justify-center items-center transition-all ${
                    activeTab === item.to ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  <img
                    src={item.img}
                    className="h-8 w-8 object-contain"
                    alt={item.title}
                  />
                </div>
                <div>
                  <p
                    className={`font-medium ${
                      activeTab === item.to ? "text-blue-500" : "text-gray-900"
                    }`}
                  >
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500">Luyện tập ngay</p>
                </div>
              </>
            </div>
          ))}
        </div>
      </div>
      {activeTab === "listening" && <TestPractiveListening />}
      {activeTab === "reading" && <TestPractiveReading />}
      {activeTab === "writing" && (
        <div className=" bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <img src="https://api.prep.vn/images/skills/test_practice/writing.png" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-3">
                Tính năng đang phát triển
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Chức năng luyện tập TOEIC Writing hiện đang trong quá trình phát
                triển. Chúng tôi đang nỗ lực hoàn thiện tính năng này để mang
                đến trải nghiệm tốt nhất cho bạn.
              </p>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Trong thời gian chờ đợi, bạn có thể luyện tập các phần khác
                  của TOEIC
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === "speaking" && (
        <div className=" bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <img src="https://api.prep.vn/images/skills/test_practice/speaking.png" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-3">
                Tính năng đang phát triển
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Chức năng luyện tập TOEIC Speaking hiện đang trong quá trình
                phát triển. Chúng tôi đang nỗ lực hoàn thiện tính năng này để
                mang đến trải nghiệm tốt nhất cho bạn.
              </p>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Trong thời gian chờ đợi, bạn có thể luyện tập các phần khác
                  của TOEIC
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestPractice;
