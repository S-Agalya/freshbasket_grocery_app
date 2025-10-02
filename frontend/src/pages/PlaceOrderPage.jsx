

// // import { useState, useEffect } from "react";
// // import Header from "../components/Header";
// // import AllProducts from "../components/products/AllProducts";
// // import Vegetables from "../components/products/Vegetables";
// // import Fruits from "../components/products/Fruits"; // ✅ make sure this file exists
// // import { useSearchParams } from "react-router-dom";
// // import Dairy from "../components/products/Dairy";
// // import SoapsAndDetergents from "../components/products/SoapsandDetergents";
// // import Snacks from "../components/products/snacks";
// // import Groceries from "../components/products/Groceries";

// // export default function PlaceOrderPage() {
// //   const username = localStorage.getItem("username") || "User";
// //   const [selectedCategory, setSelectedCategory] = useState("All");
// //   const [searchParams] = useSearchParams();

// //   const categories = [
// //     "All",
// //     "Vegetables",
// //     "Fruits",
// //     "Groceries",
// //     "Dairy",
// //     "Soaps & Detergents",
// //     "Snacks",
// //   ];

// //   useEffect(() => {
// //     const categoryFromUrl = searchParams.get("category");
// //     if (categoryFromUrl && categories.includes(categoryFromUrl)) {
// //       setSelectedCategory(categoryFromUrl);
// //     } else {
// //       setSelectedCategory("All"); // ✅ always reset to All if invalid or missing
// //     }
// //   }, [searchParams]);

// //   const renderCategory = () => {
// //     switch (selectedCategory) {
// //       case "All":
// //         return <AllProducts />;
// //       case "Vegetables":
// //         return <Vegetables />;
// //       case "Fruits":
// //         return <Fruits />;
// //         case "Dairy":
// //           return <Dairy/>
// //         case "Soaps & Detergents":
// //           return <SoapsAndDetergents/>
// //         case "Snacks":
// //           return <Snacks/>
// //         case "Groceries":
// //         return <Groceries/>

// //       default:
// //         return <div className="text-center text-gray-500">Coming Soon!</div>;
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
// //       <Header username={username} />

// //       <div className="flex flex-1 overflow-hidden">
// //         {/* Sidebar */}
// //         <aside className="w-72 bg-white p-6 shadow-lg flex flex-col">
// //           <h2 className="text-xl font-bold mb-4 border-b pb-2">Categories</h2>
// //           <ul className="flex-1 flex flex-col gap-4">
// //             {categories.map((category) => (
// //               <li
// //                 key={category}
// //                 onClick={() => setSelectedCategory(category)}
// //                 className={`rounded-xl p-4 text-lg font-medium text-center shadow transition cursor-pointer
// //                   ${
// //                     selectedCategory === category
// //                       ? "bg-green-300"
// //                       : "bg-green-100 hover:bg-green-200"
// //                   }`}
// //               >
// //                 {category}
// //               </li>
// //             ))}
// //           </ul>
// //         </aside>

// //         {/* Main content */}
// //         <main className="flex-1 p-6 md:p-10">
// //           <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
// //             {selectedCategory === "All"
// //               ? "Place Your Order"
// //               : selectedCategory}
// //           </h2>
// //           {renderCategory()}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }



// // import { useState, useEffect } from "react";
// // import Header from "../components/Header";
// // import AllProducts from "../components/products/AllProducts";
// // import Vegetables from "../components/products/Vegetables";
// // import Fruits from "../components/products/Fruits";
// // import Dairy from "../components/products/Dairy";
// // import SoapsAndDetergents from "../components/products/SoapsandDetergents";
// // import Snacks from "../components/products/snacks"
// // import Groceries from "../components/products/Groceries";
// // import { useSearchParams } from "react-router-dom";
// // import { FaBars, FaShoppingCart, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

// // export default function PlaceOrderPage() {
// //   const username = localStorage.getItem("username") || "User";
// //   const [selectedCategory, setSelectedCategory] = useState("All");
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [searchParams] = useSearchParams();

// //   const categories = [
// //     "All",
// //     "Vegetables",
// //     "Fruits",
// //     "Groceries",
// //     "Dairy",
// //     "Soaps & Detergents",
// //     "Snacks",
// //   ];

// //   useEffect(() => {
// //     const categoryFromUrl = searchParams.get("category");
// //     if (categoryFromUrl && categories.includes(categoryFromUrl)) {
// //       setSelectedCategory(categoryFromUrl);
// //     }
// //   }, [searchParams]);

// //   const renderCategoryComponent = () => {
// //     switch (selectedCategory) {
// //       case "Vegetables":
// //         return <Vegetables />;
// //       case "Fruits":
// //         return <Fruits />;
// //       case "Groceries":
// //         return <Groceries />;
// //       case "Dairy":
// //         return <Dairy />;
// //       case "Soaps & Detergents":
// //         return <SoapsAndDetergents />;
// //       case "Snacks":
// //         return < Snacks/>
// //       default:
// //         return <AllProducts />;
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col bg-gray-50">
// //       {/* HEADER */}
// //       <header className="flex items-center justify-between bg-green-700 text-white px-4 py-3 shadow-md">
// //         {/* Left: Hamburger (only mobile) */}
// //         <button
// //           className="lg:hidden text-2xl"
// //           onClick={() => setMenuOpen(!menuOpen)}
// //         >
// //           <FaBars />
// //         </button>

// //         {/* Center: Welcome */}
// //         <h1 className="text-lg sm:text-xl font-semibold">
// //           Welcome, {username}
// //         </h1>

// //         {/* Right: Profile + Cart + Logout */}
// //         <div className="flex items-center space-x-4">
// //           <FaUserCircle className="text-xl cursor-pointer" title="Profile" />
// //           <FaShoppingCart className="text-xl cursor-pointer" title="Cart" />
// //           <FaSignOutAlt className="text-xl cursor-pointer" title="Logout" />
// //         </div>
// //       </header>

// //       <div className="flex flex-1 overflow-hidden">
// //         {/* SIDEBAR (Desktop) */}
// //         <aside className="hidden lg:block w-64 bg-white shadow-md p-4">
// //           <h2 className="text-lg font-bold mb-4 text-green-700">Categories</h2>
// //           <ul className="space-y-2">
// //             {categories.map((cat) => (
// //               <li
// //                 key={cat}
// //                 className={`cursor-pointer px-3 py-2 rounded ${
// //                   selectedCategory === cat
// //                     ? "bg-green-600 text-white"
// //                     : "hover:bg-green-100"
// //                 }`}
// //                 onClick={() => setSelectedCategory(cat)}
// //               >
// //                 {cat}
// //               </li>
// //             ))}
// //           </ul>
// //         </aside>

// //         {/* MOBILE SLIDE MENU */}
// //         {menuOpen && (
// //           <div className="lg:hidden fixed inset-0 bg-black bg-opacity-40 z-40"
// //             onClick={() => setMenuOpen(false)}
// //           >
// //             <div
// //               className="absolute left-0 top-0 w-64 h-full bg-white shadow-md p-4"
// //               onClick={(e) => e.stopPropagation()}
// //             >
// //               <h2 className="text-lg font-bold mb-4 text-green-700">Categories</h2>
// //               <ul className="space-y-2">
// //                 {categories.map((cat) => (
// //                   <li
// //                     key={cat}
// //                     className={`cursor-pointer px-3 py-2 rounded ${
// //                       selectedCategory === cat
// //                         ? "bg-green-600 text-white"
// //                         : "hover:bg-green-100"
// //                     }`}
// //                     onClick={() => {
// //                       setSelectedCategory(cat);
// //                       setMenuOpen(false); // ✅ Close after selecting
// //                     }}
// //                   >
// //                     {cat}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           </div>
// //         )}

// //         {/* PRODUCTS SECTION (scrollable only here) */}
// //         <main className="flex-1 overflow-y-auto p-4">
// //           {renderCategoryComponent()}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }


// import { useState, useEffect } from "react";
// import Header from "../components/Header";
// import AllProducts from "../components/products/AllProducts";
// import Vegetables from "../components/products/Vegetables";
// import Fruits from "../components/products/Fruits";
// import Dairy from "../components/products/Dairy";
// import SoapsAndDetergents from "../components/products/SoapsandDetergents";
// import Snacks from "../components/products/snacks";
// import Groceries from "../components/products/Groceries";
// import { useSearchParams } from "react-router-dom";
// import { FaBars } from "react-icons/fa";

// export default function PlaceOrderPage() {
//   const username = localStorage.getItem("username") || "User";
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchParams] = useSearchParams();
//   const [menuOpen, setMenuOpen] = useState(false); // Mobile sidebar state

//   const categories = [
//     "All",
//     "Vegetables",
//     "Fruits",
//     "Groceries",
//     "Dairy",
//     "Soaps & Detergents",
//     "Snacks",
//   ];

//   useEffect(() => {
//     const categoryFromUrl = searchParams.get("category");
//     if (categoryFromUrl && categories.includes(categoryFromUrl)) {
//       setSelectedCategory(categoryFromUrl);
//     } else {
//       setSelectedCategory("All");
//     }
//   }, [searchParams]);

//   const renderCategory = () => {
//     switch (selectedCategory) {
//       case "All":
//         return <AllProducts />;
//       case "Vegetables":
//         return <Vegetables />;
//       case "Fruits":
//         return <Fruits />;
//       case "Dairy":
//         return <Dairy />;
//       case "Soaps & Detergents":
//         return <SoapsAndDetergents />;
//       case "Snacks":
//         return <Snacks />;
//       case "Groceries":
//         return <Groceries />;
//       default:
//         return <div className="text-center text-gray-500">Coming Soon!</div>;
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
//       {/* HEADER with Hamburger always visible on mobile */}
//       <Header username={username}>
//        <button
//           className="lg:hidden text-2xl absolute left-4 top-4 z-50"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <FaBars />
//         </button>
//       </Header>
 
//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar (Desktop) */}
//         <aside className="w-72 bg-white p-6 shadow-lg flex flex-col hidden lg:flex">
//           <h2 className="text-xl font-bold mb-6 border-b pb-2">Categories</h2>
//           <ul className="flex-1 flex flex-col gap-4">
//             {categories.map((category) => (
//               <li
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`rounded-xl p-4 text-lg font-medium text-center shadow transition cursor-pointer
//                   ${
//                     selectedCategory === category
//                       ? "bg-green-300"
//                       : "bg-green-100 hover:bg-green-200"
//                   }`}
//               >
//                 {category}
//               </li>
//             ))}
//           </ul>
//         </aside>

//         {/* Mobile Sidebar */}
//         {menuOpen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
//             onClick={() => setMenuOpen(false)}
//           >
//             <aside
//               className="absolute left-0 top-0 w-72 bg-white p-6 shadow-lg h-full"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h2 className="text-xl font-bold mb-4 border-b pb-2">Categories</h2>
//               <ul className="flex-1 flex flex-col gap-4">
//                 {categories.map((category) => (
//                   <li
//                     key={category}
//                     onClick={() => {
//                       setSelectedCategory(category);
//                       setMenuOpen(false); // only close sidebar
//                     }}
//                     className={`rounded-xl p-4 text-lg font-medium text-center shadow transition cursor-pointer
//                       ${
//                         selectedCategory === category
//                           ? "bg-green-300"
//                           : "bg-green-100 hover:bg-green-200"
//                       }`}
//                   >
//                     {category}
//                   </li>
//                 ))}
//               </ul>
//             </aside>
//           </div>
//         )}

//         {/* Main content */}
//         <main className="flex-1 p-6 md:p-10">
//           <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
//             {selectedCategory === "All" ? "Place Your Order" : selectedCategory}
//           </h2>
//           {renderCategory()}
//         </main>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import Header from "../components/Header";
// import AllProducts from "../components/products/AllProducts";
// import Vegetables from "../components/products/Vegetables";
// import Fruits from "../components/products/Fruits";
// import Dairy from "../components/products/Dairy";
// import SoapsAndDetergents from "../components/products/SoapsandDetergents";
// import Snacks from "../components/products/snacks";
// import Groceries from "../components/products/Groceries";
// import { useSearchParams } from "react-router-dom";
// import { FaBars } from "react-icons/fa";

// export default function PlaceOrderPage() {
//   const username = localStorage.getItem("username") || "User";
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchParams] = useSearchParams();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const categories = [
//     "All",
//     "Vegetables",
//     "Fruits",
//     "Groceries",
//     "Dairy",
//     "Soaps & Detergents",
//     "Snacks",
//   ];

//   useEffect(() => {
//     const categoryFromUrl = searchParams.get("category");
//     if (categoryFromUrl && categories.includes(categoryFromUrl)) {
//       setSelectedCategory(categoryFromUrl);
//     } else {
//       setSelectedCategory("All");
//     }
//   }, [searchParams]);

//   const renderCategory = () => {
//     switch (selectedCategory) {
//       case "All":
//         return <AllProducts />;
//       case "Vegetables":
//         return <Vegetables />;
//       case "Fruits":
//         return <Fruits />;
//       case "Dairy":
//         return <Dairy />;
//       case "Soaps & Detergents":
//         return <SoapsAndDetergents />;
//       case "Snacks":
//         return <Snacks />;
//       case "Groceries":
//         return <Groceries />;
//       default:
//         return <div className="text-center text-gray-500">Coming Soon!</div>;
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 relative">
//       {/* HEADER */}
//       <Header username={username} />

//       {/* Hamburger button (mobile) */}
//       <button
//         className="lg:hidden text-2xl absolute left-4 top-4 z-50"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         <FaBars />
//       </button>

//       <div className="flex flex-1 overflow-hidden">
//         {/* Desktop Sidebar */}
//         <aside className="hidden lg:flex w-72 bg-white p-6 shadow-lg flex-col">
//           <h2 className="text-xl font-bold mb-4 border-b pb-2">Categories</h2>
//           <ul className="flex-1 flex flex-col gap-4">
//             {categories.map((category) => (
//               <li
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`rounded-xl p-4 text-lg font-medium text-center shadow transition cursor-pointer
//                   ${
//                     selectedCategory === category
//                       ? "bg-green-300"
//                       : "bg-green-100 hover:bg-green-200"
//                   }`}
//               >
//                 {category}
//               </li>
//             ))}
//           </ul>
//         </aside>

//         {/* Mobile Sidebar */}
//         {menuOpen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
//             onClick={() => setMenuOpen(false)}
//           >
//             <aside
//               className="absolute left-0 top-0 w-72 bg-white p-6 shadow-lg h-full overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h2 className="text-xl font-bold mb-4 border-b pb-2">Categories</h2>
//               <ul className="flex-1 flex flex-col gap-4">
//                 {categories.map((category) => (
//                   <li
//                     key={category}
//                     onClick={() => {
//                       setSelectedCategory(category);
//                       setMenuOpen(false);
//                     }}
//                     className={`rounded-xl p-4 text-lg font-medium text-center shadow transition cursor-pointer
//                       ${
//                         selectedCategory === category
//                           ? "bg-green-300"
//                           : "bg-green-100 hover:bg-green-200"
//                       }`}
//                   >
//                     {category}
//                   </li>
//                 ))}
//               </ul>
//             </aside>
//           </div>
//         )}

//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto p-6 md:p-10">
//           <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
//             {selectedCategory === "All" ? "Place Your Order" : selectedCategory}
//           </h2>
//           {renderCategory()}
//         </main>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

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
        />

        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
            {selectedCategory === "All" ? "Place Your Order" : selectedCategory}
          </h2>
          {renderCategoryComponent()}
        </main>
      </div>
    </div>
  );
}
