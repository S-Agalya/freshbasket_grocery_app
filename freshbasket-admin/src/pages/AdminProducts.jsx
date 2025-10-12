

// import { useState, useEffect } from "react";
// import axios from "axios";
// import AddProductModal from "../components/AddProductModal";

// function AdminProducts() {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editProduct, setEditProduct] = useState(null);
//   const API_URL = import.meta.env.VITE_API_URL;

//   // Fetch products
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/admin/products`);
//       setProducts(res.data || []);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Add or update product handler
//   const handleProductAdded = () => {
//     fetchProducts();
//   };

//   // Delete product
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;
//     try {
//       await axios.delete(`${API_URL}/api/admin/products/delete/${id}`);
//       fetchProducts();
//     } catch (err) {
//       console.error("Error deleting product:", err);
//     }
//   };

//   return (
//     <div>
//       {/* Add Product Button */}
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => {
//             setEditProduct(null);
//             setShowModal(true);
//           }}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           ➕ Add Product
//         </button>
//       </div>

//       {/* Products Table */}
//       <div className="overflow-x-auto bg-white shadow rounded-lg">
//         <table className="min-w-full border border-gray-200">
//           <thead className="bg-green-100">
//             <tr>
//               <th className="border px-4 py-2">Image</th>
//               <th className="border px-4 py-2">Name</th>
//               <th className="border px-4 py-2">Category</th>
//               <th className="border px-4 py-2">Price</th>
//               <th className="border px-4 py-2">Unit</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <tr key={product.id} className="text-center hover:bg-gray-50">
//                   <td className="border px-4 py-2">
//                     {product.image ? (
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="w-16 h-16 object-cover mx-auto rounded"
//                       />
//                     ) : (
//                       "—"
//                     )}
//                   </td>
//                   <td className="border px-4 py-2">{product.name}</td>
//                   <td className="border px-4 py-2">{product.category}</td>
//                   <td className="border px-4 py-2">₹{product.price}</td>
//                   <td className="border px-4 py-2">{product.unit_type}</td>
//                   <td className="border px-4 py-2 space-x-2">
//                     <button
//                       onClick={() => {
//                         setEditProduct(product);
//                         setShowModal(true);
//                       }}
//                       className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
//                     >
//                       ✏️ Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(product.id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     >
//                       🗑️ Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="6"
//                   className="text-center text-gray-500 py-6 font-medium"
//                 >
//                   No products found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Add/Edit Modal */}
//       {showModal && (
//         <AddProductModal
//           onClose={() => setShowModal(false)}
//           onProductAdded={handleProductAdded}
//           editProduct={editProduct}
//           API_URL={API_URL}
//         />
//       )}
//     </div>
//   );
// }

// export default AdminProducts;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import AddProductModal from "../components/AddProductModal";
// import { FaEdit, FaTrash } from "react-icons/fa";

// function AdminProducts() {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editProduct, setEditProduct] = useState(null);
//   const API_URL = import.meta.env.VITE_API_URL;

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/admin/products`);
//       setProducts(res.data || []);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleProductAdded = () => fetchProducts();

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;
//     try {
//       await axios.delete(`${API_URL}/api/admin/products/delete/${id}`);
//       fetchProducts();
//     } catch (err) {
//       console.error("Error deleting product:", err);
//     }
//   };

//   return (
//     <div>
//       {/* Add Product Button */}
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => {
//             setEditProduct(null);
//             setShowModal(true);
//           }}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           ➕ Add Product
//         </button>
//       </div>

//       {/* Products Table */}
//       <div className="overflow-x-auto bg-white shadow rounded-lg">
//         <table className="min-w-full border border-gray-200">
//           <thead className="bg-green-100">
//             <tr>
//               <th className="border px-4 py-2">Image</th>
//               <th className="border px-4 py-2">Name</th>
//               <th className="border px-4 py-2">Category</th>
//               <th className="border px-4 py-2 hidden sm:table-cell">Price</th>
//               <th className="border px-4 py-2 hidden sm:table-cell">Unit</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <tr key={product.id} className="text-center hover:bg-gray-50">
//                   <td className="border px-4 py-2">
//                     {product.image ? (
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="w-16 h-16 object-cover mx-auto rounded"
//                       />
//                     ) : (
//                       "—"
//                     )}
//                   </td>
//                   <td className="border px-4 py-2">{product.name}</td>
//                   <td className="border px-4 py-2">{product.category}</td>
//                   <td className="border px-4 py-2 hidden sm:table-cell">₹{product.price}</td>
//                   <td className="border px-4 py-2 hidden sm:table-cell">{product.unit_type}</td>
//                   <td className="border px-4 py-2 flex justify-center space-x-2">
//                     <button
//                       onClick={() => {
//                         setEditProduct(product);
//                         setShowModal(true);
//                       }}
//                       className="bg-yellow-400 p-2 rounded hover:bg-yellow-500"
//                       title="Edit"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(product.id)}
//                       className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
//                       title="Delete"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center text-gray-500 py-6 font-medium">
//                   No products found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Add/Edit Modal */}
//       {showModal && (
//         <AddProductModal
//           onClose={() => setShowModal(false)}
//           onProductAdded={handleProductAdded}
//           editProduct={editProduct}
//           API_URL={API_URL}
//         />
//       )}
//     </div>
//   );
// }

// export default AdminProducts;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminProducts from "./AdminProducts";
import axios from "axios";
import { FaTachometerAlt, FaBoxOpen, FaShoppingCart, FaUsers, FaSignOutAlt } from "react-icons/fa";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ products: 0, orders: 0, outOfStock: 0 });
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminToken");
    navigate("/login");
  };

  // Fetch stats dynamically
  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/stats`);
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, key: "dashboard" },
    { name: "Products", icon: <FaBoxOpen />, key: "products" },
    { name: "Orders", icon: <FaShoppingCart />, key: "orders" },
    { name: "Customers", icon: <FaUsers />, key: "customers" },
  ];

  const handleSelectTab = (key) => {
    setActiveTab(key);
    if (isSidebarOpen) setIsSidebarOpen(false); // auto close on mobile
    fetchStats(); // refresh stats when going back to dashboard
  };

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
                onClick={() => handleSelectTab(item.key)}
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

        {activeTab === "products" && <AdminProducts onProductChange={fetchStats} />}
      </main>
    </div>
  );
}

export default AdminDashboard;
