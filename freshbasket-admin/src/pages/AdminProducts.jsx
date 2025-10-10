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

  // ✅ Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch products:", err);
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Delete product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_URL}/api/admin/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("❌ Failed to delete product:", err);
      alert("Failed to delete product");
    }
  };

  // ✅ Open modal for editing
  const handleEditProduct = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  // ✅ After adding/updating product
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
    fetchProducts(); // refresh list
  };

  // ✅ Filtered list based on selected category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (p) => p.category?.trim().toLowerCase() === selectedCategory.toLowerCase()
        );

  // ✅ Extract all unique categories
  const categories = [
    "all",
    ...new Set(products.map((p) => p.category?.trim().toLowerCase() || "uncategorized")),
  ];

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-green-700">Products</h1>

        <div className="flex items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-green-500 rounded-lg px-3 py-2 text-green-700 focus:outline-none"
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
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            + Add Product
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-lg text-gray-600 mb-4">
            No products found for this category.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filteredProducts.map((p) => (
            <li
              key={p.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <span className="font-semibold">{p.name}</span>
                  <p className="text-gray-500">
                    {p.category?.charAt(0).toUpperCase() + p.category?.slice(1)}
                  </p>
                </div>
              </div>

              <span className="text-gray-600">
                ₹ {p.price} / {p.unit_type}
              </span>

              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  onClick={() => handleEditProduct(p)}
                >
                  Update
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
