import React from "react";
const Speaking = () => {
  return (
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
            Chức năng luyện tập TOEIC Speaking hiện đang trong quá trình phát
            triển. Chúng tôi đang nỗ lực hoàn thiện tính năng này để mang đến
            trải nghiệm tốt nhất cho bạn.
          </p>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Trong thời gian chờ đợi, bạn có thể luyện tập các phần khác của
              TOEIC
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speaking;
