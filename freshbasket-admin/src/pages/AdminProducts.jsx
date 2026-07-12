


// import { useState, useEffect } from "react";
// import axios from "axios";
// import AddProductModal from "../components/AddProductModal";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const categories = [
//   "All",
//   "Fruits",
//   "Vegetables",
//   "Dairy",
//   "Grocery",
//   "Detergents",
//   "Shampoos",
//   "Handwash",
    <div>
      {/* Filters & Add Product */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        {/* ➕ Add Product Button */}
        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={() => { setEditProduct(null); setShowModal(true); }}
            className="primary-cta px-4 py-2 rounded-md shadow-sm hover:brightness-95 flex items-center gap-2"
          >
            <span className="text-sm">➕</span> <span className="font-medium">Add Product</span>
          </button>

          {/* CSV Upload */}
          <input
            ref={csvInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleCSVUpload}
          />
          <button
            onClick={() => csvInputRef.current?.click()}
            disabled={csvUploading}
            className="px-4 py-2 rounded-md bg-surface text-primary-900 border border-surface-100 shadow-sm flex items-center gap-2 hover:shadow-md disabled:opacity-60"
          >
            <FaUpload /> <span className="text-sm">{csvUploading ? "Uploading..." : "Upload CSV"}</span>
          </button>
          <button
            onClick={downloadTemplate}
            className="px-4 py-2 rounded-md border border-surface-100 text-muted text-sm hover:bg-surface-100"
          >
            ⬇ Template
          </button>
        </div>

        {/* 🧭 Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
        Select Category <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-surface-100 rounded px-3 py-2 bg-surface"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          Stocks:<select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="border border-surface-100 rounded px-3 py-2 bg-surface"
          >
            {stockFilters.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>
      </div>
//       console.error("Error deleting product:", err);
//     }
//   };

//   // ✅ Combined filtering logic
//   const filteredProducts = products.filter((product) => {
//     const matchesCategory =
//       categoryFilter === "All" || product.category === categoryFilter;

//     const matchesStock =
//       stockFilter === "All" ||
//       (stockFilter === "In Stock" && product.stock > 0) ||
//       (stockFilter === "Out of Stock" && product.stock <= 0);

//     return matchesCategory && matchesStock;
//   });

//   return (
//     <div>
//       {/* Filters & Add Product */}
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
//         {/* ➕ Add Product Button */}
//         <button
//           onClick={() => {
//             setEditProduct(null);
//             setShowModal(true);
//           }}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           ➕ Add Product
//         </button>

//         {/* 🧭 Filters */}
//         <div className="flex flex-wrap items-center gap-3">
//           {/* Category Filter */}
//         Select Category <select
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             className="border border-gray-300 rounded px-3 py-2"
//           >
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>

//           {/* Stock Filter */}
//           Stocks:<select
//             value={stockFilter}
//             onChange={(e) => setStockFilter(e.target.value)}
//             className="border border-gray-300 rounded px-3 py-2"
//           >
//             {stockFilters.map((filter) => (
//               <option key={filter} value={filter}>
//                 {filter}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* 🛒 Product Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => {
//             const isOutOfStock = product.stock <= 0;

//             return (
//               <div
//                 key={product.id}
//                 className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300"
//               >
//                 {product.image ? (
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-36 h-36 object-cover rounded-lg mb-4"
//                   />
//                 ) : (
//                   <div className="w-36 h-36 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
//                     No Image
//                   </div>
//                 )}

//                 <h3 className="text-lg font-semibold text-gray-800">
//                   {product.name}
//                 </h3>
//                 <p className="text-gray-500 text-sm">{product.category}</p>
//                 <p className="text-green-600 font-bold text-lg mt-1">
//                   ₹{product.price}
//                 </p>

//                 {/* ✅ Stock status badge */}
// {/* ✅ Stock status badge */}
// <div className="mt-2">
//   {isOutOfStock ? (
//     <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
//       Out of Stock
//     </span>
//   ) : (
//     <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
//       {product.product_type === "bulk"
//         ? `In Stock: ${product.stock} ${product.stock_unit} (each ${product.unit_quantity} ${product.unit})`
//         : `In Stock: ${product.stock} ${product.unit || product.stock_unit}`}
//     </span>
//   )}
// </div>


//                 {/* ✏️ Edit / 🗑️ Delete Buttons */}
//                 <div className="flex space-x-3 mt-4">
//                   <button
//                     onClick={() => {
//                       setEditProduct(product);
//                       setShowModal(true);
//                     }}
//                     className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-5 rounded-lg text-sm flex items-center justify-center"
//                   >
//                     <FaEdit className="mr-1" /> Edit
//                   </button>

//                   <button
//                     onClick={() => handleDelete(product.id)}
//                     className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-5 rounded-lg text-sm flex items-center justify-center"
//                   >
//                     <FaTrash className="mr-1" /> Delete
//                   </button>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-center text-gray-500 col-span-3 py-6 font-medium">
//             No products found
//           </p>
//         )}
//       </div>

//       {/* 🧾 Add / Edit Modal */}
//       {showModal && (
//         <AddProductModal
//           onClose={() => setShowModal(false)}
//           onProductAdded={fetchProducts}
//           editProduct={editProduct}
//           API_URL={API_URL}
//         />
//       )}
//     </div>
//   );
// }

// export default AdminProducts;





import { useState, useEffect, useRef } from "react";
import axios from "axios";
import AddProductModal from "../components/AddProductModal";
import { FaEdit, FaTrash, FaUpload } from "react-icons/fa";

const CSV_TEMPLATE = `name,category,price,stock,stock_unit,unit_quantity,unit,product_type,image
Apple,Fruits,50,100,pcs,1,kg,normal,
Milk 500ml,Dairy,30,50,pcs,500,ml,normal,`;

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
  "Soaps",
];

const stockFilters = ["All", "In Stock", "Out of Stock"];

function parseCSV(text) {
  const lines = text.trim().split("\n").filter(Boolean);
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim());
    return headers.reduce((obj, h, i) => { obj[h] = values[i] || ""; return obj; }, {});
  });
}

function AdminProducts({ onProductChange }) {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [csvUploading, setCsvUploading] = useState(false);
  const csvInputRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${API_URL}/api/admin/products`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setProducts(res.data || []);
      if (onProductChange) onProductChange();
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleCSVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    const parsed = parseCSV(text);
    if (parsed.length === 0) { alert("No valid rows found in CSV."); return; }
    setCsvUploading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post(
        `${API_URL}/api/admin/products/bulk`,
        { products: parsed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`✅ ${res.data.inserted} products uploaded successfully!`);
      fetchProducts();
    } catch (err) {
      alert("CSV upload failed: " + (err.response?.data?.message || err.message));
    } finally {
      setCsvUploading(false);
      e.target.value = "";
    }
  };

  const downloadTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "products_template.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/api/admin/products/${id}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      await fetchProducts();
      if (onProductChange) onProductChange();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // ✅ Combined filtering logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter;

    const matchesStock =
      stockFilter === "All" ||
      (stockFilter === "In Stock" && product.stock > 0) ||
      (stockFilter === "Out of Stock" && product.stock <= 0);

    return matchesCategory && matchesStock;
  });

  return (
    <div>
      {/* Filters & Add Product */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        {/* ➕ Add Product Button */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { setEditProduct(null); setShowModal(true); }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            ➕ Add Product
          </button>

          {/* CSV Upload */}
          <input
            ref={csvInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleCSVUpload}
          />
          <button
            onClick={() => csvInputRef.current?.click()}
            disabled={csvUploading}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            <FaUpload /> {csvUploading ? "Uploading..." : "Upload CSV"}
          </button>
          <button
            onClick={downloadTemplate}
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 text-sm"
          >
            ⬇ Template
          </button>
        </div>

        {/* 🧭 Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
        Select Category <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          Stocks:<select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            {stockFilters.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 🛒 Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const isOutOfStock = product.stock <= 0;

            return (
              <div
                key={product.id}
                className="card-premium p-5 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300"
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-40 h-40 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-40 h-40 bg-surface-100 rounded-lg mb-4 flex items-center justify-center text-muted">
                    No Image
                  </div>
                )}

                <h3 className="text-lg font-semibold text-primary-900">
                  {product.name}
                </h3>
                <p className="text-muted text-sm">{product.category}</p>
                <p className="text-accent font-bold text-lg mt-2">
                  ₹{product.price}
                </p>

                {/* ✅ Stock status badge */}
{/* ✅ Stock status badge */}
<div className="mt-3">
  {isOutOfStock ? (
    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
      Out of Stock
    </span>
  ) : (
    <span className="bg-surface-100 text-primary-900 px-3 py-1 rounded-full text-sm font-semibold">
      {product.product_type === "bulk"
        ? `In Stock: ${product.stock} ${product.stock_unit} (each ${product.unit_quantity} ${product.unit})`
        : `In Stock: ${product.stock} ${product.unit || product.stock_unit}`}
    </span>
  )}
</div>


                {/* ✏️ Edit / 🗑️ Delete Buttons */}
                <div className="flex space-x-3 mt-5">
                  <button
                    onClick={() => { setEditProduct(product); setShowModal(true); }}
                    className="px-4 py-2 rounded-md bg-primary-900 text-white text-sm hover:brightness-95 flex items-center gap-2"
                  >
                    <FaEdit /> <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-4 py-2 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 flex items-center gap-2"
                  >
                    <FaTrash /> <span>Delete</span>
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

      {/* 🧾 Add / Edit Modal */}
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
