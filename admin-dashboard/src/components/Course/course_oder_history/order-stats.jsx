"use client";

import { FileText, CheckCircle, Clock, XCircle } from "lucide-react";

export default function OrderStats({
  stats = { total: 1234, completed: 890, pending: 234, failed: 110 },
  loading = false,
}) {
  const statItems = [
    {
      title: "Total Orders",
      value: stats.total,
      icon: FileText,
      color: "blue",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "yellow",
    },
    {
      title: "Cancelled",
      value: stats.failed,
      icon: XCircle,
      color: "red",
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-50 text-blue-600 border-blue-100",
      green: "bg-green-50 text-green-600 border-green-100",
      yellow: "bg-amber-50 text-amber-600 border-amber-100",
      red: "bg-red-50 text-red-600 border-red-100",
    };
    return colorMap[color] || "bg-gray-50 text-gray-600 border-gray-100";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 p-6 transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div
                className={`p-3 rounded-lg border ${getColorClasses(
                  item.color
                )}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-600 mb-1">
                  {item.title}
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {loading ? (
                    <span className="inline-block animate-pulse bg-gray-200 rounded w-16 h-6"></span>
                  ) : (
                    item.value.toLocaleString()
                  )}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
