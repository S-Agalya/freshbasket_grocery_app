import { FaShoppingCart, FaBox, FaHome, FaSignOutAlt } from "react-icons/fa";

function Sidebar({ isOpen, onClose, onSelect }) {
  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, key: "dashboard" },
    { name: "Products", icon: <FaBox />, key: "products" },
    { name: "Orders", icon: <FaShoppingCart />, key: "orders" },
  ];

  return (
    <div
      className={`fixed md:static top-0 left-0 h-full w-64 bg-surface text-primary-900 flex flex-col justify-between transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 md:translate-x-0 z-50`}
    >
      {/* Top Section */}
      <div>
        <div className="text-2xl font-bold p-6 border-b border-surface-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded flex items-center justify-center bg-primary-900 text-white font-semibold">FB</div>
          <span>Admin Panel</span>
        </div>

        <nav className="mt-4 space-y-2 p-4">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                onSelect(item.key);
                if (onClose) onClose(); // Close sidebar on mobile
              }}
              className={`w-full text-left px-4 py-3 rounded-md flex items-center space-x-3 transition-colors text-primary-900 hover:bg-surface-100 ${
                // simple active detection optional
                ""
              }`}
            >
              <div className="text-xl text-primary-900">{item.icon}</div>
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-surface-100">
        <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors shadow-sm flex items-center justify-center space-x-2">
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </div>

      {/* Close button (mobile) */}
      {isOpen && (
        <button
          className="absolute top-4 right-4 md:hidden text-primary-900 text-2xl"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ✖
        </button>
      )}
    </div>
  );
}

export default Sidebar;
