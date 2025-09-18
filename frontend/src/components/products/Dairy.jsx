// src/pages/Dairy.js
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

import aavinmilkImage from "../../assets/aavinmilk.jpg";
import dodlamilkImage from "../../assets/dodlamilk.jpg";
import curdImage from "../../assets/curd.jpg";
import butterImage from "../../assets/butter.jpg";
import cheeseImage from "../../assets/cheese.jpg";
import paneerImage from "../../assets/paneer.jpg";
import gheepacketImage from "../../assets/gheepacket.jpg";
import gheebottleImage from "../../assets/gheebottle.jpg";

const dairyProducts = [
  { id: 201, name: "Aavin Milk", price: 50, image: aavinmilkImage },
  { id: 202, name: "Curd", price: 40, image: curdImage },
  { id: 203, name: "Butter", price: 120, image: butterImage },
  { id: 204, name: "Cheese", price: 150, image: cheeseImage },
  { id: 205, name: "Dodla Milk", price: 50, image: dodlamilkImage },
  { id: 206, name: "Paneer", price: 90, image: paneerImage },
  { id: 207, name: "Ghee Packet", price: 250, image: gheepacketImage },
  { id: 208, name: "Ghee Bottle", price: 300, image: gheebottleImage },
];

export default function Dairy() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dairyProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-28 w-full object-contain p-2"
          />
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
