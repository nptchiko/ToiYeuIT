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
export const getUserProfileData = async () => {
  return await axiosClient.get("/api/users/2");
};
export default {
  getUserProfileData,
};
