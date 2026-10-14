import { useNavigate } from "react-router-dom";
import {
  FiX,
  FiCheck,
  FiClock,
  FiThumbsUp,
  FiAlertCircle,
  FiEdit3,
} from "react-icons/fi";
import fallbackImage from "../../../assets/images/UdbFallbackImage.avif";

function ReportDetailsModal({ report, onClose, onEdit }) {
  const navigate = useNavigate();

  if (!report) return null;

  // Determine normalized status
  const rawStatus = (report.status || "Pending").toLowerCase().trim();
  let statusKey = "pending";
  if (rawStatus.includes("active") || rawStatus.includes("approved")) {
    statusKey = "active";
  } else if (rawStatus.includes("resolve") || rawStatus.includes("recover")) {
    statusKey = "resolved";
  } else if (rawStatus.includes("reject")) {
    statusKey = "rejected";
  } else if (rawStatus.includes("review")) {
    statusKey = "under_review";
  } else {
    statusKey = "pending";
  }

  // Type: Lost vs Found
  const isLost =
    (report.reportType || "").toLowerCase().includes("lost") ||
    (report.type || "").toLowerCase().includes("lost");

  // Date formatting (e.g., "20 September 2026")
  const formatDisplayDate = (dateVal) => {
    if (!dateVal) return "20 September 2026";
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return dateVal;
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Time formatting (e.g., "12.00 p.m")
  const formatDisplayTime = (dateVal) => {
    if (report.time) return report.time;
    if (!dateVal) return "12.00 p.m";
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return "12.00 p.m";
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "p.m" : "a.m";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}.${minutes} ${ampm}`;
  };

  // Extract location and district
  const reportedDate = formatDisplayDate(
    report.reportedOn || report.lostDate || report.foundDate || report.createdAt
  );
  const timeText = formatDisplayTime(
    report.reportedOn || report.lostDate || report.foundDate
  );

  let locationText = report.location || "Badulla Campus";
  let districtText = report.district || "Badulla";

  // If location has "location, district" comma format
  if (!report.district && report.location && report.location.includes(",")) {
    const parts = report.location.split(",");
    locationText = parts[0].trim();
    districtText = parts.slice(1).join(",").trim();
  }

  // Handle edit action
  const handleEditClick = () => {
    onClose();
    if (onEdit) {
      onEdit(report);
    } else {
      const targetRoute = isLost ? "/report-lost-item" : "/report-found-item";
      navigate(targetRoute, { state: { editReport: report } });
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200"
    >
      {/* Modal Container with signature blue border */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[430px] sm:max-w-[460px] bg-white rounded-3xl border-[4px] border-[#1e40af] shadow-2xl p-5 sm:p-7 max-h-[95vh] overflow-y-auto animate-in zoom-in-95 duration-200"
      >
        {/* Modal Title */}
        <h2 className="text-2xl sm:text-[26px] font-bold text-[#1e293b] mb-4 tracking-tight">
          Report Details
        </h2>

        {/* 1. Top Card: Thumbnail + Title + Status Pill */}
        <div className="border border-slate-200 rounded-2xl p-3.5 sm:p-4 flex items-center gap-4 bg-white mb-4">
          <img
            src={report.image}
            alt={report.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImage;
            }}
            className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-slate-100 bg-slate-50"
          />

          <div className="min-w-0 flex-1">
            <h3 className="text-sm sm:text-base font-bold text-slate-800 truncate mb-1.5">
              {report.title}
            </h3>

            {/* Dynamic Status Pill Badge */}
            {statusKey === "active" && (
              <span className="bg-[#2563eb] text-white text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-xs">
                <FiThumbsUp className="w-3.5 h-3.5" />
                <span>Approved/Active</span>
              </span>
            )}

            {statusKey === "resolved" && (
              <span className="bg-[#059669] text-white text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-xs">
                <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                <span>Resolved</span>
              </span>
            )}

            {statusKey === "rejected" && (
              <span className="bg-[#b91c1c] text-white text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-xs">
                <FiX className="w-3.5 h-3.5 stroke-[3]" />
                <span>Rejected</span>
              </span>
            )}

            {statusKey === "under_review" && (
              <span className="bg-[#2563eb] text-white text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-xs">
                <FiClock className="w-3.5 h-3.5" />
                <span>Under Review</span>
              </span>
            )}

            {statusKey === "pending" && (
              <span className="bg-[#ea580c] text-white text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-xs">
                <FiClock className="w-3.5 h-3.5" />
                <span>Pending</span>
              </span>
            )}
          </div>
        </div>

        {/* 2. Middle Card: Report Information */}
        <div className="border border-slate-200 rounded-2xl p-4 sm:p-5 bg-white mb-4 space-y-2 text-xs sm:text-[13px] text-[#1e3a8a] font-medium leading-relaxed">
          <h4 className="font-bold text-[#1e3a8a] underline underline-offset-4 text-sm sm:text-[15px] mb-3">
            Report Information
          </h4>

          {/* Type */}
          <div className="flex items-center gap-1.5">
            <span>Type :</span>
            <span
              className={`text-[11px] font-bold px-3 py-0.5 rounded-full text-white ${
                isLost ? "bg-[#ef4444]" : "bg-[#10b981]"
              }`}
            >
              {isLost ? "Lost" : "Found"}
            </span>
          </div>

          {/* Category */}
          <div>
            Category : {report.category || "Electronic"}
          </div>

          {/* Location */}
          <div>
            {isLost ? "Lost Location" : "Found Location"} : {locationText}
          </div>

          {/* District */}
          <div>
            District : {districtText}
          </div>

          {/* Date Reported */}
          <div>
            Date Reported: {reportedDate}
          </div>

          {/* Contextual Date / Time row matching the screenshots */}
          {statusKey === "active" && (
            <div>
              Approved on :{" "}
              {formatDisplayDate(report.approvedOn || report.updatedAt || report.reportedOn)}
            </div>
          )}

          {statusKey === "resolved" && (
            <div>
              Date Resolved :{" "}
              {formatDisplayDate(report.resolvedOn || report.updatedAt || report.reportedOn)}
            </div>
          )}

          {statusKey === "rejected" && (
            <div>
              Reject On :{" "}
              {formatDisplayDate(report.rejectedOn || report.updatedAt || report.reportedOn)}
            </div>
          )}

          {(statusKey === "under_review" || statusKey === "pending") && (
            <div>
              {isLost ? "Lost  Time" : "Found  Time"} : {timeText}
            </div>
          )}

          {/* Description */}
          <div className="pt-0.5">
            Description: {report.description || "Black iPhone 14 with blue case."}
          </div>
        </div>

        {/* 3. Bottom Status Info Banner */}
        <div className="rounded-2xl border border-[#bae6fd] bg-[#f0f9ff] p-3.5 sm:p-4 flex items-start gap-3 mb-6">
          <FiAlertCircle className="text-[#0284c7] text-lg shrink-0 mt-0.5" />

          <div className="min-w-0">
            {statusKey === "active" && (
              <>
                <p className="font-bold text-xs uppercase tracking-wide text-[#0369a1]">
                  ACTIVE
                </p>
                <p className="text-xs text-[#0284c7] mt-0.5 leading-snug">
                  Report is Active Waiting for the item to be matched/claimed.
                </p>
              </>
            )}

            {statusKey === "resolved" && (
              <>
                <p className="font-bold text-xs text-[#0369a1]">
                  Resolved
                </p>
                <p className="text-xs text-[#059669] mt-0.5 leading-snug">
                  The item was successfully returned to its rightful owner.
                </p>
              </>
            )}

            {statusKey === "rejected" && (
              <>
                <p className="font-bold text-xs text-[#b91c1c]">
                  Rejected
                </p>
                <p className="text-xs text-[#dc2626] mt-0.5 leading-snug">
                  Reason: {report.rejectionReason || "Duplicate report / Insufficient information"}
                </p>
              </>
            )}

            {statusKey === "under_review" && (
              <>
                <p className="font-bold text-xs text-[#0369a1]">
                  Under Review
                </p>
                <p className="text-xs text-[#0284c7] mt-0.5 leading-snug">
                  Admin is currently verifying this report.
                </p>
              </>
            )}

            {statusKey === "pending" && (
              <>
                <p className="font-bold text-xs text-[#0369a1]">
                  Pending
                </p>
                <p className="text-xs text-[#d97706] mt-0.5 leading-snug">
                  Your report is waiting for admin review.
                </p>
              </>
            )}
          </div>
        </div>

        {/* 4. Action Buttons Footer */}
        {statusKey === "rejected" && (
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-32 py-2.5 rounded-xl bg-[#94a3b8] hover:bg-[#64748b] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <FiX className="w-4 h-4 stroke-[2.5]" />
              <span>Close</span>
            </button>

            <button
              type="button"
              onClick={handleEditClick}
              className="py-2.5 px-5 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <FiEdit3 className="w-4 h-4" />
              <span>Edit &amp; Resubmit</span>
            </button>
          </div>
        )}

        {statusKey === "pending" && (
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-32 py-2.5 rounded-xl bg-[#94a3b8] hover:bg-[#64748b] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <FiX className="w-4 h-4 stroke-[2.5]" />
              <span>Close</span>
            </button>

            <button
              type="button"
              onClick={handleEditClick}
              className="py-2.5 px-5 rounded-xl bg-[#eab308] hover:bg-[#ca8a04] text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <FiEdit3 className="w-4 h-4" />
              <span>Edit Report</span>
            </button>
          </div>
        )}

        {(statusKey === "active" ||
          statusKey === "resolved" ||
          statusKey === "under_review") && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className="w-32 py-2.5 rounded-xl bg-[#94a3b8] hover:bg-[#64748b] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <FiX className="w-4 h-4 stroke-[2.5]" />
              <span>Close</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportDetailsModal;
