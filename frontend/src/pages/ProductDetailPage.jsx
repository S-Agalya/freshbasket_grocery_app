import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { FaArrowLeft, FaShoppingCart, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id, API_URL]);

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return;
    addToCart({ ...product, qty: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-gray-500">Product not found.</p>
      <button onClick={() => navigate(-1)} className="text-green-600 hover:underline">← Go back</button>
    </div>
  );

  const inStock = product.stock > 0;
  const unitDisplay = product.unit || "unit";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 p-4 md:p-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-green-700 hover:text-green-900 mb-6 font-medium"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/2 bg-amber-50 flex items-center justify-center p-8">
          {product.image ? (
            <img src={product.image} alt={product.name} className="max-h-72 object-contain w-full" />
          ) : (
            <div className="w-48 h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">No Image</div>
          )}
        </div>

        {/* Details */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {product.name}
              {unitDisplay ? <span className="text-base font-normal text-gray-500 ml-2">({unitDisplay})</span> : ""}
            </h1>

            <p className="text-3xl font-bold text-green-600 mb-4">₹{product.price}</p>

            {/* Stock status */}
            <div className="flex items-center gap-2 mb-4">
              {inStock ? (
                <>
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-green-700 font-medium">
                    {product.product_type === "bulk"
                      ? `${product.stock} ${product.stock_unit} available`
                      : `${product.stock} ${unitDisplay} in stock`}
                  </span>
                </>
              ) : (
                <>
                  <FaTimesCircle className="text-red-500" />
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Product info table */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Category</span>
                <span className="font-medium">{product.category}</span>
              </div>
              {product.unit_quantity && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Pack Size</span>
                  <span className="font-medium">{product.unit_quantity} {unitDisplay}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Type</span>
                <span className="font-medium capitalize">{product.product_type || "Normal"}</span>
              </div>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white text-lg transition
              ${inStock ? "bg-green-600 hover:bg-green-700 shadow-md" : "bg-gray-300 cursor-not-allowed"}`}
          >
            <FaShoppingCart />
            {added ? "Added to Cart ✓" : inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
