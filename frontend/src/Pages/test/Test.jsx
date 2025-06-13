import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import { TokenService } from "../../utils/auth-service";
import axios from "axios";
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
const Test = () => {
  const [data, setData] = useState([]);
  const [opent, setOpent] = useState(null);
  const navigate = useNavigate();
  const [page, setPage] = useState("/check-input-listening");
  const [pageHistory, setPageHistory] = useState(
    "/test-input-history-listening"
  );
  useEffect(() => {
    async function fetchTest() {
      try {
        const res = await axiosClient.get("/api/test-practice/thi-dau-vao");
        setData(res.body);
        if (res.body && res.body.length > 0) {
          setOpent(res.body[0].id);
        }
      } catch (error) {
        console.error("Lấy dữ liệu kiểm tra đầu vào thất bại", error);
      }
    }
    fetchTest();
  }, []);

  const handlselection = (id) => {
    setOpent(id);
    setPage(id === 9 ? "/check-input-reading" : "/check-input-listening");
    setPageHistory(
      id === 9 ? "/test-input-history-reading" : "/test-input-history-listening"
    );
  };
  const handleOnClick = (test) => {
    navigate(page, {
      state: {
        id: test,
      },
    });
  };
  const handleOnClickHistory = (test) => {
    navigate(pageHistory, {
      state: {
        id: test,
      },
    });
  };
  return (
    <div className="flex flex-col space-y-5 justify-center items-center py-[150px]">
      {data.map((item) => (
        <div
          onClick={() => handlselection(item.id)}
          key={item.id}
          className={`bg-white w-[700px] relative border-[2px] rounded-xl flex gap-3 cursor-pointer ${
            opent === item.id
              ? "border-spacing-x-2 border-b-8 border-blue-700 items-start p-4"
              : "p-4 border-gray-200"
          }`}
        >
          <input
            type="radio"
            checked={opent === item.id}
            onChange={() => handlselection(item.id)}
            className="w-5 h-5 "
          ></input>
          <div className="font-sent">
            <h1 className="text-xl font-bold">{item.title}</h1>
            <p>Thời gian làm bài: 00:30:00</p>
            {opent === item.id && (
              <p>
                Bài thi được sử dụng để đánh giá nhanh trình độ của học sinh cho
                kĩ năng TOEIC của học viên
              </p>
            )}
          </div>
          {item.submitted === 1 && opent === item.id && (
            <div
              onClick={() => handleOnClickHistory(item.id)}
              className={`absolute flex gap-2 right-10 font-bold ${
                opent === item.id ? "text-blue-500" : "text-black"
              } `}
            >
              <Clock /> Xem lịch sử làm bài{" "}
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => handleOnClick(opent)}
        className="bg-blue-600 h-[50px] w-[300px] text-base text-white font-semibold rounded-2xl font-sent"
      >
        Bắt đầu làm bài
      </button>
    </div>
  );
};

export default Test;
