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
    const node = messagesEndRef.current;
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "end" });
    }
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

  const parseDirectShoppingRequest = (inputText) => {
    const text = inputText || "";
    const lower = text.toLowerCase();
    const isShoppingAction = /\b(add|buy|get|place|shop|order)\b/i.test(lower) || /\b(cart)\b/i.test(lower);

    if (!isShoppingAction) return null;

    const productNames = [
      { key: "apple", aliases: ["apple", "apples"] },
      { key: "banana", aliases: ["banana", "bananas"] },
      { key: "milk", aliases: ["milk"] },
      { key: "bread", aliases: ["bread"] },
      { key: "egg", aliases: ["egg", "eggs"] },
      { key: "rice", aliases: ["rice"] },
      { key: "curd", aliases: ["curd", "yogurt", "yoghurt"] },
      { key: "onion", aliases: ["onion", "onions"] },
      { key: "carrot", aliases: ["carrot", "carrots"] },
    ];

    const matchedProduct = productNames.find((product) => product.aliases.some((alias) => lower.includes(alias)));
    if (!matchedProduct) return null;

    const quantityMatch = text.match(/(\d+(?:\.\d+)?)\s*(kg|kilo|kilogram|g|gram|grams|pcs|piece|pieces|pack|packs|litre|litres|ltr|l|bottle|bottles|dozen|dozens)/i);
    const quantity = quantityMatch ? Number(quantityMatch[1]) : 1;

    return {
      id: matchedProduct.key,
      name: matchedProduct.key.charAt(0).toUpperCase() + matchedProduct.key.slice(1),
      quantity,
      price: matchedProduct.key === "apple" ? 50 : matchedProduct.key === "banana" ? 45 : matchedProduct.key === "milk" ? 60 : matchedProduct.key === "bread" ? 35 : matchedProduct.key === "egg" ? 90 : matchedProduct.key === "rice" ? 120 : matchedProduct.key === "curd" ? 45 : matchedProduct.key === "onion" ? 30 : 45,
    };
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

    const quantityText = quantity > 1 ? `${quantity} units of` : "";
    setConversation((prev) => [
      ...prev,
      { role: "user", text: "Yes" },
      {
        role: "assistant",
        text: `Hurray! ${quantityText} ${item.name} ${quantity > 1 ? "have" : "has"} been added to your cart. Anything else you'd like to grab today? 😊`,
      },
    ]);
    setPendingAdd(null);
  };

  const handleSend = async () => {
    const userText = (message || "").trim();
    const uploadText = selectedFile ? "Please review this uploaded shopping list." : "";
    const inputText = userText || uploadText;

    if (!inputText) return;

    const normalizedInput = inputText.toLowerCase();
    
    // Confirmation: yes, ok, proceed, confirm, + synonyms anywhere in the input
    const confirmation = /\b(yes|ok|proceed|confirm|y|sure|absolutely|yep|fine|add it|add them|go ahead|do it|please do)\b/i.test(normalizedInput);
    
    // New request with specific product: "add X kg product", "I need product"
    const hasProductName = /\b(apple|banana|carrot|milk|bread|egg|rice|curd|yogurt|onion|potato|tomato|lettuce|spinach|beans)\b/i.test(normalizedInput);
    const wantsExplicitAdd = /\b(add|buy|get|place|put|shop|order|i need|i want|give me)\b/i.test(normalizedInput);
    const isNewRequest = (wantsExplicitAdd && hasProductName) || /^\s*\d+\s*(kg|l|litre|piece|pc|gm)/i.test(normalizedInput);

    // If there's pending confirmation AND user just says yes/ok/confirm, accept it
    if (pendingAdd && confirmation) {
      handleConfirmAdd();
      setMessage("");
      setSelectedFile(null);
      setLoading(false);
      return;
    }

    const directAdd = parseDirectShoppingRequest(inputText);

    // If it's a new shopping request, clear pending and proceed normally
    if (isNewRequest) {
      setPendingAdd(null);
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

      const amountMatch = inputText.match(/(\d+(?:\.\d+)?)\s*(kg|kilo|kilogram|g|gram|grams|pcs|piece|pieces|pack|packs|litre|litres|ltr|l|bottle|bottles|dozen|dozens)/i);
      const amountToRemove = amountMatch ? Number(amountMatch[1]) : null;

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
        if (amountToRemove && amountToRemove > 0) {
          const currentQty = itemToRemove.qty || 1;
          const newQty = Math.max(0, currentQty - amountToRemove);
          if (newQty <= 0) {
            removeFromCart(itemToRemove.id);
            setConversation((prev) => [...prev, { role: "assistant", text: `${itemToRemove.name} has been removed from your cart.` }]);
          } else {
            removeFromCart(itemToRemove.id);
            addToCart(
              {
                id: itemToRemove.id,
                name: itemToRemove.name,
                price: itemToRemove.price,
                image: itemToRemove.image || "",
                stock: itemToRemove.stock || 100,
              },
              newQty
            );
            setConversation((prev) => [...prev, { role: "assistant", text: `${amountToRemove} ${itemToRemove.name} removed from your cart.` }]);
          }
        } else {
          removeFromCart(itemToRemove.id);
          setConversation((prev) => [...prev, { role: "assistant", text: `${itemToRemove.name} has been removed from your cart.` }]);
        }
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
        const res = await fetch(`${API_URL}/api/ai/chat?stream=true`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            message: inputText,
            history: conversation.map(turn => ({
              role: turn.role,
              text: turn.text
            }))
          }),
        });

        const streamContentType = res.headers.get("content-type") || "";
        let data;
        let assistantText = "";

        if (res.ok && streamContentType.includes("application/x-ndjson") && res.body) {
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";
          let assistantIndex = null;
          let finalPayload = null;

          const appendOrUpdateAssistant = (text) => {
            setConversation((prev) => {
              const next = [...prev];
              if (assistantIndex === null) {
                assistantIndex = next.length;
                next.push({ role: "assistant", text });
              } else {
                next[assistantIndex] = { ...next[assistantIndex], text };
              }
              return next;
            });
          };

          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop();

            for (const line of lines) {
              if (!line.trim()) continue;
              let event;
              try {
                event = JSON.parse(line);
              } catch (err) {
                continue;
              }

              if (event.type === "chunk") {
                assistantText = event.text || assistantText;
                appendOrUpdateAssistant(assistantText);
              } else if (event.type === "done") {
                finalPayload = event.payload;
                assistantText = finalPayload?.reply || assistantText;
                appendOrUpdateAssistant(assistantText);
              } else if (event.type === "error") {
                setConversation((prev) => [...prev, { role: "assistant", text: event.message || "AI Error" }]);
                throw new Error(event.message || "AI Error");
              }
            }
          }

          if (buffer.trim()) {
            try {
              const event = JSON.parse(buffer);
              if (event.type === "done") {
                finalPayload = event.payload;
                assistantText = finalPayload?.reply || assistantText;
                appendOrUpdateAssistant(assistantText);
              }
            } catch (err) {
              // ignore incomplete final buffer
            }
          }

          if (!finalPayload) {
            throw new Error("Incomplete AI stream response");
          }

          data = finalPayload;
        } else {
          const json = await res.json();
          if (!res.ok) {
            const message = json.message || json.error || "AI request failed";
            throw new Error(message);
          }
          data = json;
          assistantText = data.reply || "I can help you shop.";
          setConversation((prev) => [...prev, { role: "assistant", text: assistantText }]);
        }

        setPreviewProducts(data.products || []);
        setPendingAdd(null);

        const parsedProducts = data.products || [];
        const explicitAddPhrase = /\b(add to cart|add this to cart|add it to cart|add.*to cart|buy now|place order)\b/i.test(inputText);
        const shouldAutoAdd = (parsedProducts.length > 0 && (explicitAddPhrase || Boolean(directAdd))) || Boolean(directAdd && !data.needsConfirmation);

        if (shouldAutoAdd) {
          const itemsToAdd = parsedProducts.length > 0
            ? parsedProducts
            : [{
                id: directAdd.id,
                name: directAdd.name,
                price: directAdd.price,
                quantity: directAdd.quantity || 1,
              }];

          for (const item of itemsToAdd) {
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
          }

          if (!streamContentType.includes("application/x-ndjson")) {
            setConversation((prev) => [...prev, { role: "assistant", text: assistantText }]);
          }
          return;
        }

        if (data.needsConfirmation) {
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
          } else if (directAdd) {
            setPendingAdd({
              item: {
                id: directAdd.id,
                name: directAdd.name,
                price: directAdd.price,
                image: "",
                stock: 100,
              },
              quantity: directAdd.quantity || 1,
            });
          }
        }

        if (!streamContentType.includes("application/x-ndjson")) {
          setConversation((prev) => [...prev, { role: "assistant", text: assistantText }]);
        }
      }

    } catch (error) {
      setConversation((prev) => [...prev, { role: "assistant", text: error.message || "Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-200 shadow-[0_10px_35px_rgba(0,0,0,0.06)] p-3 md:p-4 mb-6 flex flex-col h-[520px] max-h-[78vh] overflow-hidden">
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

      <div className="flex-1 min-h-0 rounded-[20px] bg-gray-50 border border-gray-100 p-3 text-sm text-gray-700 mb-3 overflow-y-auto overflow-x-hidden space-y-2">
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

      <div className="flex items-center gap-2 mb-2 shrink-0">
        <label className="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl text-sm text-gray-700">
          <FaUpload size={12} />
          <span>{selectedFile ? selectedFile.name : "Upload list"}</span>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
        </label>
      </div>

      <div className="flex gap-1.5 sm:gap-2 shrink-0 flex-wrap sm:flex-nowrap">
        <button
          onClick={refreshChat}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 sm:px-3 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm"
          title="Refresh chat"
        >
          <FaRedo size={12} className="sm:inline" />
        </button>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Add 2kg apples..."
          className="flex-1 min-w-0 border border-gray-200 rounded-lg sm:rounded-xl px-3 py-2 text-xs sm:text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
        />
        <button
          onClick={handleVoiceToggle}
          className={`px-2.5 sm:px-3 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm transition ${
            isListening ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          title="Voice input"
        >
          {isListening ? <FaMicrophoneSlash size={12} /> : <FaMicrophone size={12} />}
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
          className={`px-2.5 sm:px-3 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm transition ${
            isSpeaking ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          title="Read aloud"
        >
          {isSpeaking ? <FaStop size={12} /> : <FaVolumeUp size={12} />}
        </button>
        <button
          onClick={handleSend}
          disabled={loading || (!message.trim() && !selectedFile)}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-2.5 sm:px-3 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm transition"
        >
          {loading ? "..." : <FaPaperPlane size={12} className="sm:inline" />}
        </button>
      </div>
    </div>
  );
}
