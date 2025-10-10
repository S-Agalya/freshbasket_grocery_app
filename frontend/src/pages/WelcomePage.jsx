


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import vegetablesImage from "../assets/vegetables.jpg";
import fruitsImage from "../assets/fruits.jpg";
import groceriesImage from "../assets/groceries.png";
import dairyImage from "../assets/dairy.jpg";
import soapsImage from "../assets/soapsanddetergent.jpg";
import snacksImage from "../assets/snacks.jpeg";

const categories = [
  "Vegetables",
  "Fruits",
  "Groceries",
  "Dairy",
  "Soaps & Detergents",
  "Snacks",
];

const images = [
  vegetablesImage,
  fruitsImage,
  groceriesImage,
  dairyImage,
  soapsImage,
  snacksImage,
];

export default function WelcomePage() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";
  const [slide, setSlide] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goPrev = () => setSlide((prev) => (prev - 1 + images.length) % images.length);
  const goNext = () => setSlide((prev) => (prev + 1) % images.length);

  const handleCategoryClick = (category) => {
    setSidebarOpen(false);
    navigate(`/order?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
      <Header username={username} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

      <Sidebar
        categories={categories}
        selectedCategory={null}
        onSelectCategory={handleCategoryClick}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-6">
        <div className="flex items-center justify-center gap-4 md:gap-8 w-full max-w-5xl mx-auto">
          <button
            onClick={goPrev}
            className="bg-green-700 hover:bg-green-800 text-white rounded-full shadow-lg flex items-center justify-center w-12 md:w-16 aspect-square text-2xl md:text-3xl transition"
          >
            &#8592;
          </button>

          <img
            src={images[slide]}
            alt={categories[slide]}
            className="flex-1 max-h-96 object-cover rounded-3xl shadow-xl border"
          />

          <button
            onClick={goNext}
            className="bg-green-700 hover:bg-green-800 text-white rounded-full shadow-lg flex items-center justify-center w-12 md:w-16 aspect-square text-2xl md:text-3xl transition"
          >
            &#8594;
          </button>
        </div>

        <h3 className="text-2xl font-semibold mt-6 text-green-700">{categories[slide]}</h3>

        <button
          onClick={() => navigate("/order")}
          className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg shadow-lg transition"
        >
          Are you ready to place your order?
        </button>
      </main> */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-6 md:ml-72">
  <div className="flex items-center justify-center gap-4 md:gap-8 w-full max-w-5xl mx-auto">
    <button
      onClick={goPrev}
      className="bg-green-700 hover:bg-green-800 text-white rounded-full shadow-lg flex items-center justify-center w-12 md:w-16 aspect-square text-2xl md:text-3xl transition"
    >
      &#8592;
    </button>

    <img
      src={images[slide]}
      alt={categories[slide]}
      className="flex-1 max-h-96 object-cover rounded-3xl shadow-xl border"
    />

    <button
      onClick={goNext}
      className="bg-green-700 hover:bg-green-800 text-white rounded-full shadow-lg flex items-center justify-center w-12 md:w-16 aspect-square text-2xl md:text-3xl transition"
    >
      &#8594;
    </button>
  </div>

  <h3 className="text-2xl font-semibold mt-6 text-green-700">{categories[slide]}</h3>

  <button
    onClick={() => navigate("/order")}
    className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg shadow-lg transition"
  >
    Are you ready to place your order?
  </button>
</main>

    </div>
  );
}
