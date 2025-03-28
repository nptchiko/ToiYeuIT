import React from "react";
const data = [
  {
    id: 1,
    plantain: "Đề 1",
  },
  {
    id: 2,
    plantain: "Đề 2",
  },
  {
    id: 3,
    plantain: "Đề 3",
  },
  {
    id: 4,
    plantain: "Đề 4",
  },
  {
    id: 5,
    plantain: "Đề 5",
  },
  {
    id: 6,
    plantain: "Đề 6",
  },
  {
    id: 7,
    plantain: "Đề 7",
  },
  {
    id: 8,
    plantain: "Đề 8",
  },
  {
    id: 9,
    plantain: "Đề 9",
  },
  {
    id: 10,
    plantain: "Đề 10",
  },
];

const All_skill = () => {
  return (
    <div className="space-y-9">
      {/* create all skill test */}
      <div className="border border-gray-200 p-5 rounded-lg">
        <div className="lg:flex font-sent ">
          {/* img */}
          <div className="cursor-pointer w-[300px] lg:w-96 mb-5 lg:mb-0 overflow-hidden text-center">
            <img
              className="object-cover"
              src="https://storage.googleapis.com/prep-storage-service/test-set/avatar/t2503wuS615wsfZqq27Hnc2Tk1ZWqiD2ISdbIrUm.png"
            />
          </div>
          {/* text */}
          <div className="">
            <h1 className="text-lg font-bold">
              TOEIC - Bộ đề ĐỘC QUYỀN của PREP
            </h1>
            <div className="text-base space-y-5 text-gray-600">
              <p>
                Bộ đề độc quyền tại Prep : Bộ 2000 câu hỏi sát với format đề thi
                thật mới nhất{" "}
              </p>
              <p>
                Prep tự hào giới thiệu bộ đề thi IELTS độc quyền với 10 đề được
                biên soạn công phu, bám sát định dạng đề thi chuẩn. Với kinh
                nghiệm và sự am hiểu sâu sắc về kỳ thi TOEIC, đội ngũ giáo viên
                và chuyên gia của Prep đã tổng hợp và phát triển bộ đề, đảm bảo
                tính cập nhật và sát với xu hướng ra đề mới nhất.{" "}
              </p>
              <p>
                Bộ đề được sắp xếp hợp lý, với độ khó tương đương đề thi thật,
                giúp học viên tiếp cận và làm chủ dần các dạng bài tập, đồng
                thời đi kèm giải thích chi tiết đáp án để phân tích kĩ lưỡng các
                dạng bẫy thường gặp trong đề thi TOEIC. Thông qua chinh phục bộ
                đề, học viên sẽ tự tin hơn khi bước vào phòng thi thật với mọi
                mức độ khó của câu hỏi.
              </p>
            </div>
          </div>
          {/* count */}
          <div className="bg-gray-300 h-10 w-40 flex justify-center items-center rounded-lg">
            <p className="text-base  font-bold">{data.length} Đề</p>
          </div>
        </div>
        <div className="m-6 grid lg:grid-cols-4 gap-4 md:grid-cols-2 grid-cols-1">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border border-gray-200 p-4 2xl:w-[300px] lg:w-[200px] w-[300px] rounded-xl cursor-pointer"
            >
              <div className="h-12 w-12 bg-blue-50 flex justify-center items-center rounded-lg">
                <img src="https://app.prepedu.com/imgs/test-practice/ic-book.svg" />
              </div>
              <p className="text-base font-bold">{item.plantain}</p>
            </div>
          ))}
        </div>
      </div>
      {/* create writing */}
      <div className="border border-gray-200 p-5 rounded-lg">
        <div className="lg:flex font-sent justify-between">
          <div className="lg:flex ">
            {/* img */}
            <div className="cursor-pointer w-[300px] lg:w-[200px] mb-5 lg:mb-0 overflow-hidden text-center">
              <img
                className="object-cover"
                src="https://app.prepedu.com/imgs/test-practice/default-ielts.png"
              />
            </div>
            {/* text */}
            <div className="">
              <h1 className="text-lg font-bold">TOEIC Writing Essential 1</h1>
              <div className="text-base space-y-5 text-gray-600">
                <p>
                  Bộ đề độc quyền tại Prep : Bộ 2000 câu hỏi sát với format đề
                  thi thật mới nhất{" "}
                </p>
              </div>
            </div>
          </div>
          {/* count */}
          <div className="bg-gray-300 h-10 w-20 flex justify-center items-center rounded-lg">
            <p className="text-base  font-bold">{data.length} Đề</p>
          </div>
        </div>
        <div className="m-6 grid lg:grid-cols-4 gap-4 md:grid-cols-2 grid-cols-1">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border border-gray-200 p-4 2xl:w-[300px] lg:w-[200px] w-[300px] rounded-xl cursor-pointer"
            >
              <div className="h-12 w-12 bg-blue-50 flex justify-center items-center rounded-lg">
                <img src="https://api.prep.vn/images/skills/test_practice/writing.png" />
              </div>
              <p className="text-base font-bold">{item.plantain}</p>
            </div>
          ))}
        </div>
      </div>
      {/* create Reading */}
      <div className="border border-gray-200 p-5 rounded-lg">
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
              <h1 className="text-lg font-bold">TOEIC Reading Essential 1</h1>
              <div className="text-base space-y-5 text-gray-600">
                <p>
                  Bộ đề độc quyền tại Prep : Bộ 2000 câu hỏi sát với format đề
                  thi thật mới nhất{" "}
                </p>
              </div>
            </div>
          </div>
          {/* count */}
          <div className="bg-gray-300 h-10 w-20 flex justify-center items-center rounded-lg">
            <p className="text-base  font-bold">{data.length} Đề</p>
          </div>
        </div>
        <div className="m-6 grid lg:grid-cols-4 gap-4 md:grid-cols-2 grid-cols-1">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border border-gray-200 p-4 2xl:w-[300px] lg:w-[200px] w-[300px] rounded-xl cursor-pointer"
            >
              <div className="h-12 w-12 bg-blue-50 flex justify-center items-center rounded-lg">
                <img src="https://api.prep.vn/images/skills/test_practice/reading.png" />
              </div>
              <p className="text-base font-bold">{item.plantain}</p>
            </div>
          ))}
        </div>
      </div>
      {/* create Listening */}
      <div className="border border-gray-200 p-5 rounded-lg">
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
              <h1 className="text-lg font-bold">TOEIC Listening Essential 1</h1>
              <div className="text-base space-y-5 text-gray-600">
                <p>
                  Bộ đề độc quyền tại Prep : Bộ 2000 câu hỏi sát với format đề
                  thi thật mới nhất{" "}
                </p>
              </div>
            </div>
          </div>
          {/* count */}
          <div className="bg-gray-300 h-10 w-20 flex justify-center items-center rounded-lg">
            <p className="text-base  font-bold">{data.length} Đề</p>
          </div>
        </div>
        <div className="m-6 grid lg:grid-cols-4 gap-4 md:grid-cols-2 grid-cols-1">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border border-gray-200 p-4 2xl:w-[300px] lg:w-[200px] w-[300px] rounded-xl cursor-pointer"
            >
              <div className="h-12 w-12 bg-blue-50 flex justify-center items-center rounded-lg">
                <img src="https://api.prep.vn/images/skills/test_practice/listening.png" />
              </div>
              <p className="text-base font-bold">{item.plantain}</p>
            </div>
          ))}
        </div>
      </div>
      {/* create speaking */}
      <div className="border border-gray-200 p-5 rounded-lg">
        <div className="lg:flex font-sent justify-between">
          <div className="lg:flex ">
            {/* img */}
            <div className="cursor-pointer w-[300px] lg:w-[200px] mb-5 lg:mb-0 overflow-hidden text-center">
              <img
                className="object-cover"
                src="https://storage.googleapis.com/materials-elements/test-set/avatar/OCijRVydnf1oi3d6hNz7jZhdgK7066jcJVnhN8Ga.png"
              />
            </div>
            {/* text */}
            <div className="">
              <h1 className="text-lg font-bold">TOEIC Reading Essential 1</h1>
              <div className="text-base space-y-5 text-gray-600">
                <p>
                  Bộ đề độc quyền tại Prep : Bộ 2000 câu hỏi sát với format đề
                  thi thật mới nhất{" "}
                </p>
              </div>
            </div>
          </div>
          {/* count */}
          <div className="bg-gray-300 h-10 w-20 flex justify-center items-center rounded-lg">
            <p className="text-base  font-bold">{data.length} Đề</p>
          </div>
        </div>
        <div className="m-6 grid lg:grid-cols-4 gap-4 md:grid-cols-2 grid-cols-1">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border border-gray-200 p-4 2xl:w-[300px] lg:w-[200px] w-[300px] rounded-xl cursor-pointer"
            >
              <div className="h-12 w-12 bg-blue-50 flex justify-center items-center rounded-lg">
                <img src="https://api.prep.vn/images/skills/test_practice/speaking.png" />
              </div>
              <p className="text-base font-bold">{item.plantain}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default All_skill;
