import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Aitools from "./pages/Aitools";
import MindMap from "./pages/Mindmap";
import StudyRoom from "./pages/StudyRoom";
import Navbar from "./components/Navbar";
import "./App.css"; // <-- Import external CSS
import AIForm from "./components/AIForm";


export default function App() {
  return (
    <Router>
      <div className="app-container">
      <h1 className="app-container">🧠 MemorEase AI ✨</h1>
      <AIForm/>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Aitools" element={<Aitools />} />|
            <Route path="/mindmap" element={<MindMap />} />|
            <Route path="/studyroom" element={<StudyRoom />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}