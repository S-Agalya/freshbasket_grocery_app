import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { isWishlisted, toggleWishlist } from "../../utils/wishlist";

export default function AllProducts() {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
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

  const PAGE_SIZE = 12;
  const totalPages = Math.ceil(products.length / PAGE_SIZE);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((product) => {
        const unitDisplay = product.unit || "unit";
const stockUnitDisplay =
  product.product_type === "bulk"
    ? `${product.stock} ${product.stock_unit}` // e.g., 10 kg or 4 bags
    : product.stock_unit || unitDisplay;


        return (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group"
          >
            <div className="relative overflow-hidden bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                onClick={() => navigate(`/product/${product.id}`)}
                className="w-full h-48 object-contain p-4 cursor-pointer group-hover:scale-105 transition-transform duration-300"
              />
              <span className={`absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
                product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
              }`}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
              <button
                onClick={() => handleWishlist(product)}
                className="absolute top-2 left-2 bg-white rounded-full p-1.5 shadow hover:scale-110 transition"
              >
                <FaHeart size={13} className={wishlist.some(w => w.id === product.id) ? "text-red-500" : "text-gray-300"} />
              </button>
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <h3
                onClick={() => navigate(`/product/${product.id}`)}
                className="text-sm font-semibold text-gray-800 mb-1 cursor-pointer hover:text-green-600 line-clamp-2"
              >
                {product.name} {unitDisplay ? `(${unitDisplay})` : ""}
              </h3>
              <p className="text-xs text-gray-400 mb-2">{product.category}</p>
              <p className="text-green-600 font-bold text-base mb-1">₹ {product.price}</p>
              <p className={`text-xs mb-3 ${product.stock > 0 ? "text-gray-500" : "text-red-500"}`}>
                {product.stock > 0
                  ? product.product_type === "bulk"
                    ? `${product.stock} ${product.stock_unit} available`
                    : `${product.stock} ${unitDisplay} available`
                  : "Currently unavailable"}
              </p>
              <button
                onClick={() => {
                  if (product.stock === 0) { alert("❌ This product is out of stock."); return; }
                  addToCart(product);
                }}
                disabled={product.stock === 0}
                className={`mt-auto py-2 rounded-xl text-sm font-semibold transition ${
                  product.stock === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>
        );
      })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-green-50 disabled:opacity-40 font-medium">
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPage(n)}
              className={`w-9 h-9 rounded-full font-semibold text-sm transition ${
                n === page ? "bg-green-600 text-white shadow" : "bg-white border border-gray-300 text-gray-600 hover:bg-green-50"
              }`}>
              {n}
            </button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-green-50 disabled:opacity-40 font-medium">
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
