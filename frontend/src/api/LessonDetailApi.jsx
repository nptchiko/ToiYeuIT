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
  },
);
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);
export const getLessonDetail = async (index_1, index_2) => {
  const res = await axiosClient.get(`/api/lessons/${index_1}/${index_2}`);
  console.log("LESSON DETAIL", res);
  return res;
};
export const submitAnswer = async (
  courseId,
  lessonId,
  questionId,
  optionId,
) => {
  const payload = {
    quizId: questionId,
    optionId: optionId,
  };
  const response = await axiosClient.post(
    `/api/lessons/${courseId}/${lessonId}/submit-answer`,
    payload,
  );
  return response;
};
export default {
  getLessonDetail,
  submitAnswer,
};
