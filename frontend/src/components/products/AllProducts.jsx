import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

import vegetablesImage from "../../assets/vegetables.jpg";
import fruitsImage from "../../assets/fruits.jpg";
import groceriesImage from "../../assets/groceries.png";
import dairyImage from "../../assets/dairy.jpg";
import soapsImage from "../../assets/soapsanddetergent.jpg";
import snacksImage from "../../assets/snacks.jpeg";

const allProducts = [
  { id: 1, name: "Fresh Carrot", price: 30, image: vegetablesImage },
  { id: 2, name: "Sweet Mango", price: 50, image: fruitsImage },
  { id: 3, name: "Groceries Pack", price: 200, image: groceriesImage },
  { id: 4, name: "Curd & Dairy", price: 60, image: dairyImage },
  { id: 5, name: "Soap Pack", price: 120, image: soapsImage },
  { id: 6, name: "Snacks Combo", price: 80, image: snacksImage },
];

export default function AllProducts() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {allProducts.map((product) => (
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
