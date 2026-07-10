import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaTrash, FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { getWishlist, toggleWishlist } from "../utils/wishlist";

export default function WishlistPage() {
  const navigate = useNavigate();
  const { addToCart, cartItems, increaseQty, decreaseQty } = useContext(CartContext);
  const [items, setItems] = useState(getWishlist);

  const getQty = (id) => cartItems.find(i => i.id === id)?.qty || 0;

  const handleRemove = (product) => {
    toggleWishlist(product);
    setItems(getWishlist());
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8" style={{ background: "#f5f7f5" }}>
      {/* Header */}
      <div className="bg-white sticky top-0 z-30"
        style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)" }}>
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition">
              <FaArrowLeft size={13} />
            </button>
            <div>
              <h1 className="text-base font-extrabold text-gray-900 leading-none">My Wishlist</h1>
              <p className="text-xs text-gray-400 mt-0.5">{items.length} saved item{items.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <button onClick={() => navigate("/order")}
            className="text-xs font-semibold text-green-700 px-3 py-1.5 rounded-xl hover:bg-green-50 transition">
            Browse more →
          </button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-3 py-4 md:px-6">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-5"
              style={{ background: "linear-gradient(135deg,#fff1f2,#ffe4e6)" }}>
              ❤️
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
            <p className="text-sm text-gray-400 mb-7 max-w-xs">Save products you love and find them here anytime.</p>
            <button onClick={() => navigate("/order")}
              className="text-white font-bold px-7 py-2.5 rounded-2xl text-sm shadow-md"
              style={{ background: "linear-gradient(135deg,#16a34a,#059669)" }}>
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {items.map((product) => {
              const qty = getQty(product.id);
              const inStock = product.stock > 0;
              return (
                <div key={product.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>

                  {/* Image */}
                  <div className="relative bg-[#f8f9fa] cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}>
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-32 object-contain p-3"
                    />
                    {!inStock && (
                      <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    {/* Remove from wishlist */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRemove(product); }}
                      className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center text-red-400 hover:text-red-600 hover:scale-110 transition">
                      <FaTrash size={10} />
                    </button>
                    <div className="absolute top-2 left-2 w-6 h-6 flex items-center justify-center">
                      <FaHeart size={11} className="text-red-500" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-2.5 flex flex-col flex-grow">
                    <p
                      className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight mb-0.5 cursor-pointer hover:text-green-700"
                      onClick={() => navigate(`/product/${product.id}`)}>
                      {product.name}
                    </p>
                    {product.unit && <p className="text-[10px] text-gray-400 mb-2">{product.unit}</p>}

                    {/* Price + Add/Stepper */}
                    <div className="mt-auto flex items-center justify-between gap-1">
                      <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                      {qty === 0 ? (
                        <button
                          disabled={!inStock}
                          onClick={() => inStock && addToCart(product)}
                          className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold border transition active:scale-95 ${
                            inStock
                              ? "border-green-500 text-green-600 hover:bg-green-600 hover:text-white"
                              : "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"
                          }`}>
                          <FaPlus size={8} /> Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-1 rounded-xl px-1.5 py-1"
                          style={{ background: "linear-gradient(135deg,#16a34a,#059669)" }}>
                          <button onClick={() => decreaseQty(product.id)}
                            className="text-white w-5 h-5 flex items-center justify-center active:scale-90">
                            <FaMinus size={8} />
                          </button>
                          <span className="text-white text-xs font-bold w-4 text-center">{qty}</span>
                          <button onClick={() => increaseQty(product.id)}
                            className="text-white w-5 h-5 flex items-center justify-center active:scale-90">
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
        )}
      </div>
    </div>
  );
}


export default function WishlistPage() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [items, setItems] = useState(getWishlist);

  const handleRemove = (product) => {
    toggleWishlist(product);
    setItems(getWishlist());
  };

  const handleAddToCart = (product) => {
    if (product.stock <= 0) { alert("This product is out of stock."); return; }
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="text-green-700 hover:underline font-medium">← Back</button>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaHeart className="text-red-500" /> My Wishlist
            <span className="text-base font-normal text-gray-500">({items.length} items)</span>
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <FaHeart className="text-gray-300 mx-auto mb-4" size={64} />
            <p className="text-gray-500 text-lg mb-4">Your wishlist is empty.</p>
            <button onClick={() => navigate("/order")} className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700">
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((product) => {
              const unitDisplay = product.unit || "unit";
              const inStock = product.stock > 0;
              return (
                <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="w-full h-44 object-contain p-3 bg-amber-50 cursor-pointer"
                    />
                    <button
                      onClick={() => handleRemove(product)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow text-red-500 hover:text-red-700"
                      title="Remove from wishlist"
                    >
                      <FaTrash size={12} />
                    </button>
                    <span className={`absolute top-2 left-2 px-2 py-0.5 text-xs rounded font-semibold ${inStock ? "bg-green-600 text-white" : "bg-red-500 text-white"}`}>
                      {inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 onClick={() => navigate(`/product/${product.id}`)} className="font-semibold text-gray-800 cursor-pointer hover:text-green-700 mb-1">
                      {product.name} {unitDisplay ? `(${unitDisplay})` : ""}
                    </h3>
                    <p className="text-green-600 font-bold mb-3">₹{product.price}</p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!inStock}
                      className={`mt-auto flex items-center justify-center gap-2 py-2 rounded-lg text-white font-medium text-sm
                        ${inStock ? "bg-green-600 hover:bg-green-700" : "bg-gray-300 cursor-not-allowed"}`}
                    >
                      <FaShoppingCart size={14} /> Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
