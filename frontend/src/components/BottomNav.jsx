import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaShoppingBag, FaShoppingCart, FaUser } from "react-icons/fa";
import { CartContext } from "../context/CartContext";

const NAV_ITEMS = [
  { icon: FaHome,         label: "Home",    path: "/welcome" },
  { icon: FaShoppingBag,  label: "Shop",    path: "/order"   },
  { icon: FaShoppingCart, label: "Cart",    path: "/cart",  badge: true },
  { icon: FaUser,         label: "Profile", path: "/profile" },
];

const HIDDEN_PATHS = ["/login", "/register"];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { cartItems } = useContext(CartContext);
  const totalQty = cartItems.reduce((sum, i) => sum + i.qty, 0);

  if (HIDDEN_PATHS.includes(pathname)) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex h-16">
        {NAV_ITEMS.map(({ icon: Icon, label, path, badge }) => {
          const active =
            pathname === path ||
            (path === "/order" && (pathname.startsWith("/order") || pathname.startsWith("/product")));
          const count = badge ? totalQty : 0;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 relative"
            >
              {active && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                  style={{ background: "linear-gradient(90deg,#16a34a,#059669)" }}
                />
              )}
              <div className="relative">
                <Icon
                  size={20}
                  style={{ color: active ? "#16a34a" : "#9ca3af" }}
                />
                {count > 0 && (
                  <span
                    className="absolute -top-1.5 -right-2.5 text-white text-[9px] rounded-full min-w-[16px] h-4 px-0.5 flex items-center justify-center font-bold leading-none"
                    style={{ background: "linear-gradient(135deg,#16a34a,#059669)" }}
                  >
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </div>
              <span
                className="text-[10px] font-semibold mt-0.5"
                style={{ color: active ? "#16a34a" : "#9ca3af" }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
