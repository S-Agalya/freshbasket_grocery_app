import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaRobot, FaTimes, FaStar } from "react-icons/fa";
import AiAssistantPanel from "./AiAssistantPanel";

export default function FloatingAssistantButton() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOpenAssistant = () => setOpen(true);
    window.addEventListener("freshbasket-open-assistant", handleOpenAssistant);
    return () => window.removeEventListener("freshbasket-open-assistant", handleOpenAssistant);
  }, []);

  const hiddenRoutes = ["/login", "/register", "/chat"];
  const shouldHide = hiddenRoutes.includes(location.pathname);

  if (shouldHide) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 z-50 flex items-center gap-2 rounded-full border border-emerald-200 bg-gradient-to-r from-emerald-600 via-green-600 to-lime-500 px-4 py-3.5 text-white shadow-[0_22px_60px_rgba(16,185,129,0.32)] transition hover:translate-y-[-2px] hover:scale-[1.02] active:scale-[0.98] md:bottom-8 md:right-8"
        aria-label="Open FreshBasket Assistant"
      >
        <div className="rounded-full bg-white/20 p-2.5 shadow-inner">
          <FaRobot size={15} />
        </div>
        <span className="text-sm font-semibold tracking-wide">Ask AI</span>
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.25em]">
          <FaStar size={10} className="inline" />
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/45 px-3 py-4 backdrop-blur-md sm:items-center sm:px-4">
          <div className="w-full max-w-3xl rounded-[30px] border border-white/60 bg-white/95 p-2 shadow-[0_30px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-3">
            <div className="mb-2 flex items-center justify-between rounded-[20px] bg-gradient-to-r from-emerald-50 via-white to-lime-50 px-3 py-2.5">
              <div className="flex items-center gap-2">
                <div className="rounded-2xl bg-emerald-600 p-2 text-white">
                  <FaRobot size={14} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">FreshBasket Assistant</p>
                  <p className="text-[11px] text-gray-500">Your smart grocery helper</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full bg-white p-2 text-gray-600 shadow-sm transition hover:bg-gray-100"
                aria-label="Close assistant"
              >
                <FaTimes size={12} />
              </button>
            </div>
            <div className="rounded-[24px] border border-gray-100 bg-white p-1">
              <AiAssistantPanel />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
