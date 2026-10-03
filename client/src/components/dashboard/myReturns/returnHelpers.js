import { FiCheckCircle, FiClock, FiRotateCcw, FiCheck } from "react-icons/fi";

export const returnStatusConfig = {
  Approved: {
    label: "Approved",
    pill: "bg-[#6938ef] text-white",
    soft: "bg-purple-50 text-[#6938ef]",
    icon: FiCheck,
    message: "Claim has been approved. Coordinate handover with the claimant.",
  },
  "Return In Progress": {
    label: "Return in Progress",
    pill: "bg-[#2f68ee] text-white",
    soft: "bg-blue-50 text-[#2f68ee]",
    icon: FiRotateCcw,
    message: "Handover is currently in progress. Please confirm once item is returned.",
  },
  "Pending Claim": {
    label: "Pending Claim",
    pill: "bg-[#ff7a1a] text-white",
    soft: "bg-orange-50 text-[#ff7a1a]",
    icon: FiClock,
    message: "Claim is awaiting your review. Inspect details and verify claimant proof.",
  },
  Returned: {
    label: "Returned",
    pill: "bg-[#12b76a] text-white",
    soft: "bg-emerald-50 text-[#12b76a]",
    icon: FiCheck,
    message: "Item was successfully handed over and returned to the verified owner.",
  },
};

export const getReturnStatusConfig = (status) =>
  returnStatusConfig[status] || {
    label: status,
    pill: "bg-slate-600 text-white",
    soft: "bg-slate-100 text-slate-700",
    icon: FiCheckCircle,
    message: "Return status recorded.",
  };

export const formatReturnDate = (isoString) => {
  if (!isoString) return "N/A";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;

  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
