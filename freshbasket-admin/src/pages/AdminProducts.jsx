// import { useState, useEffect } from "react";
// import axios from "axios";
// import AddProductModal from "../components/AddProductModal";

// function AdminProducts() {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const API_URL = import.meta.env.VITE_API_URL;

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/products`);
//         setProducts(res.data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold text-green-700">Manage Products</h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
//         >
//           + Add Product
//         </button>
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((p) => (
//           <div
//             key={p.id}
//             className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center"
//           >
//             <img
//               src={
//                 p.image.startsWith("http")
//                   ? p.image
//                   : `${API_URL}/uploads/${p.image}`
//               }
//               alt={p.name}
//               className="w-24 h-24 object-cover rounded mb-2"
//             />
//             <h2 className="font-semibold">{p.name}</h2>
//             <p className="text-gray-500">₹{p.price}</p>
//             <p
//               className={`text-sm mt-1 ${
//                 p.quantity === 0 ? "text-red-600" : "text-green-600"
//               }`}
//             >
//               {p.quantity === 0 ? "Out of Stock" : `In Stock: ${p.quantity}`}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
//       {showModal && <AddProductModal onClose={() => setShowModal(false)} />}
//     </div>
//   );
// }

// export default AdminProducts;



// import { useState, useEffect } from "react";
// import axios from "axios";
// import AddProductModal from "../components/AddProductModal";

// function AdminProducts() {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editProduct, setEditProduct] = useState(null);
//   const API_URL = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/api/products`);
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleEdit = (product) => {
//     setEditProduct(product);
//     setShowModal(true);
//   };

//   const handleAdd = () => {
//     setEditProduct(null);
//     setShowModal(true);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-green-700 text-white flex flex-col">
//         <div className="p-6 text-2xl font-bold border-b border-green-600">
//           FreshBasket Admin
//         </div>

//         <nav className="flex-1 p-4 space-y-4 text-lg">
//           <a href="/admin/dashboard" className="flex items-center gap-2 hover:text-green-200">
//             <i className="fa fa-home"></i> Dashboard
//           </a>
//           <a href="/admin/products" className="flex items-center gap-2 hover:text-green-200">
//             <i className="fa fa-box"></i> Products
//           </a>
//           <a href="/admin/orders" className="flex items-center gap-2 hover:text-green-200">
//             <i className="fa fa-shopping-cart"></i> Orders
//           </a>
//         </nav>

//         <button className="p-4 border-t border-green-600 hover:bg-green-800 text-left text-lg">
//           <i className="fa fa-sign-out-alt"></i> Logout
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-green-700">Products</h1>
//           <button
//             onClick={handleAdd}
//             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//           >
//             + Add Product
//           </button>
//         </div>

//         <div className="overflow-x-auto bg-white shadow rounded-2xl">
//           <table className="min-w-full text-left border border-gray-200">
//             <thead className="bg-green-100">
//               <tr>
//                 <th className="p-3 border-b">ID</th>
//                 <th className="p-3 border-b">Name</th>
//                 <th className="p-3 border-b">Price</th>
//                 <th className="p-3 border-b">Quantity</th>
//                 <th className="p-3 border-b">In Stock</th>
//                 <th className="p-3 border-b text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.length > 0 ? (
//                 products.map((product) => (
//                   <tr key={product.id} className="hover:bg-gray-50">
//                     <td className="p-3 border-b">{product.id}</td>
//                     <td className="p-3 border-b">{product.name}</td>
//                     <td className="p-3 border-b">₹{product.price}</td>
//                     <td className="p-3 border-b">{product.quantity}</td>
//                     <td className="p-3 border-b">
//                       {product.quantity > 0 ? "Yes" : "No"}
//                     </td>
//                     <td className="p-3 border-b text-center">
//                       <button
//                         onClick={() => handleEdit(product)}
//                         className="text-blue-600 hover:underline"
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="p-3 text-center text-gray-500">
//                     No products available.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {showModal && (
//           <AddProductModal
//             show={showModal}
//             onClose={() => setShowModal(false)}
//             onRefresh={fetchProducts}
//             editProduct={editProduct}
//           />
//         )}
//       </main>
//     </div>
//   );
// }

// export default AdminProducts;

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom"; // ✅ Add this
// import axios from "axios";
// import AddProductModal from "../components/AddProductModal";

// function AdminProducts() {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editProduct, setEditProduct] = useState(null);
//   const API_URL = import.meta.env.VITE_API_URL;
//   const navigate = useNavigate(); // ✅ Use for programmatic navigation if needed

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/api/products`);
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleEdit = (product) => {
//     setEditProduct(product);
//     setShowModal(true);
//   };

//   const handleAdd = () => {
//     setEditProduct(null);
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await axios.delete(`${API_URL}/api/admin/products/delete/${id}`);
//         fetchProducts();
//       } catch (error) {
//         console.error("Error deleting product:", error);
//         alert("Failed to delete product");
//       }
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* ✅ Sidebar */}
//       <aside className="w-64 bg-green-700 text-white flex flex-col">
//         <div className="p-6 text-2xl font-bold border-b border-green-600">
//           FreshBasket Admin
//         </div>

//         <nav className="flex-1 p-4 space-y-4 text-lg">
//           <Link to="/admin/dashboard" className="flex items-center gap-2 hover:text-green-200">
//             <i className="fa fa-home"></i> Dashboard
//           </Link>
//           <Link to="/admin/products" className="flex items-center gap-2 hover:text-green-200">
//             <i className="fa fa-box"></i> Products
//           </Link>
//           <Link to="/admin/orders" className="flex items-center gap-2 hover:text-green-200">
//             <i className="fa fa-shopping-cart"></i> Orders
//           </Link>
//         </nav>

//         <button className="p-4 border-t border-green-600 hover:bg-green-800 text-left text-lg">
//           <i className="fa fa-sign-out-alt"></i> Logout
//         </button>
//       </aside>

//       {/* ✅ Main Content */}
//       <main className="flex-1 p-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-green-700">Products</h1>
//           <button
//             onClick={handleAdd}
//             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//           >
//             + Add Product
//           </button>
//         </div>

//         <div className="overflow-x-auto bg-white shadow rounded-2xl">
//           <table className="min-w-full text-left border border-gray-200">
//             <thead className="bg-green-100">
//               <tr>
//                 <th className="p-3 border-b">ID</th>
//                 <th className="p-3 border-b">Name</th>
//                 <th className="p-3 border-b">Price</th>
//                 <th className="p-3 border-b">Quantity</th>
//                 <th className="p-3 border-b">In Stock</th>
//                 <th className="p-3 border-b text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.length > 0 ? (
//                 products.map((product) => (
//                   <tr key={product.id} className="hover:bg-gray-50">
//                     <td className="p-3 border-b">{product.id}</td>
//                     <td className="p-3 border-b">{product.name}</td>
//                     <td className="p-3 border-b">₹{product.price}</td>
//                     <td className="p-3 border-b">{product.quantity}</td>
//                     <td className="p-3 border-b">
//                       {product.quantity > 0 ? "Yes" : "No"}
//                     </td>
//                     <td className="p-3 border-b text-center space-x-3">
//                       <button
//                         onClick={() => handleEdit(product)}
//                         className="text-blue-600 hover:underline"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(product.id)}
//                         className="text-red-600 hover:underline"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="p-3 text-center text-gray-500">
//                     No products available.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {showModal && (
//           <AddProductModal
//             show={showModal}
//             onClose={() => setShowModal(false)}
//             onRefresh={fetchProducts}
//             editProduct={editProduct}
//           />
//         )}
//       </main>
//     </div>
//   );
// }

// export default AdminProducts;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Add this
import axios from "axios";
import AddProductModal from "../components/AddProductModal";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate(); // ✅ Use for programmatic navigation if needed

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditProduct(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_URL}/api/admin/products/delete/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-green-600">
          FreshBasket Admin
        </div>

        <nav className="flex-1 p-4 space-y-4 text-lg">
          <Link to="/admin/dashboard" className="flex items-center gap-2 hover:text-green-200">
            <i className="fa fa-home"></i> Dashboard
          </Link>
          <Link to="/admin/products" className="flex items-center gap-2 hover:text-green-200">
            <i className="fa fa-box"></i> Products
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-2 hover:text-green-200">
            <i className="fa fa-shopping-cart"></i> Orders
          </Link>
        </nav>

        <button className="p-4 border-t border-green-600 hover:bg-green-800 text-left text-lg">
          <i className="fa fa-sign-out-alt"></i> Logout
        </button>
      </aside>

      {/* ✅ Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-700">Products</h1>
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            + Add Product
          </button>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-2xl">
          <table className="min-w-full text-left border border-gray-200">
            <thead className="bg-green-100">
              <tr>
                <th className="p-3 border-b">ID</th>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Price</th>
                <th className="p-3 border-b">Quantity</th>
                <th className="p-3 border-b">In Stock</th>
                <th className="p-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{product.id}</td>
                    <td className="p-3 border-b">{product.name}</td>
                    <td className="p-3 border-b">₹{product.price}</td>
                    <td className="p-3 border-b">{product.quantity}</td>
                    <td className="p-3 border-b">
                      {product.quantity > 0 ? "Yes" : "No"}
                    </td>
                    <td className="p-3 border-b text-center space-x-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-3 text-center text-gray-500">
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <AddProductModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onRefresh={fetchProducts}
            editProduct={editProduct}
          />
        )}
      </main>
    </div>
  );
}

export default AdminProducts;
