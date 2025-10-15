// import { useState, useEffect } from "react";
// import axios from "axios";

// function AddProductModal({ onClose, onProductAdded, editProduct, API_URL }) {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [unitType, setUnitType] = useState("kg");
//   const [category, setCategory] = useState("");
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);

//   // ✅ Predefined categories
//   const categories = [
//     "Fruits",
//     "Vegetables",
//     "Dairy",
//     "Grocery",
//     "Detergents",
//     "Shampoos",
//     "Handwash",
//     "Snacks",
//     "Soaps"
//   ];

//   // Fill form if editing
//   useEffect(() => {
//     if (editProduct) {
//       setName(editProduct.name);
//       setPrice(editProduct.price);
//       setUnitType(editProduct.unit_type);
//       setCategory(editProduct.category);
//       setPreview(editProduct.image || null);
//       setImage(null);
//     } else {
//       setName("");
//       setPrice("");
//       setUnitType("kg");
//       setCategory("");
//       setImage(null);
//       setPreview(null);
//     }
//   }, [editProduct]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name || !price || !unitType || !category) {
//       alert("Please fill all fields");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name.trim());
//     formData.append("price", price);
//     formData.append("unitType", unitType);
//     formData.append("category", category.trim());
//     if (image) formData.append("image", image);

//     try {
//       let res;
//       if (editProduct) {
//         res = await axios.put(
//           `${API_URL}/api/admin/products/update/${editProduct.id}`,
//           formData,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );
//       } else {
//         res = await axios.post(
//           `${API_URL}/api/admin/products/add`,
//           formData,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );
//       }

//       //onProductAdded(res.data);

//       onProductAdded(res.data);
// if (!editProduct && onProductAdded) onProductAdded(res.data);

//       onClose();
//     } catch (err) {
//       console.error(err);
//       alert(editProduct ? "Failed to update product" : "Failed to add product");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white rounded p-6 w-96">
//         <h2 className="text-xl font-bold mb-4">
//           {editProduct ? "Update Product" : "Add Product"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           />

//           {/* ✅ Category Dropdown */}
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           >
//             <option value="" disabled>
//               Select category
//             </option>
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>

//           <select
//             value={unitType}
//             onChange={(e) => setUnitType(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           >
//             <option value="kg">Per kg</option>
//             <option value="piece">Per piece</option>
//             <option value="litre">Per litre</option>
//           </select>

//           <input
//             type="number"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           />

//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               setImage(e.target.files[0]);
//               setPreview(URL.createObjectURL(e.target.files[0]));
//             }}
//           />

//           {preview && (
//             <img
//               src={preview}
//               alt="Preview"
//               className="w-24 h-24 object-cover rounded mt-2"
//             />
//           )}

//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//             >
//               {editProduct ? "Update" : "Add"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddProductModal;


// import { useState, useEffect } from "react";
// import axios from "axios";

// function AddProductModal({ onClose, onProductAdded, editProduct, API_URL }) {
//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("Fruits");
//   const [price, setPrice] = useState("");
//   const [stock, setStock] = useState(0); // <-- stock
//   const [unit, setUnit] = useState("pcs"); // <-- unit
//   const [image, setImage] = useState("");

//   const categories = [
//     "Fruits",
//     "Vegetables",
//     "Dairy",
//     "Grocery",
//     "Detergents",
//     "Shampoos",
//     "Handwash",
//     "Snacks",
//     "Soaps"
//   ];

//   const units = ["pcs", "kg", "g", "liter", "ml"];

//   useEffect(() => {
//     if (editProduct) {
//       setName(editProduct.name);
//       setCategory(editProduct.category);
//       setPrice(editProduct.price);
//       setStock(editProduct.stock || 0);
//       setUnit(editProduct.unit || "pcs");
//       setImage(editProduct.image || "");
//     }
//   }, [editProduct]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const productData = { name, category, price, stock, unit, image };

//     try {
//       if (editProduct) {
//         await axios.put(`${API_URL}/api/admin/products/${editProduct.id}`, productData);
//       } else {
//         await axios.post(`${API_URL}/api/admin/products`, productData);
//       }

//       onProductAdded();
//       onClose();
//     } catch (err) {
//       console.error("Error saving product:", err);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">{editProduct ? "Edit" : "Add"} Product</h2>

//         <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
//           <input
//             type="text"
//             placeholder="Product Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             className="border px-3 py-2 rounded"
//           />

//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="border px-3 py-2 rounded"
//             required
//           >
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>

//           <input
//             type="number"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//             className="border px-3 py-2 rounded"
//           />

//           {/* ✅ Stock input */}
//           <div className="flex space-x-2">
//             <input
//               type="number"
//               placeholder="Stock Quantity"
//               min="0"
//               value={stock}
//               onChange={(e) => setStock(e.target.value)}
//               required
//               className="border px-3 py-2 rounded flex-1"
//             />
//             <select
//               value={unit}
//               onChange={(e) => setUnit(e.target.value)}
//               className="border px-3 py-2 rounded"
//             >
//               {units.map((u) => (
//                 <option key={u} value={u}>{u}</option>
//               ))}
//             </select>
//           </div>

//           <input
//             type="text"
//             placeholder="Image URL"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//             className="border px-3 py-2 rounded"
//           />

//           <div className="flex justify-end space-x-2 mt-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             >
//               {editProduct ? "Update" : "Add"} Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddProductModal;



import { useState, useEffect } from "react";
import axios from "axios";
import AddProductModal from "../components/AddProductModal";
import { FaEdit, FaTrash } from "react-icons/fa";

const categories = [
  "All",
  "Fruits",
  "Vegetables",
  "Dairy",
  "Grocery",
  "Detergents",
  "Shampoos",
  "Handwash",
  "Snacks",
  "Soaps"
];

function AdminProducts({ onProductChange }) {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [filter, setFilter] = useState("All");
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/products`);
      setProducts(res.data || []);
      if (onProductChange) onProductChange();
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
      await axios.delete(`${API_URL}/api/admin/products/${id}`);
      await fetchProducts();
      if (onProductChange) onProductChange();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const filteredProducts = products.filter(product => {
    if (filter === "All") return true;
    return product.category === filter;
  });

  return (
    <div>
      {/* Filter & Add Product */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            setEditProduct(null);
            setShowModal(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Add Product
        </button>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const isOutOfStock = product.stock <= 0;

            return (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300"
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-36 h-36 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-36 h-36 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.category}</p>
                <p className="text-green-600 font-bold text-lg mt-1">₹{product.price}</p>

                {/* ✅ Stock status badge */}
                <div className="mt-2">
                  {isOutOfStock ? (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                      Out of Stock
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      In Stock: {product.stock} {product.unit || ""}
                    </span>
                  )}
                </div>

                {/* Edit / Delete Buttons */}
                <div className="flex space-x-3 mt-4">
                  <button
                    onClick={() => {
                      setEditProduct(product);
                      setShowModal(true);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-5 rounded-lg text-sm flex items-center justify-center"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-5 rounded-lg text-sm flex items-center justify-center"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-3 py-6 font-medium">
            No products found
          </p>
        )}
      </div>

      {/* Add / Edit Modal */}
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
