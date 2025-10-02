// // import { useEffect, useState } from "react";

// // const WelcomePage = () => {
// //   const [username, setUsername] = useState("");

// //   useEffect(() => {
// //     const savedName = localStorage.getItem("username");
// //     if (savedName) {
// //       setUsername(savedName);
// //     }
// //   }, []);

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
// //       <div className="bg-white shadow-lg p-10 rounded-xl text-center">
// //         <h1 className="text-3xl font-bold text-green-600 mb-4">Welcome 🎉</h1>
// //         <p className="text-xl text-gray-700">
// //           Hello, <strong>{username}</strong>! You have successfully logged in.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default WelcomePage;

// import { FaUserCircle } from 'react-icons/fa';
// import Header from '../components/Header';
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import vegetablesImage from "../assets/vegetables.jpg";
// import fruitsImage from "../assets/fruits.jpg";
// import groceriesImage from "../assets/groceries.png";
// import dairyImage from "../assets/dairy.jpg";
// import soapsImage from "../assets/soapsanddetergent.jpg";
// import snacksImage from "../assets/snacks.jpeg";

// const WelcomePage = () => {
//   const navigate = useNavigate();
//   const username = localStorage.getItem("username") || "User";

//   const [slide, setSlide] = useState(0);

//   const images = [
//     vegetablesImage,
//     fruitsImage,
//     groceriesImage,
//     dairyImage,
//     soapsImage,
//     snacksImage,
//   ];

//   const titles = [
//     "Vegetables",
//     "Fruits",
//     "Groceries",
//     "Dairy",
//     "Soaps & Detergents",
//     "Snacks",
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSlide((prev) => (prev + 1) % images.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [images.length]);

//   const goPrev = () => setSlide((prev) => (prev - 1 + images.length) % images.length);
//   const goNext = () => setSlide((prev) => (prev + 1) % images.length);

  
//   const handleOrder = () => {
//     navigate("/order");
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">

//       {/* TOPBAR */}
//      <Header username={username} />



//       {/* MAIN CONTENT */}
//       <div className="flex flex-1 overflow-hidden">

//         {/* SIDEBAR */}
//         <aside className="w-72 bg-white p-6 shadow-lg hidden md:flex flex-col">
//           <h2 className="text-xl font-bold mb-4 border-b pb-2">Categories</h2>
//           <ul className="flex-1 flex flex-col gap-4">
//             {titles.map((category, index) => (
//   <li
//     key={index}
//     onClick={() => navigate(`/order?category=${encodeURIComponent(category)}`)}
//     className="cursor-pointer bg-green-100 hover:bg-green-200 rounded-xl p-4 text-lg font-medium text-center shadow transition"
//   >
//     {category}
//   </li>
// ))}

//           </ul>
//         </aside>

//         {/* CAROUSEL SECTION */}
//                 {/* CAROUSEL SECTION */}
//         <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-6">
//           <div className="flex items-center justify-center gap-4 md:gap-8 w-full max-w-5xl mx-auto">
  
//   {/* Left button */}
//   <button
//     onClick={goPrev}
//     className="bg-green-700 hover:bg-green-800 text-white rounded-full shadow-lg flex items-center justify-center w-12 md:w-16 aspect-square text-2xl md:text-3xl transition"
//   >
//     &#8592;
//   </button>

//   {/* Image */}
//   <img
//     src={images[slide]}
//     alt={titles[slide]}
//     className="flex-1 max-h-96 object-cover rounded-3xl shadow-xl border"
//   />

//   {/* Right button */}
//   <button
//     onClick={goNext}
//     className="bg-green-700 hover:bg-green-800 text-white rounded-full shadow-lg flex items-center justify-center w-12 md:w-16 aspect-square text-2xl md:text-3xl transition"
//   >
//     &#8594;
//   </button>
// </div>


//           <h3 className="text-2xl font-semibold mt-6 text-green-700">{titles[slide]}</h3>

//           <button
//             onClick={handleOrder}
//             className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg shadow-lg transition"
//           >
//             Are you ready to place your order?
//           </button>
//         </main>

//       </div>
//     </div>
//   );
// };

// export default WelcomePage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Header from "../components/Header";

import vegetablesImage from "../assets/vegetables.jpg";
import fruitsImage from "../assets/fruits.jpg";
import groceriesImage from "../assets/groceries.png";
import dairyImage from "../assets/dairy.jpg";
import soapsImage from "../assets/soapsanddetergent.jpg";
import snacksImage from "../assets/snacks.jpeg";

const WelcomePage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  const [slide, setSlide] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const images = [
    vegetablesImage,
    fruitsImage,
    groceriesImage,
    dairyImage,
    soapsImage,
    snacksImage,
  ];

  const titles = [
    "Vegetables",
    "Fruits",
    "Groceries",
    "Dairy",
    "Soaps & Detergents",
    "Snacks",
  ];

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goPrev = () => setSlide((prev) => (prev - 1 + images.length) % images.length);
  const goNext = () => setSlide((prev) => (prev + 1) % images.length);

  const handleCategoryClick = (category) => {
    setSidebarOpen(false); // close sidebar
    setTimeout(() => {
      navigate(`/order?category=${encodeURIComponent(category)}`);
    }, 200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
      {/* Header */}
      <Header username={username} />

      {/* Mobile Hamburger always visible */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-green-700 text-3xl p-2 bg-white rounded-full shadow-lg"
        >
          <FaBars />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-72 bg-white p-6 shadow-lg flex flex-col transform transition-transform duration-300 z-50
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Categories</h2>
          <ul className="flex-1 flex flex-col gap-4">
            {titles.map((category, index) => (
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

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Carousel */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-6">
          {/* Desktop Carousel */}
          <div className="hidden md:flex items-center justify-center gap-4 md:gap-8 w-full max-w-5xl mx-auto">
            <button
              onClick={goPrev}
              className="bg-green-700 hover:bg-green-800 text-white rounded-full shadow-lg flex items-center justify-center w-16 aspect-square text-3xl transition"
            >
              &#8592;
            </button>

            <img
              src={images[slide]}
              alt={titles[slide]}
              className="flex-1 max-h-96 w-full object-contain rounded-3xl shadow-xl border"
            />

            <button
              onClick={goNext}
              className="bg-green-700 hover:bg-green-800 text-white rounded-full shadow-lg flex items-center justify-center w-16 aspect-square text-3xl transition"
            >
              &#8594;
            </button>
          </div>

          {/* Mobile Carousel */}
          <div className="flex md:hidden flex-col items-center gap-4 w-full max-w-sm mx-auto mt-20">
            <button
              onClick={goPrev}
              className="bg-green-700 hover:bg-green-800 text-white rounded-full shadow-lg flex items-center justify-center w-12 aspect-square text-2xl transition"
            >
              &#8593;
            </button>

            <img
              src={images[slide]}
              alt={titles[slide]}
              className="w-full max-h-64 sm:max-h-80 object-contain rounded-2xl shadow-lg border"
            />

            <button
              onClick={goNext}
              className="bg-green-700 hover:bg-green-800 text-white rounded-full shadow-lg flex items-center justify-center w-12 aspect-square text-2xl transition"
            >
              &#8595;
            </button>
          </div>

          <h3 className="text-2xl font-semibold mt-6 text-green-700">{titles[slide]}</h3>

          <button
            onClick={() => navigate("/order")}
            className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg shadow-lg transition"
          >
            Are you ready to place your order?
          </button>
        </main>
      </div>
    </div>
  );
};

export default WelcomePage;
