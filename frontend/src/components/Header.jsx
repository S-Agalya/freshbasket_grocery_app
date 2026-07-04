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

const Header = ({ username = "User", onMenuToggle }) => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
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

  const handleLogout = () => { localStorage.removeItem("username"); navigate("/login"); };
  const handleProfile = () => navigate("/profile");

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 px-4 py-3 max-w-screen-xl mx-auto">
        {/* Hamburger (mobile) */}
        {onMenuToggle && (
          <button className="md:hidden text-green-700 p-1.5 rounded-lg hover:bg-green-50 transition" onClick={onMenuToggle}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        )}

        {/* Logo */}
        <button onClick={() => navigate("/welcome")} className="flex items-center gap-2 shrink-0">
          <div className="bg-green-600 text-white p-1.5 rounded-lg">
            <FaLeaf size={16} />
          </div>
          <span className="font-extrabold text-lg text-gray-900 hidden sm:block">Fresh<span className="text-green-600">Basket</span></span>
        </button>

        {/* Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-xl mx-auto">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent focus-within:bg-white transition">
            <FaSearch className="text-gray-400 shrink-0 mr-2" size={14} />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for fruits, vegetables, dairy..."
              className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-400"
            />
            {query && <FaTimes size={14} className="text-gray-400 cursor-pointer hover:text-gray-600 ml-1 shrink-0" onClick={() => { setQuery(""); setResults([]); setShowResults(false); }} />}
          </div>

          {showResults && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto">
              {results.map((p) => (
                <div key={p.id} onClick={() => { navigate(`/product/${p.id}`); setShowResults(false); setQuery(""); }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-gray-50 last:border-0">
                  {p.image && <img src={p.image} alt={p.name} className="w-10 h-10 object-contain rounded-lg bg-gray-50" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-green-600">₹{p.price}</p>
                    <span className={`text-xs ${p.stock > 0 ? "text-green-500" : "text-red-400"}`}>{p.stock > 0 ? "In Stock" : "Out of Stock"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {showResults && results.length === 0 && query.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 px-4 py-4 text-sm text-gray-400 text-center">
              No results for "<span className="text-gray-600 font-medium">{query}</span>"
            </div>
          )}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Bell */}
          {phone && (
            <div ref={notifRef} className="relative">
              <button onClick={handleOpenNotif} className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-600 hover:text-green-600 transition">
                <FaBell size={19} />
                {unreadCount > 0 && <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">{unreadCount}</span>}
              </button>
              {showNotif && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b flex justify-between items-center">
                    <span className="font-semibold text-gray-800 text-sm">My Orders</span>
                    <button onClick={() => { navigate("/my-orders"); setShowNotif(false); }} className="text-xs text-green-600 font-medium hover:underline">View all →</button>
                  </div>
                  {orders.length === 0 ? (
                    <p className="text-sm text-gray-400 p-4 text-center">No orders yet.</p>
                  ) : (
                    <div className="max-h-72 overflow-y-auto">
                      {orders.slice(0, 5).map((o) => (
                        <div key={o.id} onClick={() => { navigate("/my-orders"); setShowNotif(false); }}
                          className="px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-gray-50 last:border-0">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-700">Order #{o.id}</span>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 ${STATUS_COLORS[o.status] || "text-gray-600"}`}>{o.status}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">₹{o.total_amount} · {new Date(o.created_at).toLocaleDateString("en-IN")}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Wishlist */}
          <button onClick={() => navigate("/wishlist")} className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-600 hover:text-red-500 transition">
            <FaHeart size={18} />
            {wishlistCount > 0 && <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold">{wishlistCount}</span>}
          </button>

          {/* Cart */}
          <button onClick={() => navigate("/cart")} className="relative flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-xl transition shadow-sm">
            <FaShoppingCart size={16} />
            <span className="text-sm font-semibold hidden sm:block">Cart</span>
            {totalQty > 0 && <span className="bg-white text-green-700 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{totalQty}</span>}
          </button>

          {/* Profile dropdown button */}
          <div className="relative group ml-1">
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition">
              <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center">
                <FaUser size={12} className="text-green-700" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:block max-w-[80px] truncate capitalize">{username}</span>
            </button>
            <div className="absolute right-0 top-11 w-44 bg-white rounded-xl shadow-xl border border-gray-100 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <button onClick={() => navigate("/profile")} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-t-xl">
                <FaUser size={12} /> Profile
              </button>
              <button onClick={() => navigate("/my-orders")} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700">
                🛍 My Orders
              </button>
              <hr className="border-gray-100" />
              <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-b-xl">
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

