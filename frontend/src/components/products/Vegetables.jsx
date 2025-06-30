import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

import carrotImage from "../../assets/carrot.jpg";
import cucumberImage from "../../assets/cucumber.jpg";
import beetrootImage from "../../assets/beetroot.jpg";
import tomatoImage from "../../assets/tomato.jpeg";
import capsicumImage from "../../assets/capsicum.jpeg";

const vegetableProducts = [
  { id: 1, name: "Carrot", price: 30, image: carrotImage },
  { id: 2, name: "Cucumber", price: 25, image: cucumberImage },
  { id: 3, name: "Beetroot", price: 20, image: beetrootImage },
  { id: 4, name: "Tomato", price: 15, image: tomatoImage },
  { id: 5, name: "Capsicum", price: 35, image: capsicumImage },
];

export default function Vegetables() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {vegetableProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col">
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
