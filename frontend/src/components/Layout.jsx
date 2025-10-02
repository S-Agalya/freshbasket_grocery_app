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


import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  const username = localStorage.getItem("username") || "User";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header username={username} />

      {/* Mobile Hamburger */}
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
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
