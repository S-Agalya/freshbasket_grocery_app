
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { CartContext } from "../context/CartContext";
import { FaPlus, FaMinus, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaBolt } from "react-icons/fa";

const CATEGORIES = [
  { label: "Vegetables",         emoji: "🥦", bg: "bg-green-50",  border: "border-green-100",  text: "text-green-700" },
  { label: "Fruits",             emoji: "🍎", bg: "bg-red-50",    border: "border-red-100",    text: "text-red-600"   },
  { label: "Groceries",          emoji: "🛒", bg: "bg-yellow-50", border: "border-yellow-100", text: "text-yellow-700"},
  { label: "Dairy",              emoji: "🥛", bg: "bg-blue-50",   border: "border-blue-100",   text: "text-blue-600"  },
  { label: "Soaps & Detergents", emoji: "🧴", bg: "bg-purple-50", border: "border-purple-100", text: "text-purple-600", display: "Care" },
  { label: "Snacks",             emoji: "🍪", bg: "bg-orange-50", border: "border-orange-100", text: "text-orange-600" },
];

const BANNERS = [
  { grad: "from-green-600 to-emerald-400",  emoji: "🥦", title: "Fresh Veggies Daily",    sub: "Farm-fresh, every morning", cta: "Vegetables" },
  { grad: "from-orange-500 to-yellow-400",  emoji: "🍎", title: "Seasonal Fruits",        sub: "Handpicked, delivered fast", cta: "Fruits"     },
  { grad: "from-blue-600 to-cyan-400",      emoji: "🥛", title: "Pure Dairy Products",    sub: "Fresh milk, curd & more",   cta: "Dairy"      },
  { grad: "from-purple-600 to-fuchsia-400", emoji: "🍪", title: "Crunchy Snacks",         sub: "Munchies for every mood",   cta: "Snacks"     },
];

export default function WelcomePage() {
  const navigate = useNavigate();
  const { addToCart, cartItems, increaseQty, decreaseQty } = useContext(CartContext);
  const username = localStorage.getItem("username") || "User";
  const [slide, setSlide] = useState(0);
  const [buyAgainItems, setBuyAgainItems] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch buy-again items
  useEffect(() => {
    const phone = localStorage.getItem("phone") || localStorage.getItem("customerPhone");
    if (!phone) return;
    fetch(`${API_URL}/api/orders/by-phone/${encodeURIComponent(phone)}`)
      .then(r => r.ok ? r.json() : [])
      .then(orders => {
        if (!Array.isArray(orders) || orders.length === 0) return;
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
      })
      .catch(() => {});
  }, [API_URL]);

  // Auto-advance banner
  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % BANNERS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const getQty = (id) => cartItems.find(i => i.id === id)?.qty || 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <Header username={username} />

      <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-4">

        {/* Delivery badge */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
            <FaMapMarkerAlt size={12} className="text-green-600" />
            <span className="text-xs font-semibold text-gray-700">Your Location</span>
          </div>
          <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1.5">
            <FaBolt size={10} className="text-green-600" />
            <span className="text-xs font-bold text-green-700">10–20 min delivery</span>
          </div>
        </div>

        {/* Greeting */}
        <div className="mb-5">
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">
            Hey, {username.split(" ")[0]}! 👋
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">What would you like to order today?</p>
        </div>

        <div className="mb-6 rounded-[24px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-4 shadow-[0_12px_35px_rgba(16,185,129,0.08)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-600">FreshBasket AI</p>
              <h2 className="mt-1 text-base font-bold text-gray-900">Need help shopping?</h2>
              <p className="mt-1 text-sm text-gray-600">Tap the floating assistant to add items, remove them, or ask for suggestions.</p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-white/80 px-3 py-2 text-xs font-semibold text-emerald-700 shadow-sm">
              Premium help
            </div>
          </div>
        </div>

        {/* Banner Carousel */}
        <div className="relative rounded-2xl overflow-hidden mb-7 select-none">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${slide * 100}%)` }}
            >
              {BANNERS.map((b, i) => (
                <div
                  key={i}
                  className={`flex-shrink-0 w-full bg-gradient-to-br ${b.grad} flex items-center justify-between px-6 py-7 md:py-10`}
                >
                  <div className="text-white max-w-[60%]">
                    <p className="text-[11px] font-semibold uppercase tracking-widest opacity-75 mb-1">Featured</p>
                    <h2 className="text-xl md:text-3xl font-extrabold leading-tight mb-2">{b.title}</h2>
                    <p className="text-xs md:text-sm opacity-80 mb-4 leading-relaxed">{b.sub}</p>
                    <button
                      onClick={() => navigate(`/order?category=${encodeURIComponent(b.cta)}`)}
                      className="bg-white/90 hover:bg-white text-gray-800 font-bold text-xs md:text-sm px-4 py-2 rounded-xl transition shadow-sm active:scale-95"
                    >
                      Shop Now →
                    </button>
                  </div>
                  <span className="text-6xl md:text-8xl ml-2 flex-shrink-0 drop-shadow-lg">{b.emoji}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`rounded-full transition-all duration-300 ${i === slide ? "bg-white w-5 h-1.5" : "bg-white/50 w-1.5 h-1.5"}`}
              />
            ))}
          </div>

          {/* Arrow buttons (desktop) */}
          <button
            onClick={() => setSlide(p => (p - 1 + BANNERS.length) % BANNERS.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/30 text-white p-1.5 rounded-full transition hidden md:flex items-center justify-center"
          >
            <FaChevronLeft size={12} />
          </button>
          <button
            onClick={() => setSlide(p => (p + 1) % BANNERS.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/30 text-white p-1.5 rounded-full transition hidden md:flex items-center justify-center"
          >
            <FaChevronRight size={12} />
          </button>
        </div>

        {/* Shop by Category */}
        <div className="mb-7">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-800">Shop by Category</h2>
            <button
              onClick={() => navigate("/order")}
              className="text-xs text-green-600 font-semibold hover:underline"
            >
              See all →
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
            {CATEGORIES.map(({ label, emoji, bg, border, text, display }) => (
              <button
                key={label}
                onClick={() => navigate(`/order?category=${encodeURIComponent(label)}`)}
                className={`${bg} border ${border} rounded-2xl p-3 md:p-4 flex flex-col items-center gap-1.5 hover:shadow-sm transition active:scale-95`}
              >
                <span className="text-2xl md:text-3xl">{emoji}</span>
                <span className={`text-[11px] md:text-xs font-semibold ${text} text-center leading-tight`}>
                  {display || label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-2.5 mb-7">
          {[
            { icon: "⚡", title: "10-Min Delivery", sub: "Ultra fast", bg: "#fef9c3", border: "#fde68a" },
            { icon: "🌿", title: "100% Fresh",      sub: "Farm to door", bg: "#f0fdf4", border: "#bbf7d0" },
            { icon: "🔒", title: "Safe Payments",   sub: "100% secure",  bg: "#eff6ff", border: "#bfdbfe" },
          ].map(({ icon, title, sub, bg, border }) => (
            <div key={title} className="rounded-2xl p-3 flex flex-col items-center text-center"
              style={{ background: bg, border: `1px solid ${border}` }}>
              <span className="text-xl mb-1">{icon}</span>
              <p className="text-[11px] font-bold text-gray-800 leading-tight">{title}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Buy it Again */}
        {buyAgainItems.length > 0 && (
          <div className="mb-7">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-gray-800">🔁 Buy it Again</h2>
              <button
                onClick={() => navigate("/my-orders")}
                className="text-xs text-green-600 font-semibold hover:underline"
              >
                My Orders →
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide">
              {buyAgainItems.map((item) => {
                const qty = getQty(item.id);
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm flex-shrink-0 w-36 overflow-hidden flex flex-col"
                  >
                    <div
                      className="bg-[#f8f9fa] p-2 cursor-pointer"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-24 object-contain"
                        />
                      )}
                    </div>
                    <div className="p-2.5 flex flex-col flex-grow">
                      <p className="text-xs font-semibold text-gray-800 line-clamp-2 mb-1 leading-tight">{item.name}</p>
                      <p className="text-sm font-bold text-gray-900 mb-2">₹{item.price}</p>
                      {qty === 0 ? (
                        <button
                          onClick={() => item.stock > 0 && addToCart({ ...item, qty: 1 })}
                          disabled={item.stock <= 0}
                          className={`w-full py-1.5 rounded-xl text-xs font-bold border transition active:scale-95 ${
                            item.stock > 0
                              ? "border-green-500 text-green-600 hover:bg-green-600 hover:text-white"
                              : "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                          }`}
                        >
                          {item.stock > 0 ? "+ Add" : "Out of Stock"}
                        </button>
                      ) : (
                        <div className="flex items-center justify-between rounded-xl py-1.5 px-2"
                          style={{ background: "linear-gradient(135deg,#16a34a,#059669)" }}>
                          <button onClick={() => decreaseQty(item.id)} className="text-white flex items-center justify-center">
                            <FaMinus size={9} />
                          </button>
                          <span className="text-white text-xs font-bold">{qty}</span>
                          <button onClick={() => increaseQty(item.id)} className="text-white flex items-center justify-center">
                            <FaPlus size={9} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick-access tiles */}
        <div className="mb-7">
          <h2 className="text-base font-bold text-gray-800 mb-3">Quick Access</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "📦", label: "My Orders",  path: "/my-orders", bg: "#f0fdf4", border: "#bbf7d0", text: "#15803d" },
              { icon: "❤️", label: "Wishlist",   path: "/wishlist",  bg: "#fff1f2", border: "#fecdd3", text: "#e11d48" },
              { icon: "👤", label: "My Profile", path: "/profile",   bg: "#eff6ff", border: "#bfdbfe", text: "#1d4ed8" },
              { icon: "🛒", label: "Browse All", path: "/order",     bg: "#fefce8", border: "#fde68a", text: "#b45309" },
            ].map(({ icon, label, path, bg, border, text }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="flex items-center gap-3 p-3.5 rounded-2xl hover:shadow-sm transition active:scale-95"
                style={{ background: bg, border: `1px solid ${border}` }}
              >
                <span className="text-xl">{icon}</span>
                <span className="text-sm font-semibold" style={{ color: text }}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}


