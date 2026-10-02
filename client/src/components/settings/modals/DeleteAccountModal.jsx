import { useEffect } from "react";
import { FiX } from "react-icons/fi";

function DeleteAccountModal({ isOpen, onClose, onContinue }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const deleteItems = [
    "Your profile",
    "Lost & Found reports",
    "Claims",
    "Messages",
    "Notifications",
    "Account data",
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border-[3px] border-red-600 shadow-2xl p-6 sm:p-7 max-w-[400px] w-full relative animate-scaleIn"
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

        {/* Header with red exclamation icon */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 font-bold text-lg shadow-xs">
            !
          </div>
          <div>
            <h3 className="text-base font-bold text-red-600 leading-tight">
              Delete Account
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Are you sure you want to delete your account?
            </p>
          </div>
        </div>

        {/* Consequences Section */}
        <div className="mt-4">
          <p className="text-xs font-bold text-blue-900 mb-2">
            This action will permanently delete:
          </p>

          <ul className="space-y-1.5 pl-1">
            {deleteItems.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-xs text-slate-600 font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-[2px] bg-blue-600 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-xs font-semibold text-red-600 mt-3.5">
            This action cannot be undone.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <FiX className="w-3.5 h-3.5" />
            Cancel
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-semibold transition shadow-sm cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccountModal;
