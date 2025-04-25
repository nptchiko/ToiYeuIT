import axios from "axios";
const axiosClient = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
export const getReadingAip = async () => {
  return await axiosClient.get("/api/test-practice/reading");
};
export default {
  getReadingAip,
};
