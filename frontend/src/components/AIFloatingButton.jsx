import { useLocation, useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

export default function AIFloatingButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/ai"
  ) {
    return null;
  }

  return (
    <button
      onClick={() => navigate("/ai")}
      className="fixed bottom-24 md:bottom-8 right-6 z-50 w-16 h-16 rounded-full
                 bg-gradient-to-r from-green-600 to-emerald-500
                 text-white shadow-xl hover:scale-110 transition"
    >
      <FaRobot size={25} />
    </button>
  );
}