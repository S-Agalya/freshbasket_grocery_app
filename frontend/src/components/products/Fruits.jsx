
// import { useContext } from "react";
// import { CartContext } from "../../context/CartContext";

// import appleImage from "../../assets/apple.jpg";
// import bananaImage from "../../assets/banana.jpg";
// import orangeImage from "../../assets/orange.jpg";
// import papayaImage from "../../assets/papaya.jpg";
// import grapesImage from "../../assets/grapes.jpg";

// const fruitProducts = [
//   { id: 101, name: "Apple", price: 120, image: appleImage },
//   { id: 102, name: "Banana", price: 60, image: bananaImage },
//   { id: 103, name: "Orange", price: 80, image: orangeImage },
//   { id: 104, name: "Papaya", price: 150, image: papayaImage },
//   { id: 105, name: "Grapes", price: 90, image: grapesImage },
// ];

// export default function Fruits() {
//   const { addToCart } = useContext(CartContext);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {fruitProducts.map((product) => (
//         <div
//           key={product.id}
//           className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col"
//         >
//           <img
//             src={product.image}
//             //src={`${import.meta.env.VITE_API_URL}/${product.image}`}

//             alt={product.name}
//             className="h-48 sm:h-56 md:h-48 lg:h-52 w-full object-cover"
//           />
//           <div className="p-4 flex flex-col flex-grow">
//             <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
//             <p className="text-green-700 font-bold">₹ {product.price}</p>
//             <button
//               onClick={() => addToCart(product)}
//               className="mt-auto bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow transition"
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
import { CartContext } from "../../context/CartContext";
import axios from "axios";

export default function Fruits() {
  const { addToCart } = useContext(CartContext);
  const [fruitProducts, setFruitProducts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      // Filter for Fruits category
      setFruitProducts(res.data.filter((p) => p.category?.trim() === "Fruits"));
    } catch (err) {
      console.error("Failed to fetch fruit products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {fruitProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col"
        >
          <img
            src={product.image}
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
