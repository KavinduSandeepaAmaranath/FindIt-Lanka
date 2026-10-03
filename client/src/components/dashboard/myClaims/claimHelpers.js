import { FiCheckCircle, FiClock, FiEye, FiXCircle } from "react-icons/fi";

/*pill colours, icon, status message*/
export const claimStatusConfig = {
  Claimed: {
    pill: "bg-blue-600 text-white",
    soft: "bg-blue-50 text-blue-700",
    icon: FiCheckCircle,
    message:
      "Your item has been successfully claimed. Thank you for using FindIt Lanka!",
  },
  Approved: {
    pill: "bg-emerald-600 text-white",
    soft: "bg-emerald-50 text-emerald-600",
    icon: FiCheckCircle,
    message:
      "Your ownership claim has been approved. You can now contact the finder to arrange the item handover.",
  },
  "Under Review": {
    pill: "bg-blue-800 text-white",
    soft: "bg-blue-50 text-blue-700",
    icon: FiEye,
    message: "Your claim is under Admin verification. We will notify you soon.",
  },
  "Pending Verification": {
    pill: "bg-orange-500 text-white",
    soft: "bg-orange-50 text-orange-600",
    icon: FiClock,
    message: "Your claim has been submitted. Waiting for admin verification.",
  },
  Rejected: {
    pill: "bg-rose-600 text-white",
    soft: "bg-rose-50 text-rose-600",
    icon: FiXCircle,
    message:
      "The provided proof was insufficient. Please contact support for more details.",
  },
};

export const getClaimStatusConfig = (status) =>
  claimStatusConfig[status] || {
    pill: "bg-slate-500 text-white",
    soft: "bg-slate-100 text-slate-600",
    icon: FiClock,
    message: "Your claim has been recorded.",
  };

/*date time format*/
export const formatClaimDate = (isoString) => {
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

/*modal date format: e.g. "21 Sep 2026"*/
export const formatModalDate = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};
