

import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaTachometerAlt, FaBoxOpen, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ products: 0, outOfStock: 0 });
  const [activeSummary, setActiveSummary] = useState(null); // "orders" or "stock" or null
  const [orderSummary, setOrderSummary] = useState({ total: 0, pending: 0, completed: 0 });
  const [totalOrders, setTotalOrders] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch product & stock stats
  // const fetchStats = async () => {
  //   try {
  //     const res = await axios.get(`${API_URL}/api/admin/stats`);
  //     setStats(res.data);
  //   } catch (err) {
  //     console.error("Failed to fetch stats:", err);
  //   }
  // };
  const fetchStats = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
    });
    console.log("Stats fetched:", res.data); // <-- check this
    setStats(res.data);
  } catch (err) {
    console.error("Failed to fetch stats:", err);
  }
};


  // Fetch today's order summary
  const fetchOrderSummary = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/orders?today=true`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      const all = res.data;
      const pending = all.filter((o) => o.status === "Pending").length;
      const completed = all.filter((o) => o.status === "Completed").length;
      setOrderSummary({ total: all.length, pending, completed });
    } catch (err) {
      console.error("Failed to fetch order summary:", err);
    }
  };

  // Fetch total orders (all-time)
  const fetchTotalOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      setTotalOrders(res.data.length);
    } catch (err) {
      console.error("Failed to fetch total orders:", err);
    }
  };

  // Trigger dashboard refresh when orders are updated
  useEffect(() => {
    const updateListener = () => {
      fetchOrderSummary();
      fetchTotalOrders();
    };
    window.addEventListener("ordersUpdated", updateListener);
    return () => window.removeEventListener("ordersUpdated", updateListener);
  }, []);

  // Fetch stats + orders on dashboard load
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      fetchStats();
      fetchOrderSummary();
      fetchTotalOrders();
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Products", icon: <FaBoxOpen />, path: "/dashboard/products" },
    { name: "Orders", icon: <FaShoppingCart />, path: "/dashboard/orders" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded-md shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-green-700 text-white flex flex-col justify-between transform transition-transform duration-300 z-50 shadow-lg
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div>
          <h1 className="text-2xl font-bold text-center md:text-left p-6 border-b border-green-800">
            Admin Panel
          </h1>
          <nav className="flex flex-col p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  if (isSidebarOpen) setIsSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-md font-medium flex items-center space-x-2 transition-colors ${
                  location.pathname === item.path
                    ? "bg-green-900 shadow-md"
                    : "hover:bg-green-800"
                }`}
              >
                {item.icon} <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-green-800">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors shadow-md flex items-center justify-center space-x-2"
          >
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <main className="flex-1 p-6 md:ml-64 transition-all duration-300">
        {location.pathname === "/dashboard" && (
          <div className="w-full max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Dashboard Overview
            </h2>

            {/* Top 4 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded shadow text-center">
                <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
                <p className="text-3xl font-bold text-green-600">{stats.products}</p>
              </div>

              <div
                className="bg-white p-6 rounded shadow text-center cursor-pointer hover:bg-green-50 transition-all"
                onClick={() =>
                  setActiveSummary(activeSummary === "orders" ? null : "orders")
                }
              >
                <h3 className="text-lg font-semibold text-gray-700">Today Orders</h3>
                <p className="text-3xl font-bold text-green-600">{orderSummary.pending}</p>
                <p className="text-sm text-gray-500 mt-1">(Click to view details)</p>
              </div>

              <div
                className="bg-white p-6 rounded shadow text-center cursor-pointer hover:bg-green-50 transition-all"
                onClick={() =>
                  setActiveSummary(activeSummary === "stock" ? null : "stock")
                }
              >
                <h3 className="text-lg font-semibold text-gray-700">Out of Stock</h3>
                <p className="text-3xl font-bold text-red-500">{stats.outOfStock}</p>
                <p className="text-sm text-gray-500 mt-1">(Click to view details)</p>
              </div>

              <div className="bg-white p-6 rounded shadow text-center">
                <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
                <p className="text-3xl font-bold text-green-600">{totalOrders}</p>
              </div>
            </div>

            {/* Single expandable summary box */}
            {activeSummary === "orders" && (
              <div className="mt-8 bg-white p-6 rounded shadow-lg text-center">
                <h3 className="text-xl font-bold text-gray-700 mb-4">
                  Today’s Order Summary
                </h3>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <div className="bg-blue-100 text-blue-800 font-semibold py-4 px-8 rounded-lg shadow">
                    Total: {orderSummary.total}
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 font-semibold py-4 px-8 rounded-lg shadow">
                    Pending: {orderSummary.pending}
                  </div>
                  <div className="bg-green-100 text-green-800 font-semibold py-4 px-8 rounded-lg shadow">
                    Completed: {orderSummary.completed}
                  </div>
                </div>
                <button
                  onClick={() => navigate("/dashboard/orders")}
                  className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all"
                >
                  Go to Orders Page →
                </button>
              </div>
            )}

            {activeSummary === "stock" && (
              <div className="mt-8 bg-white p-6 rounded shadow-lg text-center">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Stock Summary</h3>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <div className="bg-blue-100 text-blue-800 font-semibold py-4 px-8 rounded-lg shadow">
                    In Stock: {stats.products - stats.outOfStock}
                  </div>
                  <div className="bg-red-100 text-red-800 font-semibold py-4 px-8 rounded-lg shadow">
                    Out of Stock: {stats.outOfStock}
                  </div>
                </div>
                <button
                  onClick={() => navigate("/dashboard/products")}
                  className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all"
                >
                  Go to Products Page →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Nested routes */}
        <Outlet context={{ fetchStats, fetchOrderSummary, fetchTotalOrders }} />
      </main>
    </div>
  );
}

export default AdminDashboard;
