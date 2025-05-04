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
    </div>
  );
}

export default TestPractice;
