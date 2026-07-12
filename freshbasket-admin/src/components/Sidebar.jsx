import { FaShoppingCart, FaBox, FaHome, FaSignOutAlt } from "react-icons/fa";

function Sidebar({ isOpen, onClose, onSelect }) {
  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, key: "dashboard" },
    { name: "Products", icon: <FaBox />, key: "products" },
    { name: "Orders", icon: <FaShoppingCart />, key: "orders" },
  ];

  return (
    <div
      className={`fixed md:static top-0 left-0 h-full w-64 bg-navy-900 text-sand flex flex-col justify-between transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 md:translate-x-0 z-50`}
    >
      {/* Top Section */}
      <div>
        <div className="text-2xl font-bold p-4 border-b border-navy-700 flex items-center gap-2">
          <div className="w-9 h-9 rounded-md bg-navy-700 flex items-center justify-center text-gold font-bold">FB</div>
          <div className="admin-brand">FreshBasket Admin</div>
        </div>

        <nav className="mt-4 space-y-1 px-1">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                onSelect(item.key);
                if (onClose) onClose(); // Close sidebar on mobile
              }}
              className="w-full text-left px-6 py-3 hover:bg-navy-700/80 flex items-center space-x-3 rounded-md"
            >
              {item.icon} <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="border-t border-navy-700 p-3">
        <button className="w-full text-left px-4 py-3 hover:bg-red-600/80 flex items-center space-x-3 rounded-md bg-navy-800/30">
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </div>

      {/* Close button (mobile) */}
      {isOpen && (
        <button
          className="absolute top-4 right-4 md:hidden text-white text-2xl"
          onClick={onClose}
        >
          ✖
        </button>
      )}
    </div>
  );
}

export default Sidebar;
