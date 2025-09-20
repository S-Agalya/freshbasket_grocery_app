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
  const [orderId, setOrderId] = useState(null); // Track successful order ID

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // const handlePlaceOrder = async () => {
  //   if (!customerName || !customerPhone || !customerAddress) {
  //     alert("Please fill in your name, phone, and address!");
  //     return;
  //   }

  //   try {
  //     const payload = {
  //       customerName,
  //       customerPhone,
  //       customerAddress,
  //       comments,
  //       cartItems
  //     };

  //     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(payload)
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to place order");
  //     }

  //     const data = await response.json();
  //     console.log("Order API response:", data);

  //     if (!data.orderId) {
  //       throw new Error("Order ID missing in response");
  //     }

  //     // Format orderId to 4 digits
  //     const formattedOrderId = String(data.orderId).padStart(4, "0");
  //     setOrderId(formattedOrderId);

  //     // Show popup
  //     alert(`🎉 Order placed successfully!\nYour order ID is: ORD_ID ${formattedOrderId}`);

  //     clearCart();
  //   } catch (error) {
  //     console.error("Error placing order:", error);
  //     if (!orderId) {
  //       alert("Error placing order. Please try again.");
  //     }
  //   }

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
    console.log("Order API response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to place order");
    }

    if (!data.orderId) {
      throw new Error("Order ID missing in response");
    }

    // ✅ Success
    const formattedOrderId = String(data.orderId).padStart(4, "0");
    setOrderId(formattedOrderId);

    alert(
      `🎉 Order placed successfully!\nYour order ID is: ORD_ID ${formattedOrderId}`
    );

    clearCart();
  } catch (error) {
    console.error("Error placing order:", error);
    alert("⚠️ Error placing order. Please try again.");
  }
};

  };

  const buildWhatsappMessage = () => {
    let message = `🛒 *New Order*\n\n`;

    if (orderId) {
      message += `📦 *Order ID:* ORD_ID ${orderId}\n`;
    }

    message += `👤 *Name:* ${customerName}\n`;
    message += `📞 *Phone:* ${customerPhone}\n`;
    message += `🏠 *Address:* ${customerAddress}\n\n`;

    message += `🗒️ *Order List:*\n`;
    if (cartItems.length === 0) {
      message += `- No items in cart\n`;
    } else {
      cartItems.forEach((item, index) => {
        message += `${index + 1}. ${item.name} x ${item.qty} = ₹${item.price * item.qty}\n`;
      });
    }

    message += `\n💰 *Total Amount:* ₹${totalAmount}\n\n`;
    message += `📝 *Additional Comments:*\n${comments || "None"}`;

    return encodeURIComponent(message);
  };

  const ownerPhoneNumber = "917904173766"; // Replace with actual owner's number

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
        {cartItems.length === 0 && !orderId ? (
          <p className="text-gray-600 text-lg mb-6">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4 text-green-700">Your Items:</h2>
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
            )}

            {!orderId && (
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
            )}

            {orderId && (
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
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default OrderSummaryPage;
