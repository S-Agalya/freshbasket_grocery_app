// import { useLocation, useNavigate } from "react-router-dom";
// import { useState, useContext } from "react";
// import { CartContext } from "../context/CartContext";

// const OrderSummaryPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { cartItems, clearCart } = useContext(CartContext);
//   const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

//   const [comments, setComments] = useState("");

//   const handleSendList = () => {
//     console.log("ORDER DETAILS:");
//     console.log("Items:", cartItems);
//     console.log("Total:", totalAmount);
//     console.log("Status:", "Unpaid");
//     console.log("Comments:", comments);

//     alert(
//       "Your order list has been sent to the shop owner.\n\n" +
//       "They will review your items and your additional comments:\n" +
//       comments
//     );

//     clearCart();
//     navigate("/order");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 flex flex-col">
//       <header className="flex items-center justify-between px-6 py-4 shadow bg-white">
//         <h1 className="text-3xl font-bold text-green-700">Order Summary</h1>
//       </header>

//       <main className="flex-1 p-4 md:p-8">
//         {cartItems.length === 0 ? (
//           <p className="text-gray-600 text-lg">Your cart is empty.</p>
//         ) : (
//           <>
//             <ul className="space-y-4">
//               {cartItems.map((item, index) => (
//                 <li key={index} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
//                   <div className="flex items-center gap-4">
//                     <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
//                     <div>
//                       <h3 className="text-lg font-semibold">{item.name}</h3>
//                       <p className="text-green-700 font-bold">₹ {item.price} x {item.qty}</p>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>

//             <h3 className="text-xl font-bold text-green-700 mt-6">Total Amount: ₹ {totalAmount}</h3>

//             <div className="mt-6">
//               <h3 className="text-lg font-bold text-green-700 mb-2">Additional Comments</h3>
//               <textarea
//                 value={comments}
//                 onChange={(e) => setComments(e.target.value)}
//                 className="w-full border rounded p-3 shadow-sm focus:outline-green-500"
//                 placeholder="E.g., Also add 1 kg tomatoes or any items not listed here"
//               />
//             </div>

//             <div className="flex flex-wrap mt-6 gap-4">
//               <button
//                 onClick={handleSendList}
//                 className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow-lg transition"
//               >
//                 Send List
//               </button>

//               <button
//                 onClick={() => navigate("/order")}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded shadow-lg transition"
//               >
//                 Go and Select More Products
//               </button>
//             </div>
//           </>
//         )}
//       </main>
//     </div>
//   );
// };

// export default OrderSummaryPage;
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const OrderSummaryPage = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [comments, setComments] = useState("");

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const buildWhatsappMessage = () => {
    let message = `🛒 *New Order*\n\n`;
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
        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-lg mb-6">Your cart is empty.</p>
        ) : (
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
        </div>

        <div className="mt-6 flex flex-col items-center">
          <a
            href={`https://wa.me/${ownerPhoneNumber}?text=${buildWhatsappMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow-lg transition text-center block w-full md:w-auto"
          >
            Send List via WhatsApp
          </a>
        </div>
      </main>
    </div>
  );
};

export default OrderSummaryPage;
