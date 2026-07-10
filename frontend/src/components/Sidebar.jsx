const CATEGORY_META = {
  "All":                { emoji: "🏪", short: "All" },
  "Vegetables":         { emoji: "🥦", short: "Veggies" },
  "Fruits":             { emoji: "🍎", short: "Fruits" },
  "Groceries":          { emoji: "🛒", short: "Grocery" },
  "Dairy":              { emoji: "🥛", short: "Dairy" },
  "Soaps & Detergents": { emoji: "🧴", short: "Care" },
  "Snacks":             { emoji: "🍪", short: "Snacks" },
};

const Sidebar = ({ categories, selectedCategory, onSelectCategory, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-100 flex flex-col
          transition-transform duration-300 ease-in-out
          w-64 z-50 shadow-2xl
          md:w-[88px] md:translate-x-0 md:z-20 md:shadow-none
          md:top-14 md:h-[calc(100vh-3.5rem)]
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 md:hidden">
          <span className="font-bold text-base text-gray-800">Categories</span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Category list */}
        <div className="flex-1 overflow-y-auto py-2">
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat] || { emoji: "📦", short: cat.slice(0, 7) };
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => { onSelectCategory(cat); onClose?.(); }}
                className={`
                  w-full flex items-center md:flex-col gap-3 md:gap-1.5
                  px-4 md:px-2 py-3 md:py-4
                  text-left md:text-center transition-all relative
                  ${active ? "bg-green-50" : "hover:bg-gray-50"}
                `}
              >
                {/* Mobile active indicator */}
                {active && (
                  <span className="absolute right-0 top-2 bottom-2 w-[3px] bg-green-600 rounded-full md:hidden" />
                )}

                {/* Emoji icon */}
                <span className={`
                  flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl
                  flex items-center justify-center text-xl md:text-2xl transition
                  ${active ? "bg-green-100" : "bg-gray-100"}
                `}>
                  {meta.emoji}
                </span>

                {/* Label */}
                <span className={`text-xs leading-tight font-medium ${active ? "text-green-700 font-semibold" : "text-gray-600"}`}>
                  <span className="md:hidden">{cat}</span>
                  <span className="hidden md:block">{meta.short}</span>
                </span>
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
