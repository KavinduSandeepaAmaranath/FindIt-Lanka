import { useState, useEffect } from "react";
import { formatModalDate } from "./claimHelpers";
import fallbackImage from "../../../assets/images/UdbFallbackImage.avif";
import ContactFinderModal from "./ContactFinderModal";

function ClaimDetailsModal({ claim, onClose, onContactFinder }) {
  const [showContactFinder, setShowContactFinder] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !showContactFinder) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, showContactFinder]);

  if (!claim) return null;

  const {
    title = "iPhone 13",
    status = "Pending Verification",
    category = "Electronics",
    image,
    claimedOn,
    submittedDate,
    approvedDate,
    decisionDate,
    claimedDate,
    location,
    approvedBy,
    reviewStarted,
  } = claim;

  // Normalized status matching
  const normalizedStatus = status?.trim() || "";

  // Helper config based on status
  const getModalConfig = () => {
    switch (normalizedStatus) {
      case "Claimed":
        return {
          iconType: "check",
          iconBg: "bg-[#4382e0]",
          subtitle: "Your item has been successfully claimed.",
          cardStatus: "Successfully Claimed",
          cardStatusColor: "text-emerald-600",
          infoRows: [
            {
              label: "Claimed Date",
              value: formatModalDate(claimedDate || claimedOn || "2026-09-21T10:00:00"),
              valueColor: "text-[#0f2d6b]",
            },
            {
              label: "Final Status",
              value: "Claimed",
              valueColor: "text-emerald-600 font-semibold",
            },
            {
              label: "Approved By",
              value: approvedBy || "Admin",
              valueColor: "text-[#0f2d6b]",
            },
          ],
          hasRecoverySummary: true,
          alert: {
            title: "Recovery Completed",
            titleColor: "text-sky-700",
            message:
              "Your ownership claim was verified and the item was successfully returned to you.",
            messageColor: "text-emerald-600",
          },
          hasContactFinder: false,
        };

      case "Approved":
        return {
          iconType: "check",
          iconBg: "bg-[#10b981]",
          subtitle: "Your ownership claim has been approved.",
          cardStatus: "Approved",
          cardStatusColor: "text-emerald-600",
          infoRows: [
            {
              label: "Submitted Date",
              value: formatModalDate(submittedDate || claimedOn || "2026-09-02T10:00:00"),
              valueColor: "text-[#0f2d6b]",
            },
            {
              label: "Approved Date",
              value: formatModalDate(approvedDate || "2026-09-05T10:00:00"),
              valueColor: "text-[#0f2d6b]",
            },
            {
              label: "Status",
              value: "Approved",
              valueColor: "text-emerald-600 font-semibold",
            },
          ],
          hasRecoverySummary: false,
          alert: {
            title: "Claim Approved!",
            titleColor: "text-sky-700",
            message:
              "Your ownership has been verified. You can now contact the finder to arrange the item handover.",
            messageColor: "text-sky-800",
          },
          hasContactFinder: true,
        };

      case "Rejected":
        return {
          iconType: "cross",
          iconBg: "bg-[#e11d48]",
          subtitle: "Your ownership claim was rejected",
          cardStatus: "Rejected",
          cardStatusColor: "text-rose-600",
          infoRows: [
            {
              label: "Submitted Date",
              value: formatModalDate(submittedDate || claimedOn || "2026-09-21T10:00:00"),
              valueColor: "text-[#0f2d6b]",
            },
            {
              label: "Decision Date",
              value: formatModalDate(decisionDate || "2026-09-13T10:00:00"),
              valueColor: "text-[#0f2d6b]",
            },
            {
              label: "Status",
              value: "Rejected",
              valueColor: "text-rose-600 font-semibold",
            },
          ],
          hasRecoverySummary: false,
          alert: {
            title: "Reason for Rejection",
            titleColor: "text-sky-700",
            message:
              "The provided proof was insufficient to verify your ownership of the item.",
            messageColor: "text-rose-600",
          },
          hasContactFinder: false,
        };

      case "Under Review":
        return {
          iconType: "clock",
          iconBg: "bg-[#1d4ed8]",
          subtitle: "Your claim is currently under review",
          cardStatus: "Under Review",
          cardStatusColor: "text-blue-600",
          infoRows: [
            {
              label: "Submitted Date",
              value: formatModalDate(submittedDate || claimedOn || "2026-09-21T10:00:00"),
              valueColor: "text-[#0f2d6b]",
            },
            {
              label: "Review Started",
              value: reviewStarted || location || "University Library",
              valueColor: "text-[#0f2d6b]",
            },
            {
              label: "Status",
              value: "Under Review",
              valueColor: "text-blue-600 font-semibold",
            },
          ],
          hasRecoverySummary: false,
          alert: {
            title: "Admin Review in Progress",
            titleColor: "text-sky-700",
            message:
              "Your ownership details are currently being checked. You will receive a notification when a decision is made.",
            messageColor: "text-sky-800",
          },
          hasContactFinder: false,
        };

      case "Pending Verification":
      default:
        return {
          iconType: "clock",
          iconBg: "bg-[#ff7a00]",
          subtitle: "Your claim is waiting for verification.",
          cardStatus: "Pending Verification",
          cardStatusColor: "text-orange-500",
          infoRows: [
            {
              label: "Submitted Date",
              value: formatModalDate(submittedDate || claimedOn || "2026-09-21T10:00:00"),
              valueColor: "text-[#0f2d6b]",
            },
            {
              label: "Item Location",
              value: location || "University Library",
              valueColor: "text-[#0f2d6b]",
            },
            {
              label: "Status",
              value: "pending",
              valueColor: "text-orange-500 font-semibold",
            },
          ],
          hasRecoverySummary: false,
          alert: {
            title: "Waiting for Verification",
            titleColor: "text-sky-700",
            message:
              "Your claim has been submitted successfully. The administrator is reviewing your ownership information.",
            messageColor: "text-orange-500",
          },
          hasContactFinder: false,
        };
    }
  };

  const config = getModalConfig();

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[580px] sm:max-w-[620px] max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white border-[3px] sm:border-[4px] border-[#1d4ed8] shadow-2xl p-6 sm:p-8"
      >
        {/* Header with Circle Icon, Title, and Subtitle */}
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 ${config.iconBg}`}
          >
            {config.iconType === "check" && (
              <svg
                className="w-6 h-6 stroke-[3]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}

            {config.iconType === "clock" && (
              <svg
                className="w-6 h-6 stroke-[2.2]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            )}

            {config.iconType === "cross" && (
              <svg
                className="w-6 h-6 stroke-[3]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f2d6b] tracking-tight">
              Claim Details
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {config.subtitle}
            </p>
          </div>
        </div>

        {/* Inner Item Card */}
        <div className="mt-5 border border-slate-200 rounded-2xl p-3.5 sm:p-4 flex items-center gap-4 bg-white shadow-sm">
          <img
            src={image}
            alt={title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImage;
            }}
            className="w-20 h-20 sm:w-22 sm:h-22 rounded-xl object-cover shrink-0 bg-slate-100"
          />

          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 truncate">
              {title}
            </h3>
            <p className="text-xs font-medium text-blue-600 mt-1">
              {category}
            </p>
            <p
              className={`text-xs font-semibold mt-1.5 ${config.cardStatusColor}`}
            >
              {config.cardStatus}
            </p>
          </div>
        </div>

        {/* Claim Information */}
        <div className="mt-5">
          <h4 className="text-xs sm:text-sm font-bold text-[#0f2d6b] underline underline-offset-4 decoration-[#0f2d6b] mb-3">
            Claim Information
          </h4>

          <div className="space-y-2">
            {config.infoRows.map((row, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs sm:text-sm"
              >
                <span className="text-[#0f2d6b] font-normal">{row.label}</span>
                <span className={`font-normal ${row.valueColor}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recovery Summary (Only for Claimed) */}
        {config.hasRecoverySummary && (
          <div className="mt-5">
            <h4 className="text-xs sm:text-sm font-bold text-[#0f2d6b] underline underline-offset-4 decoration-[#0f2d6b] mb-3">
              Recovery Summary
            </h4>

            <div className="space-y-2">
              {["Ownership verified", "Claim approved", "Item handover completed"].map(
                (item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs sm:text-sm text-[#0f2d6b]"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 inline-block" />
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Status Alert Box */}
        <div className="mt-5 rounded-xl border border-sky-200 bg-sky-50/40 p-3.5 sm:p-4 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-sky-500 shrink-0 mt-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>

          <div>
            <h5 className={`text-xs sm:text-sm font-bold ${config.alert.titleColor}`}>
              {config.alert.title}
            </h5>
            <p
              className={`text-xs sm:text-sm mt-0.5 leading-relaxed ${config.alert.messageColor}`}
            >
              {config.alert.message}
            </p>
          </div>
        </div>

        {/* Action Button(s) */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-[#b8c4d2] hover:bg-[#a6b4c4] text-slate-800 font-medium text-xs sm:text-sm transition-colors border border-slate-300 shadow-sm"
          >
            <svg
              className="w-3.5 h-3.5 text-slate-700 stroke-[2.5]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span>Close</span>
          </button>

          {config.hasContactFinder && (
            <button
              type="button"
              onClick={() => {
                setShowContactFinder(true);
                if (onContactFinder) {
                  onContactFinder(claim);
                }
              }}
              className="inline-flex items-center justify-center px-7 py-2 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium text-xs sm:text-sm transition-colors shadow-sm"
            >
              Contact Finder
            </button>
          )}
        </div>
      </div>

      {/* Contact Finder Modal */}
      {showContactFinder && (
        <ContactFinderModal
          claim={claim}
          isOpen={showContactFinder}
          onClose={() => setShowContactFinder(false)}
        />
      )}
    </div>
  );
}

export default ClaimDetailsModal;
