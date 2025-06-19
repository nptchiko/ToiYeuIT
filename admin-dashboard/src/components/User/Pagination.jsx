"use client";

import { PAGINATION_SIZES } from "../../Constants/user-constants";
import { generatePaginationNumbers } from "../../utils/user-utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
  const paginationNumbers = generatePaginationNumbers(currentPage, totalPages);

  return (
    <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
      <div className="flex items-center space-x-2 mb-4 sm:mb-0">
        <span className="text-sm text-muted-foreground">Rows per page:</span>
        <select
          className="border border-input rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number.parseInt(e.target.value))}
        >
          {PAGINATION_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className="text-sm text-muted-foreground">
          Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)} to{" "}
          {Math.min(currentPage * pageSize, totalItems)} of {totalItems} entries
        </span>
      </div>

      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`px-3 py-1.5 border border-input rounded-md ${
            currentPage === 1
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          First
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1.5 border border-input rounded-md ${
            currentPage === 1
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {paginationNumbers.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-1.5 text-muted-foreground"
            >
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1.5 border border-input rounded-md ${
                currentPage === page
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1.5 border border-input rounded-md ${
            currentPage === totalPages
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1.5 border border-input rounded-md ${
            currentPage === totalPages
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          Last
        </button>
      </div>
    </div>
  );
}
