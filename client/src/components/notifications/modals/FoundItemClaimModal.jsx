import { FiBox, FiInfo, FiX, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import fallbackImg from "../../../assets/images/UdbFallbackImage.avif";
import handbagImg from "../../../assets/images/LpLeatherHandbag.avif";
import iphoneImg from "../../../assets/images/LpIphone1.avif";
import watchImg from "../../../assets/images/LpWristWatch1.avif";
import petImg from "../../../assets/images/LpRetrieverDog.avif";
import keyImg from "../../../assets/images/LpCarKey.webp";

const getCategoryFallback = (category) => {
  const cat = (category || "").toLowerCase();
  if (cat.includes("bag") || cat.includes("wallet")) return handbagImg;
  if (cat.includes("electronic") || cat.includes("phone")) return iphoneImg;
  if (cat.includes("jewel") || cat.includes("watch")) return watchImg;
  if (cat.includes("pet") || cat.includes("animal")) return petImg;
  if (cat.includes("vehicle") || cat.includes("key")) return keyImg;
  return fallbackImg;
};

function FoundItemClaimModal({ isOpen, onClose, notification }) {
  if (!isOpen) return null;

  const item = notification?.foundItemId || notification?.lostItemId;
  const itemTitle = item?.title || notification?.title || "Found Item Claim";
  const itemCategory = item?.category || "General";

  const getItemImage = () => {
    if (item?.images && item.images.length > 0 && item.images[0]) {
      const img = item.images[0];
      if (img.startsWith("http")) return img;
      const cleanPath = img.startsWith("/") ? img.substring(1) : img;
      return `http://localhost:5000/${cleanPath}`;
    }
    return getCategoryFallback(itemCategory);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border-[3.5px] border-blue-700 shadow-2xl w-full max-w-[480px] p-6 space-y-4 animate-scaleIn max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <FiBox className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Your Found Item Received a Claim
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Someone has submitted an ownership claim.
            </p>
          </div>
        </div>

        {/* Item Preview Box */}
        <div className="border border-slate-200 rounded-xl p-3 flex items-center gap-4 bg-slate-50/40">
          <img
            src={getItemImage()}
            alt={itemTitle}
            className="w-16 h-16 object-cover rounded-lg border border-slate-200 shrink-0"
            onError={(e) => {
              e.target.src = getCategoryFallback(itemCategory);
            }}
          />
          <div className="space-y-0.5 min-w-0">
            <h4 className="text-sm font-bold text-slate-900 leading-tight truncate">
              {itemTitle}
            </h4>
            <p className="text-xs text-slate-500">{itemCategory}</p>
            <p className="text-xs font-semibold text-amber-600">Claim Pending</p>
          </div>
        </div>

        {/* Claim Summary */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-900 underline underline-offset-4">
            Claim Summary
          </h4>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Submitted Date</span>
              <span className="font-semibold text-slate-900">{notification?.date || "Recent"}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Verification</span>
              <span className="font-semibold text-amber-600">In Review</span>
            </div>
          </div>
        </div>

        {/* Info Callout */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-blue-900">
          <FiInfo className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Please review the submitted claim details and ownership proof in your claim management dashboard.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-slate-300 hover:bg-slate-400 text-slate-700 font-medium text-xs transition-colors"
          >
            <FiX className="w-4 h-4" />
            <span>Close</span>
          </button>

          <Link
            to="/dashboard/my-reports"
            onClick={onClose}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors shadow-sm"
          >
            <FiEye className="w-4 h-4" />
            <span>Review Claim</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FoundItemClaimModal;
