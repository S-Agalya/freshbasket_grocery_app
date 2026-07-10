import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBell, FaSearch, FaTimes, FaHeart, FaLeaf, FaUser, FaSignOutAlt } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { getWishlist } from "../utils/wishlist";

const STATUS_COLORS = {
  Pending:   "text-yellow-600",
  Confirmed: "text-blue-600",
  Packed:    "text-purple-600",
  Shipped:   "text-indigo-600",
  Delivered: "text-green-600",
  Cancelled: "text-red-600",
};

/* ── Small avatar used in the header profile button ── */
function HeaderAvatar({ username }) {
  const [err, setErr] = useState(false);
  const email = localStorage.getItem("email") || "";
  const src = !err && email
    ? `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(email)}&backgroundColor=b6e3f4,ffd5dc,c0aede`
    : null;
  const initial = username ? username.charAt(0).toUpperCase() : "?";
  return (
    <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center"
      style={{ background: "linear-gradient(135deg,#16a34a,#059669)" }}>
      {src ? (
        <img src={src} alt="avatar" className="w-full h-full object-cover"
          style={{ background: "#e0f2fe" }} onError={() => setErr(true)} />
      ) : (
        <span className="text-white font-bold text-xs">{initial}</span>
      )}
    </div>
  );
}

const Header = ({ username = "User", onMenuToggle }) => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const API_URL = import.meta.env.VITE_API_URL;

  // ── Search ──────────────────────────────────────────
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  const handleSearch = useCallback((val) => {
    setQuery(val);
    clearTimeout(debounceRef.current);
    if (!val.trim()) { setResults([]); setShowResults(false); return; }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/search?q=${encodeURIComponent(val)}`);
        setResults(res.data);
        setShowResults(true);
      } catch { setResults([]); }
    }, 300);
  }, [API_URL]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (searchRef.current && !searchRef.current.contains(e.target)) setShowResults(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Notifications ────────────────────────────────────
  const [orders, setOrders] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [seenStatuses, setSeenStatuses] = useState(() => {
    try { return JSON.parse(localStorage.getItem("seenOrderStatuses") || "{}"); } catch { return {}; }
  });
  const notifRef = useRef(null);
  const phone = localStorage.getItem("phone") || localStorage.getItem("customerPhone");

  const fetchOrders = useCallback(async () => {
    if (!phone) return;
    try {
      const res = await axios.get(`${API_URL}/api/orders/by-phone/${encodeURIComponent(phone)}`);
      setOrders(res.data);
    } catch { /* silent */ }
  }, [API_URL, phone]);

  useEffect(() => { fetchOrders(); const t = setInterval(fetchOrders, 30000); return () => clearInterval(t); }, [fetchOrders]);

  useEffect(() => {
    const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unreadCount = orders.filter(o => seenStatuses[o.id] !== o.status).length;
  const wishlistCount = getWishlist().length;

  const handleOpenNotif = () => {
    setShowNotif(v => !v);
    const updated = orders.reduce((acc, o) => { acc[o.id] = o.status; return acc; }, {});
    setSeenStatuses(updated);
    localStorage.setItem("seenOrderStatuses", JSON.stringify(updated));
  };

  const handleLogout = () => { clearCart(); localStorage.clear(); navigate("/login"); };
  const handleProfile = () => navigate("/profile");

  return (
    <header className="sticky top-0 z-40 bg-white" style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)" }}>
      <div className="flex items-center gap-3 px-4 py-3 max-w-screen-xl mx-auto">
        {/* Hamburger (mobile) */}
        {onMenuToggle && (
          <button
            className="md:hidden p-2 rounded-xl transition"
            style={{ color: "#0f3d22", background: "rgba(15,61,34,0.07)" }}
            onClick={onMenuToggle}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {/* Logo */}
        <button onClick={() => navigate("/welcome")} className="flex items-center gap-2 shrink-0">
          <div className="p-1.5 rounded-xl" style={{ background: "linear-gradient(135deg,#16a34a,#059669)" }}>
            <FaLeaf size={15} className="text-white" />
          </div>
          <span className="font-extrabold text-lg hidden sm:block tracking-tight">
            <span style={{ color: "#0f3d22" }}>Fresh</span>
            <span style={{ background: "linear-gradient(90deg,#16a34a,#059669)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Basket</span>
          </span>
        </button>

        {/* Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-xl mx-auto">
          <div className="flex items-center rounded-2xl px-4 py-2.5 transition-all"
            style={{ background: "#f3f7f4", border: "1.5px solid #e2ede6" }}>
            <FaSearch className="shrink-0 mr-2.5" size={13} style={{ color: "#6b9e7a" }} />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search vegetables, fruits, dairy…"
              className="bg-transparent outline-none text-sm w-full placeholder-gray-400"
              style={{ color: "#1a1a1a" }}
            />
            {query && (
              <FaTimes size={13} className="cursor-pointer ml-1 shrink-0 text-gray-400 hover:text-gray-600"
                onClick={() => { setQuery(""); setResults([]); setShowResults(false); }} />
            )}
          </div>

          {showResults && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl z-50 max-h-52 sm:max-h-72 overflow-y-auto"
              style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)", border: "1px solid rgba(0,0,0,0.06)" }}>
              {results.map((p) => (
                <div key={p.id}
                  onClick={() => { navigate(`/product/${p.id}`); setShowResults(false); setQuery(""); }}
                  className="flex items-center gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 cursor-pointer border-b border-gray-50 last:border-0 hover:bg-green-50 transition">
                  {p.image && <img src={p.image} alt={p.name} className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg bg-gray-50 flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">{p.name}</p>
                    <p className="text-[10px] sm:text-xs text-gray-400">{p.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs sm:text-sm font-bold text-green-700">₹{p.price}</p>
                    <span className={`text-[10px] sm:text-xs ${p.stock > 0 ? "text-emerald-500" : "text-red-400"}`}>
                      {p.stock > 0 ? "In Stock" : "Out"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {showResults && results.length === 0 && query.trim() && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl z-50 px-4 py-3 text-xs sm:text-sm text-gray-400 text-center"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.1)", border: "1px solid rgba(0,0,0,0.06)" }}>
              No results for "<span className="text-gray-700 font-medium">{query}</span>"
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Bell */}
          {phone && (
            <div ref={notifRef} className="relative">
              <button onClick={handleOpenNotif}
                className="relative p-2 rounded-xl transition text-gray-500 hover:text-green-700 hover:bg-green-50">
                <FaBell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotif && (
                <div
                  className="absolute right-0 top-12 bg-white rounded-2xl z-50 overflow-hidden"
                  style={{
                    width: "min(300px, calc(100vw - 1rem))",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.14)",
                    border: "1px solid rgba(0,0,0,0.07)",
                  }}
                >
                  <div className="px-3 py-2.5 flex justify-between items-center"
                    style={{ background: "linear-gradient(90deg,#f0fdf4,#ecfdf5)", borderBottom: "1px solid #d1fae5" }}>
                    <span className="font-bold text-gray-800 text-xs sm:text-sm">My Orders</span>
                    <button onClick={() => { navigate("/my-orders"); setShowNotif(false); }}
                      className="text-[11px] sm:text-xs text-green-700 font-semibold hover:underline">View all →</button>
                  </div>
                  {orders.length === 0 ? (
                    <p className="text-xs text-gray-400 p-3 text-center">No orders yet.</p>
                  ) : (
                    <div className="max-h-52 sm:max-h-64 overflow-y-auto">
                      {orders.slice(0, 5).map((o) => (
                        <div key={o.id}
                          onClick={() => { navigate("/my-orders"); setShowNotif(false); }}
                          className="px-3 py-2.5 hover:bg-green-50 cursor-pointer border-b border-gray-50 last:border-0 transition">
                          <div className="flex justify-between items-center gap-2">
                            <span className="text-xs font-semibold text-gray-700">Order #{o.id}</span>
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-gray-100 whitespace-nowrap ${STATUS_COLORS[o.status] || "text-gray-600"}`}>{o.status}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-0.5">₹{o.total_amount} · {new Date(o.created_at).toLocaleDateString("en-IN")}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Wishlist */}
          <button onClick={() => navigate("/wishlist")}
            className="relative p-2 rounded-xl transition text-gray-500 hover:text-red-500 hover:bg-red-50">
            <FaHeart size={17} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button onClick={() => navigate("/cart")}
            className="relative flex items-center gap-2 text-white px-3.5 py-2 rounded-xl transition font-semibold text-sm shadow-sm"
            style={{ background: "linear-gradient(135deg,#16a34a,#059669)" }}>
            <FaShoppingCart size={15} />
            <span className="hidden sm:block">Cart</span>
            {totalQty > 0 && (
              <span className="bg-white text-green-700 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalQty}
              </span>
            )}
          </button>

          {/* Profile dropdown */}
          <div className="relative group ml-1">
            <button className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-gray-100 transition">
              <HeaderAvatar username={username} />
              <span className="text-sm font-medium text-gray-700 hidden md:block max-w-[80px] truncate capitalize">{username}</span>
            </button>
            <div className="absolute right-0 top-11 w-44 bg-white rounded-2xl z-50 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid rgba(0,0,0,0.07)" }}>
              <button onClick={() => navigate("/profile")}
                className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition">
                <FaUser size={12} /> Profile
              </button>
              <button onClick={() => navigate("/my-orders")}
                className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition">
                🛍 My Orders
              </button>
              <div className="h-px bg-gray-100 mx-3" />
              <button onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition">
                <FaSignOutAlt size={12} /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
