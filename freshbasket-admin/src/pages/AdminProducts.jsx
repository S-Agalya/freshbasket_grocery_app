// import { useState, useEffect } from "react";
// import axios from "axios";
// import AddProductModal from "../components/AddProductModal";

// function AdminProducts() {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editProduct, setEditProduct] = useState(null);
//   const API_URL = import.meta.env.VITE_API_URL;

//   // Fetch products from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/admin/products`);
//         setProducts(res.data);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to fetch products");
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Delete product
//   const handleDeleteProduct = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;
//     try {
//       await axios.delete(`${API_URL}/api/admin/products/${id}`);
//       setProducts((prev) => prev.filter((p) => p.id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete product");
//     }
//   };

//   // Open modal for editing
//   const handleEditProduct = (product) => {
//     setEditProduct(product);
//     setShowModal(true);
//   };

//   // After adding/updating product
//   const handleProductAdded = (newProduct) => {
//     setProducts((prev) => {
//       const index = prev.findIndex((p) => p.id === newProduct.id);
//       if (index !== -1) {
//         const updated = [...prev];
//         updated[index] = newProduct;
//         return updated;
//       }
//       return [newProduct, ...prev]; // new product
//     });
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold text-green-700 mb-6">Products</h1>
//       <button
//         onClick={() => { setShowModal(true); setEditProduct(null); }}
//         className="mb-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//       >
//         + Add Product
//       </button>

//       {products.length === 0 ? (
//         <div className="bg-white p-6 rounded shadow text-center">
//           <p className="text-lg text-gray-600 mb-4">
//             Your products are empty. Add products to display.
//           </p>
//         </div>
//       ) : (
//         <ul className="space-y-3">
//           {products.map((p) => (
//             <li
//               key={p.id}
//               className="bg-white p-4 rounded shadow flex justify-between items-center"
//             >
//               <div className="flex items-center space-x-4">
//                 {p.image && (
//                   <img
//                     src={p.image} // ✅ Directly use Cloudinary URL
//                     alt={p.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                 )}
//                 <div>
//                   <span className="font-semibold">{p.name}</span>
//                   <p className="text-gray-500">{p.category}</p>
//                 </div>
//               </div>
//               <span className="text-gray-600">{p.price} ₹ / {p.unit_type}</span>
//               <div className="flex space-x-2">
//                 <button
//                   className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                   onClick={() => handleEditProduct(p)}
//                 >
//                   Update
//                 </button>
//                 <button
//                   className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                   onClick={() => handleDeleteProduct(p.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

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


import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProductModal from "../components/AddProductModal";

function AdminProducts({ API_URL }) {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/products`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch products");
      }
    };
    fetchProducts();
  }, [API_URL]);

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_URL}/api/admin/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => {
      const index = prev.findIndex((p) => p.id === newProduct.id);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = newProduct;
        return updated;
      }
      return [newProduct, ...prev];
    });
  };

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-xl sm:text-2xl font-bold text-green-700 mb-6 text-center sm:text-left">
        Products
      </h1>

      <div className="flex justify-center sm:justify-start mb-4">
        <button
          onClick={() => {
            setShowModal(true);
            setEditProduct(null);
          }}
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full sm:w-auto"
        >
          + Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-gray-600 text-base sm:text-lg">
            Your products list is empty. Add products to display.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {products.map((p) => (
            <li
              key={p.id}
              className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
            >
              {/* Product Info */}
              <div className="flex flex-col sm:flex-row items-center sm:space-x-4 text-center sm:text-left">
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-24 h-24 sm:w-16 sm:h-16 object-cover rounded-lg"
                  />
                )}
                <div>
                  <span className="font-semibold block text-lg">{p.name}</span>
                  <p className="text-gray-500 text-sm">{p.category}</p>
                </div>
              </div>

              {/* Price */}
              <span className="text-gray-700 text-sm sm:text-base font-medium text-center sm:text-left">
                {p.price} ₹ / {p.unit_type}
              </span>

              {/* Buttons */}
              <div className="flex justify-center sm:justify-end space-x-2">
                <button
                  className="px-4 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm"
                  onClick={() => handleEditProduct(p)}
                >
                  Update
                </button>
                <button
                  className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                  onClick={() => handleDeleteProduct(p.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onProductAdded={handleProductAdded}
          editProduct={editProduct}
          API_URL={API_URL}
        />
      )}
    </div>
  );
}

export default AdminProducts;
