import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const OrderSummaryPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [comments, setComments] = useState("");
  const [orderId, setOrderId] = useState(null);

  // ✅ Keep snapshot of ordered items
  const [orderedItems, setOrderedItems] = useState([]);
  const [orderedTotal, setOrderedTotal] = useState(0);

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

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        throw new Error("Server returned unexpected response");
      }

      if (!response.ok) throw new Error(data.message || "Failed to place order");
      if (!data.orderId) throw new Error("Order ID missing in response");

      const formattedOrderId = String(data.orderId).padStart(4, "0");
      setOrderId(formattedOrderId);

      // ✅ Save ordered items before clearing cart
      setOrderedItems(cartItems);
      setOrderedTotal(totalAmount);

      clearCart();

      alert(
        `🎉 Order placed successfully!\nYour order ID is: ORD_ID ${formattedOrderId}`
      );
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  // ✅ WhatsApp message uses orderedItems now
 const buildWhatsappMessage = () => {
  const name = customerName || "N/A";
  const phone = customerPhone || "N/A";
  const address = customerAddress || "N/A";
  const commentsText = comments || "None";

  let message = `🛒 *New Order*\n\n`;

  if (orderId) {
    message += `📦 *Order ID:* ORD_ID ${orderId}\n`;
  }

  message += `👤 *Name:* ${name}\n`;
  message += `📞 *Phone:* ${phone}\n`;
  message += `🏠 *Address:* ${address}\n\n`;

  message += `🗒️ *Order List:*\n`;
  if (orderedItems.length === 0) {
    message += `- No items\n`;
  } else {
    orderedItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x ${item.qty} = ₹${item.price * item.qty}\n`;
    });
  }

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
        {/* Before placing order */}
        {!orderId && cartItems.length > 0 && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4 text-green-700">
                Your Items:
              </h2>
              <ul className="space-y-2">
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="bg-white p-3 rounded shadow flex justify-between items-center"
                  >
                    <span>
                      {item.name} x {item.qty}
                    </span>
                    <span className="font-bold text-green-700">
                      ₹ {item.price * item.qty}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-right text-lg font-bold text-green-800">
                Total: ₹ {totalAmount}
              </div>
            </div>

            {/* Customer form */}
            <div className="bg-white p-4 rounded shadow space-y-4">
              <h2 className="text-lg font-bold text-green-700">
                Customer Details
              </h2>
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

        {/* After placing order */}
        {orderId && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4 text-green-700">
              ✅ Order Placed
            </h2>
            <ul className="space-y-2">
              {orderedItems.map((item, index) => (
                <li
                  key={index}
                  className="bg-white p-3 rounded shadow flex justify-between items-center"
                >
                  <span>
                    {item.name} x {item.qty}
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
  {ownerPhoneNumber ? (
    <a
      href={`https://wa.me/${ownerPhoneNumber}?text=${buildWhatsappMessage()}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow-lg transition text-center block w-full md:w-auto"
    >
      Send Order via WhatsApp
    </a>
  ) : (
    <button
      className="bg-gray-500 text-white px-6 py-3 rounded shadow-lg w-full md:w-auto"
      disabled
    >
      WhatsApp number not configured
    </button>
  )}
</div>

          </div>
        )}
      </main>
    </div>
  );
};

export default OrderSummaryPage;

