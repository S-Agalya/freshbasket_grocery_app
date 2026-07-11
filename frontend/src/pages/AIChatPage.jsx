import { useState } from "react";
import { chatWithAI } from "../api/ai";

export default function AIChatPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);

      const response = await chatWithAI(message);

      setReply(response);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        FreshBasket AI Assistant
      </h1>

      <textarea
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border rounded-lg w-full p-3"
        placeholder="Ask anything..."
      />

      <button
        onClick={handleSend}
        className="bg-green-600 text-white px-5 py-2 rounded-lg mt-4"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {reply && (
        <div className="mt-6 border rounded-lg p-4 bg-gray-50">
          <h3 className="font-bold mb-2">AI Reply</h3>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}