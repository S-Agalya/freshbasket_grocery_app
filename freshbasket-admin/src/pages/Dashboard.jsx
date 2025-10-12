
// import { useNavigate } from "react-router-dom";
// import { FaBox, FaShoppingCart, FaCog, FaSignOutAlt } from "react-icons/fa";

// function AdminDashboard() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/login");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-green-700 text-white flex flex-col">
//         <div className="p-6 text-2xl font-bold border-b border-green-600">
//           FreshBasket Admin
//         </div>
//         <nav className="flex-1 p-4 space-y-3">
//           {/* <button className="flex items-center w-full px-4 py-2 rounded hover:bg-green-600">
//             <FaBox className="mr-3" /> Products
//           </button> */}

//           <div
//   onClick={() => navigate("/dashboard/products")}
//   className="bg-white p-6 rounded shadow text-center cursor-pointer hover:bg-gray-50"
// >
//   <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
//   <p className="text-3xl font-bold text-green-600">120</p>
// </div>

//           <button className="flex items-center w-full px-4 py-2 rounded hover:bg-green-600">
//             <FaShoppingCart className="mr-3" /> Orders
//           </button>
//           <button className="flex items-center w-full px-4 py-2 rounded hover:bg-green-600">
//             <FaCog className="mr-3" /> Settings
//           </button>
//         </nav>
//         <button
//           onClick={handleLogout}
//           className="flex items-center w-full px-4 py-3 bg-red-600 hover:bg-red-700"
//         >
//           <FaSignOutAlt className="mr-3" /> Logout
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         <h1 className="text-2xl font-bold text-green-700 mb-6">Dashboard</h1>

//         {/* Example Content */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded shadow text-center">
//             <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
//             <p className="text-3xl font-bold text-green-600">120</p>
//           </div>
//           <div className="bg-white p-6 rounded shadow text-center">
//             <h2 className="text-lg font-semibold text-gray-700">Orders Today</h2>
//             <p className="text-3xl font-bold text-green-600">32</p>
//           </div>
//           <div className="bg-white p-6 rounded shadow text-center">
//             <h2 className="text-lg font-semibold text-gray-700">Out of Stock</h2>
//             <p className="text-3xl font-bold text-red-500">8</p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;


// import Sidebar from "../components/Sidebar"; // import Sidebar

// import { Outlet } from "react-router-dom";

// function AdminDashboard() {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         <h1 className="text-2xl font-bold text-green-700 mb-6">Dashboard</h1>

//         {/* Example Content */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded shadow text-center">
//             <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
//             <p className="text-3xl font-bold text-green-600">120</p>
//           </div>
//           <div className="bg-white p-6 rounded shadow text-center">
//             <h2 className="text-lg font-semibold text-gray-700">Orders Today</h2>
//             <p className="text-3xl font-bold text-green-600">32</p>
//           </div>
//           <div className="bg-white p-6 rounded shadow text-center">
//             <h2 className="text-lg font-semibold text-gray-700">Out of Stock</h2>
//             <p className="text-3xl font-bold text-red-500">8</p>
//           </div>
//         </div>

//          <Outlet />
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;



// import { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import { Outlet } from "react-router-dom";
// import { FaBars } from "react-icons/fa";

// function Dashboard() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen bg-gray-100 relative">
//       {/* Sidebar */}
//       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

//       {/* Main Content */}
//       <main className="flex-1 p-4 md:p-8 w-full">
//         {/* Top Bar (Mobile) */}
//         <div className="md:hidden flex items-center justify-between mb-4">
//           <button
//             className="text-green-700 text-2xl"
//             onClick={() => setIsSidebarOpen(true)}
//           >
//             <FaBars />
//           </button>
//           <h1 className="text-xl font-bold text-green-700">Dashboard</h1>
//         </div>

//         <h1 className="hidden md:block text-2xl font-bold text-green-700 mb-6">
//           Dashboard
//         </h1>

//         {/* Example Overview Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded shadow text-center">
//             <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
//             <p className="text-3xl font-bold text-green-600">120</p>
//           </div>
//           <div className="bg-white p-6 rounded shadow text-center">
//             <h2 className="text-lg font-semibold text-gray-700">Orders Today</h2>
//             <p className="text-3xl font-bold text-green-600">32</p>
//           </div>
//           <div className="bg-white p-6 rounded shadow text-center">
// //             <h2 className="text-lg font-semibold text-gray-700">Out of Stock</h2>
// //             <p className="text-3xl font-bold text-red-500">8</p>
// //           </div>
// //         </div>

// //         <Outlet />
// //       </main>
// //     </div>
// //   );
// // }

// // export default Dashboard;



// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import { FaBars } from "react-icons/fa";
// import axios from "axios";
// import AdminProducts from "./AdminProducts";

// function Dashboard() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [page, setPage] = useState("dashboard");
//   const [stats, setStats] = useState({ products: 0, orders: 0, outOfStock: 0 });
//   const API_URL = import.meta.env.VITE_API_URL;

//   // Fetch dashboard stats
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
//     <div className="flex min-h-screen bg-gray-100 relative">
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onClose={() => setIsSidebarOpen(false)}
//         onSelect={(key) => setPage(key)}
//       />

//       <main className="flex-1 p-4 md:p-8 w-full">
//         {/* Mobile top bar */}
//         <div className="md:hidden flex items-center justify-between mb-4">
//           <button
//             className="text-green-700 text-2xl"
//             onClick={() => setIsSidebarOpen(true)}
//           >
//             <FaBars />
//           </button>
//           <h1 className="text-xl font-bold text-green-700 capitalize">{page}</h1>
//         </div>

//         {/* Page rendering */}
//         {page === "dashboard" && (
//           <>
//             <h1 className="hidden md:block text-2xl font-bold text-green-700 mb-6">
//               Dashboard Overview
//             </h1>
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
//           </>
//         )}

//         {page === "products" && <AdminProducts />}
//         {page === "orders" && <div>Orders page coming soon...</div>}
//       </main>
//     </div>
//   );
// }

// export default Dashboard;



// import { useState } from "react";
// import AdminProducts from "./AdminProducts";

// function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("products");

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-green-700 text-white p-4 flex flex-col">
//         <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
//         <button
//           onClick={() => setActiveTab("products")}
//           className={`text-left px-3 py-2 rounded mb-2 ${
//             activeTab === "products" ? "bg-green-900" : "hover:bg-green-800"
//           }`}
//         >
//           🛒 Products
//         </button>
//         <button
//           onClick={() => alert("Coming soon!")}
//           className="text-left px-3 py-2 rounded hover:bg-green-800"
//         >
//           📦 Orders
//         </button>
//         <button
//           onClick={() => alert("Coming soon!")}
//           className="text-left px-3 py-2 rounded hover:bg-green-800"
//         >
//           👥 Customers
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <header className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">
//             {activeTab === "products" ? "Manage Products" : "Dashboard"}
//           </h2>
//           <button
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             onClick={() => window.location.reload()}
//           >
//             Refresh
//           </button>
//         </header>

//         {activeTab === "products" && <AdminProducts />}
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminProducts from "./AdminProducts";

// function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState("products");
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // ✅ Clear admin auth token if stored
//     localStorage.removeItem("adminToken");
//     sessionStorage.removeItem("adminToken");

//     // ✅ Redirect to login page
//     navigate("/login");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-green-700 text-white flex flex-col justify-between">
//         <div className="p-4">
//           <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

//           <button
//             onClick={() => setActiveTab("products")}
//             className={`w-full text-left px-3 py-2 rounded mb-2 ${
//               activeTab === "products" ? "bg-green-900" : "hover:bg-green-800"
//             }`}
//           >
//             🛒 Products
//           </button>

//           <button
//             onClick={() => alert("Orders feature coming soon!")}
//             className="w-full text-left px-3 py-2 rounded mb-2 hover:bg-green-800"
//           >
//             📦 Orders
//           </button>

//           <button
//             onClick={() => alert("Customers feature coming soon!")}
//             className="w-full text-left px-3 py-2 rounded mb-2 hover:bg-green-800"
//           >
//             👥 Customers
//           </button>
//         </div>

//         {/* ✅ Logout Button at the bottom */}
//         <div className="p-4 border-t border-green-600">
//           <button
//             onClick={handleLogout}
//             className="w-full bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition"
//           >
//             🚪 Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <header className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">
//             {activeTab === "products" ? "Manage Products" : "Dashboard"}
//           </h2>

//           <button
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             onClick={() => window.location.reload()}
//           >
//             🔄 Refresh
//           </button>
//         </header>

//         {activeTab === "products" && <AdminProducts />}
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import AdminProducts from "./AdminProducts";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-green-700 text-white flex flex-col justify-between transform transition-transform duration-300 ease-in-out z-50
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-4">
          <div className="flex justify-between items-center md:block">
            <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
            {/* Close button only for mobile */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaTimes size={22} />
            </button>
          </div>

          <button
            onClick={() => {
              setActiveTab("products");
              setIsSidebarOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded mb-2 ${
              activeTab === "products" ? "bg-green-900" : "hover:bg-green-800"
            }`}
          >
            🛒 Products
          </button>

          <button
            onClick={() => {
              alert("Orders feature coming soon!");
              setIsSidebarOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded mb-2 hover:bg-green-800"
          >
            📦 Orders
          </button>

          <button
            onClick={() => {
              alert("Customers feature coming soon!");
              setIsSidebarOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded mb-2 hover:bg-green-800"
          >
            👥 Customers
          </button>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-green-600">
          <button
            onClick={() => {
              handleLogout();
              setIsSidebarOpen(false);
            }}
            className="w-full bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            {/* Hamburger only in mobile */}
            <button
              className="md:hidden text-green-700"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FaBars size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab === "products" ? "Manage Products" : "Dashboard"}
            </h2>
          </div>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => window.location.reload()}
          >
            🔄 Refresh
          </button>
        </header>

        {activeTab === "products" && <AdminProducts />}
      </main>
    </div>
  );
}

export default AdminDashboard;
