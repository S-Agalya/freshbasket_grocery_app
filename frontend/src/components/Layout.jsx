import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  // get username from localStorage or wherever you store it
  const username = localStorage.getItem("username") || "User";

  return (
    <div className="min-h-screen flex flex-col">
      <Header username={username} />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
