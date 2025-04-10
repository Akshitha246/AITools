import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Aitools from "./pages/Aitools";
import MindMap from "./pages/Mindmap";
import StudyRoom from "./pages/StudyRoom";
import Navbar from "./components/Navbar"; // ✅ Import the login component
import Login from "./pages/Login";
import Acronym from "./pages/Acronym";
import "./App.css"; // Import your CSS file

function AppWrapper() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} /> {/* ✅ Login route added */}
          <Route path="/aitools" element={<Aitools />} />
          <Route path="/mindmap" element={<MindMap />} />
          <Route path="/studyroom" element={<StudyRoom />} />
          
          <Route path="/Acronym" element={<Acronym />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
