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
  getAllTests: async (page = 1, size = 50) => {
    try {
      const response = await api.get(`/admin/tests?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tests:", error);
      throw error;
    }
  },

  // Create a new test set
  createTestSet: async (name, skill = "", description = "") => {
    try {
      const response = await api.post("/admin/tests", {
        name,
        skill,
        description,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating test set:", error);
      throw error;
    }
  },

  // Create a new test
  createTest: async (testData) => {
    try {
      // The API expects testSetId, title, and content in the request body
      const response = await api.post("/admin/tests/test", {
        testSetId: testData.testSetId,
        title: testData.name,
        content: testData.content,
      });
      console.log("response createTest ", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating test:", error);
      throw error;
    }
  },

  // Update an existing test
  updateTest: async (status, testId, name) => {
    try {
      const response = await api.put(`/admin/tests/test`, {
        status,
        testId,
        name,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating test:", error);
      throw error;
    }
  },

  // Delete a test
  deleteTest: async (testId) => {
    try {
      const response = await api.delete(`/admin/tests/test/${testId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting test:", error);
      throw error;
    }
  },
  // Get test details
  getTestById: async (testId) => {
    try {
      const response = await api.get(`/admin/tests/test/${testId}`);

      return response.data;
    } catch (error) {
      console.error(`Error fetching test with ID ${testId}:`, error);
      throw error;
    }
  },
  deleteTests: async (testSetId) => {
    try {
      const response = await api.delete(`/admin/tests/${testSetId}`);
      return response.data;
    } catch (error) {
      console.error("error deleting test: ", error);
      throw error;
    }
  },
};

export default TestAPI;
