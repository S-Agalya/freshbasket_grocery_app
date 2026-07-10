import { useState, useRef, useEffect } from "react";

const CATEGORY_META = {
  "All":                { emoji: "🏪", short: "All",     accent: "#94a3b8" },
  "Vegetables":         { emoji: "🥦", short: "Veggies", accent: "#4ade80" },
  "Fruits":             { emoji: "🍎", short: "Fruits",  accent: "#f87171" },
  "Groceries":          { emoji: "🛒", short: "Grocery", accent: "#fbbf24" },
  "Dairy":              { emoji: "🥛", short: "Dairy",   accent: "#60a5fa" },
  "Soaps & Detergents": { emoji: "🧴", short: "Care",    accent: "#c084fc" },
  "Snacks":             { emoji: "🍪", short: "Snacks",  accent: "#fb923c" },
};

const SIDEBAR_W = 280;

const Sidebar = ({ categories, selectedCategory, onSelectCategory, isOpen, onClose, onOpen }) => {
  const [dragX, setDragX]         = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile]   = useState(() => window.innerWidth < 768);

  const touchStartX  = useRef(0);
  const dragDeltaRef = useRef(0);
  const edgeStartX   = useRef(0);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Drag to CLOSE (touch on open sidebar) ── */
  const onSidebarTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    dragDeltaRef.current = 0;
    setIsDragging(true);
  };
  const onSidebarTouchMove = (e) => {
    if (!isOpen) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    dragDeltaRef.current = dx;
    setDragX(Math.min(0, dx));
  };
  const onSidebarTouchEnd = () => {
    setIsDragging(false);
    if (dragDeltaRef.current < -80) onClose();
    setDragX(0);
  };

  /* ── Edge swipe to OPEN (thin left strip) ── */
  const onEdgeTouchStart = (e) => { edgeStartX.current = e.touches[0].clientX; };
  const onEdgeTouchEnd   = (e) => {
    if (e.changedTouches[0].clientX - edgeStartX.current > 50) onOpen?.();
  };

  /* ── Derived ── */
  const mobileTranslate = isOpen ? dragX : -SIDEBAR_W;
  const overlayOpacity  = isOpen ? (dragX < 0 ? Math.max(0, 1 + dragX / SIDEBAR_W) : 1) : 0;

  const sidebarStyle = isMobile
    ? {
        transform: `translateX(${mobileTranslate}px)`,
        transition: isDragging ? "none" : "transform 0.32s cubic-bezier(0.25,0.46,0.45,0.94)",
        boxShadow: isOpen ? "6px 0 40px rgba(0,0,0,0.4)" : "none",
      }
    : {};

  return (
    <>
      {/* Edge swipe zone — opens sidebar on mobile */}
      {isMobile && !isOpen && (
        <div
          className="fixed top-0 left-0 w-5 h-full z-30"
          onTouchStart={onEdgeTouchStart}
          onTouchEnd={onEdgeTouchEnd}
        />
      )}

      {/* Backdrop */}
      {isMobile && (isOpen || isDragging) && (
        <div
          className="fixed inset-0 z-40"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(3px)",
            opacity: overlayOpacity,
            transition: isDragging ? "none" : "opacity 0.3s ease",
          }}
          onClick={onClose}
        />
      )}

      {/* ── Sidebar panel ── */}
      <aside
        className="fixed top-0 left-0 h-full z-50 flex flex-col w-[280px] md:w-[88px] md:translate-x-0 md:z-20 md:top-14 md:h-[calc(100vh-3.5rem)]"
        style={{
          background: "linear-gradient(175deg, #0c2e18 0%, #0f3d22 55%, #0a2415 100%)",
          ...sidebarStyle,
        }}
        onTouchStart={onSidebarTouchStart}
        onTouchMove={onSidebarTouchMove}
        onTouchEnd={onSidebarTouchEnd}
      >
        {/* Mobile header bar */}
        <div className="md:hidden flex items-center justify-between px-5 py-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg"
              style={{ background: "rgba(74,222,128,0.15)" }}>
              🥬
            </div>
            <span className="font-bold text-white text-base tracking-wide">Categories</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition"
            style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
          >
            ✕
          </button>
        </div>

        {/* Drag handle pill (mobile) */}
        <div
          className="md:hidden absolute -right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-10 rounded-full"
          style={{ background: "rgba(255,255,255,0.25)" }}
        />

        {/* Category list */}
        <div className="flex-1 overflow-y-auto py-2" style={{ scrollbarWidth: "none" }}>
          {categories.map((cat) => {
            const meta   = CATEGORY_META[cat] || { emoji: "📦", short: cat.slice(0, 7), accent: "#6b7280" };
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => { onSelectCategory(cat); if (isMobile) onClose?.(); }}
                className="w-full flex items-center md:flex-col gap-3.5 md:gap-2 px-5 md:px-2 py-3 md:py-4 text-left md:text-center transition-all duration-200 relative group"
                style={{ background: active ? "rgba(255,255,255,0.09)" : "transparent" }}
              >
                {/* Active left bar (mobile) */}
                {active && (
                  <span
                    className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full md:hidden"
                    style={{ background: meta.accent }}
                  />
                )}

                {/* Icon badge */}
                <span
                  className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-xl md:text-2xl transition-transform duration-200 group-hover:scale-105"
                  style={{
                    background: active ? `${meta.accent}25` : "rgba(255,255,255,0.07)",
                    border: active ? `1.5px solid ${meta.accent}55` : "1.5px solid transparent",
                  }}
                >
                  {meta.emoji}
                </span>

                {/* Label */}
                <span
                  className={`text-xs leading-tight transition-colors ${active ? "font-bold" : "font-medium"}`}
                  style={{ color: active ? meta.accent : "rgba(255,255,255,0.58)" }}
                >
                  <span className="md:hidden">{cat}</span>
                  <span className="hidden md:block">{meta.short}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Branding footer (mobile) */}
        <div className="md:hidden px-5 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-center text-[10px] tracking-[0.2em] uppercase font-medium"
            style={{ color: "rgba(255,255,255,0.2)" }}>
            FreshBasket
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;


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
