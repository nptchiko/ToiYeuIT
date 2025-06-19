import { TokenService } from "../services/auth-service";
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor
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

// Lesson API service
export const LessonAPI = {
  getAllLessons: async (page = 1, size = 10, courseId = null) => {
    try {
      let url = `/admin/lessons?page=${page}&size=${size}`;
      if (courseId) {
        url += `&courseId=${courseId}`;
      }
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching lessons:", error);
      throw error;
    }
  },

  getLessonById: async (lessonId) => {
    try {
      const response = await api.get(`/admin/lessons/${lessonId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching lesson:", error);
      throw error;
    }
  },

  createLesson: async (lessonData) => {
    try {
      const response = await api.post("/admin/lessons", lessonData);
      return response.data;
    } catch (error) {
      console.error("Error creating lesson:", error);
      throw error;
    }
  },

  updateLesson: async (lessonId, lessonData) => {
    try {
      const response = await api.put(`/admin/lessons/${lessonId}`, lessonData);
      return response.data;
    } catch (error) {
      console.error("Error updating lesson:", error);
      throw error;
    }
  },

  deleteLesson: async (lessonId) => {
    try {
      const response = await api.delete(`/admin/lessons/${lessonId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting lesson:", error);
      throw error;
    }
  },

  reorderLessons: async (courseId, lessonIds) => {
    try {
      const response = await api.put(
        `/admin/lessons/course/${courseId}/reorder`,
        lessonIds
      );
      return response.data;
    } catch (error) {
      console.error("Error reordering lessons:", error);
      throw error;
    }
  },

  duplicateLesson: async (lessonId, targetCourseId) => {
    try {
      const response = await api.post(
        `/admin/lessons/${lessonId}/duplicate?targetCourseId=${targetCourseId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error duplicating lesson:", error);
      throw error;
    }
  },
};
