

import { useState, useEffect } from "react";
import Header from "../components/Header";
import AllProducts from "../components/products/AllProducts";
import Vegetables from "../components/products/Vegetables";
import Fruits from "../components/products/Fruits"; // ✅ make sure this file exists
import { useSearchParams } from "react-router-dom";
import Dairy from "../components/products/Dairy";
import SoapsAndDetergents from "../components/products/SoapsandDetergents";
import Snacks from "../components/products/snacks";
import Groceries from "../components/products/Groceries";

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
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory("All"); // ✅ always reset to All if invalid or missing
    }
  }, [searchParams]);

  const renderCategory = () => {
    switch (selectedCategory) {
      case "All":
        return <AllProducts />;
      case "Vegetables":
        return <Vegetables />;
      case "Fruits":
        return <Fruits />;
        case "Dairy":
          return <Dairy/>
        case "Soaps & Detergents":
          return <SoapsAndDetergents/>
        case "Snacks":
          return <Snacks/>
        case "Groceries":
        return <Groceries/>

      default:
        return <div className="text-center text-gray-500">Coming Soon!</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
      <Header username={username} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-white p-6 shadow-lg flex flex-col">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Categories</h2>
          <ul className="flex-1 flex flex-col gap-4">
            {categories.map((category) => (
              <li
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-xl p-4 text-lg font-medium text-center shadow transition cursor-pointer
                  ${
                    selectedCategory === category
                      ? "bg-green-300"
                      : "bg-green-100 hover:bg-green-200"
                  }`}
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 md:p-10">
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
            {selectedCategory === "All"
              ? "Place Your Order"
              : selectedCategory}
          </h2>
          {renderCategory()}
        </main>
      </div>
    </div>
  );
}
