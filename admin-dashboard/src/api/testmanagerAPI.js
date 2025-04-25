import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081/api";
const api = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // timeout 10s
});
// Interceptor để xử lý lỗi chung
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi chung
    console.error("API Error:", error);
    if (error.response) {
      // Lỗi từ server với status code
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else if (error.request) {
      // Không nhận được phản hồi
      console.error("No response received");
    }
    return Promise.reject(error);
  }
);
export const testService = {};
