import { useState, useEffect } from "react";
import han from "../../assets/InputDesign/han.png";
import huyen from "../../assets/InputDesign/huyen.jpg";
import minh from "../../assets/InputDesign/minh.png";
import ngan from "../../assets/InputDesign/ngan.jpg";
import ngoc from "../../assets/InputDesign/ngoc.jpg";
import thao from "../../assets/InputDesign/thao.jpg";
import duy from "../../assets/InputDesign/duy.png";
import nhi from "../../assets/InputDesign/nhi.png";
import trang from "../../assets/InputDesign/trang.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const InputDesign = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const students = [
    {
      image: han,
      name: "Bảo Trân",
      listeningScore: "495",
      readingScore: "495",
      totalScore: "990",
    },
    {
      image: thao,
      name: "Đặng Thị Thanh Thảo",
      listeningScore: "485",
      readingScore: "460",
      totalScore: "945",
    },
    {
      image: minh,
      name: "Lê Nhật Minh",
      listeningScore: "495",
      readingScore: "420",
      totalScore: "915",
    },
    {
      image: nhi,
      name: "Nguyễn Bùi Mẫn Nhi",
      listeningScore: "465",
      readingScore: "445",
      totalScore: "910",
    },
    {
      image: huyen,
      name: "Phạm Thị Huyền",
      listeningScore: "435",
      readingScore: "415",
      totalScore: "850",
    },
    {
      image: ngan,
      name: "Lê Phương Mai",
      listeningScore: "400",
      readingScore: "380",
      totalScore: "780",
    },
    {
      image: duy,
      name: "Trương Khả Duy",
      listeningScore: "450",
      readingScore: "410",
      totalScore: "860",
    },
    {
      image: ngoc,
      name: "Nguyễn Thị Hồng Ngọc",
      listeningScore: "425",
      readingScore: "445",
      totalScore: "870",
    },
  ];

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    tablet: { breakpoint: { max: 768, min: 640 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
  };

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white">
      <main className="px-5 py-16 mx-auto my-0 max-w-screen-2xl">
        {/* Header Section with animation */}
        <header
          className={`mb-20 text-center transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="mb-3 text-xl font-semibold text-indigo-600 uppercase tracking-wider">
            Thành tích cao
          </h2>
          <h1 className="text-5xl font-bold text-indigo-900 max-sm:text-3xl relative inline-block">
            <span>Từ các học viên </span>
            <span className="relative">
              Xuất sắc
              <div className="absolute bottom-0 left-0 w-full h-2 bg-amber-400 opacity-40 rounded-full"></div>
            </span>
          </h1>
        </header>

        {/* Featured Student Section */}
        <section
          className={`p-10 mx-auto mt-0 mb-20 max-w-4xl bg-white shadow-2xl rounded-[48px] max-sm:p-5 max-sm:rounded-3xl relative transition-all duration-1000 ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-10"
          }`}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-indigo-500 to-sky-400 rounded-t-[48px]"></div>

          <div className="flex items-center justify-center mb-8">
            <span className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 rounded-full shadow-md">
              Vinh danh học viên xuất sắc nhất tháng 1
            </span>
          </div>

          <div className="flex gap-10 max-md:flex-col">
            <div className="shrink-0 w-[300px] max-md:w-full relative">
              <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-xl group">
                <img
                  src={trang}
                  alt="Featured student"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-3xl"></div>
              </div>

              <div className="absolute z-10 bottom-5 left-5 text-white">
                <h3 className="text-2xl font-semibold">Phương Trang</h3>
                <p className="text-base opacity-90 flex items-center gap-2">
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                    21 tuổi
                  </span>
                  <span className="inline-block w-1 h-1 bg-white rounded-full"></span>
                  <span>Ngày thi: 05.06.2024</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="relative">
                <div className="absolute -left-5 top-0 text-4xl opacity-20">
                  "
                </div>
                <p className="mb-10 text-xl font-normal leading-8 text-indigo-900 max-sm:text-base max-sm:leading-7 pl-4 italic">
                  Các đề trong Phòng Luyện ảo mình thấy sát với đề thực tế. Mình
                  rất ưng phần chấm chữa chi tiết, phần này giải thích cho mình
                  cả những lỗi sai lẫn câu đúng, từ đó mình cải thiện dần dần cả
                  2 kỹ năng Listening và Reading.
                </p>
                <div className="absolute -right-5 bottom-10 text-4xl opacity-20">
                  "
                </div>
              </div>

              <div className="flex gap-10 justify-between items-end max-sm:flex-col max-sm:items-start">
                <div className="flex items-end gap-3 bg-amber-50 p-3 rounded-xl">
                  <div className="text-3xl font-bold text-amber-500">990</div>
                  <div className="text-lg font-semibold text-indigo-900">
                    TOEIC L&R
                  </div>
                </div>

                <div className="flex gap-5 bg-sky-50 p-3 rounded-xl">
                  <div className="flex items-end gap-1">
                    <div className="text-xl font-semibold text-sky-700">
                      495
                    </div>
                    <div className="text-base text-gray-700">Listening</div>
                  </div>
                  <div className="w-px h-6 bg-blue-200" />
                  <div className="flex items-end gap-1">
                    <div className="text-xl font-semibold text-sky-700">
                      495
                    </div>
                    <div className="text-base text-gray-700">Reading</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Student Counter Section */}
        <section
          className={`mb-16 text-center transition-all duration-1000 delay-300 ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-10"
          }`}
        >
          <h2 className="mb-3 text-4xl font-bold text-blue-700 flex justify-center items-center gap-2">
            <span className="relative">
              3.000+
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-amber-400 opacity-40"></div>
            </span>
            <span className="text-2xl font-normal text-indigo-800">
              học viên
            </span>
          </h2>
          <p className="text-xl text-indigo-900">
            <span>đạt </span>
            <span className="font-semibold text-indigo-700">
              thành tích cao{" "}
            </span>
            <span>sau khi học tại Prep</span>
          </p>
        </section>

        {/* Student Grid Section */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-10"
          }`}
        >
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            arrows={true}
            containerClass="carousel-container"
            itemClass="p-4 mb-10"
          >
            {students.map((student, index) => (
              <div
                key={index}
                className="overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 group"
              >
                <div className="h-[233px] overflow-hidden relative">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="p-5 relative">
                  <div className="absolute -top-8 right-4 bg-blue-600 text-white rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-lg">
                    <div className="font-bold text-xl leading-none">
                      {student.totalScore}
                    </div>
                    <div className="text-xs font-medium">L&R</div>
                  </div>

                  <h3 className="mb-3 text-base font-semibold text-indigo-800 truncate">
                    {student.name}
                  </h3>

                  <div className="flex gap-5">
                    <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
                      <span className="text-xs font-bold text-gray-500">L</span>
                      <span className="text-sm font-bold text-blue-600">
                        {student.listeningScore}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded-lg">
                      <span className="text-xs font-bold text-gray-500">R</span>
                      <span className="text-sm font-bold text-indigo-600">
                        {student.readingScore}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </main>
    </div>
  );
};

export default InputDesign;
