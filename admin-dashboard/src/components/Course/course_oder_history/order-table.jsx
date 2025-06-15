"use client";

import {
  formatDate,
  formatCurrency,
  getStatusText,
  getPaymentMethodText,
} from "../../../utils/order-utils";
import {
  BookOpen,
  User,
  CreditCard,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  FileText,
  SortAsc,
  SortDesc,
} from "lucide-react";

export default function OrderTable({
  orders,
  loading,
  sortBy,
  sortOrder,
  onSort,
}) {
  const getStatusBadge = (status) => {
    const statusConfig = {
      PAID: {
        icon: CheckCircle,
        className: "bg-green-100 text-green-800 border-green-200",
      },
      PEDING: {
        icon: Clock,
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      CANCELLED: {
        icon: XCircle,
        className: "bg-red-100 text-red-800 border-red-200",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}
      >
        <Icon className="w-3 h-3 mr-1" />
        {getStatusText(status)}
      </span>
    );
  };

  const SortButton = ({ column, children }) => (
    <button
      onClick={() => onSort(column)}
      className="flex items-center gap-1 hover:text-gray-700"
    >
      {children}
      {sortBy === column &&
        (sortOrder === "asc" ? (
          <SortAsc className="h-3 w-3" />
        ) : (
          <SortDesc className="h-3 w-3" />
        ))}
    </button>
  );

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-1">
              Không tìm thấy đơn hàng nào
            </h3>
            <p className="text-gray-400">
              Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SortButton column="courseTitle">Khóa học</SortButton>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SortButton column="username">Học viên</SortButton>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thanh toán
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SortButton column="amount">Số tiền</SortButton>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SortButton column="createdAt">Ngày đặt</SortButton>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {order.courseTitle}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">
                          {order.username}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {getPaymentMethodText(order.paymentMethod)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {order.cost ? formatCurrency(order.cost) : "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
