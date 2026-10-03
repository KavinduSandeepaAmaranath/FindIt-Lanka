import {
  FiX,
  FiThumbsUp,
  FiClock,
  FiCheck,
  FiAlertCircle,
  FiEdit3,
} from "react-icons/fi";
import fallbackImage from "../../../assets/images/UdbFallbackImage.avif";
import { normalizeStatus, formatLongReportDate } from "./reportHelpers";

function ReportDetailsModal({ report, onClose, onEdit, onEditAndResubmit }) {
  if (!report) return null;

  const norm = normalizeStatus(report.status);
  const isApprovedActive = norm === "approved-active";
  const isPending = norm === "pending";
  const isRejected = norm === "rejected";
  const isResolved = norm === "resolved";
  const isUnderReview = norm === "under-review";

  const isFound =
    report.reportType?.toLowerCase().includes("found") ?? true;

  // Render status badge matching the 5 mockups
  const renderStatusBadge = () => {
    if (isApprovedActive) {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#1e90ff] text-white shadow-xs">
          <FiThumbsUp className="w-3.5 h-3.5" />
          Approved/Active
        </span>
      );
    }

    if (isPending) {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1 rounded-full bg-[#f97316] text-white shadow-xs">
          Pending
        </span>
      );
    }

    if (isRejected) {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1 rounded-full bg-[#b91c1c] text-white shadow-xs">
          <FiX className="w-3.5 h-3.5 stroke-[3]" />
          Rejected
        </span>
      );
    }

    if (isResolved) {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1 rounded-full bg-[#059669] text-white shadow-xs">
          <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
          Resolved
        </span>
      );
    }

    // Default / Under Review
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1 rounded-full bg-[#2563eb] text-white shadow-xs">
        <FiClock className="w-3.5 h-3.5" />
        Under Review
      </span>
    );
  };

  // Render bottom notification box matching the 5 mockups
  const renderNotificationBox = () => {
    if (isApprovedActive) {
      return (
        <div className="rounded-xl border border-sky-300 bg-[#f0f9ff]/70 p-3 sm:p-3.5 flex items-start gap-3">
          <FiAlertCircle className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <p className="font-bold text-sky-600 uppercase tracking-wide">
              ACTIVE
            </p>
            <p className="text-sky-600 leading-snug">
              Report is Active Waiting for the item to be matched/claimed.
            </p>
          </div>
        </div>
      );
    }

    if (isPending) {
      return (
        <div className="rounded-xl border border-sky-300 bg-[#f0f9ff]/70 p-3 sm:p-3.5 flex items-start gap-3">
          <FiAlertCircle className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <p className="font-bold text-[#0c4a9e]">Pending</p>
            <p className="text-[#ea580c] leading-snug">
              Your report is waiting for admin review.
            </p>
          </div>
        </div>
      );
    }

    if (isRejected) {
      return (
        <div className="rounded-xl border border-sky-300 bg-[#f0f9ff]/70 p-3 sm:p-3.5 flex items-start gap-3">
          <FiAlertCircle className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <p className="font-bold text-red-600">Rejected</p>
            <p className="text-red-600 leading-snug">
              Reason{" "}
              {report.rejectReason ||
                "Duplicate report / Insufficient information"}
            </p>
          </div>
        </div>
      );
    }

    if (isResolved) {
      return (
        <div className="rounded-xl border border-sky-300 bg-[#f0f9ff]/70 p-3 sm:p-3.5 flex items-start gap-3">
          <FiAlertCircle className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <p className="font-bold text-emerald-600">Resolved</p>
            <p className="text-emerald-600 leading-snug">
              The item was successfully returned to its rightful owner.
            </p>
          </div>
        </div>
      );
    }

    // Under Review
    return (
      <div className="rounded-xl border border-sky-300 bg-[#f0f9ff]/70 p-3 sm:p-3.5 flex items-start gap-3">
        <FiAlertCircle className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
        <div className="text-xs space-y-0.5">
          <p className="font-bold text-[#0c4a9e]">Under Review</p>
          <p className="text-[#0c4a9e] leading-snug">
            Admin is currently verifying this report.
          </p>
        </div>
      </div>
    );
  };

  // Render status specific date/time row in Card 2
  const renderDateOrTimeRow = () => {
    if (isApprovedActive) {
      return (
        <p>
          <span className="font-normal text-[#1e3a8a]">Approved on : </span>
          <span className="font-normal text-[#1e3a8a]">
            {formatLongReportDate(report.approvedOn || report.reportedOn)}
          </span>
        </p>
      );
    }

    if (isPending) {
      return (
        <p>
          <span className="font-normal text-[#1e3a8a]">
            {isFound ? "Found Time" : "Lost  Time"} :{" "}
          </span>
          <span className="font-normal text-[#1e3a8a]">
            {report.foundTime || report.lostTime || "12.00 p.m"}
          </span>
        </p>
      );
    }

    if (isRejected) {
      return (
        <p>
          <span className="font-normal text-[#1e3a8a]">Reject On : </span>
          <span className="font-normal text-[#1e3a8a]">
            {formatLongReportDate(
              report.rejectOn || report.rejectedOn || report.reportedOn
            )}
          </span>
        </p>
      );
    }

    if (isResolved) {
      return (
        <p>
          <span className="font-normal text-[#1e3a8a]">Date Resolved : </span>
          <span className="font-normal text-[#1e3a8a]">
            {formatLongReportDate(
              report.resolvedDate || report.dateResolved || report.reportedOn
            )}
          </span>
        </p>
      );
    }

    // Under Review
    return (
      <p>
        <span className="font-normal text-[#1e3a8a]">
          {isFound ? "Found Time" : "Lost  Time"} :{" "}
        </span>
        <span className="font-normal text-[#1e3a8a]">
          {report.foundTime || report.lostTime || "12.00 p.m"}
        </span>
      </p>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[460px] rounded-[22px] bg-white border-[3.5px] border-[#0c4a9e] shadow-2xl p-6 sm:p-7 space-y-4 my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Title */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Report Details
          </h2>
        </div>

        {/* Card 1: Item Thumbnail + Title + Status Pill */}
        <div className="rounded-xl border border-slate-200 p-3 bg-white flex items-center gap-4">
          <img
            src={report.image}
            alt={report.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImage;
            }}
            className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-100 shadow-2xs"
          />

          <div className="min-w-0 space-y-1.5 flex-1">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
              {report.title}
            </h3>
            <div>{renderStatusBadge()}</div>
          </div>
        </div>

        {/* Card 2: Report Information */}
        <div className="rounded-xl border border-slate-200 p-4 bg-white space-y-2">
          <h4 className="text-xs sm:text-sm font-semibold text-slate-900 border-b border-slate-200 pb-1.5">
            Report Information
          </h4>

          <div className="space-y-1 text-xs sm:text-[13px] text-[#1e3a8a]">
            {/* Type with Green / Red Pill */}
            <div className="flex items-center gap-1.5 py-0.5">
              <span className="font-normal text-[#1e3a8a]">Type :</span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white ${
                  isFound ? "bg-[#16a34a]" : "bg-[#ef4444]"
                }`}
              >
                {isFound ? "Found" : "Lost"}
              </span>
            </div>

            <p>
              <span className="font-normal text-[#1e3a8a]">Category : </span>
              <span className="font-normal text-[#1e3a8a]">
                {report.category || "Electronic"}
              </span>
            </p>

            <p>
              <span className="font-normal text-[#1e3a8a]">
                {isFound ? "Found Location" : "Lost Location"} :{" "}
              </span>
              <span className="font-normal text-[#1e3a8a]">
                {report.foundLocation || report.lostLocation || report.location || "Badulla Campus"}
              </span>
            </p>

            <p>
              <span className="font-normal text-[#1e3a8a]">District : </span>
              <span className="font-normal text-[#1e3a8a]">
                {report.district || "Badulla"}
              </span>
            </p>

            <p>
              <span className="font-normal text-[#1e3a8a]">
                Date Reported :{" "}
              </span>
              <span className="font-normal text-[#1e3a8a]">
                {formatLongReportDate(report.reportedOn)}
              </span>
            </p>

            {/* Status-specific row */}
            {renderDateOrTimeRow()}

            <p className="pt-0.5 leading-relaxed">
              <span className="font-normal text-[#1e3a8a]">Description: </span>
              <span className="font-normal text-[#1e3a8a]">
                {report.description || "Black iPhone 14 with blue case."}
              </span>
            </p>
          </div>
        </div>

        {/* Card 3: Status Notification Box */}
        {renderNotificationBox()}

        {/* Card 4: Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-1">
          {/* Close Button present on all modals */}
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-[#b0bec5] hover:bg-[#9ca3af] text-slate-800 text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer border border-slate-300"
          >
            <FiX className="w-4 h-4 stroke-[2.5]" />
            Close
          </button>

          {/* Edit Report Button for Pending modal */}
          {isPending && (
            <button
              type="button"
              onClick={() => onEdit?.(report)}
              className="px-5 py-2 rounded-lg bg-[#eab308] hover:bg-[#ca8a04] text-slate-900 text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <FiEdit3 className="w-4 h-4" />
              Edit Report
            </button>
          )}

          {/* Edit & Resubmit Button for Rejected modal */}
          {isRejected && (
            <button
              type="button"
              onClick={() => onEditAndResubmit?.(report)}
              className="px-5 py-2 rounded-lg bg-[#eab308] hover:bg-[#ca8a04] text-slate-900 text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <FiEdit3 className="w-4 h-4" />
              Edit & Resubmit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportDetailsModal;
