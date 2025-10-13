// import { useEffect, useState } from "react";
// import axios from "axios";

// function AdminOrderPage() {
//   const [orders, setOrders] = useState([]);
//   const API_URL = import.meta.env.VITE_API_URL;

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/admin/orders`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
//       });
//       setOrders(res.data);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//     }
//   };

//   const handleStatusChange = async (orderId, status) => {
//     try {
//       await axios.put(
//         `${API_URL}/api/admin/orders/${orderId}/status`,
//         { status },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } }
//       );
//       fetchOrders(); // Refresh orders
//     } catch (err) {
//       console.error("Failed to update status:", err);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Orders</h2>
//       {orders.length === 0 ? (
//         <p className="text-gray-500">No orders yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div
//               key={order.id}
//               className="bg-white rounded shadow p-4 flex flex-col md:flex-row md:justify-between md:items-start space-y-4 md:space-y-0 md:space-x-6"
//             >
//               <div>
//                 <p><span className="font-semibold">Order ID:</span> {order.id}</p>
//                 <p><span className="font-semibold">Name:</span> {order.customer_name}</p>
//                 <p><span className="font-semibold">Phone:</span> {order.phone}</p>
//                 <p><span className="font-semibold">Address:</span> {order.address}</p>
//                 <p><span className="font-semibold">Comments:</span> {order.comments}</p>
//                 <p><span className="font-semibold">Total:</span> ₹{order.total_amount}</p>
//               </div>

//               <div>
//                 <p className="font-semibold">Products:</p>
//                 <ul className="list-disc ml-5">
//                   {order.products.map((p) => (
//                     <li key={p.product_id}>
//                       {p.name} x {p.quantity} = ₹{p.price * p.quantity}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="flex flex-col space-y-2">
//                 <p className="font-semibold">Status: {order.status}</p>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleStatusChange(order.id, "Completed")}
//                     className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
//                   >
//                     Mark Completed
//                   </button>
//                   <button
//                     onClick={() => handleStatusChange(order.id, "Pending")}
//                     className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
//                   >
//                     Mark Pending
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminOrderPage;


import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.put(
        `${API_URL}/api/admin/orders/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } }
      );
      fetchOrders(); // Refresh list
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading orders...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">All Customer Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders have been placed yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order.id || index}
              className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start border-b pb-4 mb-4">
                <div>
                  <p className="font-semibold text-gray-800">
                    🧾 Order ID: <span className="text-gray-600">{order.id}</span>
                  </p>
                  <p className="font-semibold text-gray-800">
                    👤 Customer: <span className="text-gray-600">{order.customer_name}</span>
                  </p>
                  <p className="font-semibold text-gray-800">
                    📞 Phone: <span className="text-gray-600">{order.phone}</span>
                  </p>
                  <p className="font-semibold text-gray-800">
                    📍 Address: <span className="text-gray-600">{order.address}</span>
                  </p>
                  {order.comments && (
                    <p className="font-semibold text-gray-800">
                      💬 Comments: <span className="text-gray-600">{order.comments}</span>
                    </p>
                  )}
                </div>

                <div className="text-right mt-4 md:mt-0">
                  <p className="font-semibold text-gray-800">
                    💰 Total Amount:{" "}
                    <span className="text-green-600 font-bold text-lg">₹{order.total_amount}</span>
                  </p>
                  <p className="font-semibold text-gray-800 mt-2">
                    📦 Status:{" "}
                    <span
                      className={`${
                        order.status === "Completed"
                          ? "text-green-600 font-bold"
                          : "text-yellow-600 font-bold"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                </div>
              </div>

              {/* Product List */}
              <div>
                <p className="font-semibold text-gray-800 mb-2">🛍️ Ordered Products:</p>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg text-sm">
                    <thead className="bg-green-100">
                      <tr>
                        <th className="border px-3 py-2 text-left">#</th>
                        <th className="border px-3 py-2 text-left">Product Name</th>
                        <th className="border px-3 py-2 text-center">Quantity</th>
                        <th className="border px-3 py-2 text-center">Price (₹)</th>
                        <th className="border px-3 py-2 text-center">Total (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.products.map((p, i) => (
                        <tr key={p.product_id || i} className="hover:bg-gray-50">
                          <td className="border px-3 py-2">{i + 1}</td>
                          <td className="border px-3 py-2">{p.name}</td>
                          <td className="border px-3 py-2 text-center">{p.quantity}</td>
                          <td className="border px-3 py-2 text-center">{p.price}</td>
                          <td className="border px-3 py-2 text-center">
                            ₹{p.price * p.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Status Controls */}
              <div className="mt-4 flex flex-wrap gap-3 justify-end">
                <button
                  onClick={() => handleStatusChange(order.id, "Completed")}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow"
                >
                  Mark Completed
                </button>
                <button
                  onClick={() => handleStatusChange(order.id, "Pending")}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow"
                >
                  Mark Pending
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrderPage;
