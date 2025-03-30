import React from "react";
import { useState } from "react";
const data = [
  {
    id: 1,
    name: "TOEIC Full test (Listening + Reading)",
    time: "Thời gian làm bài:02:00:00",
    skill: "Bài thi gồm hai phần nghe và đọc",
  },
  {
    id: 2,
    name: "TOEIC Quick Test (Listening + Reading)",
    time: "Thời gian làm bài:00:30:00",
    skill:
      "Bài thi được sử dụng để đánh giá nhanh trình độ của học sinh cho kĩ năng TOEIC Listening và TOEIC Reading",
  },
  {
    id: 3,
    name: "TOEIC Entry test 4 KN",
    time: "Thời gian làm bài:02:00:00",
    skill:
      "Bài thi được sử dụng để đánh giá nhanh trình độ của học sinh cho các cặp kĩ năng: Listening và Reading , Speaking và Writing",
  },
];
const Test = () => {
  const [opent, setOpent] = useState(data[0].id);
  const handlselection = (id) => {
    setOpent(id);
  };
  return (
    <div className="flex flex-col space-y-5 justify-center items-center py-[150px]">
      {data.map((item) => (
        <div
          onClick={() => handlselection(item.id)}
          key={item.id}
          className={`bg-white w-[700px]  border-[2px] rounded-xl flex gap-3 cursor-pointer ${
            opent === item.id
              ? "border-spacing-x-2 border-b-8 border-blue-700 items-start p-4"
              : "p-4 border-gray-200"
          }`}
        >
          <input
            type="radio"
            checked={opent === item.id}
            onChange={() => handlselection(item.id)}
            className="w-5 h-5 "
          ></input>
          <div className="font-sent">
            <h1 className="text-xl font-bold">{item.name}</h1>
            <p>{item.time}</p>
            {opent == item.id && <p>{item.skill}</p>}
          </div>
        </div>
      ))}
      <button className="bg-blue-600 h-[50px] w-[300px] text-base text-white font-semibold rounded-2xl font-sent">
        Bắt đầu làm bài
      </button>
    </div>
  );
};

export default Test;
