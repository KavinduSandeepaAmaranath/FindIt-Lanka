import { useState } from "react";
import { FiX, FiEye, FiUser } from "react-icons/fi";
import fallbackImage from "../../../assets/images/UdbFallbackImage.avif";
import FullImageModal from "./FullImageModal";
import { formatReturnDate } from "./returnHelpers";

function ViewDetailsModal({ item, onClose }) {
  const [selectedProofImg, setSelectedProofImg] = useState(null);

  if (!item) return null;

  const proofList = item.proofImages?.length
    ? item.proofImages
    : [item.image, item.image, item.image, item.image];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
        <div className="relative w-full max-w-2xl rounded-2xl bg-white border-2 border-blue-700 shadow-2xl p-6 sm:p-7 space-y-4 animate-in fade-in zoom-in-95 duration-200 my-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 text-slate-700 hover:text-rose-600 transition-colors cursor-pointer p-1"
          >
            <FiX className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Heading */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 border-b-2 border-blue-600/30 pb-1.5 inline-block">
              View Details
            </h2>
          </div>

          {/* 4-Quadrant Information Grid matching Image 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
            {/* Quadrant 1: Claimant Information */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900">
                Claimant Information
              </h3>
              <div className="flex items-center gap-3">
                {item.hasRealAvatar && item.claimantAvatar ? (
                  <img
                    src={item.claimantAvatar}
                    alt={item.claimedBy}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      if (e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={`w-11 h-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 ${
                    item.hasRealAvatar && item.claimantAvatar ? "hidden" : "flex"
                  }`}
                >
                  <FiUser className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="text-xs leading-snug">
                  <p className="font-bold text-slate-900">{item.claimedBy}</p>
                  <p className="text-slate-600 text-[11px]">{item.claimantEmail}</p>
                  <p className="text-slate-600 text-[11px]">{item.claimantPhone}</p>
                </div>
              </div>
            </div>

            {/* Quadrant 2: Item Information */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900">
                Item Information
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackImage;
                  }}
                />
                <div className="text-xs space-y-0.5">
                  <p className="font-bold text-slate-900">{item.title}</p>
                  <p className="text-slate-600 text-[11px]">{item.category}</p>
                  <p className="text-slate-600 text-[11px]">
                    Status: <span className="font-semibold text-slate-800">{item.status}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Quadrant 3: Claim Information */}
            <div className="space-y-1.5 text-xs text-slate-700">
              <h3 className="text-xs font-bold text-slate-900 mb-1">
                Claim Information
              </h3>
              <p className="text-[11px]">
                <span className="text-slate-500">Claim Date : </span>
                <span className="font-semibold text-slate-800">
                  {formatReturnDate(item.claimedOn)}
                </span>
              </p>
              <p className="text-[11px]">
                <span className="text-slate-500">Claim Status : </span>
                <span className="font-semibold text-emerald-700">
                  {item.claimStatus || "Approved"}
                </span>
              </p>
              <p className="text-[11px]">
                <span className="text-slate-500">Approved Date : </span>
                <span className="font-semibold text-slate-800">
                  {formatReturnDate(item.approvedDate || item.claimedOn)}
                </span>
              </p>
            </div>

            {/* Quadrant 4: Return Information */}
            <div className="space-y-1.5 text-xs text-slate-700">
              <h3 className="text-xs font-bold text-slate-900 mb-1">
                Return Information
              </h3>
              <p className="text-[11px]">
                <span className="text-slate-500">Return Status : </span>
                <span className="font-semibold text-blue-700">
                  {item.status === "Returned" ? "Completed" : item.status}
                </span>
              </p>
              <p className="text-[11px]">
                <span className="text-slate-500">Returned Date : </span>
                <span className="font-semibold text-slate-800">
                  {formatReturnDate(item.returnedOn || item.approvedDate || item.claimedOn)}
                </span>
              </p>
              <p className="text-[11px]">
                <span className="text-slate-500">Return Method : </span>
                <span className="font-semibold text-slate-800">
                  {item.returnMethod || "In Person"}
                </span>
              </p>
            </div>
          </div>

          {/* Description Section */}
          <div className="pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 border-b border-slate-200 pb-0.5 mb-2 inline-block">
              Return Information
            </h3>
            <p className="text-xs text-slate-700">
              <span className="font-medium text-slate-500">Description: </span>
              <span className="font-medium text-slate-900">
                {item.itemDescription || "Black iPhone 13 with blue case."}
              </span>
            </p>
          </div>

          {/* Uploaded Proof */}
          <div className="space-y-2.5 pt-1">
            <h3 className="text-xs font-bold text-slate-900">
              Uploaded Proof
            </h3>

            {/* 4 horizontal thumbnails matching Image 4 */}
            <div className="flex items-center gap-2.5">
              {proofList.slice(0, 4).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedProofImg(img)}
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 cursor-pointer hover:opacity-90 hover:scale-105 transition-all shadow-2xs"
                >
                  <img
                    src={img}
                    alt={`Proof thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = fallbackImage;
                    }}
                  />
                </div>
              ))}
            </div>

            {/* View Full Image button */}
            <div>
              <button
                type="button"
                onClick={() => setSelectedProofImg(proofList[0] || item.image)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#38bdf8] hover:bg-[#0ea5e9] text-white text-[11px] font-bold shadow-xs transition-colors cursor-pointer"
              >
                <FiEye className="w-3.5 h-3.5" />
                View Full Image
              </button>
            </div>
          </div>

          {/* Bottom Right Close Button matching Image 4 */}
          <div className="flex items-center justify-end pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-[#dc2626] hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <FiX className="w-3.5 h-3.5 stroke-[3]" />
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox when clicking View Full Image */}
      {selectedProofImg && (
        <FullImageModal
          imageUrl={selectedProofImg}
          title={item.title}
          onClose={() => setSelectedProofImg(null)}
        />
      )}
    </>
  );
}

export default ViewDetailsModal;
