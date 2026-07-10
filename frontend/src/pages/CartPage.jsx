import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart, setItemQty } = useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-green-600 p-1 rounded-lg hover:bg-gray-100 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-900">Your Cart</h1>
          {cartItems.length > 0 && (
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              {cartItems.length} item{cartItems.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
        <button onClick={() => navigate("/order")} className="text-sm font-medium text-green-600 hover:underline">
          + Add more items
        </button>
      </div>

      {/* Main */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-500 text-lg font-medium mb-2">Your cart is empty</p>
            <p className="text-gray-400 text-sm mb-6">Add some fresh items to get started</p>
            <button onClick={() => navigate("/order")} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition">
              Browse Products
            </button>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="space-y-3 mb-6">
              {cartItems.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-xl bg-gray-50 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm truncate">{item.name}</h3>
                    <p className="text-green-600 font-bold text-sm">
                      ₹{item.price} <span className="text-gray-400 font-normal text-xs">/ {item.unit}</span>
                    </p>
                    <p className="text-gray-400 text-xs">Subtotal: ₹{item.price * item.qty}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => decreaseQty(item.id)} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition flex items-center justify-center">-</button>
                    <input
                      type="number" min="1" value={item.qty}
                      onChange={e => setItemQty(item.id, e.target.value)}
                      className="w-12 text-center border border-gray-200 rounded-lg py-1 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <button onClick={() => increaseQty(item.id)} className="w-8 h-8 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 font-bold transition flex items-center justify-center">+</button>
                    <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition flex items-center justify-center ml-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm mb-4">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex justify-between text-gray-600">
                    <span>{item.name} × {item.qty}</span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span className="text-green-600 text-lg">₹{totalAmount}</span>
              </div>
              <button
                onClick={() => navigate("/summary", { state: { items: cartItems, total: totalAmount } })}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold text-sm transition shadow-sm"
              >
                Proceed to Checkout →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;