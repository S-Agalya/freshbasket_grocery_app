// import { useContext } from "react";
// import { CartContext } from "../../context/CartContext";

// import chipsImage from "../../assets/chips.jpg";
// import biscuitsImage from "../../assets/biscuits.jpg";
// import chocolatesImage from "../../assets/chocolates.jpg";
// import namkeenImage from "../../assets/namkeen.jpg";

// const snackProducts = [
//   { id: 401, name: "Chips", price: 30, image: chipsImage },
//   { id: 402, name: "Biscuits", price: 25, image: biscuitsImage },
//   { id: 403, name: "Chocolates", price: 80, image: chocolatesImage },
//   { id: 404, name: "Namkeen", price: 60, image: namkeenImage },
// ];

// export default function Snacks() {
//   const { addToCart } = useContext(CartContext);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {snackProducts.map((product) => (
//         <div
//           key={product.id}
//           className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col"
//         >
//           <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
//           <div className="p-4 flex flex-col flex-grow">
//             <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
//             <p className="text-green-700 font-bold">₹ {product.price}</p>
//             <button
//               onClick={() => addToCart(product)}
//               className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded shadow transition"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Snacks() {
  const { addToCart } = useContext(CartContext);
  const [snackProducts, setSnackProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      // Match category with backend (use lowercase comparison for safety)
      setSnackProducts(res.data.filter((p) => p.category?.trim().toLowerCase() === "Snacks"));
    } catch (err) {
      console.error("❌ Failed to fetch snack products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {snackProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col"
        >
          <img
            src={`${API_URL}/${product.image}`}
            alt={product.name}
            className="h-48 w-full object-contain p-2 bg-gray-50"
          />
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
            <p className="text-green-700 font-bold">₹ {product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-auto bg-green-600 hover:bg-green-700 text-white py-2 rounded shadow transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
