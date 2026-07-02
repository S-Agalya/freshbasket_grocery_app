import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaBell, FaSearch, FaTimes } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import axios from "axios";

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

  const handleOpenNotif = () => {
    setShowNotif(v => !v);
    const updated = orders.reduce((acc, o) => { acc[o.id] = o.status; return acc; }, {});
    setSeenStatuses(updated);
    localStorage.setItem("seenOrderStatuses", JSON.stringify(updated));
  };

  const handleLogout = () => { localStorage.removeItem("username"); navigate("/login"); };
  const handleProfile = () => navigate("/profile");

  return (
    <header className="flex items-center justify-between px-4 py-3 shadow bg-white relative gap-3 flex-wrap">
      {/* Hamburger */}
      {onMenuToggle && (
        <button className="md:hidden text-3xl text-green-700 p-2 rounded-full shadow-lg" onClick={onMenuToggle}>☰</button>
      )}

      <h1 className="text-xl md:text-2xl font-bold text-green-700 whitespace-nowrap">
        Welcome, <span className="capitalize">{username}</span>
      </h1>

      {/* Search Bar */}
      <div ref={searchRef} className="relative flex-1 max-w-sm mx-2">
        <div className="flex items-center border border-gray-300 rounded-full px-3 py-1.5 bg-gray-50 focus-within:ring-2 focus-within:ring-green-400">
          <FaSearch className="text-gray-400 mr-2 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search products..."
            className="bg-transparent outline-none text-sm w-full"
          />
          {query && <FaTimes className="text-gray-400 cursor-pointer ml-1" onClick={() => { setQuery(""); setResults([]); setShowResults(false); }} />}
        </div>

        {/* Dropdown results */}
        {showResults && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-72 overflow-y-auto">
            {results.map((p) => (
              <div
                key={p.id}
                onClick={() => { navigate(`/product/${p.id}`); setShowResults(false); setQuery(""); }}
                className="flex items-center gap-3 px-4 py-2 hover:bg-green-50 cursor-pointer"
              >
                {p.image && <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded" />}
                <div>
                  <p className="text-sm font-medium text-gray-800">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.category} · ₹{p.price}</p>
                </div>
                <span className={`ml-auto text-xs font-semibold ${p.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                  {p.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            ))}
          </div>
        )}
        {showResults && results.length === 0 && query.trim() && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 px-4 py-3 text-sm text-gray-500">
            No products found for "{query}"
          </div>
        )}
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-3">
        {/* Notification Bell */}
        {phone && (
          <div ref={notifRef} className="relative">
            <button onClick={handleOpenNotif} className="relative text-gray-600 hover:text-green-700 p-2">
              <FaBell size={22} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{unreadCount}</span>
              )}
            </button>

            {showNotif && (
              <div className="absolute right-0 top-10 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 max-h-96 overflow-y-auto">
                <div className="px-4 py-3 border-b font-semibold text-gray-700 flex justify-between items-center">
                  <span>My Orders</span>
                  <button onClick={() => navigate("/my-orders")} className="text-xs text-green-600 hover:underline">View all</button>
                </div>
                {orders.length === 0 ? (
                  <p className="text-sm text-gray-500 p-4">No orders yet.</p>
                ) : (
                  orders.slice(0, 5).map((o) => (
                    <div key={o.id} className="px-4 py-3 border-b hover:bg-gray-50 cursor-pointer" onClick={() => { navigate("/my-orders"); setShowNotif(false); }}>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Order #{o.id}</span>
                        <span className={`text-xs font-semibold ${STATUS_COLORS[o.status] || "text-gray-600"}`}>{o.status}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">₹{o.total_amount} · {new Date(o.created_at).toLocaleDateString("en-IN")}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Cart */}
        <button onClick={() => navigate("/cart")} className="relative bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow transition" aria-label="Cart">
          <FaShoppingCart className="w-5 h-5" />
          {totalQty > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">{totalQty}</span>
          )}
        </button>

        <FaUserCircle onClick={handleProfile} size={28} className="text-green-700 hover:text-green-800 cursor-pointer transition" aria-label="Profile" />

        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded shadow transition text-sm">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;


const Header = ({ username = "User", onMenuToggle }) => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 shadow bg-white relative">
      {/* Mobile Hamburger */}
      {onMenuToggle && (
        <button
          className="md:hidden text-3xl text-green-700 p-2 rounded-full shadow-lg"
          onClick={onMenuToggle}
        >
          ☰
        </button>
      )}

      <h1 className="text-xl md:text-2xl font-bold text-green-700 text-center flex-1">
        Welcome, <span className="capitalize">{username}</span>
      </h1>

      {/* Profile + Cart + Logout */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => navigate("/cart")}
          className="relative bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow transition"
          aria-label="Cart"
        >
          <FaShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
          {totalQty > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] md:text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalQty}
            </span>
          )}
        </button>

        <FaUserCircle
          onClick={handleProfile}
          size={28}
          className="text-green-700 hover:text-green-800 cursor-pointer transition"
          aria-label="Profile"
        />

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded shadow transition text-sm md:text-base"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
