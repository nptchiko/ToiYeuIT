import React from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Successful = () => {
  const navigate = useNavigate();
  const phone = localStorage.getItem("phone_course");
  const fullName = localStorage.getItem("full_course");
  const course_id = parseInt(localStorage.getItem("course_id"), 10);
  const course_price = parseInt(localStorage.getItem("course_price"), 10);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-green-500 p-4 relative">
          <div className="flex justify-center">
            <span className="text-white font-medium">
              Đặt hàng #{course_id}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center px-6 pt-8 pb-10">
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Thanh Toán Thành Công!
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 w-full mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600">Tổng tiền:</span>
              <span className="font-bold text-gray-800">
                {course_price.toLocaleString("vi-Vi")} VNĐ
              </span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600">Số điện thoại:</span>
              <span className="font-medium text-gray-800">{phone}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600">Họ và tên:</span>
              <span className="font-medium text-gray-800">{fullName}</span>
            </div>
          </div>
          <div className="w-full space-y-3">
            <button
              onClick={() => navigate("/xay-dung")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <ArrowLeft size={18} />
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Successful;
