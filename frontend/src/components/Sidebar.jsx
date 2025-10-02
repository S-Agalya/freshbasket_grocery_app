const Sidebar = ({ categories, selectedCategory, onSelectCategory, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white p-6 shadow-lg flex flex-col transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Categories</h2>
        <ul className="flex-1 flex flex-col gap-4">
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => onSelectCategory(category)}
              className={`cursor-pointer rounded-xl p-4 text-lg font-medium text-center shadow transition
                ${selectedCategory === category ? "bg-green-300" : "bg-green-100 hover:bg-green-200"}`}
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
