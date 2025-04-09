// File: client/src/components/MnemonicCard.jsx
import React from "react";

export default function MnemonicCard({ title, content }) {
  return (
    <div className="bg-blue-100 p-3 rounded shadow mb-3">
      <h3 className="font-bold text-lg">{title}</h3>
      <p>{content}</p>
    </div>
  );
}