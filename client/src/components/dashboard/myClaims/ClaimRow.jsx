import { FiCheckCircle, FiCalendar, FiEye, FiChevronRight, FiClock, FiCheck, FiX } from "react-icons/fi";
import fallbackImage from "../../../assets/images/LpIphone1.avif";

function ClaimRow({ claim, onViewDetails, onConfirmApprove, onContactFounder }) {
  const { title, status, claimedOn, image } = claim;

  const renderBadge = () => {
    switch (status) {
      case "Claimed":
      case "Approved":
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#12b76a] text-white shadow-xs">
            <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
            Claimed
          </span>
        );
      case "Pending Verification":
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#ff7a1a] text-white shadow-xs">
            <FiClock className="w-3.5 h-3.5 stroke-[2.5]" />
            Pending Verification
          </span>
        );
      case "Rejected":
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-rose-600 text-white shadow-xs">
            <FiX className="w-3.5 h-3.5 stroke-[2.5]" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-slate-600 text-white shadow-xs">
            {status}
          </span>
        );
    }
  };

  const formatClaimDate = (dateString) => {
    if (!dateString) return "Oct 05, 2026";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="group bg-white rounded-2xl border border-sky-100/90 shadow-xs hover:shadow-md transition-all duration-200 p-4 sm:p-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Column 1: Thumbnail + Title + Status Badge */}
        <div className="flex items-center gap-4.5 lg:w-[290px] shrink-0">
          <div className="relative w-20 h-20 sm:w-24 sm:h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100 shadow-2xs">
            <img
              src={image}
              alt={title}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackImage;
              }}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-tight truncate">
              {title}
            </h3>
            <div className="mt-2.5">{renderBadge()}</div>
          </div>
        </div>

        {/* Column 2: Status Message + Date */}
        <div className="flex-1 min-w-0 lg:border-l lg:border-slate-200/80 lg:pl-8 space-y-2.5">
          <div className="flex items-center gap-2.5 text-sm text-slate-700">
            <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <FiCheckCircle className="w-3.5 h-3.5" />
            </div>
            <p className="truncate text-xs sm:text-sm font-medium text-slate-600">
              {status === "Claimed" || status === "approved"
                ? "Your claim has been approved! Item successfully claimed."
                : status === "Rejected" || status === "rejected"
                ? "Your claim was rejected. Please review details."
                : claim.isReturnOffer ? "Return offered by founder. Click Confirm Return to accept." : "Your claim has been submitted. Waiting for founder verification."}
            </p>
          </div>

          <div className="flex items-center gap-2.5 text-sm text-slate-700">
            <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <FiCalendar className="w-3.5 h-3.5" />
            </div>
            <p className="truncate text-xs sm:text-sm">
              <span className="text-slate-500 font-medium">Claimed Date : </span>
              <span className="font-semibold text-slate-800">
                {formatClaimDate(claimedOn)}
              </span>
            </p>
          </div>
        </div>

        {/* Column 3: Action Button */}
        <div className="flex items-center gap-3 lg:border-l lg:border-slate-200/80 lg:pl-8 shrink-0">
                    <div className="flex flex-col gap-2 w-full sm:w-[170px]">
            <button
              type="button"
              onClick={() => onViewDetails(claim)}
              className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-xs transition-colors cursor-pointer"
            >
              <FiEye className="w-4 h-4" />
              View Details
            </button>

            {(status === "Claimed" || status === "Approved" || status === "approved") && onContactFounder ? (
              <button
                type="button"
                onClick={() => onContactFounder(claim)}
                className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-xs transition-colors cursor-pointer"
              >
                Contact Founder
              </button>
            ) : null}

            {(status === "Pending Verification" || status === "pending") && claim.isReturnOffer && onConfirmApprove ? (
              <button
                type="button"
                onClick={() => onConfirmApprove(claim)}
                className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2 px-3 rounded-xl bg-[#059669] hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer"
              >
                <FiCheck className="w-4 h-4 stroke-[3]" />
                Confirm Return
              </button>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => onViewDetails(claim)}
            aria-label={`Open details for ${title}`}
            className="hidden lg:flex w-8 h-8 rounded-full items-center justify-center text-slate-300 group-hover:text-blue-600 hover:bg-blue-50 transition-colors shrink-0 cursor-pointer"
          >
            <FiChevronRight className="w-6 h-6 stroke-[2]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClaimRow;
