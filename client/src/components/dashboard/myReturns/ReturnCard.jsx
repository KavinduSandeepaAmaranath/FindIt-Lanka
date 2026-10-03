import {
  FiCalendar,
  FiChevronRight,
  FiUser,
  FiEye,
  FiCheck,
  FiRotateCcw,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import fallbackImage from "../../../assets/images/UdbFallbackImage.avif";
import { formatReturnDate } from "./returnHelpers";

function ReturnCard({
  item,
  onViewClaim,
  onViewDetails,
  onContactClaimant,
  onMarkDone,
}) {
  const { title, status, claimedBy, claimedOn, image } = item;

  // Render status badge matching the sketch
  const renderBadge = () => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#6938ef] text-white shadow-xs">
            <FiCheck className="w-3.5 h-3.5 stroke-[2.5]" />
            Approved
          </span>
        );
      case "Return In Progress":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#2f68ee] text-white shadow-xs">
            <FiRotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
            Return in Progress
          </span>
        );
      case "Pending Claim":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#ff7a1a] text-white shadow-xs">
            <FiClock className="w-3.5 h-3.5 stroke-[2.5]" />
            Pending Claim
          </span>
        );
      case "Returned":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#12b76a] text-white shadow-xs">
            <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
            Returned
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-rose-600 text-white shadow-xs">
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

  // Render action buttons matching user request & UI images
  const renderActions = () => {
    if (status === "Pending Claim") {
      return (
        <div className="flex flex-col gap-2 w-full sm:w-[170px]">
          <button
            type="button"
            onClick={() => onViewClaim(item)}
            className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-4 rounded-xl bg-[#38bdf8] hover:bg-[#0ea5e9] text-white shadow-xs transition-colors cursor-pointer"
          >
            <FiEye className="w-4 h-4" />
            View Claim
          </button>
        </div>
      );
    }

    if (status === "Approved") {
      return (
        <div className="flex flex-col gap-2 w-full sm:w-[170px]">
          <button
            type="button"
            onClick={() => onViewDetails(item)}
            className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-xs transition-colors cursor-pointer"
          >
            <FiEye className="w-4 h-4" />
            View Details
          </button>
          <button
            type="button"
            onClick={() => onContactClaimant(item)}
            className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-xs transition-colors cursor-pointer"
          >
            Contact Claimant
          </button>
        </div>
      );
    }

    if (status === "Return In Progress") {
      return (
        <div className="flex flex-col gap-2 w-full sm:w-[170px]">
          <button
            type="button"
            onClick={() => onViewDetails(item)}
            className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-xs transition-colors cursor-pointer"
          >
            <FiEye className="w-4 h-4" />
            View Details
          </button>
          <button
            type="button"
            onClick={() => onMarkDone(item)}
            className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-xs transition-colors cursor-pointer"
          >
            <FiCheckCircle className="w-4 h-4" />
            Mark as Done
          </button>
        </div>
      );
    }

    // Default / "Returned"
    return (
      <div className="flex flex-col gap-2 w-full sm:w-[170px]">
        <button
          type="button"
          onClick={() => onViewDetails(item)}
          className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-xs transition-colors cursor-pointer"
        >
          <FiEye className="w-4 h-4" />
          View Details
        </button>
      </div>
    );
  };

  return (
    <div className="group bg-white rounded-2xl border border-sky-100/90 shadow-xs hover:shadow-md transition-all duration-200 p-4 sm:p-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Column 1: Image + Title + Status Badge */}
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

        {/* Column 2: Claimant Details & Date */}
        <div className="flex-1 min-w-0 lg:border-l lg:border-slate-200/80 lg:pl-8 space-y-2.5">
          <div className="flex items-center gap-2.5 text-sm text-slate-700">
            <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <FiUser className="w-3.5 h-3.5" />
            </div>
            <p className="truncate">
              <span className="text-slate-500 font-medium">Claimed by : </span>
              <span className="font-bold text-slate-800">{claimedBy}</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5 text-sm text-slate-700">
            <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <FiCalendar className="w-3.5 h-3.5" />
            </div>
            <p className="truncate">
              <span className="text-slate-500 font-medium">Claimed Date : </span>
              <span className="font-semibold text-slate-800">
                {formatReturnDate(claimedOn)}
              </span>
            </p>
          </div>
        </div>

        {/* Column 3: Action Buttons & Chevron Arrow */}
        <div className="flex items-center gap-3 lg:border-l lg:border-slate-200/80 lg:pl-8 shrink-0">
          {renderActions()}

          <button
            type="button"
            onClick={() => (status === "Pending Claim" ? onViewClaim(item) : onViewDetails(item))}
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

export default ReturnCard;
