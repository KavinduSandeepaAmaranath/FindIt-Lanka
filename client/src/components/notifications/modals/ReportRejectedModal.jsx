import { FiX, FiInfo, FiEye } from "react-icons/fi";
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

function ReportRejectedModal({ isOpen, onClose, notification }) {
  if (!isOpen) return null;

  const item = notification?.lostItemId || notification?.foundItemId;
  const itemTitle = item?.title || notification?.title || "Item Report";
  const itemCategory = item?.category || "General";
  const reportType = notification?.lostItemId
    ? "Lost Item"
    : notification?.foundItemId
    ? "Found Item"
    : "Report";

  const submittedDate =
    item?.createdAt
      ? new Date(item.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : notification?.date || "Recent";

  const locationStr = item?.district
    ? `${item.district}${item.location ? `, ${item.location}` : ""}`
    : item?.location || "Not specified";

  const rejectionReason =
    item?.rejectionReason ||
    notification?.description ||
    notification?.message ||
    "Some required item information was missing. Please update the description and provide a clearer item image.";

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
          <div className="w-11 h-11 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
            <FiX className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Report Rejected
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Your {reportType.toLowerCase()} report needs corrections.
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
            <p className="text-xs font-semibold text-red-600">Rejected</p>
          </div>
        </div>

        {/* Report Information */}
        <div className="space-y-1.5 text-xs text-slate-600 border-b border-slate-100 pb-3">
          <div className="flex items-center justify-between">
            <span>Location</span>
            <span className="font-semibold text-slate-900 truncate max-w-[200px]">{locationStr}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Submitted Date</span>
            <span className="font-semibold text-slate-900">{submittedDate}</span>
          </div>
        </div>

        {/* Section 1: Reason for Rejection Box */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-900 underline underline-offset-4">
            Reason for Rejection
          </h4>
          <div className="bg-red-50/40 border border-red-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-red-800">
            <FiInfo className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {rejectionReason}
            </p>
          </div>
        </div>

        {/* Section 2: Steps / Recommendations */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-900 underline underline-offset-4">
            Next Steps
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-700 pl-1">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
              <span>Review the rejection reason above.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
              <span>Correct the missing information.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
              <span>Resubmit the report from My Reports.</span>
            </li>
          </ul>
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
            <span>View Reports</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ReportRejectedModal;
