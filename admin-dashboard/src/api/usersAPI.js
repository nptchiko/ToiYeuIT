import axios from "axios";

// Create API instance with default configuration
const api = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

// Add error handling interceptors
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
      // Error during request setup
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// User-related API functions
const userService = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await api.get("/api/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      // Return mock data as fallback
      return Array(20)
        .fill(0)
        .map((_, index) => ({
          id: index + 1,
          username: `Người dùng ${index + 1}`,
          email: `user${index + 1}@example.com`,
          role: "Học viên",
          status: index % 5 === 0 ? "Không hoạt động" : "Đang hoạt động",
          phone: `098765432${index % 10}`,
          gender: index % 2 === 0 ? "Nam" : "Nữ",
        }));
    }
  },

  // Create a new user
  createUser: async (userData) => {
    try {
      const response = await api.post("/api/users/create-user", userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  // Update an existing user
  updateUser: async (userId, userData) => {
    try {
      const response = await api.put(`/api/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  // Delete a user
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
};

export default userService;
