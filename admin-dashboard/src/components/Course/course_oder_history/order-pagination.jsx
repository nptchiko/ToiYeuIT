"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function OrderPagination({
  currentPage,
  pagination,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) {
  // console.log("OrderPagination props:", {
  //   currentPage,
  //   pagination,
  //   itemsPerPage,
  // });

  // Always show pagination controls, even with 1 page
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Items per page and showing info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Rows per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) =>
                  onItemsPerPageChange &&
                  onItemsPerPageChange(Number(e.target.value))
                }
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="text-sm text-gray-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, pagination.totalItems)} of{" "}
              {pagination.totalItems} entries
            </div>
          </div>

          {/* Right side - Pagination controls */}
          <div className="flex items-center space-x-2">
            {/* First page button */}
            <button
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="First page"
            >
              First
            </button>

            {/* Previous page button */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Current page indicator */}
            <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded font-medium min-w-[2rem] text-center">
              {currentPage}
            </span>

            {/* Show next page number if exists */}
            {currentPage < pagination.totalPages && (
              <button
                onClick={() => onPageChange(currentPage + 1)}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                {currentPage + 1}
              </button>
            )}

            {/* Show page after next if exists */}
            {currentPage + 1 < pagination.totalPages && (
              <button
                onClick={() => onPageChange(currentPage + 2)}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                {currentPage + 2}
              </button>
            )}

            {/* Next page button */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages}
              className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Last page button */}
            <button
              onClick={() => onPageChange(pagination.totalPages)}
              disabled={currentPage === pagination.totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Last page"
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
