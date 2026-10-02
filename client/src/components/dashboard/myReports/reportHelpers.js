import { FiClock, FiCheckCircle, FiXCircle, FiEye } from "react-icons/fi";

/*report status pill colours and icons */

export const statusConfig = {
  Pending: {
    pill: "bg-orange-500 text-white",
    soft: "bg-orange-50 text-orange-600",
    icon: FiClock,
  },
  Resolved: {
    pill: "bg-emerald-500 text-white",
    soft: "bg-emerald-50 text-emerald-600",
    icon: FiCheckCircle,
  },
  Rejected: {
    pill: "bg-rose-600 text-white",
    soft: "bg-rose-50 text-rose-600",
    icon: FiXCircle,
  },
  "Under Review": {
    pill: "bg-blue-700 text-white",
    soft: "bg-blue-50 text-blue-700",
    icon: FiEye,
  },
};

export const getStatusConfig = (status) =>
  statusConfig[status] || {
    pill: "bg-slate-500 text-white",
    soft: "bg-slate-100 text-slate-600",
    icon: FiClock,
  };

/*report type color -> lost = red, found = green */
export const getTypeStyles = (reportType) =>
  reportType === "Lost Item"
    ? { text: "text-rose-600", badge: "bg-rose-500 text-white" }
    : { text: "text-emerald-600", badge: "bg-emerald-500 text-white" };

/*date time format*/
export const formatReportDate = (isoString) => {
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