import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { getWishlist, toggleWishlist } from "../utils/wishlist";

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
