import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { TokenService } from "../../utils/auth-service";
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

const Vnpay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    async function processPayment() {
      const queryParams = new URLSearchParams(location.search);
      const responseCode = queryParams.get("vnp_ResponseCode");
      const course_id = parseInt(localStorage.getItem("course_id"), 10);
      const course_price = parseInt(localStorage.getItem("course_price"), 10);
      console.log(responseCode);
      if (responseCode) {
        const status = responseCode === "00" ? "PAID" : "CANCELLED";
        const payload = {
          courseId: course_id,
          userId: 1,
          status: status,
          paymentMethod: "VNPAY",
        };
        try {
          await axiosClient.post("/api/payment/save-order", payload);
          console.log("Đã gửi kết quả thanh toán về backend:", payload);
        } catch (error) {
          console.error("Gửi dữ liệu thanh toán thất bại:", error);
        }
        if (responseCode == "00") {
          navigate("/successfull-buy");
        } else {
          navigate("/failure-buy");
        }
      } else {
        try {
          const res = await axiosClient.get(
            `/api/payment/vn-pay?amount=${course_price}&bankCode=NCB`
          );
          const paymentUrl = res.body.paymentUrl;
          if (paymentUrl) {
            window.location.href = paymentUrl;
          }
        } catch (error) {
          console.error("Gọi API tạo thanh toán thất bại:", error);
        }
      }
    }

    processPayment();
  }, [location.search]);

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </div>
  );
};

export default Vnpay;
