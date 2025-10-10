
// // import { useNavigate } from "react-router-dom";
// // import { FaBox, FaShoppingCart, FaCog, FaSignOutAlt } from "react-icons/fa";

// // function AdminDashboard() {
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     localStorage.removeItem("adminToken");
// //     navigate("/login");
// //   };

// //   return (
// //     <div className="flex min-h-screen bg-gray-100">
// //       {/* Sidebar */}
// //       <aside className="w-64 bg-green-700 text-white flex flex-col">
// //         <div className="p-6 text-2xl font-bold border-b border-green-600">
// //           FreshBasket Admin
// //         </div>
// //         <nav className="flex-1 p-4 space-y-3">
// //           {/* <button className="flex items-center w-full px-4 py-2 rounded hover:bg-green-600">
// //             <FaBox className="mr-3" /> Products
// //           </button> */}

// //           <div
// //   onClick={() => navigate("/dashboard/products")}
// //   className="bg-white p-6 rounded shadow text-center cursor-pointer hover:bg-gray-50"
// // >
// //   <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
// //   <p className="text-3xl font-bold text-green-600">120</p>
// // </div>

// //           <button className="flex items-center w-full px-4 py-2 rounded hover:bg-green-600">
// //             <FaShoppingCart className="mr-3" /> Orders
// //           </button>
// //           <button className="flex items-center w-full px-4 py-2 rounded hover:bg-green-600">
// //             <FaCog className="mr-3" /> Settings
// //           </button>
// //         </nav>
// //         <button
// //           onClick={handleLogout}
// //           className="flex items-center w-full px-4 py-3 bg-red-600 hover:bg-red-700"
// //         >
// //           <FaSignOutAlt className="mr-3" /> Logout
// //         </button>
// //       </aside>

// //       {/* Main Content */}
// //       <main className="flex-1 p-8">
// //         <h1 className="text-2xl font-bold text-green-700 mb-6">Dashboard</h1>

// //         {/* Example Content */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //           <div className="bg-white p-6 rounded shadow text-center">
// //             <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
// //             <p className="text-3xl font-bold text-green-600">120</p>
// //           </div>
// //           <div className="bg-white p-6 rounded shadow text-center">
// //             <h2 className="text-lg font-semibold text-gray-700">Orders Today</h2>
// //             <p className="text-3xl font-bold text-green-600">32</p>
// //           </div>
// //           <div className="bg-white p-6 rounded shadow text-center">
// //             <h2 className="text-lg font-semibold text-gray-700">Out of Stock</h2>
// //             <p className="text-3xl font-bold text-red-500">8</p>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// // export default AdminDashboard;


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



import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 w-full">
        {/* Top Bar (Mobile) */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <button
            className="text-green-700 text-2xl"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars />
          </button>
          <h1 className="text-xl font-bold text-green-700">Dashboard</h1>
        </div>

        <h1 className="hidden md:block text-2xl font-bold text-green-700 mb-6">
          Dashboard
        </h1>

        {/* Example Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
            <p className="text-3xl font-bold text-green-600">120</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-lg font-semibold text-gray-700">Orders Today</h2>
            <p className="text-3xl font-bold text-green-600">32</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-lg font-semibold text-gray-700">Out of Stock</h2>
            <p className="text-3xl font-bold text-red-500">8</p>
          </div>
        </div>

        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
