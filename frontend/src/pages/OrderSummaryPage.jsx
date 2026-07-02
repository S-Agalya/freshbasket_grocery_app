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

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 shadow bg-white">
        <h1 className="text-3xl font-bold text-green-700">Order Summary</h1>
        <button
          onClick={() => navigate("/order")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          Go & Select More Products
        </button>
      </header>

      <main className="flex-1 p-4 md:p-8 max-w-2xl mx-auto w-full">
        {!orderId && cartItems.length > 0 && (
          <>
            {/* Cart Summary */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4 text-green-700">Your Items:</h2>
              <ul className="space-y-2">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center bg-white p-3 rounded shadow"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{item.name}</span>
                      <span>
                        x {item.qty} {item.unit} {/* ✅ Fixed unit displayed */}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-green-700">
                        ₹ {item.price * item.qty}
                      </span>
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-right text-lg font-bold text-green-800">
                Total: ₹ {totalAmount}
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-white p-4 rounded shadow space-y-4">
              <h2 className="text-lg font-bold text-green-700">Customer Details</h2>
              <input
                type="text"
                placeholder="Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <input
                type="text"
                placeholder="Phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <textarea
                placeholder="Address"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              ></textarea>

              {/* Saved addresses */}
              {savedAddresses.length > 0 && (
                <div className="bg-gray-50 border rounded-lg p-3 space-y-2">
                  <p className="text-sm font-medium text-gray-600">📍 Saved Addresses</p>
                  {savedAddresses.map((addr, i) => (
                    <div key={i} className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setCustomerAddress(addr)}
                        className={`flex-1 text-left text-sm px-3 py-1.5 rounded-lg border transition
                          ${customerAddress === addr ? "border-green-500 bg-green-50 text-green-700 font-medium" : "border-gray-200 hover:border-green-300 text-gray-700"}`}
                      >
                        {addr}
                      </button>
                      <button onClick={() => handleDeleteAddress(addr)} className="text-red-400 hover:text-red-600 shrink-0">
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Save current address button */}
              {customerAddress.trim() && !savedAddresses.includes(customerAddress.trim()) && (
                <button
                  type="button"
                  onClick={handleSaveAddress}
                  className="flex items-center gap-1 text-xs text-green-600 hover:text-green-800 border border-green-300 px-3 py-1 rounded-full"
                >
                  <FaPlus size={10} /> Save this address
                </button>
              )}
              <textarea
                placeholder="Additional Comments (e.g. items not listed)"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              ></textarea>
              <button
                onClick={handlePlaceOrder}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow-lg transition w-full"
              >
                Place Order
              </button>
            </div>
          </>
        )}

        {orderId && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4 text-green-700">✅ Order Placed</h2>
            <ul className="space-y-2">
              {orderedItems.map((item, index) => (
                <li
                  key={index}
                  className="bg-white p-3 rounded shadow flex justify-between items-center"
                >
                  <span>
                    {item.name} x {item.qty} {item.unit} {/* ✅ Fixed unit */}
                  </span>
                  <span className="font-bold text-green-700">
                    ₹ {item.price * item.qty}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-right text-lg font-bold text-green-800">
              Total: ₹ {orderedTotal}
            </div>

            <div className="mt-6 flex flex-col items-center">
              <a
                href={`https://wa.me/${ownerPhoneNumber}?text=${buildWhatsappMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow-lg transition text-center block w-full md:w-auto"
              >
                Send Order via WhatsApp
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderSummaryPage;
