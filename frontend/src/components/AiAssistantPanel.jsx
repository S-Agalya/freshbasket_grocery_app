import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FaRobot, FaPaperPlane, FaUpload, FaShoppingCart, FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaStop, FaRedo } from "react-icons/fa";
import { CartContext } from "../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL;

const normalize = (value = "") =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export default function AiAssistantPanel() {
  const { addToCart, removeFromCart, cartItems } = useContext(CartContext);

  const getInitialConversation = () => {
    try {
      const saved = localStorage.getItem("freshbasket_assistant_chat");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore invalid localStorage data
    }

    return [
      {
        role: "assistant",
        text: "Hello! Tell me what you want to shop for, or upload a photo of a grocery list.",
      },
    ];
  };

  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState(getInitialConversation);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewProducts, setPreviewProducts] = useState([]);
  const [pendingAdd, setPendingAdd] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.qty, 0), [cartItems]);
  const lastAssistantReply = useMemo(() => {
    const reversed = [...conversation].reverse();
    const entry = reversed.find((item) => item.role === "assistant");
    return entry?.text || "";
  }, [conversation]);

  useEffect(() => {
    localStorage.setItem("freshbasket_assistant_chat", JSON.stringify(conversation));
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [conversation, loading]);

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
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const refreshChat = () => {
    const welcome = [
      {
        role: "assistant",
        text: "Hello! Tell me what you want to shop for, or upload a photo of a grocery list.",
      },
    ];
    setConversation(welcome);
    setPendingAdd(null);
    setPreviewProducts([]);
    setMessage("");
    localStorage.setItem("freshbasket_assistant_chat", JSON.stringify(welcome));
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

    try {
      recognition.stop();
      recognition.start();
      setIsListening(true);
    } catch {
      setIsListening(false);
    }
  };

  const handleConfirmAdd = () => {
    if (!pendingAdd) return;

    const { item, quantity } = pendingAdd;
    addToCart(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image || "",
        stock: item.stock || 100,
      },
      quantity || 1
    );

    setConversation((prev) => [...prev, { role: "assistant", text: `${item.name} has been added to your cart.` }]);
    setPendingAdd(null);
  };

  const handleSend = async () => {
    const userText = (message || "").trim();
    const uploadText = selectedFile ? "Please review this uploaded shopping list." : "";
    const inputText = userText || uploadText;

    if (!inputText) return;

    const normalizedInput = inputText.toLowerCase();
    const confirmation = /\b(yes|ok|add|proceed|confirm)\b/i.test(normalizedInput);
    const wantsExplicitAdd = /\b(add to cart|add this to cart|add it to cart|buy|place|shop)\b/i.test(normalizedInput) || /\b(cart)\b/i.test(normalizedInput);

    if (pendingAdd && confirmation) {
      handleConfirmAdd();
      setMessage("");
      setSelectedFile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setConversation((prev) => [...prev, { role: "user", text: inputText }]);
    setMessage("");
    setSelectedFile(null);

    const wantsRemoval = /\b(remove|delete|clear|empty)\b/i.test(normalizedInput);

    if (wantsRemoval) {
      const targetName = inputText
        .replace(/^(remove|delete|clear|empty)\s+/i, "")
        .replace(/\b(that|this|it|product|from cart|from the cart)\b/gi, "")
        .trim();

      let itemToRemove = null;

      if (targetName) {
        itemToRemove = [...cartItems]
          .slice()
          .reverse()
          .find((item) => normalize(item.name).includes(normalize(targetName)) || normalize(targetName).includes(normalize(item.name)));
      }

      if (!itemToRemove && cartItems.length > 0) {
        itemToRemove = [...cartItems].slice().reverse()[0];
      }

      if (itemToRemove) {
        removeFromCart(itemToRemove.id);
        setConversation((prev) => [...prev, { role: "assistant", text: `${itemToRemove.name} has been removed from your cart.` }]);
      } else {
        setConversation((prev) => [...prev, { role: "assistant", text: "I could not find that item in your cart yet." }]);
      }

      setMessage("");
      setSelectedFile(null);
      setLoading(false);
      return;
    }

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
        setPreviewProducts(data.products || []);
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
        setPreviewProducts(data.products || []);

        const parsedProducts = data.products || [];
        const directIntent = /\b(apple|apples|milk|bread|banana|carrot|onion|egg|eggs|rice|curd)\b/i.test(normalizedInput);
        const wantsImmediateAdd = parsedProducts.length > 0 && (wantsExplicitAdd || directIntent);

        if (wantsImmediateAdd) {
          const firstItem = parsedProducts[0];
          addToCart(
            {
              id: firstItem.id,
              name: firstItem.name,
              price: firstItem.price,
              image: "",
              stock: 100,
            },
            firstItem.quantity || 1
          );
          setConversation((prev) => [...prev, { role: "assistant", text: `${firstItem.name} has been added to your cart.` }]);
          return;
        }

        if (parsedProducts.length > 0) {
          const firstItem = parsedProducts[0];
          setPendingAdd({
            item: {
              id: firstItem.id,
              name: firstItem.name,
              price: firstItem.price,
              image: "",
              stock: 100,
            },
            quantity: firstItem.quantity || 1,
          });
          setConversation((prev) => [...prev, { role: "assistant", text: `Shall I add ${firstItem.name} × ${firstItem.quantity || 1} to your cart?` }]);
        }
      }

    } catch (error) {
      setConversation((prev) => [...prev, { role: "assistant", text: error.message || "Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-200 shadow-[0_10px_35px_rgba(0,0,0,0.06)] p-3 md:p-4 mb-6">
      <div className="flex items-center justify-between mb-3 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-2.5 border border-green-100">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 p-2 rounded-2xl text-white shadow-sm">
            <FaRobot size={15} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">FreshBasket Assistant</h3>
            <p className="text-[11px] text-gray-500">Smart shopping • voice • image list</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-full text-green-700 text-xs font-semibold border border-green-100">
          <FaShoppingCart size={11} />
          {cartCount} in cart
        </div>
      </div>

      <div className="rounded-[20px] bg-gray-50 border border-gray-100 p-3 text-sm text-gray-700 mb-3 min-h-[220px] max-h-[280px] overflow-y-auto overflow-x-hidden space-y-2">
        {conversation.map((entry, index) => (
          <div key={`${entry.role}-${index}`} className={`flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[90%] rounded-2xl px-3 py-2 ${entry.role === "user" ? "bg-green-600 text-white" : "bg-white text-gray-700 border border-gray-100"}`}>
              {entry.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-700 border border-gray-100 rounded-2xl px-3 py-2 shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce [animation-delay:120ms]" />
                <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce [animation-delay:240ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
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
        <button
          onClick={refreshChat}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-xl"
          title="Refresh chat"
        >
          <FaRedo size={14} />
        </button>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
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
          onClick={() => {
            if (isSpeaking) {
              stopSpeaking();
            } else if (lastAssistantReply) {
              speakReply(lastAssistantReply);
            } else {
              setConversation((prev) => [...prev, { role: "assistant", text: "There is no reply to read yet." }]);
            }
          }}
          className={`px-3 py-2 rounded-xl ${isSpeaking ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-700"}`}
          title="Read aloud"
        >
          {isSpeaking ? <FaStop size={14} /> : <FaVolumeUp size={14} />}
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
