


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
  "Soaps",
];

const stockFilters = ["All", "In Stock", "Out of Stock"];

function AdminProducts({ onProductChange }) {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
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
        <button
          onClick={() => {
            setEditProduct(null);
            setShowModal(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Add Product
        </button>

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

                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm">{product.category}</p>
                <p className="text-green-600 font-bold text-lg mt-1">
                  ₹{product.price}
                </p>

                {/* ✅ Stock status badge */}
                <div className="mt-2">
                  {isOutOfStock ? (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                      Out of Stock
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
  In Stock: {product.stock} {product.stock_unit || ""} ({product.unit_quantity} {product.unit_type} each)
</span>

                  )}
                </div>

                {/* ✏️ Edit / 🗑️ Delete Buttons */}
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
