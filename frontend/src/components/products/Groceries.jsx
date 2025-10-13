

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Groceries() {
  const { addToCart } = useContext(CartContext);
  const [groceryProducts, setGroceryProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      // Ensure category matches backend (e.g., 'groceries' or 'Grocery')
      setGroceryProducts(res.data.filter((p) => p.category?.trim() === "Grocery"));
    } catch (err) {
      console.error("Failed to fetch grocery products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {groceryProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col"
        >
          <img
            src={product.image} // ✅ backend image support
            alt={product.name}
            className="w-full h-48 sm:h-56 md:h-48 lg:h-52 object-contain p-2 bg-gray-50"
          />
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
            <p className="text-green-700 font-bold">₹ {product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-auto bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
