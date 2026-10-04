import { useState } from "react";
import { FiX, FiEye, FiUser, FiCheck } from "react-icons/fi";
import fallbackImage from "../../../assets/images/LpIphone1.avif";

function FullImageModal({ imageUrl, title, onClose }) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-red-600 text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <FiX className="w-5 h-5 stroke-[2.5]" />
        </button>
        <div className="p-4 sm:p-6 flex flex-col items-center">
          <img
            src={imageUrl}
            alt={title}
            className="max-h-[70vh] w-auto object-contain rounded-2xl"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImage;
            }}
          />
          <p className="text-white text-sm font-semibold mt-3 truncate max-w-full">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}

function ClaimDetailsModal({ claim, onClose, onConfirmApprove }) {
  const [selectedProofImg, setSelectedProofImg] = useState(null);

  if (!claim) return null;

  const proofList = claim.proofImages && claim.proofImages.length > 0
    ? claim.proofImages
    : [claim.image];

  const formatReturnDate = (dateString) => {
    if (!dateString) return "Oct 05, 2026";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const isPending = claim.status === "Pending Verification" || claim.status === "pending";

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
        <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-100 shadow-2xl p-6 sm:p-7 space-y-5 my-auto max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-red-500 hover:text-white text-slate-600 flex items-center justify-center transition-all cursor-pointer"
          >
            <FiX className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Heading */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 border-b-2 border-blue-600/30 pb-1.5 inline-block">
              Claim Details
            </h2>
          </div>

          {/* 4-Quadrant Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
            {/* Quadrant 1: Founder / Claimant Information */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900">
                Founder Information
              </h3>
              <div className="flex items-center gap-3">
                {claim.hasRealAvatar && claim.claimantAvatar ? (
                  <img
                    src={claim.claimantAvatar}
                    alt={claim.claimedBy}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      if (e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={`w-11 h-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 ${
                    claim.hasRealAvatar && claim.claimantAvatar ? "hidden" : "flex"
                  }`}
                >
                  <FiUser className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="text-xs leading-snug">
                  <p className="font-bold text-slate-900">{claim.claimedBy}</p>
                  <p className="text-slate-600 text-[11px]">{claim.claimantEmail}</p>
                  <p className="text-slate-600 text-[11px]">{claim.claimantPhone}</p>
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
                  src={claim.image}
                  alt={claim.title}
                  className="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackImage;
                  }}
                />
                <div className="text-xs space-y-0.5">
                  <p className="font-bold text-slate-900">{claim.title}</p>
                  <p className="text-slate-600 text-[11px]">{claim.category}</p>
                  <p className="text-slate-600 text-[11px]">
                    Location: <span className="font-semibold text-slate-800">{claim.location}</span>
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
                  {formatReturnDate(claim.claimedOn)}
                </span>
              </p>
              <p className="text-[11px]">
                <span className="text-slate-500">Claim Status : </span>
                <span className="font-semibold text-emerald-700">
                  {claim.status}
                </span>
              </p>
              <p className="text-[11px]">
                <span className="text-slate-500">Reference No : </span>
                <span className="font-semibold text-slate-800">
                  {claim.referenceNo}
                </span>
              </p>
            </div>

            {/* Quadrant 4: Return Status */}
            <div className="space-y-1.5 text-xs text-slate-700">
              <h3 className="text-xs font-bold text-slate-900 mb-1">
                Return Status
              </h3>
              <p className="text-[11px]">
                <span className="text-slate-500">Handover Status : </span>
                <span className="font-semibold text-blue-700">
                  {claim.status === "Claimed" ? "Verified & Matched" : "Pending Verification"}
                </span>
              </p>
              <p className="text-[11px]">
                <span className="text-slate-500">Delivery Method : </span>
                <span className="font-semibold text-slate-800">
                  In Person Handover
                </span>
              </p>
            </div>
          </div>

          {/* Description Section */}
          <div className="pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 border-b border-slate-200 pb-0.5 mb-2 inline-block">
              Item Description &amp; Details
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              <span className="font-medium text-slate-900">
                {claim.itemDescription || "Report details registered in system."}
              </span>
            </p>
          </div>

          {/* Uploaded Proof */}
          <div className="space-y-2.5 pt-1">
            <h3 className="text-xs font-bold text-slate-900">
              Uploaded Proof &amp; Photos
            </h3>

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

            <div>
              <button
                type="button"
                onClick={() => setSelectedProofImg(proofList[0] || claim.image)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#38bdf8] hover:bg-[#0ea5e9] text-white text-[11px] font-bold shadow-xs transition-colors cursor-pointer"
              >
                <FiEye className="w-3.5 h-3.5" />
                View Full Image
              </button>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            {isPending && onConfirmApprove && (
              <button
                type="button"
                onClick={() => onConfirmApprove(claim)}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                Confirm &amp; Accept Return
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold shadow-xs transition-colors cursor-pointer"
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
          title={claim.title}
          onClose={() => setSelectedProofImg(null)}
        />
      )}
    </>
  );
}

export default ClaimDetailsModal;
