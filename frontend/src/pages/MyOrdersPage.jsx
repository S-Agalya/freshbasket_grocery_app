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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate(-1)} className="text-green-700 hover:underline mb-4 flex items-center gap-1 font-medium">
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>

        {!phone && (
          <p className="text-gray-500">No phone number found. Please place an order first.</p>
        )}

        {/* Filter pills */}
        {orders.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filterOptions.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition
                  ${filter === s ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-600 border-gray-300 hover:border-green-400"}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {loading && <p className="text-gray-500">Loading your orders...</p>}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🛒</p>
            <p className="text-gray-500 text-lg">No orders found.</p>
            <button onClick={() => navigate("/welcome")} className="mt-4 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700">
              Start Shopping
            </button>
          </div>
        )}

        <div className="space-y-4">
          {filtered.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow p-5">
              {/* Header row */}
              <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                <div>
                  <span className="text-xs text-gray-400">Order ID</span>
                  <p className="font-bold text-gray-800">#{order.id}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400">Date</span>
                  <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" })}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400">Total</span>
                  <p className="font-bold text-green-600">₹{order.total_amount}</p>
                </div>
              </div>

              {/* Tracking timeline */}
              <TrackingTimeline status={order.status} />

              {/* Items */}
              <div className="mt-4 border-t pt-3 space-y-2">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">{item.name}</p>
                      <p className="text-xs text-gray-500">x{item.quantity} · ₹{item.price} each</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-700">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Delivery address */}
              <div className="mt-3 text-xs text-gray-500 border-t pt-2">
                📍 {order.address}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
