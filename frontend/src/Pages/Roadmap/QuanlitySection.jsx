import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Co_Chi_Le from "../../assets/QualitySection/Co_Chi_Le.png";
import Co_Ngoc_Anh from "../../assets/QualitySection/Co_Ngoc_Anh.png";
import Co_Van_Thuy from "../../assets/QualitySection/Co_Van_Thuy.png";
function QualitySection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const teachers = [
    {
      id: 1,
      name: "Cô Yến Chi",
      image: Co_Chi_Le,
      totalScore: "990 LR 400 SW",
      scores: {
        listening: 495,
        reading: 495,
        speaking: 200,
        writing: 200,
      },
      experience: "8 năm kinh nghiệm",
      description:
        "Chuyên gia luyện thi TOEIC với phương pháp sáng tạo và hiệu quả.",
    },
    {
      id: 2,
      name: "Cô Minh Tâm",
      image: Co_Ngoc_Anh,
      totalScore: "980 LR 390 SW",
      scores: {
        listening: 490,
        reading: 490,
        speaking: 195,
        writing: 195,
      },
      experience: "7 năm kinh nghiệm",
      description:
        "Chuyên hướng dẫn kỹ năng Reading và Listening với phương pháp độc đáo.",
    },
    {
      id: 3,
      name: "Cô Thanh Hà",
      image: Co_Van_Thuy,
      totalScore: "970 LR 380 SW",
      scores: {
        listening: 485,
        reading: 485,
        speaking: 190,
        writing: 190,
      },
      experience: "6 năm kinh nghiệm",
      description:
        "Giáo viên giàu kinh nghiệm trong luyện thi TOEIC Speaking và Writing.",
    },
    {
      id: 4,
      name: "Cô Thu Thảo",
      image: Co_Ngoc_Anh,
      totalScore: "960 LR 370 SW",
      scores: {
        listening: 480,
        reading: 480,
        speaking: 185,
        writing: 185,
      },
      experience: "5 năm kinh nghiệm",
      description:
        "Chuyên gia phân tích đề thi và xây dựng lộ trình học tập hiệu quả.",
    },
    {
      id: 5,
      name: "Cô Thu Thảo",
      image: Co_Ngoc_Anh,
      totalScore: "960 LR 370 SW",
      scores: {
        listening: 480,
        reading: 480,
        speaking: 185,
        writing: 185,
      },
      experience: "5 năm kinh nghiệm",
      description:
        "Chuyên gia phân tích đề thi và xây dựng lộ trình học tập hiệu quả.",
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1280 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  const handleOpenModal = (teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <section className="px-8 py-16 mx-auto max-w-screen-2xl bg-gradient-to-b from-white to-blue-50 max-md:px-4">
        <header className="mb-16 text-center">
          <h2 className="inline-block mb-4 px-4 py-1 text-lg font-semibold tracking-wide text-indigo-700 bg-indigo-50 rounded-full">
            Chất lượng
          </h2>
          <h1 className="mb-6 text-4xl font-bold text-indigo-900 leading-tight max-md:text-3xl max-sm:text-2xl">
            Từ đội ngũ giáo viên{" "}
            <span className="text-blue-600">TOP đầu ngành</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Đội ngũ giảng viên với chứng chỉ TOEIC chuẩn quốc tế, giàu kinh
            nghiệm và phương pháp giảng dạy hiệu quả
          </p>
        </header>

        <div className="relative overflow-hidden my-12">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={false}
            keyBoardControl={true}
            containerClass="carousel-container"
            itemClass="p-5"
          >
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex flex-col items-center p-2 transition-all duration-300 transform hover:scale-105"
              >
                <div
                  onClick={() => handleOpenModal(teacher)}
                  className="relative w-full overflow-hidden rounded-2xl shadow-lg cursor-pointer group"
                >
                  <div className="aspect-w-3 aspect-h-4 bg-gray-100">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white">
                      {teacher.name}
                    </h3>
                    <p className="text-blue-200">{teacher.experience}</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="mb-1 text-lg font-medium text-indigo-900">
                    {teacher.name}
                  </h3>
                  <p className="text-xl font-bold text-blue-600">
                    {teacher.totalScore}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {isModalOpen && selectedTeacher && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <div
              className="bg-white rounded-2xl p-6 max-w-2xl w-full relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                x
              </button>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={selectedTeacher.image}
                      alt={`${selectedTeacher.name} profile`}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-indigo-900 to-transparent p-4">
                      <p className="text-white font-medium">
                        {selectedTeacher.experience}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold text-indigo-900 mb-2">
                    {selectedTeacher.name}
                  </h3>
                  <p className="text-3xl font-bold mb-6 text-blue-600">
                    {selectedTeacher.totalScore}
                  </p>

                  <p className="text-gray-700 mb-6">
                    {selectedTeacher.description}
                  </p>

                  <h4 className="text-lg font-semibold text-indigo-800 mb-3">
                    Điểm số TOEIC chi tiết
                  </h4>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center justify-center">
                      <span className="text-sm text-gray-600 mb-1">
                        Listening
                      </span>
                      <strong className="text-2xl text-blue-700">
                        {selectedTeacher.scores.listening}
                      </strong>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center justify-center">
                      <span className="text-sm text-gray-600 mb-1">
                        Reading
                      </span>
                      <strong className="text-2xl text-blue-700">
                        {selectedTeacher.scores.reading}
                      </strong>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center justify-center">
                      <span className="text-sm text-gray-600 mb-1">
                        Speaking
                      </span>
                      <strong className="text-2xl text-blue-700">
                        {selectedTeacher.scores.speaking}
                      </strong>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center justify-center">
                      <span className="text-sm text-gray-600 mb-1">
                        Writing
                      </span>
                      <strong className="text-2xl text-blue-700">
                        {selectedTeacher.scores.writing}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default QualitySection;
