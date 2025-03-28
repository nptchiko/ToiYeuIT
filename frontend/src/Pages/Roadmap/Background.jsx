import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
function Background() {
  const [couponBasic, setCouponBasic] = useState("");
  const [couponPremium, setCouponPremium] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("LR");
  const [selectedLevel, setSelectedLevel] = useState(0); // Index of selected level
  const [selectedTarget, setSelectedTarget] = useState(0); // Index of selected target

  // Content mapping for different courses
  const courseContent = {
    LR: {
      title: "TOEIC Listening & Reading",
      levels: ["TOEIC LR 1-295", "TOEIC LR 300-595", "TOEIC LR 600-650"],
      target: ["TOEIC LR 300", "TOEIC LR 600", "TOEIC LR 800+"],
    },
    SW: {
      title: "TOEIC Speaking & Writing",
      levels: ["TOEIC SW 1-99", "TOEIC SW 100-199", "TOEIC SW 200-250"],
      target: ["TOEIC SW 100", "TOEIC SW 200", "TOEIC SW 300+"],
    },
    ALL: {
      title: "TOEIC 4 kỹ năng",
      levels: [
        "TOEIC LR 1-295 & SW 1-99",
        "TOEIC LR 300-595 & SW 100-199",
        "TOEIC LR 600-650 & SW 200-250",
      ],
      target: [
        "TOEIC LR 300 & SW 100",
        "TOEIC LR 600 & SW 200",
        "TOEIC LR 800+ và SW 300+",
      ],
    },
  };

  // Price mapping based on level
  const priceMapping = {
    0: { basic: "1.000.000", premium: "1.750.000" },
    1: { basic: "1.200.000", premium: "2.000.000" },
    2: { basic: "1.500.000", premium: "2.500.000" },
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setSelectedLevel(0);
    setSelectedTarget(0);
  };

  const handleLevelSelect = (index) => {
    setSelectedLevel(index);
    // Update target to match level if it's lower
    if (selectedTarget < index) {
      setSelectedTarget(index);
    }
  };

  const handleTargetSelect = (index) => {
    // Only allow selecting targets higher than or equal to current level
    if (index >= selectedLevel) {
      setSelectedTarget(index);
    }
  };

  const dataBasic = [
    {
      id: 1,
      title: "Học & tương tác chủ động với video bài giảng",
    },
    {
      id: 2,
      title: "Làm bài tập liên tục, không giới hạn",
    },
    {
      id: 3,
      title: "Học & Luyện đề theo kế hoạch học tập được cá nhân hóa",
    },
    {
      id: 4,
      title: "Nắm trọn bí kíp & chiến lược làm đề TOEIC hiệu quả",
    },
  ];

  const dataPrimium = [
    {
      id: 1,
      title: "Học & tương tác chủ động với video bài giảng",
    },
    {
      id: 2,
      title: "Làm bài tập liên tục, không giới hạn",
    },
    {
      id: 3,
      title: "Học & Luyện đề theo kế hoạch học tập được cá nhân hóa",
    },
    {
      id: 4,
      title: "Nắm trọn bí kíp & chiến lược làm đề TOEIC hiệu quả",
    },
    {
      id: 5,
      title: "Thực chiến với bộ đề TOEIC độc quyền, sát đề thi thật",
    },
  ];
  return (
    <main className="flex flex-col py-20 px-12 bg-blue-800 rounded-[48px] max-md:px-5 max-md:py-24">
      {/* Header and image section remains the same */}
      <div className="flex justify-between">
        <div className="text-white w-[60%] py-[62px] pr-[133px]">
          <div className="text-xl font-semibold leading-snug max-md:ml-2.5">
            Xin chào Bạn!
          </div>
          <div className="mt-5 text-5xl font-bold leading-[60px] max-md:max-w-full max-md:text-4xl max-md:leading-[56px]">
            Thiết kế lộ trình học dành riêng cho bạn, ngay tại đây!
          </div>
        </div>
        <div className="items-center w-[40%]">
          <img
            src="https://prepedu.com/images/bee/bee_select_level_2.png"
            className="w-full"
            alt="Bee mascot"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl">
        {/* Course Options Section */}

        <div className="flex max-md:flex-col text-lg max-lg:text-base border border-solid font-bold gap-6 rounded-full max-md:rounded-md p-3 justify-around items-center bg-gray-100 m-10">
          {Object.entries(courseContent).map(([key, content]) => (
            <div
              onClick={() => handleCourseSelect(key)}
              className={`px-[90px] py-[30px] max-lg:px-[50px] text-center rounded-full cursor-pointer duration-300 hover:bg-opacity-90 ${
                selectedCourse === key
                  ? "text-black bg-blue-300"
                  : "text-blue-800 bg-sky-100"
              }`}
            >
              {content.title}
            </div>
          ))}
        </div>

        {/* Level Assessment Section */}
        <div className="flex flex-col items-center py-14 font-bold text-center  rounded-none text-gray-950 max-md:max-w-full">
          <h2 className="text-3xl max-md:max-w-full">
            Trình độ của tôi{" "}
            <span className="text-[#00429D]">
              {courseContent[selectedCourse].levels[selectedLevel]}
            </span>
          </h2>

          <div className="flex items-center p-2.5 mt-5 w-full text-xl justify-around font-semibold text-gray-500 bg-gray-100 rounded-full border border-solid max-w-[1288px] max-md:max-w-full">
            {courseContent[selectedCourse].levels.map((level, index) => (
              <div
                key={index}
                onClick={() => handleLevelSelect(index)}
                className={` flex py-7 px-10 rounded-full ${
                  index === 0 ? "px-10 py-7 rounded-full  " : ""
                } ${
                  selectedLevel === index
                    ? "bg-white text-gray-950 shadow-sm"
                    : "hover:text-gray-700 cursor-pointer"
                }`}
              >
                {level}
              </div>
            ))}
          </div>

          <p className="mt-5 text-sm font-medium tracking-normal leading-none">
            Bạn chưa rõ trình độ bản thân?{" "}
            <a href="#" className="font-bold underline text-[#0071F9]">
              Kiểm tra đầu vào
            </a>
          </p>

          <hr className="self-stretch mt-9 h-px bg-gray-200 max-md:max-w-full" />

          <h2 className="mt-14 text-3xl leading-loose max-md:mt-10 max-md:max-w-full">
            Mục tiêu của tôi
            <span className="text-[#00429D]">
              {" "}
              {courseContent[selectedCourse].target[selectedTarget]}
            </span>
          </h2>

          <div className="flex justify-around items-center p-2.5 mt-5 w-full text-xl font-semibold text-gray-500 bg-gray-100 rounded-full border border-solid max-w-[1288px] max-md:max-w-full">
            {courseContent[selectedCourse].target.map((target, index) => (
              <div
                key={index}
                onClick={() => handleTargetSelect(index)}
                className={`flex py-7 px-10 rounded-full${
                  index === 0 ? "px-10 py-7 rounded-full" : ""
                } ${
                  selectedTarget === index
                    ? "bg-white text-gray-950"
                    : index >= selectedLevel
                    ? "hover:text-gray-700 cursor-pointer"
                    : "opacity-15"
                }`}
              >
                {target}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Plans Section */}
      <section className="mt-24 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-10 max-md:flex-col">
          {/* Basic Plan */}
          <div className="w-1/2 max-md:ml-0 max-md:w-full">
            <article className="flex flex-col items-center px-6 pt-10 pb-6 mx-auto w-full text-indigo-900 bg-blue-50 border-blue-50 border-solid border-[5px] rounded-[36px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d7bc642cdd1bb85662df1b8534cf195ce40cfe2c3f37d39818cffcb8833a801?placeholderIfAbsent=true&apiKey=9e9f0f5bc003468d96b652940abb163a"
                alt="Basic plan"
                className="object-contain aspect-[0.82] w-[90px]"
              />
              <h3 className="mt-3 text-3xl font-bold leading-none text-center">
                Tự học chủ động
              </h3>
              <div className="flex gap-1 mt-16 max-w-full font-bold text-center">
                <span className="text-4xl leading-none">
                  {priceMapping[selectedLevel].basic}
                </span>
                <span className="self-start mt-3 text-2xl">VND</span>
              </div>

              <div className="flex gap-5 justify-between py-1 pr-1.5 pl-4 mt-11 max-w-full text-base tracking-normal text-gray-400 bg-white border border-gray-100 border-solid rounded-[32px] w-[364px] max-md:mt-10">
                <input
                  type="text"
                  placeholder="Nhập mã Coupon"
                  className="my-auto font-medium bg-transparent outline-none"
                  value={couponBasic}
                  onChange={(e) => setCouponBasic(e.target.value)}
                />
                <button className="px-4 py-4 font-semibold text-center bg-gray-100 rounded-[32px]">
                  Áp dụng
                </button>
              </div>

              <button className="self-stretch px-16 py-5 mt-8 text-base font-bold text-center text-blue-900 bg-gray-200 hover:text-white hover:bg-blue-800 rounded-[32px] max-md:px-5 max-md:max-w-full">
                Đăng ký học ngay
              </button>

              <div className="flex flex-col items-start self-stretch pt-6 pr-14 pb-10 pl-4 mt-6 w-full text-lg font-medium tracking-normal leading-loose bg-white rounded-3xl max-md:pr-5 max-md:max-w-full">
                <h4 className="font-bold">Quyền lợi:</h4>
                <ul className="w-full mt-6 space-y-6">
                  {dataBasic.map((item) => (
                    <li className="flex gap-2">
                      <div className="flex items-center text-yellow-500">
                        <FaCheckCircle />
                      </div>
                      <span className="flex-auto">{item.title}</span>
                    </li>
                  ))}
                  <li className="flex gap-2">
                    <div className="flex items-center text-gray-200">
                      <FaCheckCircle />
                    </div>
                    <span className="flex-auto">
                      Thực chiến với bộ đề TOEIC độc quyền, sát đề thi thật
                    </span>
                  </li>
                </ul>
              </div>
            </article>
          </div>

          {/* Premium Plan */}
          <div className="w-1/2 max-md:ml-0 max-md:w-full">
            <article className="flex flex-col items-center px-6 pt-10 pb-6 mx-auto w-full text-indigo-900 bg-blue-50 border-yellow-500 border-solid border-[5px] rounded-[36px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2d2a16cdaec599093004e2c7bd903a369f5206d14437989b3939f92a1a350e7b?placeholderIfAbsent=true&apiKey=9e9f0f5bc003468d96b652940abb163a"
                alt="Premium plan"
                className="object-contain aspect-[0.82] w-[90px]"
              />
              <h3 className="mt-3 text-3xl font-bold leading-none text-center">
                Học và luyện đề toàn diện
              </h3>
              <div className="flex gap-1 mt-16 max-w-full font-bold text-center">
                <span className="text-4xl leading-none">
                  {priceMapping[selectedLevel].premium}
                </span>
                <span className="self-start mt-3 text-2xl">VND</span>
              </div>

              <div className="flex gap-5 justify-between py-1 pr-1.5 pl-4 mt-11 max-w-full text-base tracking-normal text-gray-400 bg-white border border-gray-100 border-solid rounded-[32px] w-[364px] max-md:mt-10">
                <input
                  type="text"
                  placeholder="Nhập mã Coupon"
                  className="my-auto font-medium bg-transparent outline-none"
                  value={couponPremium}
                  onChange={(e) => setCouponPremium(e.target.value)}
                />
                <button className="px-4 py-4 font-semibold text-center bg-gray-100 rounded-[32px]">
                  Áp dụng
                </button>
              </div>

              <button className="self-stretch px-16 py-5 mt-8 text-base font-bold text-center text-blue-900 bg-gray-200 hover:text-white hover:bg-blue-800 rounded-[32px] max-md:px-5 max-md:max-w-full">
                Đăng ký học ngay
              </button>

              <div className="flex flex-col items-start self-stretch pt-6 pr-14 pb-10 pl-4 mt-6 w-full text-lg font-medium tracking-normal leading-loose bg-white rounded-3xl max-md:pr-5 max-md:max-w-full">
                <h4 className="font-bold">Quyền lợi:</h4>
                <ul className="w-full mt-6 space-y-6">
                  {dataPrimium.map((item) => (
                    <li className="flex gap-2">
                      <div className="flex items-center text-yellow-500">
                        <FaCheckCircle />
                      </div>
                      <span className="flex-auto">{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Background;
