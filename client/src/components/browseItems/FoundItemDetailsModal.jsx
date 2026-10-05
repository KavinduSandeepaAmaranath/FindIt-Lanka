import { FiX, FiRefreshCw } from "react-icons/fi";
import fallbackImage from "../../assets/images/acerLaptop.jpg";

function FoundItemDetailsModal({ item, onClose, onClaimItem }) {
  if (!item) return null;

  // Use item images or thumbnail preview
  const photos =
    item.images && item.images.length > 0
      ? item.images
      : [item.image || fallbackImage, item.image || fallbackImage, item.image || fallbackImage, item.image || fallbackImage];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-xl bg-white border-4 border-blue-900 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-left">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white flex items-center justify-center shadow-xs cursor-pointer transition-colors"
        >
          <FiX className="w-3.5 h-3.5 stroke-[3]" />
        </button>

        {/* Title */}
        <div className="text-left mb-3">
          <h2 className="text-2xl font-bold text-blue-950 inline-block border-b-2 border-blue-900 pb-0.5">
            Report Details
          </h2>
        </div>

        <div className="flex items-center justify-between mb-2">
          <p className="text-xs sm:text-sm font-semibold text-slate-800">
            Uploaded Photo
          </p>
          <span className="px-3.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-xs">
            Found Item
          </span>
        </div>

        {/* Uploaded Photo Section */}
        <div className="mb-4">
          <div className="rounded-xl border border-slate-200 bg-white p-2.5 flex items-center gap-3 overflow-x-auto shadow-2xs">
            {photos.slice(0, 4).map((imgSrc, idx) => (
              <div
                key={idx}
                className="w-20 h-24 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 shrink-0"
              >
                <img
                  src={imgSrc}
                  alt={`${item.title} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Item Title & Category */}
        <div className="mb-3">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {item.title}
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            {item.category}
          </p>
        </div>

        {/* Information Table Box */}
        <div className="rounded-xl border border-sky-200 bg-sky-50/20 p-4 space-y-2 text-xs sm:text-sm text-slate-700">
          <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[160px_1fr] gap-2 items-baseline">
            <span className="font-normal text-blue-950">Found Location :</span>
            <span className="font-normal text-blue-950">{item.location || "Hiniduma"}</span>
          </div>

          <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[160px_1fr] gap-2 items-baseline">
            <span className="font-normal text-blue-950">Found district :</span>
            <span className="font-normal text-blue-950">{item.district || "Galle"}</span>
          </div>

          <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[160px_1fr] gap-2 items-baseline">
            <span className="font-normal text-blue-950">Found date :</span>
            <span className="font-normal text-blue-950">{item.date || "02 September 2026"}</span>
          </div>

          <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[160px_1fr] gap-2 items-baseline">
            <span className="font-normal text-blue-950">Found time :</span>
            <span className="font-normal text-blue-950">{item.foundTime || item.lostTime || "12 .00 p.m"}</span>
          </div>

          <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[160px_1fr] gap-2 items-baseline">
            <span className="font-normal text-blue-950">description :</span>
            <span className="font-normal text-blue-950">
              {item.description || "black iPhone 13 with red color back cover"}
            </span>
          </div>

          <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[160px_1fr] gap-2 items-baseline">
            <span className="font-normal text-blue-950">reported date :</span>
            <span className="font-normal text-blue-950">{item.reportedDate || item.date || "02 September 2026"}</span>
          </div>
        </div>

        {/* Footer Buttons: Close & Claim Item */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-slate-300 hover:bg-slate-400 active:scale-95 text-slate-800 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <FiX className="w-4 h-4" />
            <span>Close</span>
          </button>

          <button
            type="button"
            onClick={onClaimItem}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
          >
            <FiRefreshCw className="w-3.5 h-3.5" />
            <span>Claim Item</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoundItemDetailsModal;
