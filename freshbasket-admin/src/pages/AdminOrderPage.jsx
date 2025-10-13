import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrderPage() {
  const [orders, setOrders] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.put(
        `${API_URL}/api/admin/orders/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } }
      );
      fetchOrders(); // Refresh orders
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded shadow p-4 flex flex-col md:flex-row md:justify-between md:items-start space-y-4 md:space-y-0 md:space-x-6"
            >
              <div>
                <p><span className="font-semibold">Order ID:</span> {order.id}</p>
                <p><span className="font-semibold">Name:</span> {order.customer_name}</p>
                <p><span className="font-semibold">Phone:</span> {order.phone}</p>
                <p><span className="font-semibold">Address:</span> {order.address}</p>
                <p><span className="font-semibold">Comments:</span> {order.comments}</p>
                <p><span className="font-semibold">Total:</span> ₹{order.total_amount}</p>
              </div>

              <div>
                <p className="font-semibold">Products:</p>
                <ul className="list-disc ml-5">
                  {order.products.map((p) => (
                    <li key={p.product_id}>
                      {p.name} x {p.quantity} = ₹{p.price * p.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col space-y-2">
                <p className="font-semibold">Status: {order.status}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusChange(order.id, "Completed")}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Mark Completed
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id, "Pending")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Mark Pending
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrderPage;

