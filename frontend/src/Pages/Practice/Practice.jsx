import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const data = [
  {
    id: 1,
    title: "Tất cả các kỹ năng",
    to: "all-skill",
    img: "https://app.prepedu.com/imgs/test-practice/ic-book.svg",
  },
  {
    id: 2,
    title: "Listening",
    to: "listening",
    img: "https://api.prep.vn/images/skills/test_practice/listening.png",
  },
  {
    id: 3,
    title: "Reading",
    to: "reading",
    img: "https://api.prep.vn/images/skills/test_practice/reading.png",
  },
  {
    id: 4,
    title: "Writing",
    to: "writing",
    img: "https://api.prep.vn/images/skills/test_practice/writing.png",
  },
  {
    id: 5,
    title: "Speaking",
    to: "speaking",
    img: "https://api.prep.vn/images/skills/test_practice/speaking.png",
  },
];
const Practice = () => {
  return (
    <div className="p-7">
      <div className=" w-full bg-[#E0E7FF] px-[32px] lg:py-0 py-5 font-sent rounded-2xl md:flex lg:h-[400px] ">
        {/* text */}
        <div className="px-5 md:w-[50%] w-full flex flex-col items-start justify-center  space-y-3 relative ">
          <h1 className="text-4xl font-bold">
            Phòng luyện đề ảo 4 kỹ năng TOEIC
          </h1>
          <div className="text-gray-600 font-normal">
            <ul className="space-y-3">
              <li>
                Thuần thục kỹ năng làm bài thi thật TOEIC thông qua việc luyện
                đề hằng ngày
              </li>
              <li>
                Duy nhất tại Prep, bạn dễ dàng làm chủ kỹ năng Speaking, Writing
                với bộ đôi Phòng Speaking & Writing ảo chuẩn format kỳ thi TOEIC
              </li>
              <li>
                Luyện không giới hạn bộ đề, full 4 kỹ năng TOEIC quan trọng chỉ
                với một tài khoản PRO
              </li>
            </ul>
          </div>
          <button className="bg-black text-white px-14 py-3 text-lg font-semibold rounded-xl">
            Nâng cấp
          </button>
        </div>
        {/* img */}
        <div className="px-10 md:w-[50%] w-[70%] mx-auto flex justify-center items-end">
          <img
            src="https://app.prepedu.com/imgs/test-practice/banner-toeic.png"
            className="h-full object-cover"
          />
        </div>
      </div>
      {/* navbar */}
      <div className="border-[1px] border-gray-200 w-full py-6 rounded-xl my-6 px-14 space-y-4 lg:flex lg:justify-between ">
        {data.map((item) => (
          <NavLink
            key={item.id}
            to={`/luyen-de/${item.to}`}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-4 cursor-pointer text-blue-600"
                : "flex items-center gap-4 cursor-pointer"
            }
          >
            <NavLink
              to={`/luyen-de/${item.to}`}
              className={({ isActive }) =>
                isActive
                  ? "h-10 w-10 rounded-lg bg-blue-100 justify-center items-center flex transition-all "
                  : "h-10 w-10 rounded-lg bg-gray-100 justify-center items-center flex transition-all "
              }
            >
              <img src={item.img} />
            </NavLink>
            <p className="text-lg font-medium">{item.title}</p>
          </NavLink>
        ))}
      </div>
      <p className="text-lg font-bold font-sent">Danh sách bộ đề</p>
      <div className="py-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Practice;
