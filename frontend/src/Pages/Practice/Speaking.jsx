import React from "react";
// Speaking
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
const Speaking = () => {
  return (
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
                Bộ đề độc quyền tại Prep : Bộ 2000 câu hỏi sát với format đề thi
                thật mới nhất{" "}
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
  );
};

export default Speaking;
