import orderService from "../../../services/oder-services";
import { exportToCSV } from "../../../utils/order-utils";
import OrderFilters from "./order-filters";
import OrderPagination from "./order-pagination";
import OrderStats from "./order-stats";
import OrderTable from "./order-table";
import { useState, useEffect, useMemo, useCallback } from "react";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    itemsPerPage: 10,
  });

  // Sorting state
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Debounced search
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch orders with useCallback to prevent unnecessary re-renders
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await orderService.getOrderHistory(
        currentPage,
        itemsPerPage,
        {
          search: debouncedSearchQuery,
          status: statusFilter !== "all" ? statusFilter : undefined,
          paymentMethod:
            paymentMethodFilter !== "all" ? paymentMethodFilter : undefined,
          sortBy,
          sortOrder,
        }
      );

      console.log("Fetched orders response:", response);

      if (response.code === 0) {
        setOrders(response.body.orders || []);
        setPagination({
          ...response.body.pagination,
          itemsPerPage: itemsPerPage, // Ensure itemsPerPage is set correctly
        });
      } else {
        setError(response.message || "Failed to fetch orders");
        setOrders([]);
        setPagination({
          totalItems: 0,
          totalPages: 0,
          currentPage: 1,
          itemsPerPage: itemsPerPage,
        });
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(
        err.message || "Unable to load order history. Please try again later."
      );
      setOrders([]);
      setPagination({
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: itemsPerPage,
      });
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    itemsPerPage,
    debouncedSearchQuery,
    statusFilter,
    paymentMethodFilter,
    sortBy,
    sortOrder,
  ]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Reset page when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [debouncedSearchQuery, statusFilter, paymentMethodFilter, currentPage]);

  // Calculate stats - Handle case when orders is empty
  const stats = useMemo(() => {
    if (!orders || orders.length === 0) {
      return {
        total: pagination.totalItems || 0,
        completed: 0,
        pending: 0,
        failed: 0,
      };
    }

    // Count based on actual status values from API
    const statusCounts = orders.reduce(
      (acc, order) => {
        const status = order.status?.toLowerCase();
        if (status === "paid" || status === "completed") {
          acc.completed++;
        } else if (status === "pending") {
          acc.pending++;
        } else if (status === "failed" || status === "cancelled") {
          acc.failed++;
        }
        return acc;
      },
      { completed: 0, pending: 0, failed: 0 }
    );

    return {
      total: pagination.totalItems,
      ...statusCounts,
    };
  }, [orders, pagination.totalItems]);

  // Event handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleExport = () => {
    if (orders && orders.length > 0) {
      exportToCSV(orders);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPaymentMethodFilter("all");
    setSortBy("createdAt");
    setSortOrder("desc");
    setCurrentPage(1);
  };

  const handleRetry = () => {
    fetchOrders();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            Order History
          </h1>
          <p className="text-gray-600">
            Manage and monitor all course purchase transactions
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-start justify-between">
              <div>
                <strong>Error:</strong> {error}
              </div>
              <button
                onClick={handleRetry}
                className="ml-4 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm transition-colors duration-200"
                disabled={loading}
              >
                {loading ? "Loading..." : "Retry"}
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <OrderStats stats={stats} loading={loading} />

        {/* Filters */}
        <OrderFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          paymentMethodFilter={paymentMethodFilter}
          setPaymentMethodFilter={setPaymentMethodFilter}
          onRefresh={fetchOrders}
          onExport={handleExport}
          onClearFilters={clearFilters}
          loading={loading}
          hasOrders={orders && orders.length > 0}
        />

        {/* Loading state */}
        {loading && (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading orders...</p>
          </div>
        )}

        {/* No data message */}
        {!loading && !error && (!orders || orders.length === 0) && (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-500 mb-4">
              {debouncedSearchQuery ||
              statusFilter !== "all" ||
              paymentMethodFilter !== "all"
                ? "No orders match the current filters"
                : "No orders have been placed yet"}
            </p>
            {(debouncedSearchQuery ||
              statusFilter !== "all" ||
              paymentMethodFilter !== "all") && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Table */}
        {!loading && !error && orders && orders.length > 0 && (
          <OrderTable
            orders={orders}
            loading={loading}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
        )}

        {/* Pagination */}
        {!loading && !error && orders && orders.length > 0 && (
          <OrderPagination
            currentPage={currentPage}
            pagination={pagination}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </div>
    </div>
  );
}
