import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";

const getSavedAddresses = () => {
  try { return JSON.parse(localStorage.getItem("savedAddresses") || "[]"); } catch { return []; }
};

const OrderSummaryPage = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState(
    localStorage.getItem("customerName") || localStorage.getItem("username") || ""
  );
  const [customerPhone, setCustomerPhone] = useState(
    localStorage.getItem("customerPhone") || localStorage.getItem("phone") || ""
  );
  const [customerAddress, setCustomerAddress] = useState(
    localStorage.getItem("customerAddress") || ""
  );
  const [comments, setComments] = useState(
    localStorage.getItem("comments") || ""
  );
  const [savedAddresses, setSavedAddresses] = useState(getSavedAddresses);
  const [newAddressInput, setNewAddressInput] = useState("");
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(null); // { label, discount }

  const PROMO_CODES = {
    FRESH10:  { label: "10% off",   type: "percent", value: 10 },
    SAVE50:   { label: "₹50 off",   type: "flat",    value: 50 },
    NEWUSER:  { label: "₹100 off",  type: "flat",    value: 100 },
    GREEN20:  { label: "20% off",   type: "percent", value: 20 },
  };

  const applyPromo = () => {
    const code = PROMO_CODES[promoCode.trim().toUpperCase()];
    if (!code) { alert("Invalid promo code."); return; }
    setPromoApplied({ ...code, code: promoCode.trim().toUpperCase() });
  };

  const removePromo = () => { setPromoApplied(null); setPromoCode(""); };

  const [orderId, setOrderId] = useState(null);
  const [orderedItems, setOrderedItems] = useState([]);
  const [orderedTotal, setOrderedTotal] = useState(0);

  // Save form values in localStorage
  useEffect(() => {
    localStorage.setItem("customerName", customerName);
    localStorage.setItem("customerPhone", customerPhone);
    localStorage.setItem("customerAddress", customerAddress);
    localStorage.setItem("comments", comments);
  }, [customerName, customerPhone, customerAddress, comments]);

  const persistAddresses = (list) => {
    setSavedAddresses(list);
    localStorage.setItem("savedAddresses", JSON.stringify(list));
  };

  const handleSaveAddress = () => {
    const addr = newAddressInput.trim() || customerAddress.trim();
    if (!addr || savedAddresses.includes(addr)) return;
    persistAddresses([...savedAddresses, addr]);
    setNewAddressInput("");
    setShowSavePrompt(false);
  };

  const handleDeleteAddress = (addr) => {
    persistAddresses(savedAddresses.filter((a) => a !== addr));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = promoApplied
    ? promoApplied.type === "percent" ? Math.round(subtotal * promoApplied.value / 100) : Math.min(promoApplied.value, subtotal)
    : 0;
  const totalAmount = subtotal - discount;

  const handlePlaceOrder = async () => {
    if (!customerName || !customerPhone || !customerAddress) {
      alert("Please fill in your name, phone, and address!");
      return;
    }

    try {
      const payload = {
        customerName,
        customerPhone,
        customerAddress,
        comments,
        cartItems,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to place order");
      if (!data.orderId) throw new Error("Order ID missing in response");

      const formattedOrderId = String(data.orderId).padStart(4, "0");
      setOrderId(formattedOrderId);
      setOrderedItems(cartItems);
      setOrderedTotal(totalAmount);

      // Persist phone permanently so "Buy Again" works on the home page
      if (customerPhone) localStorage.setItem("phone", customerPhone);

      clearCart();
      localStorage.removeItem("customerName");
      localStorage.removeItem("customerPhone");
      localStorage.removeItem("customerAddress");
      localStorage.removeItem("comments");

      alert(`🎉 Order placed successfully!\nYour order ID is: ORD_ID ${formattedOrderId}`);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again!");
    }
  };

  const buildWhatsappMessage = () => {
    const name = customerName || "N/A";
    const phone = customerPhone || "N/A";
    const address = customerAddress || "N/A";
    const commentsText = comments || "None";

    let message = `🛒 *New Order*\n\n`;
    if (orderId) message += `📦 *Order ID:* ORD_ID ${orderId}\n`;

    message += `👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n🏠 *Address:* ${address}\n\n`;
    message += `🗒️ *Order List:*\n`;

    if (orderedItems.length === 0) message += `- No items\n`;
    else
      orderedItems.forEach(
        (item, index) =>
          (message += `${index + 1}. ${item.name} x ${item.qty} ${item.unit} = ₹${
            item.price * item.qty
          }\n`)
      );

    message += `\n💰 *Total Amount:* ₹${orderedTotal}\n\n`;
    message += `📝 *Additional Comments:*\n${commentsText}`;
    return encodeURIComponent(message);
  };

  const ownerPhoneNumber = import.meta.env.VITE_OWNER_PHONE;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-emerald-600 p-1 rounded-lg hover:bg-gray-100 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">Checkout</h1>
        </div>
        <button onClick={() => navigate("/order")} className="text-sm text-emerald-600 font-medium hover:underline">+ Add items</button>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {!orderId && cartItems.length > 0 && (
          <>
            {/* Cart items */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-800 mb-3">Order Items</h2>
              <div className="divide-y divide-gray-50">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3 gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 object-contain rounded-lg bg-gray-50 shrink-0" />}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">x{item.qty} {item.unit}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm font-bold text-emerald-600">₹{item.price * item.qty}</span>
                      <button onClick={() => decreaseQty(item.id)} className="w-6 h-6 rounded bg-gray-100 text-gray-600 text-xs font-bold hover:bg-gray-200 flex items-center justify-center">-</button>
                      <button onClick={() => increaseQty(item.id)} className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 text-xs font-bold hover:bg-emerald-200 flex items-center justify-center">+</button>
                      <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 rounded bg-red-50 text-red-400 text-xs hover:bg-red-100 flex items-center justify-center">×</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 mt-1 flex justify-between">
                <span className="text-sm text-gray-500">Subtotal ({cartItems.length} items)</span>
                <span className="font-bold text-gray-800">₹{subtotal}</span>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
              <h2 className="font-bold text-gray-800">Delivery Details</h2>
              <input type="text" placeholder="Full Name" value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
              <input type="text" placeholder="Phone Number" value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
              <textarea rows={2} placeholder="Delivery Address" value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none" />

              {/* Saved addresses */}
              {savedAddresses.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                  <p className="text-xs font-semibold text-gray-500">Saved Addresses</p>
                  {savedAddresses.map((addr, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <button type="button" onClick={() => setCustomerAddress(addr)}
                        className={`flex-1 text-left text-xs px-3 py-2 rounded-lg border transition ${
                          customerAddress === addr
                            ? "border-emerald-400 bg-emerald-50 text-emerald-700 font-semibold"
                            : "border-gray-200 text-gray-600 hover:border-emerald-300"
                        }`}>{addr}</button>
                      <button onClick={() => handleDeleteAddress(addr)} className="text-red-400 hover:text-red-600 text-xs p-1">×</button>
                    </div>
                  ))}
                </div>
              )}
              {customerAddress.trim() && !savedAddresses.includes(customerAddress.trim()) && (
                <button type="button" onClick={handleSaveAddress}
                  className="text-xs text-emerald-600 border border-emerald-300 px-3 py-1 rounded-full hover:bg-emerald-50">
                  + Save this address
                </button>
              )}

              <textarea rows={2} placeholder="Additional comments (optional)" value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
            </div>

            {/* Promo code */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-800 mb-3">Promo Code</h2>
              {promoApplied ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
                  <span className="text-sm font-semibold text-emerald-700">{promoApplied.code} — {promoApplied.label} applied!</span>
                  <button onClick={removePromo} className="text-red-400 hover:text-red-600 text-xs font-medium">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input type="text" placeholder="Enter code (e.g. FRESH10)" value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase" />
                  <button onClick={applyPromo} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 rounded-xl text-sm font-semibold transition">Apply</button>
                </div>
              )}
            </div>

            {/* Order Total + Place Order */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600"><span>Subtotal</span><span>₹{subtotal}</span></div>
                {promoApplied && <div className="flex justify-between text-sm text-emerald-600"><span>Discount ({promoApplied.label})</span><span>-₹{discount}</span></div>}
                <div className="flex justify-between font-bold text-gray-900 border-t border-gray-100 pt-3">
                  <span>Total</span>
                  <span className="text-emerald-600 text-lg">₹{totalAmount}</span>
                </div>
              </div>
              <button onClick={handlePlaceOrder}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-sm transition shadow-sm">
                Place Order →
              </button>
            </div>
          </>
        )}

        {/* Empty cart */}
        {!orderId && cartItems.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🛒</div>
            <p className="text-gray-500 font-medium mb-4">Your cart is empty</p>
            <button onClick={() => navigate("/order")} className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-emerald-700 transition">Browse Products</button>
          </div>
        )}

        {/* Order placed confirmation */}
        {orderId && (
          <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Order Placed!</h2>
            <p className="text-gray-500 text-sm mb-1">Order ID: <span className="font-bold text-emerald-600">#{orderId}</span></p>
            <p className="text-gray-400 text-xs mb-6">Total: ₹{orderedTotal}</p>

            <div className="space-y-2 text-sm text-left bg-gray-50 rounded-xl p-4 mb-5">
              {orderedItems.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-gray-600">{item.name} × {item.qty}</span>
                  <span className="font-medium">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <a href={`https://wa.me/${ownerPhoneNumber}?text=${buildWhatsappMessage()}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold text-sm transition">
              📱 Send Order via WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummaryPage;

