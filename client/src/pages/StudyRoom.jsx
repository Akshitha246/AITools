import React, { useEffect, useRef, useState } from "react";

export default function StudyRoom() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [showWhiteboard, setShowWhiteboard] = useState(true);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(2);

  // Chat message logic
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "You" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const aiReply = await getAIResponse(input);
    setMessages((prev) => [...prev, { text: aiReply, sender: "AI" }]);
    setIsTyping(false);
  };

  const getAIResponse = async (prompt) => {
    await new Promise((res) => setTimeout(res, 1000));
    return `Interesting point! Let's explore: "${prompt}" further.`;
  };

  // Canvas drawing logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const startDrawing = (e) => {
      isDrawing.current = true;
      draw(e);
    };

    const endDrawing = () => {
      isDrawing.current = false;
      ctx.beginPath();
    };

    const draw = (e) => {
      if (!isDrawing.current) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.strokeStyle = color;

      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", endDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseleave", endDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", endDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseleave", endDrawing);
    };
  }, [color, brushSize]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Study With Friends + AI + Whiteboard
      </h1>

      {/* Chat Section */}
      <div className="bg-white p-4 rounded shadow h-64 overflow-y-scroll mb-4">
        {messages.map((msg, idx) => (
          <p key={idx} className={`mb-2 ${msg.sender === "AI" ? "text-purple-700" : ""}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
        {isTyping && <p className="text-gray-500 italic">AI is typing...</p>}
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded p-2"
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>

      {/* Whiteboard Toggle */}
      <div className="mb-4">
        <button
          onClick={() => setShowWhiteboard(!showWhiteboard)}
          className="px-4 py-2 bg-gray-700 text-white rounded"
        >
          {showWhiteboard ? "Hide Whiteboard" : "Show Whiteboard"}
        </button>
      </div>

      {/* Whiteboard */}
      {showWhiteboard && (
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Whiteboard</h2>
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            style={{ border: "1px solid #ccc", background: "#fff", marginBottom: "1rem" }}
          />
          <div className="flex flex-wrap gap-4 items-center">
            <label>
              Color:
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="ml-2"
              />
            </label>
            <label>
              Brush Size:
              <input
                type="range"
                min="1"
                max="10"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="ml-2"
              />
              <span className="ml-1">{brushSize}px</span>
            </label>
            <button onClick={clearCanvas} className="bg-red-500 text-white px-3 py-1 rounded">
              Clear
            </button>
            <button onClick={saveCanvas} className="bg-green-500 text-white px-3 py-1 rounded">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
