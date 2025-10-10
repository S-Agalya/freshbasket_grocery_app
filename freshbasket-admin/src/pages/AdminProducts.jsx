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


import { useState, useEffect } from "react";
import axios from "axios";
import AddProductModal from "../components/AddProductModal";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_URL}/api/admin/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("❌ Failed to delete product:", err);
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
    fetchProducts();
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (p) => p.category?.trim().toLowerCase() === selectedCategory.toLowerCase()
        );

  const categories = [
    "all",
    ...new Set(products.map((p) => p.category?.trim().toLowerCase() || "uncategorized")),
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-green-700">Products</h1>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-green-600 rounded-md px-3 py-2 w-full sm:w-auto text-green-700 focus:ring-2 focus:ring-green-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setShowModal(true);
              setEditProduct(null);
            }}
            className="px-5 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 w-full sm:w-auto"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Product List */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-gray-500 text-lg">No products found for this category.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filteredProducts.map((p) => (
            <li
              key={p.id}
              className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-center gap-3"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-800">{p.name}</p>
                  <p className="text-gray-500 capitalize">{p.category}</p>
                </div>
              </div>

              {/* Price */}
              <span className="text-gray-700 font-medium">
                ₹ {p.price} / {p.unit_type}
              </span>

              {/* Buttons */}
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <button
                  className="flex-1 sm:flex-none px-4 py-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  onClick={() => handleEditProduct(p)}
                >
                  Update
                </button>
                <button
                  className="flex-1 sm:flex-none px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => handleDeleteProduct(p.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Add/Edit Modal */}
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
