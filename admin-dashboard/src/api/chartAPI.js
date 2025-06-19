// services/chartApi.js

import { TokenService } from "../services/auth-service";
import axios from "axios";

// Base API configuration
const API_BASE_URL = "http://localhost:8081";
const API_TIMEOUT = 10000; // 10 seconds

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để tự động thêm token vào header của mỗi request
apiClient.interceptors.request.use(
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

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login or refresh token
      console.log("Unauthorized access - please login again");
      // You might want to dispatch a logout action here
    }

    return Promise.reject(error);
  }
);

// Chart API functions
export const chartApi = {
  // Get revenue chart data
  getRevenueData: async () => {
    try {
      const response = await apiClient.get("/api/admin/courses/chart-revenue");
      console.log("geg", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching revenue data:", error);
      throw error;
    }
  },

  // // Get other chart data (examples for future use)
  // getUsersData: async () => {
  //   try {
  //     const response = await apiClient.get("/api/admin/users/chart-data");
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching users data:", error);
  //     throw error;
  //   }
  // },

  // getCourseEnrollmentData: async () => {
  //   try {
  //     const response = await apiClient.get(
  //       "/api/admin/courses/enrollment-data"
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching enrollment data:", error);
  //     throw error;
  //   }
  // },
};

// Utility function to format chart data
export const formatChartData = (apiData) => {
  // Vietnamese month names
  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  // English month names (alternative)
  const monthNamesEn = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract revenue data from API response
  let revenueData = [];

  if (apiData.body) {
    revenueData = apiData.body.revenue || apiData.body.data || apiData.body;
  } else if (apiData.data) {
    revenueData = apiData.data.revenue || apiData.data.data || apiData.data;
  } else if (Array.isArray(apiData)) {
    revenueData = apiData;
  } else {
    revenueData = apiData.revenue || apiData.data || [];
  }

  // Ensure we have 12 months of data
  const formattedData = Array(12).fill(0);

  // Fill in the actual data
  revenueData.forEach((value, index) => {
    if (index < 12) {
      formattedData[index] = value || 0;
    }
  });

  return {
    labels: monthNamesEn,
    revenue: formattedData,
  };
};

// Error handling utility
export const handleApiError = (error) => {
  let errorMessage = "Đã xảy ra lỗi khi tải dữ liệu";

  if (error.code === "ECONNABORTED") {
    errorMessage = "Yêu cầu quá thời gian - vui lòng thử lại";
  } else if (error.response?.status === 401) {
    errorMessage = "Chưa được xác thực - vui lòng đăng nhập lại";
  } else if (error.response?.status === 403) {
    errorMessage = "Không có quyền truy cập";
  } else if (error.response?.status === 404) {
    errorMessage = "Không tìm thấy dữ liệu biểu đồ";
  } else if (error.response?.status >= 500) {
    errorMessage = "Lỗi máy chủ - vui lòng thử lại sau";
  } else if (!navigator.onLine) {
    errorMessage = "Không có kết nối internet";
  }

  return errorMessage;
};

export default chartApi;
