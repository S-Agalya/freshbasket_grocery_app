import { useState } from "react";
import { chatWithAI } from "../api/ai";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const handleSend = async () => {
    const response = await chatWithAI(message);
    setReply(response);
  };

  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask FreshBasket AI..."
      />

      {/* <button onClick={handleSend}>
        Ask AI
      </button> */}
      <button
  onClick={() => navigate("/ai")}
  className="fixed bottom-24 right-5
             flex items-center gap-2
             bg-green-600 text-white
             px-5 py-3 rounded-full
             shadow-xl hover:bg-green-700 transition"
>
    <FaRobot />
    <span className="font-semibold">Ask AI</span>
</button>

      <p>{reply}</p>
    </div>
  );
}