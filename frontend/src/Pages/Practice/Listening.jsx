import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
{
  /* create Reading */
}
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
const Reading = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosClient.get("/api/test-practice/listening");
        setData(res.body);
        console.log(body);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đề thi");
      }
    }
    fetchData();
  }, []);
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.id} className="border border-gray-200 p-5 rounded-lg">
          <div className="lg:flex font-sent justify-between">
            <div className="lg:flex ">
              {/* img */}
              <div className="cursor-pointer w-[300px] lg:w-[200px] mb-5 lg:mb-0 overflow-hidden text-center">
                <img
                  className="object-cover"
                  src="https://storage.googleapis.com/materials-elements/test-set/avatar/xcR2arp8IiLzwhqTcg82x1vRCpchlR2IaeXeSZbi.png"
                />
              </div>
              {/* text */}
              <div className="">
                <h1 className="text-lg font-bold">{item.title}</h1>
                <div className="text-base space-y-5 text-gray-600">
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
            {/* count */}
            <div className="bg-gray-300 h-10 w-20 flex justify-center items-center rounded-lg">
              <p className="text-base  font-bold">{item.tests.length} Đề</p>
            </div>
          </div>
          <div className="m-6 grid lg:grid-cols-4 gap-4 md:grid-cols-2 grid-cols-1">
            {item.tests.map((test) => (
              <div
                key={test.id}
                className="flex items-center gap-4 border border-gray-200 transition transform hover:scale-105 p-4 2xl:w-[300px] lg:w-[200px] w-[300px] rounded-xl cursor-pointer"
              >
                <div className="h-12 w-12 bg-blue-50 flex justify-center items-center rounded-lg">
                  <img src="https://api.prep.vn/images/skills/test_practice/reading.png" />
                </div>
                <p className="text-base font-bold">{test.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reading;
