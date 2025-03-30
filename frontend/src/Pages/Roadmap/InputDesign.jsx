"use client";

const InputDesign = () => {
  const students = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f07b67c6e24762f05b8d16ad8799d677020f4bce",
      name: "Bảo Trân",
      listeningScore: "495",
      readingScore: "495",
      totalScore: "990",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d2808b6cdb564dc4ec8202bf36418b7a594220b6",
      name: "Đặng Thị Thanh Thảo",
      listeningScore: "485",
      readingScore: "460",
      totalScore: "945",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/7e3b3fca19190fcb04cda89cf726a1108e94bcc6",
      name: "Lê Nhật Minh",
      listeningScore: "495",
      readingScore: "420",
      totalScore: "915",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ca41fe00a45c1331099fcbe1e22abda7b7a59878",
      name: "Nguyễn Bùi Mẫn Nhi",
      listeningScore: "465",
      readingScore: "445",
      totalScore: "910",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/be8444194e971526b2cd076e1344979368444777",
      name: "Phạm Thị Huyền",
      listeningScore: "435",
      readingScore: "415",
      totalScore: "850",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6c60723bd867ce30a0f13e9de0f4a3d62e5c437c",
      name: "Lê Phương Mai",
      listeningScore: "400",
      readingScore: "380",
      totalScore: "780",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/16f690dd20a457643b4e0520d1095bd0857046fa",
      name: "Trương Khả Duy",
      listeningScore: "450",
      readingScore: "410",
      totalScore: "860",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/eecf0243b28c87f37ebb41bd01ffaa6a596db90a",
      name: "Nguyễn Thị Hồng Ngọc",
      listeningScore: "425",
      readingScore: "445",
      totalScore: "870",
    },
  ];

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
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f07b67c6e24762f05b8d16ad8799d677020f4bce"
                alt="Featured student"
                className="object-cover w-full rounded-3xl h-[400px] relative z-0 bg-gradient-to-b from-black/60 to-transparent"
              />
              <div className="absolute z-10 bottom-5 left-5 text-white">
                <h3 className="text-2xl font-semibold">Bảo Trân</h3>
                <p className="text-base opacity-80">
                  26 tuổi • Ngày thi: 05.06.2024
                </p>
              </div>
            </div>
            <div className="flex flex-col ">
              <blockquote className="mb-10 text-lg leading-8 text-indigo-900 max-sm:text-base max-sm:leading-7">
                Các đề trong Phòng Luyện ảo mình thấy sát v��i đề thực tế. Mình
                rất ưng phần chấm chữa chi tiết, phần này giải thích cho mình cả
                những lỗi sai lẫn câu đúng, từ đó mình cải thiện dần dần cả 2 kỹ
                năng Listening và Reading.
              </blockquote>
              <div className="flex gap-10 items-end max-sm:flex-col max-sm:items-start">
                <div className="flex flex-col items-start">
                  <span className="text-3xl font-semibold text-amber-500">
                    990
                  </span>
                  <span className="text-lg font-semibold text-indigo-900">
                    TOEIC L&R
                  </span>
                </div>
                <div className="flex gap-5 items-center">
                  <div className="flex flex-col items-start">
                    <span className="text-xl font-semibold text-sky-800">
                      495
                    </span>
                    <span className="text-xs text-gray-700">Listening</span>
                  </div>
                  <div className="w-px h-5 bg-blue-200" />
                  <div className="flex flex-col items-start">
                    <span className="text-xl font-semibold text-sky-800">
                      495
                    </span>
                    <span className="text-xs text-gray-700">Reading</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Student Counter Section */}
        <section className="mb-16 text-center">
          <h2 className="mb-2.5 text-4xl font-semibold">3.000+ học viên</h2>
          <p className="text-xl text-indigo-900">
            <span>đạt </span>
            <span className="font-semibold">thành tích cao </span>
            <span>sau khi học tại Prep</span>
          </p>
        </section>

        {/* Student Grid Section */}
        <section className="grid gap-8 grid-cols-[repeat(4,1fr)] max-md:grid-cols-[repeat(2,1fr)] max-sm:grid-cols-[1fr]">
          {students.map((student, index) => (
            <article
              key={index}
              className="overflow-hidden bg-white rounded-2xl border-4 border-white border-solid shadow-lg relative"
            >
              <img
                src={student.image}
                alt={student.name}
                className="object-cover w-full h-[233px]"
              />
              <div className="p-5">
                <h3 className="mb-1.5 text-base font-semibold text-indigo-900">
                  {student.name}
                </h3>
                <div className="flex gap-2.5 text-sm text-sky-800">
                  <span className="text-gray-700">
                    L {student.listeningScore}
                  </span>
                  <span className="text-gray-700">
                    R {student.readingScore}
                  </span>
                </div>
              </div>
              <div className="absolute right-5 text-2xl top-[250px]">
                <span>{student.totalScore}</span>
                <span className="text-xs text-center text-indigo-900">L&R</span>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
};

export default InputDesign;
