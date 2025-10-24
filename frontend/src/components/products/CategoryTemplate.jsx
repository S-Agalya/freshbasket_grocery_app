import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import axios from "axios";

export default function CategoryTemplate({ category }) {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data.filter((p) => p.category?.trim() === category));
    } catch (err) {
      console.error(`❌ Failed to fetch ${category} products:`, err);
    }
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 5000);
    return () => clearInterval(interval);
  }, []);

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
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 sm:h-56 md:h-48 lg:h-52 object-contain p-2 bg-gray-50"
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
              <h3 className="text-lg font-semibold mb-1">
                {product.name} {unitDisplay ? `(${unitDisplay})` : ""}
              </h3>

              <p className="text-green-700 font-bold mb-1">₹ {product.price}</p>

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
