import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaCog, FaSignOutAlt } from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/"); // go to login
  };

  return (
    <aside className="w-64 bg-green-700 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-green-600">
        FreshBasket Admin
      </div>
      <nav className="flex-1 p-4 space-y-3">
        <button
          onClick={() => navigate("/dashboard/products")}
          className="flex items-center w-full px-4 py-2 rounded hover:bg-green-600"
        >
          <FaShoppingCart className="mr-3" /> Products
        </button>

        <button
          onClick={() => navigate("/dashboard/orders")}
          className="flex items-center w-full px-4 py-2 rounded hover:bg-green-600"
        >
          <FaShoppingCart className="mr-3" /> Orders
        </button>
        <button
          onClick={() => navigate("/dashboard/settings")}
          className="flex items-center w-full px-4 py-2 rounded hover:bg-green-600"
        >
          <FaCog className="mr-3" /> Settings
        </button>
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center w-full px-4 py-3 bg-red-600 hover:bg-red-700"
      >
        <FaSignOutAlt className="mr-3" /> Logout
      </button>
    </aside>
  );
}

export default Sidebar;
