import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { isWishlisted, toggleWishlist } from "../../utils/wishlist";

export default function AllProducts() {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fb_wishlist") || "[]"); } catch { return []; }
  });
  const handleWishlist = (product) => {
    toggleWishlist(product);
    setWishlist(JSON.parse(localStorage.getItem("fb_wishlist") || "[]"));
  };
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
    const interval = setInterval(fetchProducts, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600 mt-6">Loading products...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        const unitDisplay = product.unit || "unit";
const stockUnitDisplay =
  product.product_type === "bulk"
    ? `${product.stock} ${product.stock_unit}` // e.g., 10 kg or 4 bags
    : product.stock_unit || unitDisplay;


        return (
          <div
            key={product.id}
            className="bg-gradient-to-b from-white to-amber-50 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                onClick={() => navigate(`/product/${product.id}`)}
                className="w-full h-52 object-contain p-3 bg-amber-50 cursor-pointer"
              />
              <span
                className={`absolute top-2 right-2 px-2 py-1 text-xs rounded font-semibold ${
                  product.stock > 0 ? "bg-green-600 text-white" : "bg-red-600 text-white"
                }`}
              >
                {product.stock > 0 ? "Available" : "Out of Stock"}
              </span>
              <button
                onClick={() => handleWishlist(product)}
                className="absolute top-2 left-2 bg-white rounded-full p-1.5 shadow hover:scale-110 transition"
                title={wishlist.some(w => w.id === product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <FaHeart size={14} className={wishlist.some(w => w.id === product.id) ? "text-red-500" : "text-gray-300"} />
              </button>
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <h3
                onClick={() => navigate(`/product/${product.id}`)}
                className="text-lg font-semibold text-gray-800 mb-1 cursor-pointer hover:text-green-700"
              >
                {product.name} {unitDisplay ? `(${unitDisplay})` : ""}
              </h3>

              <p className="text-amber-700 font-bold mb-1">₹ {product.price}</p>

             <p
  className={`text-sm mb-3 ${
    product.stock > 0 ? "text-green-600" : "text-red-600"
  }`}
>
  {product.stock > 0
    ? product.product_type === "bulk"
      ? `${product.stock} ${product.stock_unit} available`
      : `${product.stock} ${unitDisplay} available`
    : "Out of Stock"}
</p>


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
        );
      })}
    </div>
  );
}
