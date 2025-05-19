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
export const getLessonList = async (index) => {
  const res = await axiosClient.get(`/api/lessons/${index}`);
  return res;
};
export default {
  getLessonList,
};
