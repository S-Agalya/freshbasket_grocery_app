import { useNavigate } from "react-router-dom";
import { FaBox, FaShoppingCart, FaCog, FaSignOutAlt } from "react-icons/fa";

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
        <div
          onClick={() => navigate("/dashboard/products")}
          className="bg-white p-6 rounded shadow text-center cursor-pointer hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
          <p className="text-3xl font-bold text-green-600">120</p>
        </div>

        <button
          onClick={() => navigate("/dashboard/orders")} // optional, later add nested route
          className="flex items-center w-full px-4 py-2 rounded hover:bg-green-600"
        >
          <FaShoppingCart className="mr-3" /> Orders
        </button>
        <button
          onClick={() => navigate("/dashboard/settings")} // optional
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
