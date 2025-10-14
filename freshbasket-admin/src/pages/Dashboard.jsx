
// import { useState, useEffect } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { FaTachometerAlt, FaBoxOpen, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

// function AdminDashboard() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [stats, setStats] = useState({ products: 0, orders: 0, outOfStock: 0 });
//   const navigate = useNavigate();
//   const location = useLocation();
//   const API_URL = import.meta.env.VITE_API_URL;

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/"); // redirect to login
//   };

//   const fetchStats = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/admin/stats`);
//       setStats(res.data);
//     } catch (err) {
//       console.error("Failed to fetch stats:", err);
//     }
//   };

//   useEffect(() => {
//     // fetch stats only on dashboard main page
//     if (location.pathname === "/dashboard") fetchStats();
//   }, [location.pathname]);

//   const menuItems = [
//     { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
//     { name: "Products", icon: <FaBoxOpen />, path: "/dashboard/products" },
//     { name: "Orders", icon: <FaShoppingCart />, path: "/dashboard/orders" },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Mobile Hamburger */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded-md shadow-md"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//       >
//         ☰
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`fixed  top-0 left-0 h-screen w-64 bg-green-700 text-white flex flex-col justify-between transform transition-transform duration-300 z-50 shadow-lg
//         ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//       >
//         <div>
//           <h1 className="text-2xl font-bold text-center md:text-left p-6 border-b border-green-800">
//             Admin Panel
//           </h1>
//           <nav className="flex flex-col p-4 space-y-2">
//             {menuItems.map((item) => (
//               <button
//                 key={item.path}
//                 onClick={() => {
//                   navigate(item.path);
//                   if (isSidebarOpen) setIsSidebarOpen(false);
//                 }}
//                 className={`w-full text-left px-4 py-2 rounded-md font-medium flex items-center space-x-2 transition-colors ${
//                   location.pathname === item.path ? "bg-green-900 shadow-md" : "hover:bg-green-800"
//                 }`}
//               >
//                 {item.icon} <span>{item.name}</span>
//               </button>
//             ))}
//           </nav>
//         </div>

//         <div className="p-4 border-t border-green-800">
//           <button
//             onClick={handleLogout}
//             className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors shadow-md flex items-center justify-center space-x-2"
//           >
//             <FaSignOutAlt /> <span>Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* Overlay for mobile */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         ></div>
//       )}

//       {/* Main Content */}
//       <main className="flex-1 p-6 md:ml-64 transition-all duration-300">
//         {/* Dashboard stats only on main dashboard */}
//         {location.pathname === "/dashboard" && (
//           <div className="w-full max-w-5xl mx-auto">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className="bg-white p-6 rounded shadow text-center">
//                 <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
//                 <p className="text-3xl font-bold text-green-600">{stats.products}</p>
//               </div>
//               <div className="bg-white p-6 rounded shadow text-center">
//                 <h3 className="text-lg font-semibold text-gray-700">Orders Today</h3>
//                 <p className="text-3xl font-bold text-green-600">{stats.orders}</p>
//               </div>
//               <div className="bg-white p-6 rounded shadow text-center">
//                 <h3 className="text-lg font-semibold text-gray-700">Out of Stock</h3>
//                 <p className="text-3xl font-bold text-red-500">{stats.outOfStock}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Nested pages render here */}
//         <Outlet context={{ fetchStats }} />
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;


// import { useState, useEffect } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { FaTachometerAlt, FaBoxOpen, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

// function AdminDashboard() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [stats, setStats] = useState({ products: 0, orders: 0, outOfStock: 0 });
//   const [showOrdersSummary, setShowOrdersSummary] = useState(false);
//   const [orderSummary, setOrderSummary] = useState({ pending: 0, completed: 0 });
//   const navigate = useNavigate();
//   const location = useLocation();
//   const API_URL = import.meta.env.VITE_API_URL;


  

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/");
//   };

//   const fetchStats = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/admin/stats`);
//       setStats(res.data);
      
//     } catch (err) {
//       console.error("Failed to fetch stats:", err);
//     }
//   };

//   const fetchOrderSummary = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/admin/orders`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
//       });

//       const today = new Date().toISOString().split("T")[0];
//       const todaysOrders = res.data.filter((order) =>
//         order.created_at.startsWith(today)
//       );

//       const pending = todaysOrders.filter((o) => o.status === "Pending").length;
//       const completed = todaysOrders.filter((o) => o.status === "Completed").length;

//       setOrderSummary({ pending, completed });
//     } catch (err) {
//       console.error("Failed to fetch order summary:", err);
//     }
//   };

//   useEffect(() => {
//     if (location.pathname === "/dashboard") fetchStats();
//   }, [location.pathname]);

//   const menuItems = [
//     { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
//     { name: "Products", icon: <FaBoxOpen />, path: "/dashboard/products" },
//     { name: "Orders", icon: <FaShoppingCart />, path: "/dashboard/orders" },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Mobile Hamburger */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded-md shadow-md"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//       >
//         ☰
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-screen w-64 bg-green-700 text-white flex flex-col justify-between transform transition-transform duration-300 z-50 shadow-lg
//         ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//       >
//         <div>
//           <h1 className="text-2xl font-bold text-center md:text-left p-6 border-b border-green-800">
//             Admin Panel
//           </h1>
//           <nav className="flex flex-col p-4 space-y-2">
//             {menuItems.map((item) => (
//               <button
//                 key={item.path}
//                 onClick={() => {
//                   navigate(item.path);
//                   if (isSidebarOpen) setIsSidebarOpen(false);
//                 }}
//                 className={`w-full text-left px-4 py-2 rounded-md font-medium flex items-center space-x-2 transition-colors ${
//                   location.pathname === item.path
//                     ? "bg-green-900 shadow-md"
//                     : "hover:bg-green-800"
//                 }`}
//               >
//                 {item.icon} <span>{item.name}</span>
//               </button>
//             ))}
//           </nav>
//         </div>

//         <div className="p-4 border-t border-green-800">
//           <button
//             onClick={handleLogout}
//             className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors shadow-md flex items-center justify-center space-x-2"
//           >
//             <FaSignOutAlt /> <span>Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* Overlay for mobile */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         ></div>
//       )}

//       {/* Main Content */}
//       <main className="flex-1 p-6 md:ml-64 transition-all duration-300">
//         {location.pathname === "/dashboard" && (
//           <div className="w-full max-w-5xl mx-auto">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">
//               Dashboard Overview
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className="bg-white p-6 rounded shadow text-center">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Total Products
//                 </h3>
//                 <p className="text-3xl font-bold text-green-600">
//                   {stats.products}
//                 </p>
//               </div>

//               <div
//                 className="bg-white p-6 rounded shadow text-center cursor-pointer hover:bg-green-50 transition-all"
//                 onClick={() => {
//                   setShowOrdersSummary(!showOrdersSummary);
//                   if (!showOrdersSummary) fetchOrderSummary();
//                 }}
//               >
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Orders Today
//                 </h3>
//                 <p className="text-3xl font-bold text-green-600">
//                   {stats.orders}
//                 </p>
//                 <p className="text-sm text-gray-500 mt-1">(Click to view)</p>
//               </div>

//               <div className="bg-white p-6 rounded shadow text-center">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Out of Stock
//                 </h3>
//                 <p className="text-3xl font-bold text-red-500">
//                   {stats.outOfStock}
//                 </p>
//               </div>
//             </div>

//             {/* Order Summary */}
//             {showOrdersSummary && (
//               <div className="mt-8 bg-white p-6 rounded shadow-lg text-center">
//                 <h3 className="text-xl font-bold text-gray-700 mb-4">
//                   Today’s Order Summary
//                 </h3>
//                 <div className="flex flex-col sm:flex-row justify-center gap-6">
//                   <div className="bg-yellow-100 text-yellow-800 font-semibold py-4 px-8 rounded-lg shadow">
//                     Pending: {orderSummary.pending}
//                   </div>
//                   <div className="bg-green-100 text-green-800 font-semibold py-4 px-8 rounded-lg shadow">
//                     Completed: {orderSummary.completed}
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => navigate("/dashboard/orders")}
//                   className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all"
//                 >
//                   Go to Orders Page →
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Nested pages */}
//         <Outlet context={{ fetchStats }} />
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;


// import { useState, useEffect } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { FaTachometerAlt, FaBoxOpen, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

// function AdminDashboard() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [stats, setStats] = useState({ products: 0, orders: 0, outOfStock: 0 });
//   const [showOrdersSummary, setShowOrdersSummary] = useState(false);
//   const [orderSummary, setOrderSummary] = useState({ pending: 0, completed: 0 });
//   const navigate = useNavigate();
//   const location = useLocation();
//   const API_URL = import.meta.env.VITE_API_URL;

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/");
//   };

//   const fetchStats = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/admin/stats`);
//       setStats(res.data);
//     } catch (err) {
//       console.error("Failed to fetch stats:", err);
//     }
//   };

//   // ✅ Fetch only today's orders directly from backend (using ?today=true)
//   const fetchOrderSummary = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/admin/orders?today=true`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
//       });

//       const pending = res.data.filter((o) => o.status === "Pending").length;
//       const completed = res.data.filter((o) => o.status === "Completed").length;

//       setOrderSummary({ pending, completed });

//       // ✅ Also update dashboard “Orders Today” main count dynamically
//       setStats((prev) => ({ ...prev, orders: pending + completed }));
//     } catch (err) {
//       console.error("Failed to fetch order summary:", err);
//     }
//   };

//   // ✅ Refresh every time dashboard main page loads
//   useEffect(() => {
//     if (location.pathname === "/dashboard") {
//       fetchStats();
//       fetchOrderSummary(); // get latest count every time
//     }
//   }, [location.pathname]);

//   // ✅ Re-fetch order summary every 30s to stay live (optional)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (location.pathname === "/dashboard") fetchOrderSummary();
//     }, 30000);
//     return () => clearInterval(interval);
//   }, [location.pathname]);

//   const menuItems = [
//     { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
//     { name: "Products", icon: <FaBoxOpen />, path: "/dashboard/products" },
//     { name: "Orders", icon: <FaShoppingCart />, path: "/dashboard/orders" },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Mobile Hamburger */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 bg-green-700 text-white p-2 rounded-md shadow-md"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//       >
//         ☰
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-screen w-64 bg-green-700 text-white flex flex-col justify-between transform transition-transform duration-300 z-50 shadow-lg
//         ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//       >
//         <div>
//           <h1 className="text-2xl font-bold text-center md:text-left p-6 border-b border-green-800">
//             Admin Panel
//           </h1>
//           <nav className="flex flex-col p-4 space-y-2">
//             {menuItems.map((item) => (
//               <button
//                 key={item.path}
//                 onClick={() => {
//                   navigate(item.path);
//                   if (isSidebarOpen) setIsSidebarOpen(false);
//                 }}
//                 className={`w-full text-left px-4 py-2 rounded-md font-medium flex items-center space-x-2 transition-colors ${
//                   location.pathname === item.path
//                     ? "bg-green-900 shadow-md"
//                     : "hover:bg-green-800"
//                 }`}
//               >
//                 {item.icon} <span>{item.name}</span>
//               </button>
//             ))}
//           </nav>
//         </div>

//         <div className="p-4 border-t border-green-800">
//           <button
//             onClick={handleLogout}
//             className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors shadow-md flex items-center justify-center space-x-2"
//           >
//             <FaSignOutAlt /> <span>Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* Overlay for mobile */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         ></div>
//       )}

//       {/* Main Content */}
//       <main className="flex-1 p-6 md:ml-64 transition-all duration-300">
//         {location.pathname === "/dashboard" && (
//           <div className="w-full max-w-5xl mx-auto">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">
//               Dashboard Overview
//             </h2>

//             {/* Dashboard cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className="bg-white p-6 rounded shadow text-center">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Total Products
//                 </h3>
//                 <p className="text-3xl font-bold text-green-600">
//                   {stats.products}
//                 </p>
//               </div>

//               {/* Orders Today */}
//               <div
//                 className="bg-white p-6 rounded shadow text-center cursor-pointer hover:bg-green-50 transition-all"
//                 onClick={() => {
//                   setShowOrdersSummary(!showOrdersSummary);
//                   if (!showOrdersSummary) fetchOrderSummary();
//                 }}
//               >
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Orders Today
//                 </h3>
//                 <p className="text-3xl font-bold text-green-600">
//                   {stats.orders}
//                 </p>
//                 <p className="text-sm text-gray-500 mt-1">(Click to view)</p>
//               </div>

//               <div className="bg-white p-6 rounded shadow text-center">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Out of Stock
//                 </h3>
//                 <p className="text-3xl font-bold text-red-500">
//                   {stats.outOfStock}
//                 </p>
//               </div>
//             </div>

//             {/* ✅ Order Summary Box */}
//             {showOrdersSummary && (
//               <div className="mt-8 bg-white p-6 rounded shadow-lg text-center">
//                 <h3 className="text-xl font-bold text-gray-700 mb-4">
//                   Today’s Order Summary
//                 </h3>
//                 <div className="flex flex-col sm:flex-row justify-center gap-6">
//                   <div className="bg-yellow-100 text-yellow-800 font-semibold py-4 px-8 rounded-lg shadow">
//                     Pending: {orderSummary.pending}
//                   </div>
//                   <div className="bg-green-100 text-green-800 font-semibold py-4 px-8 rounded-lg shadow">
//                     Completed: {orderSummary.completed}
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => navigate("/dashboard/orders")}
//                   className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all"
//                 >
//                   Go to Orders Page →
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Nested pages */}
//         <Outlet context={{ fetchStats, fetchOrderSummary }} />
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    todayOrders: 0,
    todayPendingOrders: 0,
    products: 0,
    outOfStock: 0,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  // ✅ Fetch all stats including orders & products
  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/orders/stats`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
    }
  };

  // ✅ Fetch product stats (optional)
  const fetchProductStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/stats`);
      setStats((prev) => ({
        ...prev,
        products: res.data.products,
        outOfStock: res.data.outOfStock,
      }));
    } catch (err) {
      console.error("Failed to fetch product stats:", err);
    }
  };

  // ✅ Fetch when dashboard loads
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      fetchStats();
      fetchProductStats();
    }
  }, [location.pathname]);

  // ✅ Optional: Refresh stats every 30s to stay live
  useEffect(() => {
    const interval = setInterval(() => {
      if (location.pathname === "/dashboard") fetchStats();
    }, 30000);
    return () => clearInterval(interval);
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

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-64 transition-all duration-300">
        {location.pathname === "/dashboard" && (
          <div className="w-full max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Dashboard Overview
            </h2>

            {/* Dashboard cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded shadow text-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Orders
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {stats.totalOrders}
                </p>
              </div>

              <div className="bg-white p-6 rounded shadow text-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  Pending Orders
                </h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {stats.pendingOrders}
                </p>
              </div>

              <div className="bg-white p-6 rounded shadow text-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  Completed Orders
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {stats.completedOrders}
                </p>
              </div>

              <div className="bg-white p-6 rounded shadow text-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  Today’s Orders
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.todayOrders}
                </p>
              </div>

              <div className="bg-white p-6 rounded shadow text-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  Today’s Pending Orders
                </h3>
                <p className="text-3xl font-bold text-red-500">
                  {stats.todayPendingOrders}
                </p>
              </div>

              <div className="bg-white p-6 rounded shadow text-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  Out of Stock
                </h3>
                <p className="text-3xl font-bold text-red-600">
                  {stats.outOfStock}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Nested pages */}
        <Outlet context={{ fetchStats }} />
      </main>
    </div>
  );
}

export default AdminDashboard;
