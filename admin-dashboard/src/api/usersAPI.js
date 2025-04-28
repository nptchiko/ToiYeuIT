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
  getUsers: async () => {
    return api.get("/api/users");
  },

  // Create a new user
  createUser: async (userData) => {
    return api.post("/api/users/create-user", userData);
  },

  // Update a user
  updateUser: async (userId, userData) => {
    return api.put(`/api/users/${userId}`, userData);
  },

  // Delete a user
  deleteUser: async (userId) => {
    return api.delete(`/api/users/${userId}`);
  },
};

export { api, userService };
