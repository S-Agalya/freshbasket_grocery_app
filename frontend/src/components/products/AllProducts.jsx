// import { useContext } from "react";
// import { CartContext } from "../../context/CartContext";

// // ✅ Imports reused product images
// import riceImage from "../../assets/rice.jpg";
// import AashirvaadAttaImage from "../../assets/wheat.jpg";
// import aavinmilkImage from "../../assets/aavinmilk.jpg";
// import butterImage from "../../assets/butter.jpg";
// import chipsImage from "../../assets/chips.jpg";
// import chocolatesImage from "../../assets/chocolates.jpg";
// import appleImage from "../../assets/apple.jpg";
// import grapesImage from "../../assets/grapes.jpg";
// import carrotImage from "../../assets/carrot.jpg";
// import tomatoImage from "../../assets/tomato.jpeg";
// import lifebuoyImage from "../../assets/lifebuoy.jpg";
// import doveImage from "../../assets/dove.jpg";

// const allProducts = [
//   // 🛒 Groceries (2)
//   { id: 501, name: "Rice", price: 60, image: riceImage },
//   { id: 502, name: "Aashirvaad Atta", price: 55, image: AashirvaadAttaImage },

//   // 🥛 Dairy (2)
//   { id: 201, name: "Aavin Milk", price: 50, image: aavinmilkImage },
//   { id: 203, name: "Butter", price: 120, image: butterImage },

//   // 🍫 Snacks (2)
//   { id: 401, name: "Chips", price: 30, image: chipsImage },
//   { id: 403, name: "Chocolates", price: 80, image: chocolatesImage },

//   // 🥕 Vegetables (2)
//   { id: 1, name: "Carrot", price: 30, image: carrotImage },
//   { id: 2, name: "Tomato", price: 15, image: tomatoImage },

//   // 🍎 Fruits (2)
//   { id: 101, name: "Apple", price: 120, image: appleImage },


//   // 🧼 Soaps & Detergents (2)
//   { id: 301, name: "Lifebuoy Soap", price: 40, image: lifebuoyImage },
//   { id: 302, name: "Dove Soap", price: 60, image: doveImage },
// ];

// export default function AllProducts() {
//   const { addToCart } = useContext(CartContext);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {allProducts.map((product) => (
//         <div
//           key={product.id}
//           className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col"
//         >
//           <img
//             src={product.image}
//             alt={product.name}
//             className="h-40 w-full object-contain p-2 bg-gray-50"
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



import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

import riceImage from "../../assets/rice.jpg";
import AashirvaadAttaImage from "../../assets/wheat.jpg";
import aavinmilkImage from "../../assets/aavinmilk.jpg";
import butterImage from "../../assets/butter.jpg";
import chipsImage from "../../assets/chips.jpg";
import chocolatesImage from "../../assets/chocolates.jpg";
import appleImage from "../../assets/apple.jpg";
import carrotImage from "../../assets/carrot.jpg";
import tomatoImage from "../../assets/tomato.jpeg";
import lifebuoyImage from "../../assets/lifebuoy.jpg";
import doveImage from "../../assets/dove.jpg";
import grapesImage from "../../assets/grapes.jpg";

const allProducts = [
  { id: 501, name: "Rice", price: 60, image: riceImage },
  { id: 502, name: "Aashirvaad Atta", price: 55, image: AashirvaadAttaImage },
  { id: 201, name: "Aavin Milk", price: 50, image: aavinmilkImage },
  { id: 203, name: "Butter", price: 120, image: butterImage },
  { id: 401, name: "Chips", price: 30, image: chipsImage },
  { id: 403, name: "Chocolates", price: 80, image: chocolatesImage },
  { id: 1, name: "Carrot", price: 30, image: carrotImage },
  { id: 2, name: "Tomato", price: 15, image: tomatoImage },
  { id: 101, name: "Apple", price: 120, image: appleImage },
  { id: 301, name: "Lifebuoy Soap", price: 40, image: lifebuoyImage },
  { id: 302, name: "Dove Soap", price: 60, image: doveImage },
  { id: 105, name: "Grapes", price: 90, image: grapesImage },
];

export default function AllProducts() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {allProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col"
        >
          <img
            //src={`${import.meta.env.VITE_API_URL}/${product.image}`}
            src={product.image}

            alt={product.name}
            className="h-48 sm:h-56 md:h-48 lg:h-52 w-full object-contain p-2 bg-gray-50"
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
