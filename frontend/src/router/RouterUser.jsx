import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "../components/layout";
import { Routes, Route, Navigate } from "react-router-dom";
import Overview from "../Pages/user/Overview";
import Flashcard from "../Pages/user/Flashcard";
import MyCourses from "../Pages/user/MyCourses";
import TestPractice from "../Pages/user/TestPractice";
const RouterPrivate = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="overview" element={<Overview />} />
          <Route path="flashcard" element={<Flashcard />} />
          <Route path="my-course" element={<MyCourses />} />
          <Route path="test-practice" element={<TestPractice />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterPrivate;
