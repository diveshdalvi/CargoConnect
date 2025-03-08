import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Results from "./Result_page"; // ✅ Fix incorrect import

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes> 
        <Route path="/" element={<App />} />      {/* ✅ Default Page */}
        <Route path="/ResultPage" element={<Results />} /> {/* ✅ Results Page */}
      </Routes>
    </Router>
  </StrictMode>
);
