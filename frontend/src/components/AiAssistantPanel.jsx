import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FaRobot, FaPaperPlane, FaUpload, FaShoppingCart, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { CartContext } from "../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function AiAssistantPanel() {
  const { addToCart, cartItems } = useContext(CartContext);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([
    {
      role: "assistant",
      text: "Hello! Tell me what you want to shop for, or upload a photo of a grocery list.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewProducts, setPreviewProducts] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.qty, 0), [cartItems]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ")
        .trim();
      if (transcript) setMessage(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const buildContextMessage = (inputText) => {
    const history = conversation
      .filter((entry) => entry.role !== "system")
      .map((entry) => `${entry.role === "user" ? "Customer" : "Assistant"}: ${entry.text}`)
      .join("\n");
    return history ? `${history}\nCustomer: ${inputText}` : `Customer: ${inputText}`;
  };

  const speakReply = (text) => {
    if (!text || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceToggle = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      setConversation((prev) => [...prev, { role: "assistant", text: "Voice input is not supported in this browser." }]);
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      return;
    }

    recognition.start();
    setIsListening(true);
  };

  const handleSend = async () => {
    const userText = (message || "").trim();
    const uploadText = selectedFile ? "Please review this uploaded shopping list." : "";
    const inputText = userText || uploadText;

    if (!inputText) return;

    setLoading(true);
    setConversation((prev) => [...prev, { role: "user", text: inputText }]);

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

        const assistantText = data.reply || "I found a few items from your photo.";
        setConversation((prev) => [...prev, { role: "assistant", text: assistantText }]);
        speakReply(assistantText);
        setPreviewProducts(data.products || []);

        (data.products || []).forEach((item) => {
          addToCart(
            {
              id: item.id,
              name: item.name,
              price: item.price,
              image: "",
              stock: 100,
            },
            item.quantity || 1
          );
        });
      } else {
        const res = await fetch(`${API_URL}/api/ai/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: buildContextMessage(inputText) }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "AI request failed");

        const assistantText = data.reply || "I can help you shop.";
        setConversation((prev) => [...prev, { role: "assistant", text: assistantText }]);
        speakReply(assistantText);
        setPreviewProducts(data.products || []);

        (data.products || []).forEach((item) => {
          addToCart(
            {
              id: item.id,
              name: item.name,
              price: item.price,
              image: "",
              stock: 100,
            },
            item.quantity || 1
          );
        });
      }

      setMessage("");
      setSelectedFile(null);
    } catch (error) {
      setConversation((prev) => [...prev, { role: "assistant", text: error.message || "Something went wrong." }]);
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

      <div className="rounded-2xl bg-gray-50 border border-gray-100 p-3 text-sm text-gray-700 mb-3 min-h-[72px] max-h-[220px] overflow-y-auto space-y-2">
        {conversation.map((entry, index) => (
          <div key={`${entry.role}-${index}`} className={`flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[90%] rounded-2xl px-3 py-2 ${entry.role === "user" ? "bg-green-600 text-white" : "bg-white text-gray-700 border border-gray-100"}`}>
              {entry.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-700 border border-gray-100 rounded-2xl px-3 py-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce [animation-delay:120ms]" />
                <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce [animation-delay:240ms]" />
              </div>
            </div>
          </div>
        )}
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
          onClick={handleVoiceToggle}
          className={`px-3 py-2 rounded-xl ${isListening ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700"}`}
          title="Voice input"
        >
          {isListening ? <FaMicrophoneSlash size={14} /> : <FaMicrophone size={14} />}
        </button>
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
