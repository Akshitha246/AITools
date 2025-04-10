import React, { useState, useEffect } from "react";

// Dynamically load Mermaid.js
const loadMermaid = async () => {
  const mermaid = await import("https://cdn.jsdelivr.net/npm/mermaid@10.4.0/dist/mermaid.esm.min.mjs");
  mermaid.default.initialize({ startOnLoad: true, theme: "default" });
  return mermaid.default;
};

export default function MindMap() {
  const [root, setRoot] = useState("");
  const [points, setPoints] = useState("");
  const [mermaidCode, setMermaidCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (mermaidCode) {
      loadMermaid().then((mermaid) => {
        mermaid.contentLoaded();
      });
    }
  }, [mermaidCode]);

  const generateMermaid = () => {
    setError("");
    if (!root.trim() || !points.trim()) {
      setError("Please enter both root and points!");
      return;
    }

    const lines = points.split("\n");
    let code = ["mindmap", `  root((${root}))`];
    const indent = "    ";

    for (let line of lines) {
      if (line.startsWith("--")) {
        code.push(`${indent.repeat(2)}${line.replace(/^--/, "").trim()}`);
      } else if (line.startsWith("-")) {
        code.push(`${indent}${line.replace(/^-/, "").trim()}`);
      }
    }

    setMermaidCode(code.join("\n"));
  };

  return (
    <div>
      <p>
      <h1  className="text-lg font-semibold mb-2">🧠 Mind Map Generator (Mermaid)</h1>
      </p>
      <input
        type="text"
        placeholder="Enter central topic"
        className="w-full p-2 border rounded mb-4"
        value={root}
        onChange={(e) => setRoot(e.target.value)}
      />
<p>
      <textarea
        placeholder="Use '-' for main point, '--' for subpoint:\n- Memory\n-- Flashcards\n-- Mnemonics\n- Focus"
        className="w-full p-2 border rounded mb-4"
        rows={8}
        value={points}
        onChange={(e) => setPoints(e.target.value)}
      />
</p>
      <button
        onClick={generateMermaid}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Generate Mind Map
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {mermaidCode && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Generated Mind Map</h2>
          <pre className="bg-gray-100 p-2 rounded mb-4">{mermaidCode}</pre>
          <div className="mermaid">{mermaidCode}</div>
        </div>
      )}
    </div>
  );
}
