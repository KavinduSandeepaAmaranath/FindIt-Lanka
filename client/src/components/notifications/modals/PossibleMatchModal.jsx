import { FiShield, FiInfo, FiX, FiEye, FiCheck } from "react-icons/fi";
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

function PossibleMatchModal({ isOpen, onClose, notification, onOfferReturn, onClaimItem }) {
  if (!isOpen) return null;

  const item = notification?.foundItemId || notification?.lostItemId;
  const itemTitle = item?.title || notification?.title || "Possible Match";
  const itemCategory = item?.category || "General";

  const eventDate = item?.foundDate
    ? new Date(item.foundDate).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : item?.lostDate
    ? new Date(item.lostDate).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : notification?.date || "Recent";

  const locationStr = item?.district
    ? `${item.district}${item.location ? `, ${item.location}` : ""}`
    : item?.location || "Not specified";

  const getItemImage = () => {
    if (item?.images && item.images.length > 0 && item.images[0]) {
      const img = item.images[0];
      if (img.startsWith("http")) return img;
      const cleanPath = img.startsWith("/") ? img.substring(1) : img;
      return `http://localhost:5000/${cleanPath}`;
    }
    return getCategoryFallback(itemCategory);
  };

    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUserId = savedUser.id || savedUser._id || localStorage.getItem("userId");

  const foundItemUser = notification?.foundItemId?.userId;
  const lostItemUser = notification?.lostItemId?.userId;
  const foundUserId = typeof foundItemUser === "object" ? (foundItemUser?._id || foundItemUser?.id) : foundItemUser;
  const lostUserId = typeof lostItemUser === "object" ? (lostItemUser?._id || lostItemUser?.id) : lostItemUser;

  const notifTitle = (notification?.title || "").toLowerCase();
  const isFounderByTitle = notifTitle.includes("matching lost item found") || notifTitle.includes("founder");
  const isOwnerByTitle = notifTitle.includes("potential match found") || notifTitle.includes("owner");

  const isFounder = (foundUserId ? foundUserId.toString() === currentUserId?.toString() : false) || isFounderByTitle;
  const isOwner = (lostUserId ? lostUserId.toString() === currentUserId?.toString() : false) || (isOwnerByTitle && !isFounderByTitle);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border-[3.5px] border-blue-700 shadow-2xl w-full max-w-[480px] p-6 space-y-4 animate-scaleIn max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <FiShield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Possible Match Found!
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              An item matching your report was found.
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
            <p className="text-xs font-bold text-emerald-600">
              {notification?.matchScore ? `${notification.matchScore}% Match` : "Matched Item"}
            </p>
          </div>
        </div>

        {/* Item Information */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-900 underline underline-offset-4">
            Match Details
          </h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Location</span>
              <span className="font-semibold text-slate-900 truncate max-w-[200px]">
                {locationStr}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Date Logged</span>
              <span className="font-semibold text-slate-900">{eventDate}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Category</span>
              <span className="font-semibold text-slate-900">{itemCategory}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Match Confidence</span>
              <span className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {notification?.matchScore ? `${notification.matchScore}% Match` : "85% Match"}
              </span>
            </div>
          </div>
        </div>

        {/* Info Callout */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-2.5 flex items-start gap-2.5 text-xs text-blue-900">
          <FiInfo className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Compare the item&apos;s identifying details with your lost report before submitting a claim.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
          >
            <FiX className="w-4 h-4" />
            <span>Close</span>
          </button>

          {isFounder ? (
            <button
              type="button"
              onClick={() => onOfferReturn?.(notification)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#059669] hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
            >
              <FiCheck className="w-4 h-4 stroke-[3]" />
              <span>Offer Return</span>
            </button>
          ) : isOwner ? (
            <button
              type="button"
              onClick={() => onClaimItem?.(notification)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
            >
              <FiCheck className="w-4 h-4 stroke-[3]" />
              <span>Claim Item</span>
            </button>
          ) : (
            <Link
              to="/dashboard/browse-found"
              onClick={onClose}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors shadow-sm"
            >
              <FiEye className="w-4 h-4" />
              <span>View Full Item</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default PossibleMatchModal;
