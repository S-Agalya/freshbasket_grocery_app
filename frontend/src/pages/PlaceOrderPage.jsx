

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AIAssistant from "../components/AIAssistant";

import AllProducts from "../components/products/AllProducts";
import Vegetables from "../components/products/Vegetables";
import Fruits from "../components/products/Fruits";
import Dairy from "../components/products/Dairy";
import SoapsAndDetergents from "../components/products/SoapsandDetergents";
import Snacks from "../components/products/snacks";
import Groceries from "../components/products/Groceries";

const categories = [
  "All",
  "Vegetables",
  "Fruits",
  "Groceries",
  "Dairy",
  "Soaps & Detergents",
  "Snacks",
];

export default function PlaceOrderPage() {
  const username = localStorage.getItem("username") || "User";
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const renderCategoryComponent = () => {
    switch (selectedCategory) {
      case "Vegetables":
        return <Vegetables />;
      case "Fruits":
        return <Fruits />;
      case "Groceries":
        return <Groceries />;
      case "Dairy":
        return <Dairy />;
      case "Soaps & Detergents":
        return <SoapsAndDetergents />;
      case "Snacks":
        return <Snacks />;
      default:
        return <AllProducts />;
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setMenuOpen(false); // close mobile sidebar
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header username={username} onMenuToggle={() => setMenuOpen(!menuOpen)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          onOpen={() => setMenuOpen(true)}
        />

        {/* <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
            {selectedCategory === "All" ? "Place Your Order" : selectedCategory}
          </h2>
          {renderCategoryComponent()}
        </main> */}
        <main className="flex-1 overflow-y-auto pt-3 pb-24 px-2 md:ml-[88px] md:pt-4 md:pb-6 md:px-4">
          <AIAssistant />
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-5 bg-emerald-600 rounded-full"></span>
            <h2 className="text-lg font-bold text-gray-800">
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </h2>
          </div>
          {renderCategoryComponent()}
        </main>

      </div>
    </div>
  );
}
