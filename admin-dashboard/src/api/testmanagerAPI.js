// src/services/testAPI.js

import { TokenService } from "../utils/auth-service";
import axios from "axios";

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
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
// Tests API service
const TestAPI = {
  // Get all tests with pagination
  getAllTests: async (page = 1, size = 10) => {
    try {
      const response = await api.get(`/admin/tests?page=${page}&size=${size}`);
      console.log(response.data.body);
      return response.data;
    } catch (error) {
      console.error("Error fetching tests:", error);
      throw error;
    }
  },

  // Create a new test
  createTest: async (testSetId, name) => {
    try {
      const response = await api.post("/admin/tests", { testSetId, name });
      return response.data;
    } catch (error) {
      console.error("Error creating test:", error);
      throw error;
    }
  },

  // Update an existing test
  updateTest: async (status, testId, name) => {
    try {
      const response = await api.put(`/admin/tests`, { status, testId, name });
      return response.data;
    } catch (error) {
      console.error("Error updating test:", error);
      throw error;
    }
  },

  // Delete a test
  deleteTest: async (testId) => {
    try {
      const response = await api.delete(`/admin/tests/${testId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting test:", error);
      throw error;
    }
  },
  // Get test details
  getTestById: async (testId) => {
    try {
      const response = await api.get(`/admin/tests/${testId}`);

      return response.data;
    } catch (error) {
      console.error(`Error fetching test with ID ${testId}:`, error);
      throw error;
    }
  },
};

export default TestAPI;
