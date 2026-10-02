import { FiX, FiCheck } from "react-icons/fi";
import fallbackImage from "../../../assets/images/UdbFallbackImage.avif";

function ApproveClaimModal({ item, onClose, onConfirm }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-md rounded-2xl bg-white border-2 border-blue-700 shadow-2xl p-6 sm:p-7 space-y-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-slate-700 hover:text-rose-600 transition-colors cursor-pointer p-1"
        >
          <FiX className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Header row with green checkmark circle */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#16a34a] flex items-center justify-center text-white shrink-0 shadow-xs">
            <FiCheck className="w-6 h-6 stroke-[3]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              Approve Claim?
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Are you sure you want to approve this claim?
            </p>
          </div>
        </div>

        {/* Item preview snippet */}
        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
          <img
            src={item.image}
            alt={item.title}
            className="w-14 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImage;
            }}
          />
          <div className="text-xs space-y-1">
            <p className="font-bold text-slate-800">
              <span className="text-slate-500 font-normal">Item: </span>
              {item.title}
            </p>
            <p className="font-bold text-slate-800">
              <span className="text-slate-500 font-normal">Claimant: </span>
              {item.claimedBy}
            </p>
          </div>
        </div>

        {/* Informational note */}
        <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
          Once approved, you can contact the claimant to arrange the item return.
        </p>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1 px-5 py-2 rounded-full bg-slate-400 hover:bg-slate-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <FiX className="w-3.5 h-3.5 stroke-[2.5]" />
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              onConfirm(item);
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#16a34a] hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
            Approve Claim
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApproveClaimModal;
