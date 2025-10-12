// // import { useNavigate } from "react-router-dom";
// // import { FaShoppingCart, FaCog, FaSignOutAlt } from "react-icons/fa";

// // function Sidebar() {
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     localStorage.removeItem("adminToken");
// //     navigate("/"); // go to login
// //   };

// //   return (
// //     <aside className="w-64 bg-green-700 text-white flex flex-col">
// //       <div className="p-6 text-2xl font-bold border-b border-green-600">
// //         FreshBasket Admin
// //       </div>
// //       <nav className="flex-1 p-4 space-y-3">
// //         <button
// //           onClick={() => navigate("/dashboard/products")}
// //           className="flex items-center w-full px-4 py-2 rounded hover:bg-green-600"
// //         >
// //           <FaShoppingCart className="mr-3" /> Products
// //         </button>

// //         <button
// //           onClick={() => navigate("/dashboard/orders")}
// //           className="flex items-center w-full px-4 py-2 rounded hover:bg-green-600"
// //         >
// //           <FaShoppingCart className="mr-3" /> Orders
// //         </button>
// //         <button
// //           onClick={() => navigate("/dashboard/settings")}
// //           className="flex items-center w-full px-4 py-2 rounded hover:bg-green-600"
// //         >
// //           <FaCog className="mr-3" /> Settings
// //         </button>
// //       </nav>
// //       <button
// //         onClick={handleLogout}
// //         className="flex items-center w-full px-4 py-3 bg-red-600 hover:bg-red-700"
// //       >
// //         <FaSignOutAlt className="mr-3" /> Logout
// //       </button>
// //     </aside>
// //   );
// // }

// // export default Sidebar;


// import { useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaCog, FaSignOutAlt, FaTimes } from "react-icons/fa";

// function Sidebar({ isOpen, onClose }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/");
//   };

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={onClose}
//         />
//       )}

//       <aside
//         className={`fixed top-0 left-0 h-full w-64 bg-green-700 text-white flex flex-col z-50 transform transition-transform duration-300 
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center p-4 border-b border-green-600">
//           <span className="text-xl font-bold">FreshBasket Admin</span>
//           <button onClick={onClose} className="md:hidden">
//             <FaTimes className="text-white text-xl" />
//           </button>
//         </div>

//         {/* Logout at top (as per your idea) */}
//         <button
//           onClick={handleLogout}
//           className="flex items-center w-full px-4 py-3 bg-red-600 hover:bg-red-700 mt-2"
//         >
//           <FaSignOutAlt className="mr-3" /> Logout
//         </button>

//         {/* Nav buttons */}
//         <nav className="flex-1 p-4 space-y-3 mt-4">
//           <button
//             onClick={() => navigate("/dashboard/products")}
//             className="flex items-center w-full px-4 py-2 rounded hover:bg-green-600"
//           >
//             <FaShoppingCart className="mr-3" /> Products
//           </button>

//           <button
//             onClick={() => navigate("/dashboard/orders")}
//             className="flex items-center w-full px-4 py-2 rounded hover:bg-green-600"
//           >
//             <FaShoppingCart className="mr-3" /> Orders
//           </button>

//           <button
//             onClick={() => navigate("/dashboard/settings")}
//             className="flex items-center w-full px-4 py-2 rounded hover:bg-green-600"
//           >
//             <FaCog className="mr-3" /> Settings
//           </button>
//         </nav>
//       </aside>
//     </>
//   );
// }

// export default Sidebar;


import { FaShoppingCart, FaBox, FaCog, FaSignOutAlt } from "react-icons/fa";

function Sidebar({ isOpen, onClose }) {
  return (
    <div
      className={`fixed md:static top-0 left-0 h-full w-64 bg-green-700 text-white flex flex-col justify-between transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 md:translate-x-0 z-50`}
    >
      {/* Top Section */}
      <div>
        <div className="text-2xl font-bold p-4 border-b border-green-600">
          FreshBasket Admin
        </div>

        <nav className="mt-4 space-y-1">
          <button className="w-full text-left px-6 py-3 hover:bg-green-800 flex items-center space-x-3">
            <FaBox /> <span>Products</span>
          </button>
          <button className="w-full text-left px-6 py-3 hover:bg-green-800 flex items-center space-x-3">
            <FaShoppingCart /> <span>Orders</span>
          </button>
          <button className="w-full text-left px-6 py-3 hover:bg-green-800 flex items-center space-x-3">
            <FaCog /> <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Logout at bottom */}
      <div className="border-t border-green-600">
        <button className="w-full text-left px-6 py-3 hover:bg-red-600 flex items-center space-x-3">
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </div>

      {/* Close sidebar on mobile after click */}
      {isOpen && (
        <button
          className="absolute top-4 right-4 md:hidden"
          onClick={onClose}
        >
          ✖
        </button>
      )}
    </div>
  );
}

export default Sidebar;
