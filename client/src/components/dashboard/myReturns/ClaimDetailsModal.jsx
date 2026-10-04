import { useState } from "react";
import { FiX, FiCheck, FiEye } from "react-icons/fi";
import fallbackImage from "../../../assets/images/UdbFallbackImage.avif";
import FullImageModal from "./FullImageModal";

function ClaimDetailsModal({
  item,
  onClose,
  onOpenApproveModal,
  onOpenRejectModal,
}) {
  const [selectedProofImg, setSelectedProofImg] = useState(null);

  if (!item) return null;

  const proofList = item.proofImages?.length
    ? item.proofImages
    : [item.image, item.image, item.image, item.image];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
        <div className="relative w-full max-w-2xl rounded-2xl bg-white border-2 border-blue-700 shadow-2xl p-6 sm:p-7 space-y-5 animate-in fade-in zoom-in-95 duration-200 my-auto">
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
              Claim Details
            </h2>
          </div>

          {/* Two-column layout matching Image 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-1">
            {/* Left Column (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              {/* Claimant Information */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 mb-2">
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

              {/* Item Information */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 mb-2">
                  Item Information
                </h3>
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = fallbackImage;
                    }}
                  />
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="text-slate-600 text-[11px]">{item.category}</p>
                    <p className="text-slate-600 text-[11px]">
                      Found Date: {item.whenLost || "Sep 18, 2026"}
                    </p>
                    <p className="text-slate-600 text-[11px]">
                      Found Location: {item.location || "Badulla"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Claim Proof Q&A */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 border-b border-slate-300 pb-0.5 mb-2.5 inline-block">
                  Claim Proof
                </h3>

                <div className="space-y-2 text-[11px]">
                  <div>
                    <p className="text-slate-500 font-semibold">Where did you lose this item?</p>
                    <p className="font-bold text-slate-800">
                      {item.whereLost || "Badulla University Library"}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500 font-semibold">When did you lose this item?</p>
                    <p className="font-bold text-slate-800">
                      {item.whenLost || "Sep 18, 2026"}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500 font-semibold">Describe the item</p>
                    <p className="font-bold text-slate-800">
                      {item.itemDescription || "Dark iPhone 13 with a small scratch near the camera."}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500 font-semibold">What makes this item uniquely yours?</p>
                    <p className="font-bold text-slate-800">
                      {item.uniqueProof || "Blue phone case and a sticker on the back."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Uploaded Proof */}
            <div className="md:col-span-5 flex flex-col items-center sm:items-start space-y-3">
              <h3 className="text-xs font-bold text-slate-900">
                Uploaded Proof
              </h3>

              {/* 2x2 grid of proof images matching Image 1 */}
              <div className="grid grid-cols-2 gap-2">
                {proofList.slice(0, 4).map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedProofImg(img)}
                    className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 cursor-pointer hover:opacity-90 hover:scale-105 transition-all shadow-2xs"
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

          {/* Bottom Right Buttons: Reject Claim and Approve Claim */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => onOpenRejectModal(item)}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#b91c1c] hover:bg-red-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <FiX className="w-3.5 h-3.5 stroke-[3]" />
              Reject Claim
            </button>

            <button
              type="button"
              onClick={() => onOpenApproveModal(item)}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#059669] hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
              Approve Claim
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

export default ClaimDetailsModal;
