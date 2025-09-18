import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

import chipsImage from "../../assets/chips.jpg";
import biscuitsImage from "../../assets/biscuits.jpg";
import chocolatesImage from "../../assets/chocolates.jpg";
import namkeenImage from "../../assets/namkeen.jpg";

const snackProducts = [
  { id: 401, name: "Chips", price: 30, image: chipsImage },
  { id: 402, name: "Biscuits", price: 25, image: biscuitsImage },
  { id: 403, name: "Chocolates", price: 80, image: chocolatesImage },
  { id: 404, name: "Namkeen", price: 60, image: namkeenImage },
];

export default function Snacks() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {snackProducts.map((product) => (
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
