import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HistoryOrderApi from "../../api/HistoryOrderApi";
import { ArrowRight, Search } from "lucide-react";

const HistoryOrder = () => {
  const [historyOrder, setHistoryOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHistory() {
      setIsLoading(true);
      try {
        const req = await HistoryOrderApi.getHistoryOrder();
        setHistoryOrder(req.body);
      } catch (error) {
        console.error("Lỗi khi tải lịch sử giao dịch", error);
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

  const filteredOrders = historyOrder.filter((order) =>
    [
      order.courseTitle,
      getStatusText(order.status),
      order.paymentMethod,
      formatDate(order.createdAt),
    ].some((field) =>
      field.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Lịch sử giao dịch</h1>
        <button
          onClick={() => navigate("/sidebar/my-course")}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors"
          aria-label="Đi tới khóa học của tôi"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm giao dịch (tên khóa học, trạng thái, ngày giờ)"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>
      {filteredOrders.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            {searchQuery
              ? "Không tìm thấy giao dịch"
              : "Không có giao dịch nào"}
          </h3>
          <p className="mt-1 text-gray-500">
            {searchQuery
              ? "Không có giao dịch nào khớp với tìm kiếm của bạn."
              : "Bạn chưa thực hiện giao dịch nào."}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên khóa học
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người dùng
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
                {filteredOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.courseTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.username}
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
