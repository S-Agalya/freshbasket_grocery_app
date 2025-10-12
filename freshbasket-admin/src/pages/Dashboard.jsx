

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminProducts from "./AdminProducts";
// import axios from "axios";

// function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [stats, setStats] = useState({ products: 0, orders: 0, outOfStock: 0 });
//   const navigate = useNavigate();
//   const API_URL = import.meta.env.VITE_API_URL;

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     sessionStorage.removeItem("adminToken");
//     navigate("/login");
//   };

//   // Fetch stats
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/admin/stats`);
//         setStats(res.data);
//       } catch (err) {
//         console.error("Failed to fetch stats:", err);
//       }
//     };
//     fetchStats();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Hamburger Button */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded-md shadow-md"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//       >
//         ☰
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`fixed md:static top-0 left-0 h-full w-64 bg-green-700 text-white flex flex-col justify-between transform transition-transform duration-300 z-40 shadow-lg
//           ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//       >
//         <div>
//           <h1 className="text-2xl font-bold text-center md:text-left p-6 border-b border-green-800">
//             Admin Panel
//           </h1>
//           <nav className="flex flex-col p-4 space-y-2">
//             <button
//               onClick={() => setActiveTab("dashboard")}
//               className={`w-full text-left px-4 py-2 rounded-md font-medium transition-colors ${
//                 activeTab === "dashboard" ? "bg-green-900 shadow-md" : "hover:bg-green-800"
//               }`}
//             >
//               📊 Dashboard
//             </button>
//             <button
//               onClick={() => setActiveTab("products")}
//               className={`w-full text-left px-4 py-2 rounded-md font-medium transition-colors ${
//                 activeTab === "products" ? "bg-green-900 shadow-md" : "hover:bg-green-800"
//               }`}
//             >
//               🛒 Products
//             </button>
//             <button
//               onClick={() => alert("Orders feature coming soon!")}
//               className="w-full text-left px-4 py-2 rounded-md font-medium hover:bg-green-800 transition-colors"
//             >
//               📦 Orders
//             </button>
//             <button
//               onClick={() => alert("Customers feature coming soon!")}
//               className="w-full text-left px-4 py-2 rounded-md font-medium hover:bg-green-800 transition-colors"
//             >
//               👥 Customers
//             </button>
//           </nav>
//         </div>

//         <div className="p-4 border-t border-green-800">
//           <button
//             onClick={handleLogout}
//             className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors shadow-md"
//           >
//             🚪 Logout
//           </button>
//         </div>
//       </aside>

//       {/* Overlay */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         ></div>
//       )}

//       {/* Main Content */}
//       <main className="flex-1 p-6 md:ml-0">
//         {activeTab === "dashboard" && (
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className="bg-white p-6 rounded shadow text-center">
//                 <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
//                 <p className="text-3xl font-bold text-green-600">{stats.products}</p>
//               </div>
//               <div className="bg-white p-6 rounded shadow text-center">
//                 <h2 className="text-lg font-semibold text-gray-700">Orders Today</h2>
//                 <p className="text-3xl font-bold text-green-600">{stats.orders}</p>
//               </div>
//               <div className="bg-white p-6 rounded shadow text-center">
//                 <h2 className="text-lg font-semibold text-gray-700">Out of Stock</h2>
//                 <p className="text-3xl font-bold text-red-500">{stats.outOfStock}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "products" && <AdminProducts />}
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminProducts from "./AdminProducts";
import axios from "axios";
import { FaTachometerAlt, FaBoxOpen, FaShoppingCart, FaUsers, FaSignOutAlt } from "react-icons/fa";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ products: 0, orders: 0, outOfStock: 0, staff: 0 });
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminToken");
    navigate("/login");
  };

  // Fetch stats dynamically
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/stats`);
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    fetchStats();
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, key: "dashboard" },
    { name: "Products", icon: <FaBoxOpen />, key: "products" },
    { name: "Orders", icon: <FaShoppingCart />, key: "orders" },
    { name: "Customers", icon: <FaUsers />, key: "customers" },
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
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-green-700 text-white flex flex-col justify-between transform transition-transform duration-300 z-50 shadow-lg
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div>
          <h1 className="text-2xl font-bold text-center md:text-left p-6 border-b border-green-800">
            Admin Panel
          </h1>
          <nav className="flex flex-col p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`w-full text-left px-4 py-2 rounded-md font-medium flex items-center space-x-2 transition-colors ${
                  activeTab === item.key ? "bg-green-900 shadow-md" : "hover:bg-green-800"
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
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div className="bg-white p-6 rounded shadow text-center">
                <h3 className="text-lg font-semibold text-gray-700">Staff Members</h3>
                <p className="text-3xl font-bold text-blue-500">{stats.staff || 0}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && <AdminProducts />}
      </main>
    </div>
  );
}

export default AdminDashboard;
