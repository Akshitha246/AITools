import React, { useEffect, useState } from "react";

export default function StudyRoom() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "You" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    const aiReply = await getAIResponse(input);
    setMessages((prev) => [...prev, { text: aiReply, sender: "AI" }]);
    setIsTyping(false);
  };

  const getAIResponse = async (prompt) => {
    // Simulate network delay
    await new Promise((res) => setTimeout(res, 1000));

    // Replace this with real AI API call (e.g., OpenAI, HuggingFace, your backend)
    // Example: return await fetch("/api/ai", { method: "POST", body: JSON.stringify({ prompt }) })

    // Dummy logic
    return `Interesting point! Let's explore: "${prompt}" further.`;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Study With Friends + AI</h1>

      <div className="bg-white p-4 rounded shadow h-64 overflow-y-scroll mb-4">
        {messages.map((msg, idx) => (
          <p key={idx} className={`mb-2 ${msg.sender === "AI" ? "text-purple-700" : ""}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
        {isTyping && <p className="text-gray-500 italic">AI is typing...</p>}
      </div>

      <div className="flex gap-2">
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
    </div>
  );
}
