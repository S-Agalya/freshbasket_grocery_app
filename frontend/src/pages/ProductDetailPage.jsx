import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { FaArrowLeft, FaHeart, FaPlus, FaMinus, FaShoppingCart, FaBolt } from "react-icons/fa";
import { addRecentlyViewed, getRecentlyViewed, isWishlisted, toggleWishlist } from "../utils/wishlist";

/* ── Compact Zepto-style product card reused here ─────────── */
function ProductCard({ p, navigate, cartItems, addToCart, increaseQty, decreaseQty }) {
  const qty = cartItems.find(i => i.id === p.id)?.qty || 0;
  const inStock = p.stock > 0;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col flex-shrink-0 w-36 sm:w-40"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <div className="relative bg-[#f8f9fa] cursor-pointer" onClick={() => navigate(`/product/${p.id}`)}>
        <img src={p.image} alt={p.name} loading="lazy" className="w-full h-28 object-contain p-2" />
        {!inStock && (
          <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
            <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-lg">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-2 flex flex-col flex-grow">
        <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight mb-0.5 cursor-pointer"
          onClick={() => navigate(`/product/${p.id}`)}>
          {p.name}
        </p>
        {p.unit && <p className="text-[10px] text-gray-400 mb-1.5">{p.unit}</p>}
        <div className="mt-auto flex items-center justify-between gap-1">
          <span className="text-sm font-bold text-gray-900">₹{p.price}</span>
          {qty === 0 ? (
            <button disabled={!inStock} onClick={() => inStock && addToCart(p)}
              className={`flex items-center gap-0.5 px-2 py-1 rounded-xl text-xs font-bold border transition active:scale-95 ${
                inStock ? "border-green-500 text-green-600 hover:bg-green-600 hover:text-white"
                        : "border-gray-200 text-gray-300 cursor-not-allowed"}`}>
              <FaPlus size={8} /> Add
            </button>
          ) : (
            <div className="flex items-center gap-1 rounded-xl px-1 py-0.5"
              style={{ background: "linear-gradient(135deg,#16a34a,#059669)" }}>
              <button onClick={() => decreaseQty(p.id)} className="text-white w-5 h-5 flex items-center justify-center"><FaMinus size={7} /></button>
              <span className="text-white text-xs font-bold w-4 text-center">{qty}</span>
              <button onClick={() => increaseQty(p.id)} className="text-white w-5 h-5 flex items-center justify-center"><FaPlus size={7} /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems, increaseQty, decreaseQty } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);
  const [recommended, setRecommended] = useState([]);
  const [peopleBought, setPeopleBought] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const qty = cartItems.find(i => i.id === Number(id))?.qty || 0;

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    axios.get(`${API_URL}/api/products/${id}`)
      .then((res) => {
        const p = res.data;
        setProduct(p);
        setWishlisted(isWishlisted(p.id));
        addRecentlyViewed(p);
        setRecentlyViewed(getRecentlyViewed().filter(rv => rv.id !== p.id).slice(0, 8));
        return axios.get(`${API_URL}/api/products`).then(all => {
          const others = all.data.filter(o => o.id !== p.id);
          setRecommended(others.filter(o => o.category === p.category).slice(0, 8));
          setPeopleBought(others.filter(o => o.category !== p.category).slice(0, 8));
        });
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id, API_URL]);

  const handleWishlist = () => {
    if (!product) return;
    toggleWishlist(product);
    setWishlisted(isWishlisted(product.id));
  };

  const cardProps = { navigate, cartItems, addToCart, increaseQty, decreaseQty };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#f5f7f5" }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-white animate-pulse" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }} />
        <p className="text-sm text-gray-400">Loading product…</p>
      </div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "#f5f7f5" }}>
      <p className="text-gray-500">Product not found.</p>
      <button onClick={() => navigate(-1)} className="text-green-600 font-semibold hover:underline">← Go back</button>
    </div>
  );

  const inStock = product.stock > 0;
  const unitDisplay = product.unit || "";

  return (
    <div className="min-h-screen pb-28 md:pb-10" style={{ background: "#f5f7f5" }}>
      {/* Top bar */}
      <div className="bg-white sticky top-0 z-30"
        style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.06),0 4px 12px rgba(0,0,0,0.04)" }}>
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3.5">
          <button onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition">
            <FaArrowLeft size={13} />
          </button>
          <p className="text-sm font-semibold text-gray-800 truncate max-w-[55%]">{product.name}</p>
          <button onClick={handleWishlist}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-red-50 transition">
            <FaHeart size={16} className={wishlisted ? "text-red-500" : "text-gray-300"} />
          </button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-3 md:px-6">
        {/* Main product card */}
        <div className="bg-white rounded-3xl overflow-hidden mt-4 md:flex"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>

          {/* Image panel */}
          <div className="md:w-2/5 bg-[#f8f9fa] flex items-center justify-center p-8 min-h-[240px]">
            {product.image
              ? <img src={product.image} alt={product.name} className="max-h-56 md:max-h-72 w-full object-contain" />
              : <div className="w-40 h-40 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-sm">No Image</div>
            }
          </div>

          {/* Details panel */}
          <div className="md:w-3/5 p-5 md:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: "#f0fdf4", color: "#15803d" }}>
                  {product.category}
                </span>
                <button onClick={handleWishlist}
                  className="flex items-center gap-1.5 text-xs font-medium transition"
                  style={{ color: wishlisted ? "#ef4444" : "#9ca3af" }}>
                  <FaHeart size={14} className={wishlisted ? "text-red-500" : "text-gray-300"} />
                  {wishlisted ? "Wishlisted" : "Wishlist"}
                </button>
              </div>

              <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-tight mb-1">
                {product.name}
              </h1>
              {unitDisplay && <p className="text-sm text-gray-400 mb-3">{unitDisplay}</p>}

              <p className="text-3xl font-extrabold mb-1" style={{ color: "#0f3d22" }}>
                ₹{product.price}
              </p>

              <div className="flex items-center gap-1.5 mb-4">
                {inStock ? (
                  <>
                    <FaBolt size={11} className="text-green-500" />
                    <span className="text-xs font-semibold text-green-600">
                      {product.product_type === "bulk"
                        ? `${product.stock} ${product.stock_unit} available`
                        : `${product.stock} ${unitDisplay || "units"} in stock`}
                    </span>
                  </>
                ) : (
                  <span className="text-xs font-semibold text-red-500">Out of Stock</span>
                )}
              </div>

              <div className="rounded-2xl p-4 space-y-2.5 text-sm mb-5"
                style={{ background: "#f8faf8", border: "1px solid #e9f0e9" }}>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category</span>
                  <span className="font-semibold text-gray-700">{product.category}</span>
                </div>
                {product.unit_quantity && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pack size</span>
                    <span className="font-semibold text-gray-700">{product.unit_quantity} {unitDisplay}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Type</span>
                  <span className="font-semibold text-gray-700 capitalize">{product.product_type || "Standard"}</span>
                </div>
              </div>
            </div>

            {inStock ? (
              qty === 0 ? (
                <button onClick={() => addToCart(product)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold text-base transition active:scale-[0.98]"
                  style={{ background: "linear-gradient(135deg,#16a34a,#059669)", boxShadow: "0 4px 16px rgba(22,163,74,0.3)" }}>
                  <FaShoppingCart size={16} /> Add to Cart
                </button>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 justify-center rounded-2xl py-3"
                    style={{ background: "linear-gradient(135deg,#16a34a,#059669)", boxShadow: "0 4px 16px rgba(22,163,74,0.25)" }}>
                    <button onClick={() => decreaseQty(product.id)}
                      className="w-8 h-8 flex items-center justify-center text-white rounded-xl hover:bg-white/20 transition">
                      <FaMinus size={12} />
                    </button>
                    <span className="text-white font-extrabold text-lg w-8 text-center">{qty}</span>
                    <button onClick={() => increaseQty(product.id)}
                      className="w-8 h-8 flex items-center justify-center text-white rounded-xl hover:bg-white/20 transition">
                      <FaPlus size={12} />
                    </button>
                  </div>
                  <button onClick={() => navigate("/cart")}
                    className="px-5 py-3 rounded-2xl text-sm font-bold border-2 transition active:scale-95"
                    style={{ borderColor: "#16a34a", color: "#16a34a" }}>
                    View Cart
                  </button>
                </div>
              )
            ) : (
              <button disabled className="w-full py-3.5 rounded-2xl bg-gray-100 text-gray-400 font-bold cursor-not-allowed">
                Out of Stock
              </button>
            )}
          </div>
        </div>

        {/* You Might Also Like */}
        {recommended.length > 0 && (
          <div className="mt-7">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-extrabold text-gray-900">You Might Also Like</h2>
              <button onClick={() => navigate(`/order?category=${encodeURIComponent(product.category)}`)}
                className="text-xs font-semibold text-green-700 hover:underline">See all →</button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
              {recommended.map(p => <ProductCard key={p.id} p={p} {...cardProps} />)}
            </div>
          </div>
        )}

        {/* People Also Bought */}
        {peopleBought.length > 0 && (
          <div className="mt-7">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-extrabold text-gray-900">People Also Bought</h2>
              <button onClick={() => navigate("/order")}
                className="text-xs font-semibold text-green-700 hover:underline">Browse all →</button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
              {peopleBought.map(p => <ProductCard key={p.id} p={p} {...cardProps} />)}
            </div>
          </div>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div className="mt-7 mb-4">
            <h2 className="text-base font-extrabold text-gray-900 mb-3">Recently Viewed</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
              {recentlyViewed.map(p => <ProductCard key={p.id} p={p} {...cardProps} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

