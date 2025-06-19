import { TokenService } from "../services/auth-service";
import axios from "axios";

// Create axios instance with base URL
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

// Course API services
export const courseService = {
  // Get all courses
  getAllCourses: async (page = 1, size = 19) => {
    try {
      const response = await api.get(
        `/api/admin/courses?size=${size}&page=${page}`
      );
      return response.data.body || [];
    } catch (error) {
      console.error("Error fetching courses:", error);
      // Check if there's a response with data
      if (error.response && error.response.data) {
        console.log("Server error response:", error.response.data);
      }
      // Return empty array instead of throwing to prevent UI crashes
      return [];
    }
  },

  // Create new course
  createCourse: async (courseData) => {
    try {
      const requestBody = {
        title: courseData.title,
        description: courseData.description,
        level: courseData.level,
        duration: courseData.duration || 0,
        price: courseData.price || 0,
        type: courseData.type || "LR",
        tag: courseData.tag || "",
        enabled: courseData.enabled !== undefined ? courseData.enabled : true,
      };
      const response = await api.post("/api/admin/courses", requestBody);
      console.log("response create :", response);
      if (response.data && response.data.body) {
        return response.data.body;
      }
      return response.data;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  },

  // Update course
  updateCourse: async (id, courseData) => {
    try {
      // Ensure we're sending the exact format expected by the API
      const requestBody = {
        title: courseData.title,
        description: courseData.description,
        level: courseData.level,
        duration: courseData.duration || 0,
        price: courseData.price || 0,
        // type: courseData.type || "LR",
        tag: courseData.tag || "",
        enabled: courseData.enabled !== undefined ? courseData.enabled : true,
      };

      const response = await api.put(`/api/admin/courses/${id}`, requestBody);
      // console.log("hehêh", response.data.body);
      if (response.data && response.data.body) {
        return response.data.body;
      }
      return response.data;
    } catch (error) {
      console.error(`Error updating course with id ${id}:`, error);
      // Add more specific error handling
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error("Course not found with the provided ID");
        } else if (error.response.status === 400) {
          throw new Error(
            "Invalid data. Please check the course information again"
          );
        } else if (error.response.status === 403) {
          throw new Error("No permission to update this course");
        }
      }
      throw new Error("Error updating course. Please try again later");
    }
  },

  // Delete course
  deleteCourse: async (id) => {
    try {
      const response = await api.delete(`/api/admin/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting course with id ${id}:`, error);
      throw error;
    }
  },

  // Get revenue - Fixed endpoint URL
  revenueCourse: async () => {
    try {
      const response = await api.get("/api/admin/courses/revenue");
      console.log("Revenue API response:", response.data);
      return response;
    } catch (error) {
      console.error("Error getting revenue:", error);

      // Handle specific error cases
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message;

        if (status === 400) {
          console.error("Revenue API Error 400:", message || "Bad Request");
          throw new Error("Invalid request when fetching revenue data");
        } else if (status === 401) {
          console.error("Revenue API Error 401:", message || "Unauthorized");
          throw new Error("Session expired. Please login again");
        } else if (status === 403) {
          console.error("Revenue API Error 403:", message || "Forbidden");
          throw new Error("No permission to access revenue data");
        } else if (status === 404) {
          console.error("Revenue API Error 404:", message || "Not Found");
          throw new Error("Revenue endpoint not found");
        } else if (status >= 500) {
          console.error("Revenue API Error 5xx:", message || "Server Error");
          throw new Error("Server error when fetching revenue data");
        }
      }

      throw new Error("Unable to connect to fetch revenue data");
    }
  },

  toggleCourseVisibility: async (id, isEnabled) => {
    try {
      const response = await api.patch(
        `/api/admin/courses/${id}/visibility?isEnabled=${isEnabled}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error toggling visibility for course with id ${id}:`,
        error
      );
      // Add more specific error handling
      if (error.response && error.response.status === 404) {
        throw new Error("Course not found");
      } else if (error.response && error.response.status === 403) {
        throw new Error("No permission to perform this action");
      } else {
        throw new Error("Error updating course status");
      }
    }
  },
};

export default courseService;
