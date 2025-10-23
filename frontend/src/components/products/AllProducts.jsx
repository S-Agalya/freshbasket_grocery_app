import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";

export default function AllProducts() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
        alert("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600 mt-6">Loading products...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-gradient-to-b from-white to-amber-50 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col"
        >
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-contain p-3 bg-amber-50"
            />
            <span
              className={`absolute top-2 right-2 px-2 py-1 text-xs rounded font-semibold ${
                product.stock > 0 ? "bg-green-600 text-white" : "bg-red-600 text-white"
              }`}
            >
              {product.stock > 0 ? "Available" : "Out of Stock"}
            </span>
          </div>

          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>

            <p className="text-amber-700 font-bold mb-1">₹ {product.price}</p>
<p className="text-green-700 font-bold mb-1">${product.stock} ${product.unit}</p>
            <button
              onClick={() => {
                if (product.stock === 0) {
                  alert("❌ This product is out of stock and cannot be added to the cart.");
                  return;
                }
                addToCart(product);
              }}
              disabled={product.stock === 0}
              className={`mt-auto py-2 rounded-lg shadow text-white font-semibold transition duration-300 ${
                product.stock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
