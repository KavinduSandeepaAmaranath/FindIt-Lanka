import { useEffect } from "react";
import { FiCheck, FiX } from "react-icons/fi";

function TwoFactorEnabledModal({ isOpen, onClose }) {
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
        className="bg-white rounded-2xl border-[3px] border-[#1e3a8a] shadow-2xl p-6 sm:p-7 max-w-[340px] w-full text-center flex flex-col items-center transform transition-all animate-scaleIn relative"
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

        {/* Green Success Badge */}
        <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white mb-3 shadow-md">
          <FiCheck className="w-8 h-8 stroke-[3]" />
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-800">
          Two-Factor Authentication Enabled
        </h3>

        {/* Subtitle */}
        <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-[240px]">
          Your account is now protected with an additional verification step.
        </p>

        {/* Done Button */}
        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition shadow-sm cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default TwoFactorEnabledModal;
