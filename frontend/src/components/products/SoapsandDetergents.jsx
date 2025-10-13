// import { useContext } from "react";
// import { CartContext } from "../../context/CartContext";

// // ✅ Replace with actual images you have in /assets
// import lifebuoyImage from "../../assets/lifebuoy.jpg";
// import doveImage from "../../assets/dove.jpg";


// import surfexcelImage from "../../assets/surfexcel.jpg";

// import rinImage from "../../assets/rin.jpg";


// import sunsilkImage from "../../assets/sunsilk.jpg";
// import panteneImage from "../../assets/pantene.jpg";


// import dettolHandwashImage from "../../assets/dettolhandwash.jpg";
// import himalayaHandwashImage from "../../assets/himalayahandwash.jpg";

// const soapProducts = [
//   // 🧼 Soaps
//   { id: 301, name: "Lifebuoy Soap", price: 40, image: lifebuoyImage },
//   { id: 302, name: "Dove Soap", price: 60, image: doveImage },
  
//   // 🧺 Detergents
//   { id: 305, name: "Surf Excel", price: 180, image: surfexcelImage },
 
//   { id: 307, name: "Rin", price: 90, image: rinImage },
  

//   // 🧴 Shampoos
 
//   { id: 311, name: "Sunsilk Shampoo", price: 130, image: sunsilkImage },
//   { id: 312, name: "Pantene Shampoo", price: 140, image: panteneImage },

//   // 🖐 Hand Wash
  
//   { id: 314, name: "Dettol Handwash", price: 65, image: dettolHandwashImage },
//   { id: 315, name: "Himalaya Handwash", price: 70, image: himalayaHandwashImage },
//   //{ id: 316, name: "Palmolive Handwash", price: 75, image: palmoliveHandwashImage },
// ];

// export default function SoapsAndDetergents() {
//   const { addToCart } = useContext(CartContext);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {soapProducts.map((product) => (
//         <div
//           key={product.id}
//           className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col"
//         >
//           <img
//             src={product.image}
//             alt={product.name}
//             className="h-36 w-full object-contain p-2 bg-gray-50"
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


// import { useContext } from "react";
// import { CartContext } from "../../context/CartContext";

// import lifebuoyImage from "../../assets/lifebuoy.jpg";
// import doveImage from "../../assets/dove.jpg";

// const soapsProducts = [
//   { id: 301, name: "Lifebuoy Soap", price: 40, image: lifebuoyImage },
//   { id: 302, name: "Dove Soap", price: 60, image: doveImage },
// ];

// export default function SoapsAndDetergents() {
//   const { addToCart } = useContext(CartContext);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {soapsProducts.map((product) => (
//         <div
//           key={product.id}
//           className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col"
//         >
//           <img
//             src={product.image}
//             alt={product.name}
//             className="h-48 sm:h-56 md:h-48 lg:h-52 w-full object-contain p-2 bg-gray-50"
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
import axios from "axios";
import { CartContext } from "../../context/CartContext";

export default function SoapsAndDetergents() {
  const { addToCart } = useContext(CartContext);
  const [soapsProducts, setSoapsProducts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      // ✅ Match any of these categories (case-insensitive)
      const validCategories = ["Soaps", "Detergents", "Shampoos","Handwash"];

      const filtered = res.data.filter((p) =>
        validCategories.includes(p.category?.trim())
      );

      setSoapsProducts(filtered);
    } catch (err) {
      console.error("❌ Failed to fetch soap-related products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {soapsProducts.map((product) => (
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
