

import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaTachometerAlt, FaBoxOpen, FaShoppingCart, FaSignOutAlt, FaChartBar, FaExclamationTriangle } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ products: 0,inStock: 0, outOfStock: 0,orders: 0  });
  const [activeSummary, setActiveSummary] = useState(null);
  const [orderSummary, setOrderSummary] = useState({ total: 0, pending: 0, completed: 0 });
  const [totalOrders, setTotalOrders] = useState(0);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch product & stock stats
  // const fetchStats = async () => {
  //     const res = await axios.get(`${API_URL}/api/admin/stats`);
  //     setStats(res.data);
  //   } catch (err) {
  //     console.error("Failed to fetch stats:", err);
  //   }
  // };
  const fetchStats = async () => {
  try {
    const token = localStorage.getItem("adminToken");
    const res = await axios.get(`${API_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("✅ Stats received from API:", res.data); // check this in browser console
    // Expect res.data === { products: N, inStock: M, outOfStock: K }
    setStats({
      products: res.data.products ?? 0,
      inStock: res.data.inStock ?? (res.data.products - (res.data.outOfStock ?? 0)),
      outOfStock: res.data.outOfStock ?? 0,
      orders: res.data.orders ?? stats.orders ?? 0,
    });
  } catch (err) {
    console.error("❌ Failed to fetch stats:", err);
  }
};



  const fetchLowStock = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${API_URL}/api/admin/stats/low-stock?threshold=5`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLowStockProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch low stock:", err);
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
      fetchLowStock();
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
    { name: "Sales Report", icon: <FaChartBar />, path: "/dashboard/sales" },
  ];

  return (
    <div className="min-h-screen bg-sand text-navy">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onSelect={(k) => {
          // map key to route
          const mapping = { dashboard: '/dashboard', products: '/dashboard/products', orders: '/dashboard/orders' };
          if (mapping[k]) navigate(mapping[k]);
        }} />

        <main className="flex-1 p-6 md:ml-64 transition-all duration-300">
          {location.pathname === "/dashboard" && (
            <div className="w-full max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-navy-900 mb-6">Dashboard Overview</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card-premium p-6 text-center">
                  <h3 className="text-lg font-semibold text-navy-700">Total Products</h3>
                  <p className="text-3xl font-bold text-navy-900">{stats.products}</p>
                </div>

                <div className="card-premium p-6 text-center cursor-pointer hover:glow-gold transition-all" onClick={() => setActiveSummary(activeSummary === 'orders' ? null : 'orders')}>
                  <h3 className="text-lg font-semibold text-navy-700">Today Orders</h3>
                  <p className="text-3xl font-bold text-navy-900">{orderSummary.pending}</p>
                  <p className="text-sm text-navy-700 mt-1">(Click to view details)</p>
                </div>

                <div className="card-premium p-6 text-center cursor-pointer hover:glow-gold transition-all" onClick={() => setActiveSummary(activeSummary === 'stock' ? null : 'stock')}>
                  <h3 className="text-lg font-semibold text-navy-700">Out of Stock</h3>
                  <p className="text-3xl font-bold text-red-500">{stats.outOfStock}</p>
                  <p className="text-sm text-navy-700 mt-1">(Click to view details)</p>
                </div>

                <div className="card-premium p-6 text-center">
                  <h3 className="text-lg font-semibold text-navy-700">Total Orders</h3>
                  <p className="text-3xl font-bold text-navy-900">{totalOrders}</p>
                </div>
              </div>

              {lowStockProducts.length > 0 && (
                <div className="mt-6 p-4 rounded-xl card-premium border border-navy-700">
                  <div className="flex items-center gap-2 mb-3">
                    <FaExclamationTriangle className="text-red-500" />
                    <h3 className="font-semibold text-navy-900">Low Stock Alert — {lowStockProducts.length} product{lowStockProducts.length > 1 ? 's' : ''} need restocking</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {lowStockProducts.map((p) => (
                      <span key={p.id} className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full font-medium">{p.name} — {p.stock} {p.stock_unit} left</span>
                    ))}
                  </div>
                  <button onClick={() => navigate('/dashboard/products')} className="mt-3 text-sm text-navy-900 underline">Go to Products →</button>
                </div>
              )}

              {activeSummary === 'orders' && (
                <div className="mt-8 card-premium p-6 text-center">
                  <h3 className="text-xl font-bold text-navy-900 mb-4">Today’s Order Summary</h3>
                  <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <div className="bg-navy-50 text-navy-800 font-semibold py-4 px-8 rounded-lg shadow">Total: {orderSummary.total}</div>
                    <div className="bg-navy-50 text-navy-800 font-semibold py-4 px-8 rounded-lg shadow">Pending: {orderSummary.pending}</div>
                    <div className="bg-navy-50 text-navy-800 font-semibold py-4 px-8 rounded-lg shadow">Completed: {orderSummary.completed}</div>
                  </div>
                  <button onClick={() => navigate('/dashboard/orders')} className="mt-6 bg-navy-900 text-sand px-6 py-2 rounded-md hover:opacity-90 transition-all">Go to Orders Page →</button>
                </div>
              )}

              {activeSummary === 'stock' && (
                <div className="mt-8 card-premium p-6 text-center">
                  <h3 className="text-xl font-bold text-navy-900 mb-4">Stock Summary</h3>
                  <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <div className="bg-navy-50 text-navy-800 font-semibold py-4 px-8 rounded-lg shadow">In Stock: {stats.inStock}</div>
                    <div className="bg-navy-50 text-navy-800 font-semibold py-4 px-8 rounded-lg shadow">Out of Stock: {stats.outOfStock}</div>
                  </div>
                  <button onClick={() => navigate('/dashboard/products')} className="mt-6 bg-navy-900 text-sand px-6 py-2 rounded-md hover:opacity-90 transition-all">Go to Products Page →</button>
                </div>
              )}
            </div>
          )}

          <Outlet context={{ fetchStats, fetchOrderSummary, fetchTotalOrders }} />
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
