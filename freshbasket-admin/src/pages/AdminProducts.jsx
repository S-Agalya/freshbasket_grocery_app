import { useState, useEffect } from "react";
import axios from "axios";
import AddProductModal from "../components/AddProductModal";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-green-700">Manage Products</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
        >
          + Add Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center text-center"
          >
            <img
              src={
                p.image.startsWith("http")
                  ? p.image
                  : `${API_URL}/uploads/${p.image}`
              }
              alt={p.name}
              className="w-24 h-24 object-cover rounded mb-2"
            />
            <h2 className="font-semibold">{p.name}</h2>
            <p className="text-gray-500">₹{p.price}</p>
            <p
              className={`text-sm mt-1 ${
                p.quantity === 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {p.quantity === 0 ? "Out of Stock" : `In Stock: ${p.quantity}`}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && <AddProductModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default AdminProducts;
