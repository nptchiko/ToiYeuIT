import React from "react";
import { useEffect, useState } from "react";
import HistoryOrderApi from "../../api/HistoryOrderApi";

const HistoryOrder = () => {
  const [historyOrder, setHistoryOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHistory() {
      setIsLoading(true);
      try {
        const req = await HistoryOrderApi.getHistoryOrder();
        setHistoryOrder(req.body);
        setError(null);
      } catch (error) {
        console.error("Lỗi khi tải lịch sử giao dịch", error);
        setError("Không thể tải lịch sử giao dịch. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchHistory();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800 border-green-300";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "PAID":
        return "Thành công";
      case "CANCELLED":
        return "Thất bại";
      default:
        return "Đang chờ xử lý";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg">
          <div className="flex items-center">
            <svg
              className="h-8 w-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="ml-3 text-lg font-medium text-red-800">
              Đã xảy ra lỗi
            </h3>
          </div>
          <div className="mt-2 text-sm text-red-700">{error}</div>
          <button
            className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
            onClick={() => window.location.reload()}
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Lịch sử giao dịch
      </h1>
      <img
        src="https://drive.google.com/file/d/1Dl4B9Ou71AJHGCUVO6SMV8PnDduiZ8Z6/view?usp=sharing"
        alt="Lịch sử giao dịch"
        className="w-full max-w-md mx-auto"
      />
      {historyOrder.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            Không có giao dịch nào
          </h3>
          <p className="mt-1 text-gray-500">
            Bạn chưa thực hiện giao dịch nào.
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khóa học ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người dùng ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phương thức thanh toán
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {historyOrder.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.courseId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryOrder;
