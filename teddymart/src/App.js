import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./screens/dashboard/index";
import Partner from "./screens/partner";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/partner" element={<Partner />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
