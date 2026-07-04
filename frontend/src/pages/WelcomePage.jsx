import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { CartContext } from "../context/CartContext";

import vegetablesImage from "../assets/vegetables.jpg";
import fruitsImage from "../assets/fruits.jpg";
import groceriesImage from "../assets/groceries.png";
import dairyImage from "../assets/dairy.jpg";
import soapsImage from "../assets/soapsanddetergent.jpg";
import snacksImage from "../assets/snacks.jpeg";

const categories = [
  "Vegetables",
  "Fruits",
  "Groceries",
  "Dairy",
  "Soaps & Detergents",
  "Snacks",
];

const images = [
  vegetablesImage,
  fruitsImage,
  groceriesImage,
  dairyImage,
  soapsImage,
  snacksImage,
];

export default function WelcomePage() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const username = localStorage.getItem("username") || "User";
  const [slide, setSlide] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [buyAgainItems, setBuyAgainItems] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const phone = localStorage.getItem("phone") || localStorage.getItem("customerPhone");
    if (!phone) return;
    fetch(`${API_URL}/api/orders/by-phone/${encodeURIComponent(phone)}`)
      .then(r => r.ok ? r.json() : [])
      .then(orders => {
        if (Array.isArray(orders) && orders.length > 0) {
          // Unique products from the most recent order
          const seen = new Set();
          const items = [];
          for (const order of orders) {
            for (const item of (order.items || [])) {
              if (!seen.has(item.id)) { seen.add(item.id); items.push(item); }
              if (items.length >= 10) break;
            }
            if (items.length >= 10) break;
          }
          setBuyAgainItems(items);
        }
      })
      .catch(() => {});
  }, [API_URL]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goPrev = () => setSlide((prev) => (prev - 1 + images.length) % images.length);
  const goNext = () => setSlide((prev) => (prev + 1) % images.length);

  const handleCategoryClick = (category) => {
    setSidebarOpen(false);
    navigate(`/order?category=${encodeURIComponent(category)}`);
  };

  const categoryCards = [
    { label: "Vegetables", emoji: "🥦", color: "bg-green-50 border-green-200 hover:bg-green-100" },
    { label: "Fruits", emoji: "🍎", color: "bg-red-50 border-red-200 hover:bg-red-100" },
    { label: "Groceries", emoji: "🛒", color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100" },
    { label: "Dairy", emoji: "🥛", color: "bg-blue-50 border-blue-200 hover:bg-blue-100" },
    { label: "Soaps & Detergents", emoji: "🧴", color: "bg-purple-50 border-purple-200 hover:bg-purple-100" },
    { label: "Snacks", emoji: "🍪", color: "bg-orange-50 border-orange-200 hover:bg-orange-100" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header username={username} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

      <Sidebar
        categories={categories}
        selectedCategory={null}
        onSelectCategory={handleCategoryClick}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="md:ml-72 px-4 md:px-8 py-6">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-6 md:p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 flex items-center justify-end pr-6">
            <span className="text-8xl">🛒</span>
          </div>
          <p className="text-green-100 text-sm font-medium mb-1">Hello, {username}! 👋</p>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
            What would you like<br />to order today?
          </h1>
          <p className="text-green-100 text-sm mb-5">Fresh groceries, delivered fast to your door.</p>
          <button
            onClick={() => navigate("/order")}
            className="bg-white text-green-700 font-semibold px-6 py-2.5 rounded-xl hover:bg-green-50 transition text-sm shadow-sm"
          >
            Shop Now →
          </button>
        </div>

        {/* Category Grid */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categoryCards.map(({ label, emoji, color }) => (
              <button
                key={label}
                onClick={() => handleCategoryClick(label)}
                className={`${color} border rounded-2xl p-4 flex flex-col items-center gap-2 transition cursor-pointer`}
              >
                <span className="text-3xl">{emoji}</span>
                <span className="text-xs font-semibold text-gray-700 text-center leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Buy it Again */}
        {buyAgainItems.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">🔁 Buy it Again</h2>
              <button onClick={() => navigate("/my-orders")} className="text-sm text-green-600 font-medium hover:underline">View orders →</button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {buyAgainItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 shrink-0 w-36 flex flex-col items-center hover:shadow-md transition">
                  {item.image && (
                    <img src={item.image} alt={item.name} loading="lazy"
                      className="w-20 h-20 object-contain mb-2 cursor-pointer"
                      onClick={() => navigate(`/product/${item.id}`)} />
                  )}
                  <p className="text-xs font-semibold text-center text-gray-700 mb-1 line-clamp-2 w-full">{item.name}</p>
                  <p className="text-green-600 font-bold text-sm mb-2">₹{item.price}</p>
                  <button
                    onClick={() => addToCart({ ...item, qty: 1 })}
                    disabled={item.stock <= 0}
                    className={`text-white text-xs py-1.5 px-3 rounded-xl w-full font-medium transition
                      ${item.stock > 0 ? "bg-green-600 hover:bg-green-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                  >
                    {item.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

