import React from "react";

export default function Notes() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Subject Notes</h1>
      <textarea className="w-full h-64 p-4 border rounded" placeholder="Start typing your notes here..." />
    </div>
  );
}
