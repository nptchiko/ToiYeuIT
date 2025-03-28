import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Roadmap from "./Pages/Roadmap/Roadmap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routes from "./routes/routes";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes />
      <Footer />
    </Router>
  );
};

export default App;
