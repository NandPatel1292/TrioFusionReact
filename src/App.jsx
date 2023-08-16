import React from "react";
import Home from "./pages/store/Home";
import Color from "./pages/project/Color";
import Model from "./pages/model/Model";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/color" element={<Color />} />
          <Route path="/model" element={<Model />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
