import { Routes, Route, Navigate } from "react-router-dom";
import KT from "../Pages/test/Test";
import Overview from "../Pages/Roadmap/Roadmap";
import Practice from "../Pages/Practice/Practice";
import AllSkill from "../Pages/Practice/All_skill";
import Listening from "../Pages/Practice/Listening";
import Reading from "../Pages/Practice/Reading";
import Writing from "../Pages/Practice/Writing";
import Speaking from "../Pages/Practice/Speaking";
import Commitment from "../Pages/Output_commitment/Output_commitment";
import Course from "../Pages/By_Course/Course";
import { BrowserRouter as Router } from "react-router-dom";
import RouterPublic from "./RouterPublic";
import RouterPrivate from "./RouterPrivate";
const RoutersConfig = () => {
  return (
    <Router>
      <Routes>
        <Route element={<RouterPublic />}>
          {/* Điều hướng mặc định */}
          <Route path="/" element={<Navigate to="/xay-dung" replace />} />
          {/* Các trang chính */}
          <Route path="/kiem-tra" element={<KT />} />
          <Route path="/xay-dung" element={<Overview />} />
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
        </Route>
        <Route element={<RouterPrivate />}>
          <Route path="/by-course" element={<Course />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutersConfig;
