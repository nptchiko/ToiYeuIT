import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
const PaymentFailure = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Red header bar */}
        <div className="bg-red-500 p-4 relative"></div>
        <div className="flex flex-col items-center px-6 pt-8 pb-10">
          <div className="bg-red-100 p-3 rounded-full mb-4">
            <AlertCircle size={40} className="text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Thanh Toán Thất Bại
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Chúng tôi không thể xử lý giao dịch của bạn. Vui lòng kiểm tra thông
            tin thanh toán và thử lại.
          </p>
          <div className="bg-gray-100 rounded-lg p-3 w-full mb-6">
            <p className="text-sm text-gray-500 text-center">
              Mã lỗi: <span className="font-mono">ERR_PAYMENT_5023</span>
            </p>
          </div>
          <div onClick={() => navigate("/xay-dung")} className="w-full">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
              <RefreshCw size={18} className="mr-2" />
              Thử Lại
            </button>
          </div>
        </div>
        <div className="border-t border-gray-200 p-4">
          <p className="text-xs text-gray-500 text-center">
            Nếu bạn tiếp tục gặp vấn đề, vui lòng liên hệ hỗ trợ khách hàng
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
