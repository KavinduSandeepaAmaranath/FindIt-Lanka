import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiLogOut, FiX } from "react-icons/fi";

export default function AdminLogoutModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !isLoading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, isLoading]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={!isLoading ? onClose : undefined}
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 text-center"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition disabled:opacity-50 cursor-pointer"
              aria-label="Close dialog"
            >
              <FiX size={18} />
            </button>

            {/* Logout Icon */}
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-8 ring-rose-50/50">
              <FiLogOut size={26} className="translate-x-0.5" />
            </div>

            {/* Title */}
            <h3
              id="logout-modal-title"
              className="text-lg font-bold text-gray-900"
            >
              Log Out of Admin Panel?
            </h3>

            {/* Description */}
            <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed">
              Are you sure you want to log out? Any unsaved reviews in claims or reports will be lost.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 text-xs sm:text-sm font-semibold text-white shadow-md shadow-rose-600/25 hover:bg-rose-700 active:bg-rose-800 transition disabled:opacity-70 cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Logging out...</span>
                  </>
                ) : (
                  <>
                    <FiLogOut size={16} />
                    <span>Log Out</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
