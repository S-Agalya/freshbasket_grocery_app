import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft, FaPaperPlane, FaRobot } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AIChatPage() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello 👋 I'm FreshBasket AI.\nAsk me anything about groceries, recipes, healthy food, or shopping.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setInput("");

    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/ai/chat`, {
        message: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.data.reply,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry! Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-4 flex items-center gap-3 shadow">

        <button onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        <div className="w-10 h-10 rounded-full bg-white text-green-600 flex items-center justify-center">
          <FaRobot />
        </div>

        <div>
          <h1 className="font-bold">
            FreshBasket AI
          </h1>

          <p className="text-xs opacity-90">
            Your Grocery Assistant
          </p>
        </div>

      </div>

      {/* Chat */}

      <div className="flex-1 overflow-y-auto p-5">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex mb-4 ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl whitespace-pre-wrap shadow-sm ${
                msg.sender === "user"
                  ? "bg-green-600 text-white rounded-br-sm"
                  : "bg-white text-gray-800 rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>

          </div>

        ))}

        {loading && (

          <div className="flex justify-start">

            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">

              <div className="flex gap-1">

                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>

                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150"></div>

                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-300"></div>

              </div>

            </div>

          </div>

        )}

        <div ref={bottomRef}></div>

      </div>

      {/* Suggestions */}

      {messages.length === 1 && (

        <div className="px-4 pb-2 flex gap-2 overflow-x-auto">

          {[
            "Healthy breakfast",
            "Weekly grocery list",
            "Best fruits",
            "Recipe using paneer",
          ].map((item) => (

            <button
              key={item}
              onClick={() => setInput(item)}
              className="bg-white border px-4 py-2 rounded-full text-sm whitespace-nowrap"
            >
              {item}
            </button>

          ))}

        </div>

      )}

      {/* Input */}

      <div className="bg-white border-t p-4">

        <div className="flex items-center gap-3">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && sendMessage()
            }
            placeholder="Ask FreshBasket AI..."
            className="flex-1 border rounded-full px-5 py-3 outline-none"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
          >
            <FaPaperPlane />
          </button>

        </div>

      </div>

    </div>
  );
}