import { FiTrash2, FiX } from "react-icons/fi";

function DeleteNotificationModal({ isOpen, onClose, onConfirm, isBulk = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border-[3.5px] border-blue-700 shadow-2xl w-full max-w-[460px] p-8 text-center space-y-4 animate-scaleIn">
        {/* Trash Bin Icon */}
        <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-sm">
          <FiTrash2 className="w-7 h-7" />
        </div>

        {/* Title & Subtitle */}
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            {isBulk ? "Delete All Notifications?" : "Delete Notification?"}
          </h3>
          <p className="text-xs sm:text-sm text-blue-900/80 max-w-sm mx-auto mt-1">
            {isBulk
              ? "Are you sure you want to remove all notifications? This action cannot be undone."
              : "Are you sure you want to remove this notification? This action cannot be undone."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-slate-300 hover:bg-slate-400 text-slate-700 font-semibold text-xs sm:text-sm transition-colors shadow-sm"
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
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
          >
            <FiTrash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteNotificationModal;