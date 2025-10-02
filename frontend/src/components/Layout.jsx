// import { Outlet } from "react-router-dom";
// import Header from "./Header";
// import Footer from "./Footer";

// const Layout = () => {
//   // get username from localStorage or wherever you store it
//   const username = localStorage.getItem("username") || "User";

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header username={username} />
//       <div className="flex-1">
//         <Outlet />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Layout;


import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const categories = [
  "Vegetables",
  "Fruits",
  "Groceries",
  "Dairy",
  "Soaps & Detergents",
  "Snacks",
];

const Layout = () => {
  const username = localStorage.getItem("username") || "User";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setSidebarOpen(false); // Close sidebar after selecting
    navigate(`/order?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header username={username} />

      {/* Mobile Hamburger (visible only on small screens) */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-green-700 text-3xl p-2 bg-white rounded-full shadow-lg"
        >
          ☰
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
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

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
