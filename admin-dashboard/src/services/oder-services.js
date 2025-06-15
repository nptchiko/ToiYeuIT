import { TokenService } from "../services/auth-service";
import axios from "axios";

// Create axios instance with base URL (same as courseAPI)
const api = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptor để tự động thêm token vào header của mỗi request
api.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Order API service
const orderService = {
  // Get order history from real API
  async getOrderHistory(page = 1, size = 10, filters = {}) {
    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("size", size.toString());

      // Add filters to params if they exist
      if (filters.search) {
        params.append("search", filters.search);
      }
      if (filters.status && filters.status !== "all") {
        params.append("status", filters.status);
      }
      if (filters.paymentMethod && filters.paymentMethod !== "all") {
        params.append("paymentMethod", filters.paymentMethod);
      }
      if (filters.sortBy) {
        params.append("sortBy", filters.sortBy);
      }
      if (filters.sortOrder) {
        params.append("sortOrder", filters.sortOrder);
      }

      // Make API call to the real endpoint
      const response = await api.get(
        `/api/admin/courses/order-history?${params.toString()}`
      );

      console.log("Order history API response:", response.data);

      // Handle the actual response structure from backend
      if (response.data && response.data.code === 200) {
        const orders = response.data.body.orders || [];
        const totalItems =
          response.data.body.pagination?.totalItems || orders.length;
        const totalPages =
          response.data.body.pagination?.totalPages ||
          Math.ceil(totalItems / size);

        return {
          code: 0, // Frontend expects 0 for success
          message: "Success",
          body: {
            orders: orders.map((order) => ({
              id: order.id,
              cost: order.cost,
              courseTitle: order.courseTitle,
              createAt: order.createAt,
              paymentMethod: order.paymentMethod,
              status: order.status,
              username: order.username,
              ...order,
            })),
            pagination: {
              totalItems: totalItems,
              totalPages: totalPages,
              currentPage: page,
              itemsPerPage: size,
            },
          },
        };
      }

      // Handle case where response structure is different or code is not 200
      return {
        code: 1,
        message: response.data?.message || "No data found",
        body: {
          orders: [],
          pagination: {
            totalItems: 0,
            totalPages: 0,
            currentPage: page,
            itemsPerPage: size,
          },
        },
      };
    } catch (error) {
      console.error("Error fetching order history:", error);

      // Handle specific error cases (similar to courseAPI pattern)
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message;

        if (status === 400) {
          console.error(
            "Order History API Error 400:",
            message || "Bad Request"
          );
          throw new Error("Invalid request parameters");
        } else if (status === 401) {
          console.error(
            "Order History API Error 401:",
            message || "Unauthorized"
          );
          throw new Error("Session expired. Please login again");
        } else if (status === 403) {
          console.error("Order History API Error 403:", message || "Forbidden");
          throw new Error("No permission to access order history");
        } else if (status === 404) {
          console.error("Order History API Error 404:", message || "Not Found");
          throw new Error("Order history endpoint not found");
        } else if (status >= 500) {
          console.error(
            "Order History API Error 5xx:",
            message || "Server Error"
          );
          throw new Error("Server error when fetching order history");
        }
      }

      // Network or other errors
      if (error.code === "ECONNABORTED") {
        throw new Error("Request timeout. Please try again");
      } else if (error.code === "ERR_NETWORK") {
        throw new Error("Network error. Please check your connection");
      }

      // Generic error
      throw new Error("Failed to fetch order history. Please try again later");
    }
  },
};

export default orderService;
