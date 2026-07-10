import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaPlus, FaMinus } from "react-icons/fa";
import { toggleWishlist, isWishlisted } from "../../utils/wishlist";

export default function CategoryTemplate({ category }) {
  const { addToCart, cartItems, increaseQty, decreaseQty } = useContext(CartContext);
  const navigate = useNavigate();
  const [wishlistIds, setWishlistIds] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem(`fb_wishlist_${localStorage.getItem("userId") || "guest"}`) || "[]").map(p => p.id)); } catch { return new Set(); }
  });
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleWishlist = (product) => {
    toggleWishlist(product);
    setWishlistIds(prev => {
      const next = new Set(prev);
      next.has(product.id) ? next.delete(product.id) : next.add(product.id);
      return next;
    });
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data.filter((p) => p.category?.trim() === category));
    } catch (err) {
      console.error(`Failed to fetch ${category} products:`, err);
    }
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 5000);
    return () => clearInterval(interval);
  }, [category]);

  const getQty = (id) => cartItems.find(i => i.id === id)?.qty || 0;

  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const paged = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (products.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
            <div className="bg-gray-100 h-36" />
            <div className="p-3 space-y-2">
              <div className="h-3 bg-gray-100 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
              <div className="h-8 bg-gray-100 rounded mt-3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {paged.map((product) => {
          const qty = getQty(product.id);
          const inStock = product.stock > 0;
          const wishlisted = wishlistIds.has(product.id);
          const unitDisplay = product.unit || "";
          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div
                className="relative bg-[#f8f9fa] cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-36 object-contain p-3"
                />
                {!inStock && (
                  <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">Out of Stock</span>
                  </div>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); handleWishlist(product); }}
                  className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full shadow-sm flex items-center justify-center hover:scale-110 transition"
                >
                  <FaHeart size={12} className={wishlisted ? "text-red-500" : "text-gray-300"} />
                </button>
              </div>

              {/* Info */}
              <div className="p-2.5 flex flex-col flex-grow">
                <p
                  className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight mb-0.5 cursor-pointer hover:text-green-600"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.name}
                </p>
                {unitDisplay && <p className="text-[11px] text-gray-400 mb-2">{unitDisplay}</p>}

                {/* Price + Add/Stepper */}
                <div className="mt-auto flex items-center justify-between gap-1">
                  <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                  {qty === 0 ? (
                    <button
                      disabled={!inStock}
                      onClick={() => inStock && addToCart(product)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition active:scale-95 ${
                        inStock
                          ? "border-green-500 text-green-600 hover:bg-green-600 hover:text-white"
                          : "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"
                      }`}
                    >
                      <FaPlus size={9} /> Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 bg-green-600 rounded-xl px-1.5 py-1">
                      <button onClick={() => decreaseQty(product.id)} className="text-white w-5 h-5 flex items-center justify-center active:scale-90">
                        <FaMinus size={8} />
                      </button>
                      <span className="text-white text-xs font-bold w-4 text-center">{qty}</span>
                      <button onClick={() => increaseQty(product.id)} className="text-white w-5 h-5 flex items-center justify-center active:scale-90">
                        <FaPlus size={8} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8 pb-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:border-green-500 disabled:opacity-40 text-sm font-medium transition"
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPage(n)}
              className={`w-9 h-9 rounded-xl font-semibold text-sm transition ${
                n === page ? "bg-green-600 text-white shadow-sm" : "bg-white border border-gray-200 text-gray-600 hover:border-green-400"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:border-green-500 disabled:opacity-40 text-sm font-medium transition"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
