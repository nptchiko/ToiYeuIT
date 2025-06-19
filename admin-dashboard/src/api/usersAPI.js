import { TokenService } from "../services/auth-service";
import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

//  interceptor để tự động thêm token vào header của mỗi request
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

// Add interceptors for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server error with status code
      console.error(`API Error: ${error.response.status}`, error.response.data);
    } else if (error.request) {
      // No response received
      console.error("No response received from server", error.request);
    } else {
      // Error in setting up request
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// User related API calls
const userService = {
  // Get all users
  getUsers: async (page = 1, size = 9) => {
    const response = await api.get(
      `/api/admin/users?page=${page}&size=${size}`
    );
    console.log("hehe", response.data.body);
    return response.data.body;
  },

  // Create a new user
  createUser: async (userData) => {
    return api.post("/api/users/create-user", userData);
  },

  // Update a user
  updateUser: async (userId, userData) => {
    return api.put(`/api/admin/users/${userId}`, userData);
  },

  // Delete a user
  deleteUser: async (userId) => {
    return api.delete(`/api/admin/users/${userId}`);
  },

  // Get course enrollments
  getCourseEnrollments: async () => {
    const response = await api.get("/api/admin/courses/enrollments");
    return response.data.body;
  },
};

export { api, userService };
