import React from "react";
import { useState, useEffect } from "react";
import ReadingApi from "../../api/ReadingApi";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
const Reading = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const handleOnClick = (test) => {
    navigate("/test-reading", {
      state: {
        id: test.id,
      },
    });
  };
  const handleOnClickHistory = (test) => {
    navigate("/test-history-reading", {
      state: {
        id: test.id,
      },
    });
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await ReadingApi.getReadingAip();
        setData(res.body);
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
                  src="https://storage.googleapis.com/materials-elements/test-set/avatar/nYG0D58qHDKQQrBfztO5kHIcT0bWATeZ6ulKER8f.png"
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
                <p
                  onClick={() => handleOnClick(test)}
                  className="text-base font-bold hover:text-blue-600"
                >
                  {test.title}
                </p>
                {test.submitted === 1 && (
                  <Clock
                    onClick={() => handleOnClickHistory(test)}
                    className="h-10 w-10 text-red-600"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reading;
