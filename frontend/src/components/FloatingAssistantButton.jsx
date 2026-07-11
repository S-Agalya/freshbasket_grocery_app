import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaRobot, FaTimes, FaSparkles } from "react-icons/fa";
import AiAssistantPanel from "./AiAssistantPanel";

export default function FloatingAssistantButton() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const hiddenRoutes = ["/login", "/register", "/welcome"];
  const shouldHide = hiddenRoutes.includes(location.pathname);

  if (shouldHide) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-emerald-200 bg-gradient-to-r from-emerald-600 via-green-600 to-lime-500 px-4 py-3 text-white shadow-[0_20px_45px_rgba(16,185,129,0.28)] transition hover:scale-[1.02] active:scale-[0.98]"
        aria-label="Open FreshBasket Assistant"
      >
        <div className="rounded-full bg-white/20 p-2">
          <FaRobot size={15} />
        </div>
        <span className="text-sm font-semibold">Ask AI</span>
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em]">
          <FaSparkles size={10} className="inline" />
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 px-3 py-4 backdrop-blur-sm sm:items-center sm:px-4">
          <div className="w-full max-w-3xl rounded-[28px] border border-white/50 bg-white/95 p-2 shadow-[0_25px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-3">
            <div className="mb-2 flex items-center justify-between rounded-[20px] bg-gradient-to-r from-emerald-50 to-lime-50 px-3 py-2.5">
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
