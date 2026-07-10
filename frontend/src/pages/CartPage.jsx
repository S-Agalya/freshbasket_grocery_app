import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash, FaShoppingBag, FaArrowLeft } from "react-icons/fa";

const CartPage = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal  = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery  = subtotal > 0 && subtotal < 199 ? 29 : 0;
  const total     = subtotal + delivery;

  return (
    <div className="min-h-screen pb-24 md:pb-8" style={{ background: "#f5f7f5" }}>

      {/* Page header */}
      <div className="sticky top-0 z-30 bg-white"
        style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.06),0 4px 16px rgba(0,0,0,0.04)" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-xl transition hover:bg-gray-100 text-gray-500">
              <FaArrowLeft size={14} />
            </button>
            <div>
              <h1 className="text-lg font-extrabold text-gray-900 leading-none">Your Cart</h1>
              {cartItems.length > 0 && (
                <p className="text-xs text-gray-400 mt-0.5">{cartItems.length} item{cartItems.length > 1 ? "s" : ""}</p>
              )}
            </div>
          </div>
          <button onClick={() => navigate("/order")}
            className="text-sm font-semibold text-green-700 flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-green-50 transition">
            <FaShoppingBag size={12} /> Add items
          </button>
        </div>
      </div>

      {cartItems.length === 0 ? (
        /* ── Empty state ── */
        <div className="flex flex-col items-center justify-center py-28 px-4 text-center">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mb-6"
            style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)" }}>
            🛒
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-sm text-gray-400 mb-8 max-w-xs">
            Looks like you haven't added anything yet. Start shopping!
          </p>
          <button onClick={() => navigate("/order")}
            className="text-white font-bold px-8 py-3 rounded-2xl text-sm transition shadow-md"
            style={{ background: "linear-gradient(135deg,#16a34a,#059669)" }}>
            Browse Products →
          </button>
        </div>
      ) : (
        /* ── Cart content ── */
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-5 items-start">

          {/* Left — item list */}
          <div className="flex-1 space-y-3">
            {/* Free delivery banner */}
            {delivery > 0 && (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm"
                style={{ background: "linear-gradient(90deg,#fefce8,#fef9c3)", border: "1px solid #fde68a" }}>
                <span className="text-lg">🚚</span>
                <span className="text-yellow-800 font-medium">
                  Add <strong>₹{199 - subtotal}</strong> more for free delivery!
                </span>
              </div>
            )}
            {delivery === 0 && subtotal > 0 && (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm"
                style={{ background: "linear-gradient(90deg,#f0fdf4,#dcfce7)", border: "1px solid #86efac" }}>
                <span className="text-lg">🎉</span>
                <span className="text-green-800 font-medium">You got <strong>free delivery</strong>!</span>
              </div>
            )}

            {cartItems.map((item) => (
              <div key={item.id}
                className="bg-white rounded-2xl p-4 flex items-center gap-4"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.04)" }}>

                {/* Image */}
                <div className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center"
                  style={{ background: "#f5f7f5" }}>
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                  {item.unit && <p className="text-xs text-gray-400 mt-0.5">{item.unit}</p>}
                  <p className="text-xs font-medium mt-1" style={{ color: "#6b7280" }}>
                    ₹{item.price} × {item.qty} =
                    <span className="font-bold text-gray-900 ml-1">₹{item.price * item.qty}</span>
                  </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="flex items-center gap-1.5 rounded-xl px-1.5 py-1"
                    style={{ background: "linear-gradient(135deg,#16a34a,#059669)" }}>
                    <button onClick={() => decreaseQty(item.id)}
                      className="w-6 h-6 flex items-center justify-center text-white rounded-lg active:scale-90 transition">
                      <FaMinus size={8} />
                    </button>
                    <span className="text-white font-bold text-sm w-5 text-center">{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}
                      className="w-6 h-6 flex items-center justify-center text-white rounded-lg active:scale-90 transition">
                      <FaPlus size={8} />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition hover:bg-red-50 text-red-400 hover:text-red-500">
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right — Order summary (sticky on desktop) */}
          <div className="w-full lg:w-80 lg:sticky lg:top-24 flex-shrink-0">
            <div className="bg-white rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.05)" }}>

              {/* Summary header */}
              <div className="px-5 py-4" style={{ borderBottom: "1px solid #f1f5f1" }}>
                <h3 className="font-extrabold text-gray-900 text-base">Order Summary</h3>
              </div>

              {/* Line items */}
              <div className="px-5 py-4 space-y-2.5">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-500 truncate max-w-[60%]">{item.name} × {item.qty}</span>
                    <span className="font-semibold text-gray-800">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="px-5 pb-5 space-y-2.5" style={{ borderTop: "1px solid #f1f5f1", paddingTop: "1rem" }}>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery</span>
                  <span className={`font-semibold ${delivery === 0 ? "text-green-600" : "text-gray-800"}`}>
                    {delivery === 0 ? "FREE" : `₹${delivery}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2"
                  style={{ borderTop: "1px dashed #e5e7eb" }}>
                  <span>Total</span>
                  <span style={{ color: "#0f3d22" }}>₹{total}</span>
                </div>

                <button
                  onClick={() => navigate("/summary", { state: { items: cartItems, total } })}
                  className="w-full text-white font-bold py-3.5 rounded-2xl text-sm transition mt-2 active:scale-[0.98]"
                  style={{ background: "linear-gradient(135deg,#16a34a,#059669)", boxShadow: "0 4px 14px rgba(22,163,74,0.35)" }}>
                  Proceed to Checkout →
                </button>

                <p className="text-center text-xs text-gray-400 mt-1">
                  Secure checkout · COD available
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
