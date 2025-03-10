"use client";
import React, { useState, useRef, useEffect } from "react";

function QualitySection() {
  const teachers = [
    {
      id: 1,
      name: "Cô Yến Chi",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bb0be51d04f2c797d6cb9135bee4f3ab8486a910",
      totalScore: "990 LR 400 SW",
      scores: {
        listening: 495,
        reading: 495,
        speaking: 200,
        writing: 200,
      },
    },
    {
      id: 2,
      name: "Cô Minh Tâm",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/116d285c87fe45d7815cf4b5d04a9908a3e088ca",
      totalScore: "980 LR 390 SW",
      scores: {
        listening: 490,
        reading: 490,
        speaking: 195,
        writing: 195,
      },
    },
    {
      id: 3,
      name: "Cô Thanh Hà",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d261fcb242c49a8d515498c19b969165002b4230",
      totalScore: "970 LR 380 SW",
      scores: {
        listening: 485,
        reading: 485,
        speaking: 190,
        writing: 190,
      },
    },
    {
      id: 4,
      name: "Cô Thu Thảo",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bb0be51d04f2c797d6cb9135bee4f3ab8486a910",
      totalScore: "960 LR 370 SW",
      scores: {
        listening: 480,
        reading: 480,
        speaking: 185,
        writing: 185,
      },
    },
    {
      id: 5,
      name: "Cô Hương Giang",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/116d285c87fe45d7815cf4b5d04a9908a3e088ca",
      totalScore: "985 LR 395 SW",
      scores: {
        listening: 492,
        reading: 493,
        speaking: 198,
        writing: 197,
      },
    },
    {
      id: 6,
      name: "Cô Mai Anh",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d261fcb242c49a8d515498c19b969165002b4230",
      totalScore: "975 LR 385 SW",
      scores: {
        listening: 488,
        reading: 487,
        speaking: 193,
        writing: 192,
      },
    },
    {
      id: 7,
      name: "Cô Lan Phương",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bb0be51d04f2c797d6cb9135bee4f3ab8486a910",
      totalScore: "965 LR 375 SW",
      scores: {
        listening: 483,
        reading: 482,
        speaking: 188,
        writing: 187,
      },
    },
    {
      id: 8,
      name: "Cô Thùy Linh",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/116d285c87fe45d7815cf4b5d04a9908a3e088ca",
      totalScore: "955 LR 365 SW",
      scores: {
        listening: 478,
        reading: 477,
        speaking: 183,
        writing: 182,
      },
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Refs cho việc kéo thả
  const carouselRef = useRef(null);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);

  const handleTeacherClick = (teacher) => {
    // Chỉ mở modal khi click vào chứ không phải khi kéo
    if (!isDraggingRef.current) {
      setSelectedTeacher(teacher);
      setIsModalOpen(true);
    }
  };

  const handleMouseDown = (e) => {
    isDraggingRef.current = false;
    startXRef.current = e.clientX;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e) => {
    isDraggingRef.current = false;
    startXRef.current = e.touches[0].clientX;
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleMouseMove = (e) => {
    if (Math.abs(e.clientX - startXRef.current) > 10) {
      isDraggingRef.current = true;
    }
  };

  const handleTouchMove = (e) => {
    if (Math.abs(e.touches[0].clientX - startXRef.current) > 10) {
      isDraggingRef.current = true;
    }
  };

  const handleMouseUp = (e) => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    if (isDraggingRef.current) {
      const deltaX = e.clientX - startXRef.current;
      handleSwipe(deltaX);
    }
  };

  const handleTouchEnd = (e) => {
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);

    if (isDraggingRef.current) {
      const deltaX = e.changedTouches[0].clientX - startXRef.current;
      handleSwipe(deltaX);
    }
  };

  const handleSwipe = (deltaX) => {
    // Nếu kéo sang phải > 50px, hiện ảnh trước đó
    if (deltaX > 50) {
      setCurrentIndex((prev) => (prev === 0 ? teachers.length - 1 : prev - 1));
    }
    // Nếu kéo sang trái > 50px, hiện ảnh kế tiếp
    else if (deltaX < -50) {
      setCurrentIndex((prev) => (prev === teachers.length - 1 ? 0 : prev + 1));
    }
  };

  // Cleanup event listeners khi component unmount
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // Tính toán 5 giáo viên hiển thị dựa trên index hiện tại
  const getTeachersToDisplay = () => {
    const visibleTeachers = [];

    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + teachers.length) % teachers.length;
      visibleTeachers.push(teachers[index]);
    }

    return visibleTeachers;
  };

  const visibleTeachers = getTeachersToDisplay();
  const currentTeacher = teachers[currentIndex];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <section className="px-8 py-12 mx-auto max-w-screen-2xl max-md:px-4">
        <header className="mb-16 text-center">
          <h2 className="mb-3 text-xl font-semibold tracking-normal text-indigo-900">
            Chất lượng
          </h2>
          <div className="flex justify-center mb-2">
            <h1 className="px-2 text-3xl font-bold text-indigo-900 leading-tight max-md:text-4xl max-sm:text-3xl">
              Từ đội ngũ giáo viên
            </h1>
          </div>
          <div className="flex justify-center">
            <h1 className="px-2 text-3xl font-bold leading-tight max-md:text-4xl max-sm:text-3xl">
              TOP đầu ngành
            </h1>
          </div>
        </header>

        <div
          ref={carouselRef}
          className="relative overflow-hidden mt-16 pb-32"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="flex justify-center items-center select-none">
            {visibleTeachers.map((teacher, index) => (
              <figure
                key={teacher.id}
                className={`transition-all duration-300 cursor-pointer mx-2 ${
                  index === 2
                    ? "w-[310px] z-10 scale-100 opacity-100" // Ảnh chính giữa
                    : index === 1 || index === 3
                    ? "w-[220px] opacity-70 scale-85" // Ảnh kế bên
                    : "w-[180px] opacity-50 scale-75" // Ảnh ngoài cùng
                } max-md:${index === 2 ? "block" : "hidden"}`}
                onClick={() => handleTeacherClick(teacher)}
              >
                <img
                  src={teacher.image}
                  alt={`${teacher.name} profile`}
                  className="w-full h-auto rounded-xl shadow-lg"
                  draggable="false"
                />
              </figure>
            ))}
          </div>

          <article className="absolute  left-1/2 transform -translate-x-1/2 bottom-10 text-center w-full max-w-md">
            <h3 className="mb-2 text-base font-medium text-indigo-900">
              {currentTeacher.name}
            </h3>
            <p className="mb-4 text-2xl font-bold leading-8 uppercase text-indigo-900">
              {currentTeacher.totalScore}
            </p>
          </article>
        </div>
        {isModalOpen && selectedTeacher && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white rounded-lg p-6 max-w-xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex flex-col gap-6">
                <img
                  src={selectedTeacher.image}
                  alt={`${selectedTeacher.name} profile`}
                  className="w-full rounded-lg object-contain max-h-96"
                />

                <div className="flex flex-col items-center text-center">
                  <h3 className="text-xl font-semibold text-indigo-900 mb-2">
                    {selectedTeacher.name}
                  </h3>
                  <p className="text-2xl font-bold mb-6 text-indigo-900">
                    {selectedTeacher.totalScore}
                  </p>

                  <div className="grid grid-cols-2 gap-4 w-full max-w-md max-sm:grid-cols-1">
                    <div className="bg-blue-50 rounded-full px-5 py-3 flex items-center justify-center">
                      <strong className="text-blue-800 mr-2">
                        {selectedTeacher.scores.listening}
                      </strong>
                      <span className="text-indigo-900">Listening</span>
                    </div>
                    <div className="bg-blue-50 rounded-full px-5 py-3 flex items-center justify-center">
                      <strong className="text-blue-800 mr-2">
                        {selectedTeacher.scores.reading}
                      </strong>
                      <span className="text-indigo-900">Reading</span>
                    </div>
                    <div className="bg-blue-50 rounded-full px-5 py-3 flex items-center justify-center">
                      <strong className="text-blue-800 mr-2">
                        {selectedTeacher.scores.speaking}
                      </strong>
                      <span className="text-indigo-900">Speaking</span>
                    </div>
                    <div className="bg-blue-50 rounded-full px-5 py-3 flex items-center justify-center">
                      <strong className="text-blue-800 mr-2">
                        {selectedTeacher.scores.writing}
                      </strong>
                      <span className="text-indigo-900">Writing</span>
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
