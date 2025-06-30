// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";

// import vegetablesImage from "../assets/vegetables.jpg";
// import fruitsImage from "../assets/fruits.jpg";
// import groceriesImage from "../assets/groceries.png";
// import dairyImage from "../assets/dairy.jpg";
// import soapsImage from "../assets/soapsanddetergent.jpg";
// import snacksImage from "../assets/snacks.jpeg";

// import { CartContext } from "../context/CartContext";
// import Header from "../components/Header";

// const products = [
//   { id: 1, name: "Fresh Carrot", price: 30, image: vegetablesImage },
//   { id: 2, name: "Sweet Mango", price: 50, image: fruitsImage },
//   { id: 3, name: "Groceries Pack", price: 200, image: groceriesImage },
//   { id: 4, name: "Curd & Dairy", price: 60, image: dairyImage },
//   { id: 5, name: "Soap Pack", price: 120, image: soapsImage },
//   { id: 6, name: "Snacks Combo", price: 80, image: snacksImage },
// ];

// const PlaceOrderPage = () => {
//   const username = localStorage.getItem("username") || "User";
//   const { addToCart } = useContext(CartContext);

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
//       <Header username={username} />

//       <div className="flex flex-1 overflow-hidden">
//         <aside className="w-72 bg-white p-6 shadow-lg hidden md:flex flex-col">
//           <h2 className="text-xl font-bold mb-4 border-b pb-2">Categories</h2>
//           <ul className="flex-1 flex flex-col gap-4">
//             <li className="bg-green-100 hover:bg-green-200 rounded-xl p-4 text-lg font-medium text-center shadow transition">Vegetables</li>
//             <li className="bg-green-100 hover:bg-green-200 rounded-xl p-4 text-lg font-medium text-center shadow transition">Fruits</li>
//             <li className="bg-green-100 hover:bg-green-200 rounded-xl p-4 text-lg font-medium text-center shadow transition">Groceries</li>
//             <li className="bg-green-100 hover:bg-green-200 rounded-xl p-4 text-lg font-medium text-center shadow transition">Dairy</li>
//             <li className="bg-green-100 hover:bg-green-200 rounded-xl p-4 text-lg font-medium text-center shadow transition">Soaps & Detergents</li>
//             <li className="bg-green-100 hover:bg-green-200 rounded-xl p-4 text-lg font-medium text-center shadow transition">Snacks</li>
//           </ul>
//         </aside>

//         <main className="flex-1 p-6 md:p-10">
//           <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Place Your Order</h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {products.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col"
//               >
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="h-48 w-full object-cover"
//                 />
//                 <div className="p-4 flex flex-col flex-grow">
//                   <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
//                   <p className="text-green-700 font-bold">₹ {product.price}</p>
//                   <button
//                     onClick={() => addToCart(product)}
//                     className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded shadow transition"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>

//             ))}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default PlaceOrderPage;


import { useState,useEffect } from "react";
import Header from "../components/Header";
import AllProducts from "../components/products/AllProducts";
import Vegetables from "../components/products/Vegetables";
import { useSearchParams } from "react-router-dom";
export default function PlaceOrderPage() {
  const username = localStorage.getItem("username") || "User";
  const [selectedCategory, setSelectedCategory] = useState("All");
const [searchParams] = useSearchParams();
  const categories = [
    "All",
    "Vegetables",
    "Fruits",
    "Groceries",
    "Dairy",
    "Soaps & Detergents",
    "Snacks",
  ];
useEffect(() => {
  const categoryFromUrl = searchParams.get("category");
  if (categoryFromUrl) {
    setSelectedCategory(categoryFromUrl);
  }
}, [searchParams]);

  const renderCategory = () => {
    switch (selectedCategory) {
      case "All":
        return <AllProducts />;
      case "Vegetables":
        return <Vegetables />;
      // case "Fruits":
      //   return <Fruits />;
      default:
        return <div className="text-center text-gray-500">Coming Soon!</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
      <Header username={username} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-white p-6 shadow-lg hidden md:flex flex-col">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Categories</h2>
          <ul className="flex-1 flex flex-col gap-4">
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-xl p-4 text-lg font-medium text-center shadow transition cursor-pointer
                  ${selectedCategory === category ? 'bg-green-300' : 'bg-green-100 hover:bg-green-200'}`}
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 md:p-10">
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
            {selectedCategory === "All" ? "Place Your Order" : selectedCategory}
          </h2>
          {renderCategory()}
        </main>
      </div>
    </div>
  );
}
