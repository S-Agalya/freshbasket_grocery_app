// import { useContext } from "react";
// import { CartContext } from "../../context/CartContext";

// import riceImage from "../../assets/rice.jpg";
// import AashirvaadAttaImage from "../../assets/wheat.jpg";
// import FortuneOilImage from "../../assets/oil.jpg";
// import sugarImage from "../../assets/sugar.jpg";

// const groceryProducts = [
//   { id: 501, name: "Rice", price: 60, image: riceImage },
//   { id: 502, name: "Aashirvaad Atta", price: 55, image: AashirvaadAttaImage },
//   { id: 503, name: "Fortune Oil", price: 150, image: FortuneOilImage },
//   { id: 504, name: "Sugar", price: 40, image: sugarImage },
// ];

// export default function Groceries() {
//   const { addToCart } = useContext(CartContext);

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {groceryProducts.map((product) => (
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


import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

import riceImage from "../../assets/rice.jpg";
import AashirvaadAttaImage from "../../assets/wheat.jpg";
import FortuneOilImage from "../../assets/Cooking Oil.jpg";
import sugarImage from "../../assets/sugar.jpg";

const groceryProducts = [
  { id: 501, name: "Rice", price: 60, image: riceImage },
  { id: 502, name: "Aashirvaad Atta", price: 55, image: AashirvaadAttaImage },
  { id: 503, name: "Fortune Oil", price: 150, image: FortuneOilImage },
  { id: 504, name: "Sugar", price: 40, image: sugarImage },
];

export default function Groceries() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {groceryProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col"
        >
          <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
            <p className="text-green-700 font-bold">₹ {product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded shadow transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
