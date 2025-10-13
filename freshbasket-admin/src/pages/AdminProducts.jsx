

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

  // const handleDelete = async (id) => {
  //   if (!window.confirm("Are you sure you want to delete this product?")) return;
  //   try {
  //     await axios.delete(`${API_URL}/api/admin/products/delete/${id}`);
  //     fetchProducts();
  //   } catch (err) {
  //     console.error("Error deleting product:", err);
  //   }
  // };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;
  try {
    //await axios.delete(`${API_URL}/api/admin/products/delete/${id}`);
    await axios.delete(`${API_URL}/api/admin/products/${id}`);
    await fetchProducts();
    if (onProductChange) onProductChange(); // ✅ call after delete
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

        <div className="flex space-x-3 mt-4">
          {/* Edit Button */}
          <button
            onClick={() => {
              setEditProduct(product);
              setShowModal(true);
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-5 rounded-lg text-sm transition-all duration-200 flex items-center justify-center
              md:px-4 md:py-2 md:text-base sm:text-sm"
          >
            <span className="hidden sm:inline">Edit</span>
            <span className="sm:hidden">✏️</span>
          </button>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(product.id)}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-5 rounded-lg text-sm transition-all duration-200 flex items-center justify-center
              md:px-4 md:py-2 md:text-base sm:text-sm"
          >
            <span className="hidden sm:inline">Delete</span>
            <span className="sm:hidden">🗑️</span>
          </button>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500 col-span-3 py-6 font-medium">
      No products found
    </p>
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
