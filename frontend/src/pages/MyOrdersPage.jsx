import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const STAGES = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered"];

const STAGE_ICONS = {
  Pending:   "🕐",
  Confirmed: "✅",
  Packed:    "📦",
  Shipped:   "🚚",
  Delivered: "🏠",
  Cancelled: "❌",
};

function TrackingTimeline({ status }) {
  if (status === "Cancelled") {
    return (
      <div className="flex items-center gap-2 text-red-500 font-medium mt-2">
        <span className="text-lg">❌</span> Order Cancelled
      </div>
    );
  }
  const currentIndex = STAGES.indexOf(status);
  return (
    <div className="flex items-center gap-1 mt-3 overflow-x-auto pb-1">
      {STAGES.map((stage, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <div key={stage} className="flex items-center">
            <div className="flex flex-col items-center min-w-[60px]">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${done ? "bg-green-500 text-white" : active ? "bg-green-600 text-white ring-2 ring-green-300" : "bg-gray-200 text-gray-400"}`}>
                {done ? "✓" : STAGE_ICONS[stage]}
              </div>
              <span className={`text-[10px] mt-1 text-center leading-tight ${active ? "text-green-700 font-semibold" : done ? "text-green-500" : "text-gray-400"}`}>
                {stage}
              </span>
            </div>
            {i < STAGES.length - 1 && (
              <div className={`h-1 w-6 rounded mx-0.5 mb-3 ${i < currentIndex ? "bg-green-500" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function MyOrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const API_URL = import.meta.env.VITE_API_URL;
  const phone = localStorage.getItem("phone") || localStorage.getItem("customerPhone");

  useEffect(() => {
    if (!phone) { setLoading(false); return; }
    axios.get(`${API_URL}/api/orders/by-phone/${encodeURIComponent(phone)}`)
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [API_URL, phone]);

  const filterOptions = ["All", ...new Set(orders.map(o => o.status))];
  const filtered = filter === "All" ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="min-h-screen pb-24 md:pb-8" style={{ background: "#f5f7f5" }}>
      {/* Header */}
      <div className="bg-white sticky top-0 z-30"
        style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.06),0 4px 12px rgba(0,0,0,0.04)" }}>
        <div className="max-w-screen-xl mx-auto flex items-center gap-3 px-4 py-3.5">
          <button onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition">
            <span className="text-sm">←</span>
          </button>
          <div>
            <h1 className="text-base font-extrabold text-gray-900 leading-none">My Orders</h1>
            {orders.length > 0 && (
              <p className="text-xs text-gray-400 mt-0.5">{orders.length} order{orders.length > 1 ? "s" : ""}</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-3 py-4 md:px-6">
        {!phone && (
          <p className="text-gray-500 text-sm">No phone number found. Please place an order first.</p>
        )}

        {/* Filter pills */}
        {orders.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filterOptions.map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${
                  filter === s
                    ? "text-white border-transparent"
                    : "bg-white text-gray-600 border-gray-200 hover:border-green-400"
                }`}
                style={filter === s ? { background: "linear-gradient(135deg,#16a34a,#059669)" } : {}}>
                {s}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl h-28 animate-pulse"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-gray-800 font-bold mb-1">No orders yet</p>
            <p className="text-gray-400 text-sm mb-6">Your placed orders will appear here.</p>
            <button onClick={() => navigate("/order")}
              className="text-white font-bold px-7 py-2.5 rounded-2xl text-sm shadow-md"
              style={{ background: "linear-gradient(135deg,#16a34a,#059669)" }}>
              Start Shopping
            </button>
          </div>
        )}

        <div className="space-y-3">
          {filtered.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.04)" }}>
              {/* Card header */}
              <div className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid #f3f4f6" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                    style={{ background: "#f0fdf4" }}>
                    📦
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Order #{order.id}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(order.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold" style={{ color: "#0f3d22" }}>₹{order.total_amount}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 ${
                    order.status === "Delivered" ? "text-green-600" :
                    order.status === "Cancelled" ? "text-red-500" :
                    order.status === "Shipped"   ? "text-blue-600" : "text-yellow-600"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Tracking timeline */}
              <div className="px-4 pb-1">
                <TrackingTimeline status={order.status} />
              </div>

              {/* Items */}
              {order.items?.length > 0 && (
                <div className="px-4 pb-3 pt-2 space-y-2" style={{ borderTop: "1px solid #f3f4f6" }}>
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {item.image && (
                        <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain p-0.5" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 truncate">{item.name}</p>
                        <p className="text-[10px] text-gray-400">×{item.quantity} · ₹{item.price} each</p>
                      </div>
                      <p className="text-xs font-bold text-gray-700 flex-shrink-0">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Address */}
              {order.address && (
                <div className="px-4 py-2 text-[10px] text-gray-400"
                  style={{ borderTop: "1px solid #f3f4f6" }}>
                  📍 {order.address}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
