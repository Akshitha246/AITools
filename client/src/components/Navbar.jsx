import React from "react";
import { Link } from "react-router-dom";

export default function AIForm() {
  return (
    <nav className="bg-white dark:bg-gray-800 text-black dark:text-white shadow p-4 flex gap-4 justify-between">
      <div className="flex gap-4">
        <Link to="/" className="font-bold">Dashboard</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/mindmap">Mind Map</Link>
        <Link to="/studyroom">Study Room</Link>
      </div>
      <button
        // onClick={toggleTheme}
        className="border px-2 py-1 rounded dark:border-white"
      >
        {/* {theme === "light" ? "🌙 Dark" : "☀ Light"} */}
      </button>
    </nav>
  );
}