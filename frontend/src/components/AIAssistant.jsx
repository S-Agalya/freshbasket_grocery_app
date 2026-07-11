import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AIAssistant() {
  const { addToCart } = useContext(CartContext);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I can help you add groceries to your cart. Try: add 2 kg apples or suggest items for biryani.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      if (data.items?.length) {
        data.items.forEach((item) => {
          addToCart(
            {
              id: item.productId,
              name: item.name,
              price: item.price,
              image: item.image,
              unit: item.unit,
            },
            item.qty
          );
        });
      }

      const replyText = data.reply || "I can help with that.";
      setMessages((prev) => [...prev, { role: "assistant", text: replyText }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "I’m having trouble reaching the assistant right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-4 rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-lg">🤖</span>
        <div>
          <h3 className="text-sm font-bold text-gray-800">FreshBasket AI Assistant</h3>
          <p className="text-xs text-gray-500">Ask for groceries or meal ideas</p>
        </div>
      </div>

      <div className="mb-3 space-y-2 rounded-xl bg-gray-50 p-2">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`rounded-lg px-3 py-2 text-sm ${
              message.role === "assistant"
                ? "bg-white text-gray-700"
                : "bg-emerald-600 text-white"
            }`}
          >
            {message.text}
          </div>
        ))}
        {loading && <div className="rounded-lg bg-white px-3 py-2 text-sm text-gray-500">Thinking...</div>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add 2 kg apples or suggest biryani items"
          className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white"
        >
          Send
        </button>
      </form>
    </section>
  );
}
