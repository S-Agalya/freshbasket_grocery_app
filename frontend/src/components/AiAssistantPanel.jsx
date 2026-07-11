import { useContext, useMemo, useState } from "react";
import { FaRobot, FaPaperPlane, FaUpload, FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function AiAssistantPanel() {
  const { addToCart, cartItems } = useContext(CartContext);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("Hello! Tell me what you want to shop for, or upload a photo of a grocery list.");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewProducts, setPreviewProducts] = useState([]);

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.qty, 0), [cartItems]);

  const handleSend = async () => {
    if (!message.trim() && !selectedFile) return;

    setLoading(true);
    setReply("Checking your request...");

    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const res = await fetch(`${API_URL}/api/ai/assistant/image`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Image analysis failed");

        setReply(data.reply || "I found a few items from your photo.");
        setPreviewProducts(data.products || []);

        (data.products || []).forEach((item) => {
          addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: "",
            stock: 100,
            qty: item.quantity,
          });
        });
      } else {
        const res = await fetch(`${API_URL}/api/ai/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "AI request failed");

        setReply(data.reply || "I can help you shop.");
        setPreviewProducts(data.products || []);

        (data.products || []).forEach((item) => {
          addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: "",
            stock: 100,
            qty: item.quantity,
          });
        });
      }

      setMessage("");
      setSelectedFile(null);
    } catch (error) {
      setReply(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-4 md:p-5 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-green-100 p-2 rounded-2xl text-green-700">
            <FaRobot size={16} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">FreshBasket Assistant</h3>
            <p className="text-xs text-gray-500">Chat, shop, or upload a list</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full text-green-700 text-xs font-semibold">
          <FaShoppingCart size={12} />
          {cartCount} in cart
        </div>
      </div>

      <div className="rounded-2xl bg-gray-50 border border-gray-100 p-3 text-sm text-gray-700 mb-3 min-h-[72px]">
        {reply}
      </div>

      {previewProducts.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-600 mb-2">Suggested items</p>
          <div className="flex flex-wrap gap-2">
            {previewProducts.map((item) => (
              <span key={item.id} className="bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium">
                {item.name} × {item.quantity}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 mb-2">
        <label className="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl text-sm text-gray-700">
          <FaUpload size={12} />
          <span>{selectedFile ? selectedFile.name : "Upload list"}</span>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
        </label>
      </div>

      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type: add 2kg apples or suggest biryani ingredients"
          className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-green-500"
        />
        <button
          onClick={handleSend}
          disabled={loading || (!message.trim() && !selectedFile)}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-3 py-2 rounded-xl"
        >
          {loading ? "..." : <FaPaperPlane size={14} />}
        </button>
      </div>
    </div>
  );
}
