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
export const getTestReading = async (index) => {
  return await axiosClient.get(`/api/tests/detail?id=${index}`);
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
  getTestReading,
  submitTesAnswers,
};
