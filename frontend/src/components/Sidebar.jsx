// src/components/Sidebar.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const categories = [
  "Vegetables",
  "Fruits",
  "Groceries",
  "Dairy",
  "Soaps & Detergents",
  "Snacks",
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setSidebarOpen(false);
    navigate(`/order?category=${encodeURIComponent(category)}`);
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white p-6 shadow-lg flex flex-col transform transition-transform duration-300 z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Categories</h2>
        <ul className="flex-1 flex flex-col gap-4">
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => handleCategoryClick(category)}
              className="cursor-pointer bg-green-100 hover:bg-green-200 rounded-xl p-4 text-lg font-medium text-center shadow transition"
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
