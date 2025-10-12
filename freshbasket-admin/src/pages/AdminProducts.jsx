

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

// AdminProducts.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import AddProductModal from "../components/AddProductModal";
import { FaEdit, FaTrash } from "react-icons/fa";

function AdminProducts({ onProductChange }) {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/products`);
      setProducts(res.data || []);
      if (onProductChange) onProductChange(); // update dashboard stats
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_URL}/api/admin/products/delete/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setEditProduct(null);
            setShowModal(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="bg-white shadow rounded p-4 flex flex-col items-center text-center">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded mb-4" />
              ) : (
                <div className="w-32 h-32 bg-gray-200 rounded mb-4 flex items-center justify-center">No Image</div>
              )}
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-500">{product.category}</p>
              <p className="text-green-600 font-bold">₹{product.price}</p>
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={() => {
                    setEditProduct(product);
                    setShowModal(true);
                  }}
                  className="bg-yellow-400 p-2 rounded hover:bg-yellow-500"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3 py-6 font-medium">No products found</p>
        )}
      </div>

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onProductAdded={fetchProducts}
          editProduct={editProduct}
          API_URL={API_URL}
        />
      )}
    </div>
  );
}

export default AdminProducts;
