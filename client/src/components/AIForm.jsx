import { useState } from "react";
import {
  generateMnemonic,
  generateMindMap,
  generateAcronym,
  generateCuteFact,
} from "../services/gemini";
import "../styles.css";

const AIForm = () => {
  const [topic, setTopic] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (type) => {
    if (!topic.trim()) return;
    setLoading(true);
    let result = "";

    switch (type) {
      case "mnemonic":
        result = await generateMnemonic(topic);
        break;
      case "mindmap":
        result = await generateMindMap(topic);
        break;
      case "acronym":
        result = await generateAcronym(topic);
        break;
      case "cute":
        result = await generateCuteFact(topic);
        break;
      default:
        result = "Invalid choice";
    }

    setOutput(result);
    setLoading(false);
  };

  return (
    <div className="ai-form">
      <input
        type="text"
        className="input-box"
        placeholder="Enter a topic like 'Photosynthesis' 🌱"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <div className="button-group">
        <button onClick={() => handleGenerate("mnemonic")} className="btn blue">Mnemonic</button>
        <button onClick={() => handleGenerate("mindmap")} className="btn green">Mind Map</button>
        <button onClick={() => handleGenerate("acronym")} className="btn yellow">Acronym</button>
        <button onClick={() => handleGenerate("cute")} className="btn pink">Cute Sentence</button>
      </div>

      <div className="output-box">
        {loading ? "Generating... ✨" : output}
      </div>
    </div>
  );
};

export default AIForm;