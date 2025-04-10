import React, { useState } from "react";

export default function Notes() {
  const [question, setQuestion] = useState("");
  const [text, setText] = useState("");
  const [output, setOutput] = useState([]);

  const generateAcronym = () => {
    const rawPoints = text.split(/\n|\. +(?=[A-Z])|; +/).map(line => line.trim()).filter(Boolean);

    // Extract first letters
    const letters = rawPoints.map(line => {
      const match = line.match(/[a-zA-Z]/);
      return match ? match[0].toUpperCase() : "";
    }).filter(Boolean);

    // Permute letters
    const permutations = new Set();
    const permute = (arr, m = "") => {
      if (arr.length === 0) permutations.add(m);
      else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m + next);
        }
      }
    };
    permute(letters);

    // Score permutations
    const VOWELS = new Set("AEIOU");
    const score = (word) => {
      const v = [...word].filter(c => VOWELS.has(c)).length;
      const c = [...word].filter(c => /[A-Z]/.test(c) && !VOWELS.has(c)).length;
      return v + (c * 2) - (VOWELS.has(word[0]) ? 1 : 0);
    };
    const best = [...permutations].sort((a, b) => score(b) - score(a))[0] || "";

    // Rewriting acronym breakdown
    const letterMap = {};
    rawPoints.forEach(pt => {
      const ch = pt.match(/[a-zA-Z]/);
      if (ch) {
        const key = ch[0].toUpperCase();
        if (!letterMap[key]) letterMap[key] = pt;
      }
    });

    const result = [...best].map(letter => `${letter} → ${letterMap[letter] || "No match"}`);
    setOutput([`Acronym: ${best}`, ...result]);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "24px" }}>
      <h2>Acronym Generator from Notes</h2>

      <label>❓ Your Question</label>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="e.g. Causes of French Revolution"
        style={{ width: "100%", padding: "10px", marginBottom: "16px", borderRadius: "6px", border: "1px solid #ccc" }}
      />

      <label>📋 Paste Your Points</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`- Heavy taxation\n- Enlightenment ideas\n- Economic crisis`}
        rows={8}
        style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
      />

      <button
        onClick={generateAcronym}
        style={{ marginTop: "16px", padding: "10px 20px", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
      >
        Generate Acronym
      </button>

      {output.length > 0 && (
        <div style={{ marginTop: "24px" }}>
          <h3>🧾 Result</h3>
          <ul>
            {output.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
