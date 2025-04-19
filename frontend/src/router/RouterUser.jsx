import Flashcard from "../Pages/user/Flashcard";
import MyCourses from "../Pages/user/MyCourses";
import Overview from "../Pages/user/Overview";
import TestPractice from "../Pages/user/TestPractice";
import Sidebar from "../components/Sidebar";
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

const RouterUser = () => {
  return (
    <Routes>
      <Route path="/" element={<Sidebar />}>
        <Route path="overview" element={<Overview />} />
        <Route path="flashcard" element={<Flashcard />} />
        <Route path="my-course" element={<MyCourses />} />
        <Route path="test-practice" element={<TestPractice />} />
      </Route>
    </Routes>
  );
};

export default RouterUser;
