import han from "/ToiYeuIT/frontend/public/InputDesign/han.png";
import huyen from "/ToiYeuIT/frontend/public/InputDesign/huyen.jpg";
import minh from "/ToiYeuIT/frontend/public/InputDesign/minh.png";
import ngan from "/ToiYeuIT/frontend/public/InputDesign/ngan.jpg";
import ngoc from "/ToiYeuIT/frontend/public/InputDesign/ngoc.jpg";
import thao from "/ToiYeuIT/frontend/public/InputDesign/thao.jpg";
import duy from "/ToiYeuIT/frontend/public/InputDesign/duy.png";
import nhi from "/ToiYeuIT/frontend/public/InputDesign/nhi.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const InputDesign = () => {
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
    <>
      <main className="px-5 py-10 mx-auto my-0 max-w-screen-2xl">
        {/* Header Section */}
        <header className="mb-16 text-center">
          <h2 className="mb-2.5 text-xl font-semibold text-indigo-900">
            Thành tích cao
          </h2>
          <h1 className="text-5xl font-bold text-indigo-900 max-sm:text-3xl">
            <span>Từ các học viên </span>
            <span>Xuất sắc</span>
          </h1>
        </header>

        {/* Featured Student Section */}
        <section className="p-10 mx-auto mt-0 mb-16 max-w-4xl bg-white shadow-2xl rounded-[48px] max-sm:p-5 max-sm:rounded-3xl">
          <h2 className="mb-8 text-3xl font-semibold text-center text-indigo-900">
            Vinh danh học viên xuất sắc nhất tháng 1 🔥
          </h2>
          <div className="flex gap-10 max-md:flex-col">
            <div className="shrink-0 w-[300px] max-md:w-full relative">
              <div className="relative w-full h-[400px]">
                <img
                  src="https://static-assets.prepcdn.com/content-management-system/Anh_chup_Man_hinh_2024_08_08_luc_11_40_42_fbe554f7fb.png?w=828&q=80"
                  alt="Featured student"
                  className="object-cover w-full h-full rounded-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-3xl"></div>
              </div>

              <div className="absolute z-10 bottom-5 left-5 text-white">
                <h3 className="text-2xl font-semibold">Bảo Trân</h3>
                <p className="text-base opacity-80">
                  26 tuổi • Ngày thi: 05.06.2024
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between ">
              <p className="mb-10 text-xl font-normal leading-8 text-indigo-900 max-sm:text-base max-sm:leading-7">
                Các đề trong Phòng Luyện ảo mình thấy sát với đề thực tế. Mình
                rất ưng phần chấm chữa chi tiết, phần này giải thích cho mình cả
                những lỗi sai lẫn câu đúng, từ đó mình cải thiện dần dần cả 2 kỹ
                năng Listening và Reading.
              </p>
              <div className="flex gap-10 justify-between items-end max-sm:flex-col max-sm:items-start">
                <div className="flex items-end gap-3">
                  <div className="text-3xl font-semibold text-amber-500">
                    990
                  </div>
                  <div className="text-lg font-semibold text-indigo-900">
                    TOEIC L&R
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex items-end gap-1">
                    <div className="text-xl font-semibold text-sky-800">
                      495
                    </div>
                    <div className="text-base text-gray-700">Listening</div>
                  </div>
                  <div className="w-px h-5 bg-blue-200" />
                  <div className="flex items-end gap-1">
                    <div className="text-xl font-semibold text-sky-800">
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
        <section className="mb-16 text-center">
          <h2 className="mb-2.5 text-4xl font-semibold text-blue-700">
            3.000+ học viên
          </h2>
          <p className="text-xl text-indigo-900">
            <span>đạt </span>
            <span className="font-semibold">thành tích cao </span>
            <span>sau khi học tại Prep</span>
          </p>
        </section>

        {/* Student Grid Section */}
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          arrows={true}
          containerClass="carousel-container"
          itemClass="p-4"
        >
          {students.map((student, index) => (
            <div
              key={index}
              className="overflow-hidden bg-white rounded-2xl border-4 border-white border-solid shadow-lg relative"
            >
              <img
                src={student.image}
                alt={student.name}
                className="object-cover w-full h-[233px]"
              />
              <div className="p-5">
                <h3 className="mb-1.5 text-base font-semibold text-indigo-800">
                  {student.name}
                </h3>
                <div className="flex gap-2.5 text-sm text-sky-800">
                  <div className="text-gray-700 font-bold flex gap-1">
                    L{" "}
                    <div className="text-blue-700">
                      {student.listeningScore}
                    </div>
                  </div>
                  <div className="text-gray-700 font-bold flex gap-1">
                    R{" "}
                    <div className="text-blue-700">{student.readingScore} </div>
                  </div>
                </div>
              </div>
              <div className="absolute right-5 text-2xl top-[250px]">
                <div className="font-medium text-blue-600">
                  {student.totalScore}
                </div>
                <div className="text-xs text-center font-bold text-indigo-900">
                  L&R
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </main>
    </>
  );
};

export default InputDesign;
