import { useEffect } from "react";
import { FiX, FiLogOut } from "react-icons/fi";

function LogoutModal({ isOpen, onClose, onConfirm }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border-[3px] border-red-600 shadow-2xl p-6 sm:p-7 max-w-[340px] w-full relative text-center flex flex-col items-center animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:bg-red-500 hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer"
          aria-label="Close"
        >
          <FiX className="w-4 h-4" />
        </button>

        {/* Logout Icon */}
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-3 shadow-xs">
          <FiLogOut className="w-7 h-7 translate-x-0.5" />
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900">Log Out?</h3>

        {/* Subtitle */}
        <p className="text-xs text-slate-500 mt-1 max-w-[240px] leading-relaxed">
          Are you sure you want to log out of your FindIt Lanka account?
        </p>

        {/* Footer Buttons */}
        <div className="mt-6 flex items-center justify-center gap-2.5 w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <FiX className="w-3.5 h-3.5" />
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-semibold transition shadow-sm cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
