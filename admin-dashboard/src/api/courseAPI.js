import { TokenService } from "../utils/auth-service";
import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:8081",
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

  // // Get course by ID
  // getCourseById: async (id) => {
  //   try {
  //     const response = await api.get(`/api/admin/courses/${id}`);
  //     return response.data.body;
  //   } catch (error) {
  //     console.error(`Error fetching course with id ${id}:`, error);
  //     throw error;
  //   }
  // },

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
          throw new Error("Không tìm thấy khóa học với ID đã cung cấp");
        } else if (error.response.status === 400) {
          throw new Error(
            "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin khóa học"
          );
        } else if (error.response.status === 403) {
          throw new Error("Không có quyền cập nhật khóa học này");
        }
      }
      throw new Error("Lỗi khi cập nhật khóa học. Vui lòng thử lại sau");
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
        throw new Error("Không tìm thấy khóa học");
      } else if (error.response && error.response.status === 403) {
        throw new Error("Không có quyền thực hiện thao tác này");
      } else {
        throw new Error("Lỗi khi cập nhật trạng thái khóa học");
      }
    }
  },
};

export default courseService;
