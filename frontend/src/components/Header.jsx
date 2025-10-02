import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

const Header = ({ username = "User" }) => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-3 md:py-4 shadow bg-white space-y-2 md:space-y-0">
      <h1 className="text-2xl md:text-3xl font-bold text-green-700 text-center md:text-left">
        Welcome <span className="capitalize">{username}</span>
      </h1>
      <button
                className="lg:hidden text-2xl absolute left-4 top-4 z-50"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <FaBars />
              </button>
      <div className="flex items-center space-x-3 md:space-x-4">
        <button
          onClick={() => navigate("/cart")}
          className="relative bg-green-600 hover:bg-green-700 text-white p-2.5 md:p-3 rounded-full shadow transition"
          aria-label="Cart"
        >
          <FaShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
          {/* {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] md:text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
            
          )} */}
          {totalQty > 0 && (
  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] md:text-xs rounded-full w-5 h-5 flex items-center justify-center">
    {totalQty}
  </span>
)}

        </button>

        <FaUserCircle
          onClick={handleProfile}
          size={28}
          className="text-green-700 hover:text-green-800 cursor-pointer transition"
          aria-label="Profile"
        />

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded shadow transition text-sm md:text-base"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
