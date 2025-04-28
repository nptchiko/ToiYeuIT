// src/services/testAPI.js
import axios from "axios";

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Tests API service
const TestAPI = {
  // Get all tests with pagination
  getAllTests: async (page = 1, size = 5) => {
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
  createTest: async (testbody) => {
    try {
      const response = await api.post("/admin/tests", testbody);
      return response.data;
    } catch (error) {
      console.error("Error creating test:", error);
      throw error;
    }
  },

  // Update an existing test
  updateTest: async (testbody) => {
    try {
      const response = await api.put(`/admin/tests`, testbody);
      return response.data;
    } catch (error) {
      console.error("Error updating test:", error);
      throw error;
    }
  },

  // Delete a test
  deleteTest: async () => {
    try {
      const response = await api.delete(`/admin/tests`);
      return response.data;
    } catch (error) {
      console.error("Error deleting test:", error);
      throw error;
    }
  },
};

export default TestAPI;
