import axios from "axios";
import { TokenService } from "../utils/auth-service";
const axiosClient = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use(
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
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
export const getLessonDetail = async (index_1, index_2) => {
  const res = await axiosClient.get(`/api/lessons/${index_1}/${index_2}`);
  return res;
};
export const submitTesAnswers = async (testId, score, context) => {
  const payload = {
    testId: testId,
    score: score || 0,
    context,
  };
  const response = await axiosClient.post("/api/test-practice/submit", payload);
  return response;
};
export default {
  getLessonDetail,
  submitTesAnswers,
};
