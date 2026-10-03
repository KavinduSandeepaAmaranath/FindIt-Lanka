import { FiCheck, FiX, FiCheckSquare } from "react-icons/fi";

function MarkAllAsReadModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border-[3.5px] border-blue-700 shadow-2xl w-full max-w-[460px] p-8 text-center space-y-4 animate-scaleIn">
        {/* Checkmark Icon */}
        <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-sm">
          <FiCheck className="w-8 h-8 stroke-[3]" />
        </div>

        {/* Title & Subtitle */}
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Mark All as Read?
          </h3>
          <p className="text-xs sm:text-sm text-blue-900/80 max-w-xs mx-auto mt-1">
            Are you sure you want to mark all unread notifications as read?
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
          >
            <FiX className="w-4 h-4" />
            <span>Cancel</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
          >
            <FiCheckSquare className="w-4 h-4" />
            <span>Yes , Mark All</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MarkAllAsReadModal;
