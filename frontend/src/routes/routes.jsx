import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Roadmap from "../Pages/Roadmap/Roadmap";
import Test from "../Pages/test/Test";
import Practice from "../Pages/Practice/Practice";
import AllSkill from "../Pages/Practice/All_skill";
import Listening from "../Pages/Practice/Listening";
import Reading from "../Pages/Practice/Reading";
import Writing from "../Pages/Practice/Writing";
import Speaking from "../Pages/Practice/Speaking";
import Commitment from "../Pages/Output_commitment/Output_commitment";
const routes = () => {
  return (
    <Routes>
      {/* Điều hướng mặc định */}
      <Route path="/" element={<Navigate to="/xay-dung" replace />}></Route>
      {/* Các trang chính */}
      <Route path="/xay-dung" element={<Roadmap />} />
      <Route path="/kiem-tra" element={<Test />} />
      <Route path="/cam-ket" element={<Commitment />} />
      {/* Trang luyện tập có các trang con */}
      <Route path="/luyen-de" element={<Practice />}>
        <Route index element={<Navigate to="all-skill" replace />} />
        <Route path="all-skill" element={<AllSkill />} />
        <Route path="listening" element={<Listening />} />
        <Route path="reading" element={<Reading />} />
        <Route path="writing" element={<Writing />} />
        <Route path="speaking" element={<Speaking />} />
      </Route>
    </Routes>
  );
};

export default routes;
