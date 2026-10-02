import {
  FiX,
  FiMapPin,
  FiCalendar,
  FiTag,
  FiHash,
  FiUser,
  FiMail,
  FiPhone,
  FiCheckCircle,
  FiShield,
  FiSend,
} from "react-icons/fi";
import { formatReturnDate, getReturnStatusConfig } from "./returnHelpers";
import fallbackImage from "../../../assets/images/UdbFallbackImage.avif";

function ReturnDetailsModal({
  item,
  onClose,
  onContactClaimant,
  onMarkReturned,
  onApproveClaim,
}) {
  if (!item) return null;

  const statusConfig = getReturnStatusConfig(item.status);
  const StatusIcon = statusConfig.icon;

  const timelineSteps = [
    { title: "Item Found & Reported", date: item.foundDate, done: true },
    { title: "Claim Submitted", date: item.claimedOn, done: true },
    {
      title: "Claim Approved",
      date: item.status !== "Pending Claim" ? item.claimedOn : null,
      done: item.status !== "Pending Claim",
    },
    {
      title: "Handover in Progress",
      date: item.status === "Return In Progress" || item.status === "Returned" ? item.claimedOn : null,
      done: item.status === "Return In Progress" || item.status === "Returned",
    },
    {
      title: "Returned to Owner",
      date: item.status === "Returned" ? item.returnedOn || item.claimedOn : null,
      done: item.status === "Returned",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-3xl bg-slate-50 shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all duration-200 hover:bg-rose-500 hover:text-white cursor-pointer"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Modal Banner Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white px-6 sm:px-8 py-7 rounded-t-3xl relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 translate-x-4 -translate-y-4">
            <FiShield className="w-48 h-48" />
          </div>

          <p className="text-xs uppercase tracking-wider text-blue-200 font-bold">
            Return Case Details
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 text-white">
            {item.title}
          </h2>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${statusConfig.pill}`}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              {item.status}
            </span>
            <span className="text-xs text-blue-200 font-mono">
              Ref: {item.referenceNo}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Main Image */}
          <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-slate-200 border border-slate-200 shadow-xs">
            <img
              src={item.image}
              alt={item.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackImage;
              }}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl shadow-xs border border-slate-100 p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <FiCalendar className="w-4 h-4 text-blue-600" />
                Claimed Date
              </p>
              <p className="text-sm font-bold text-slate-800 mt-1">
                {formatReturnDate(item.claimedOn)}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xs border border-slate-100 p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <FiMapPin className="w-4 h-4 text-blue-600" />
                Found Location
              </p>
              <p className="text-sm font-bold text-slate-800 mt-1">
                {item.location}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xs border border-slate-100 p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <FiTag className="w-4 h-4 text-blue-600" />
                Category
              </p>
              <p className="text-sm font-bold text-slate-800 mt-1">
                {item.category}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xs border border-slate-100 p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <FiHash className="w-4 h-4 text-blue-600" />
                Handover Desk
              </p>
              <p className="text-sm font-bold text-slate-800 mt-1">
                {item.handoverLocation || "Designated Security Desk"}
              </p>
            </div>
          </div>

          {/* Claimant Profile Box */}
          <div className="bg-white rounded-2xl border border-blue-100 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold shrink-0">
                  {item.claimantAvatar ? (
                    <img
                      src={item.claimantAvatar}
                      alt={item.claimedBy}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">
                    {item.claimedBy}
                  </h4>
                  <p className="text-xs text-blue-600 font-semibold">
                    Verified Claimant
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onContactClaimant(item);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <FiSend className="w-3.5 h-3.5" />
                Contact
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                <FiPhone className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-semibold text-slate-800">
                  {item.claimantPhone || "+94 77 123 4567"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2.5 rounded-xl truncate">
                <FiMail className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-semibold text-slate-800 truncate">
                  {item.claimantEmail || "kasun.perera@example.com"}
                </span>
              </div>
            </div>

            {item.proofDescription && (
              <div className="bg-blue-50/50 rounded-xl p-3.5 border border-blue-100/60">
                <p className="text-[11px] font-bold text-blue-900 uppercase tracking-wide">
                  Ownership Proof / Identifying Details:
                </p>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                  "{item.proofDescription}"
                </p>
              </div>
            )}
          </div>

          {/* Return Progress Tracker */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Return Handover Progress
            </h4>
            <div className="space-y-3">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      step.done
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    <FiCheckCircle className="w-4 h-4" />
                  </div>
                  <div className="flex-1 flex items-center justify-between text-xs">
                    <span
                      className={`font-semibold ${
                        step.done ? "text-slate-800" : "text-slate-400"
                      }`}
                    >
                      {step.title}
                    </span>
                    {step.date && (
                      <span className="text-slate-400 text-[11px]">
                        {formatReturnDate(step.date)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>

            {item.status === "Pending Claim" && (
              <button
                type="button"
                onClick={() => {
                  onApproveClaim(item);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold transition-colors cursor-pointer shadow-xs"
              >
                Approve Claim
              </button>
            )}

            {item.status !== "Returned" && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onMarkReturned(item);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-bold transition-colors cursor-pointer shadow-xs"
              >
                Mark As Returned
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReturnDetailsModal;
