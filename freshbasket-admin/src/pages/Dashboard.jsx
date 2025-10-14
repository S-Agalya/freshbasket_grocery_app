




import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaTachometerAlt, FaBoxOpen, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ products: 0, orders: 0, outOfStock: 0 });
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/"); // redirect to login
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/stats`);
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  useEffect(() => {
    // fetch stats only on dashboard main page
    if (location.pathname === "/dashboard") fetchStats();
  }, [location.pathname]);

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Products", icon: <FaBoxOpen />, path: "/dashboard/products" },
    { name: "Orders", icon: <FaShoppingCart />, path: "/dashboard/orders" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded-md shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      {/* <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-green-700 text-white flex flex-col justify-between transform transition-transform duration-300 z-50 shadow-lg
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      > */}
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
                  location.pathname === item.path ? "bg-green-900 shadow-md" : "hover:bg-green-800"
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

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-0">
        {/* Dashboard stats only on main dashboard */}
        {location.pathname === "/dashboard" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded shadow text-center">
                <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
                <p className="text-3xl font-bold text-green-600">{stats.products}</p>
              </div>
              <div className="bg-white p-6 rounded shadow text-center">
                <h3 className="text-lg font-semibold text-gray-700">Orders Today</h3>
                <p className="text-3xl font-bold text-green-600">{stats.orders}</p>
              </div>
              <div className="bg-white p-6 rounded shadow text-center">
                <h3 className="text-lg font-semibold text-gray-700">Out of Stock</h3>
                <p className="text-3xl font-bold text-red-500">{stats.outOfStock}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nested pages render here */}
        <Outlet context={{ fetchStats }} />
      </main>
    </div>
  );
}

export default AdminDashboard;
