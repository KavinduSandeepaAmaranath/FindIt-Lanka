import {
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiThumbsUp,
  FiCheck,
  FiX,
} from "react-icons/fi";

/*normalize status strings for consistent comparisons*/
export const normalizeStatus = (status = "") => {
  const s = String(status).trim().toLowerCase().replace(/[\s\-_/]+/g, "");
  if (s.includes("approved") || s.includes("active")) return "approved-active";
  if (s.includes("pending")) return "pending";
  if (s.includes("reject")) return "rejected";
  if (s.includes("resolve")) return "resolved";
  if (s.includes("underreview") || s.includes("review")) return "under-review";
  return s;
};

/*report status pill colours and icons */
export const statusConfig = {
  "Approved-Active": {
    pill: "bg-[#1e90ff] text-white",
    soft: "bg-sky-50 text-sky-700",
    icon: FiThumbsUp,
    displayName: "Approved/Active",
  },
  "Approved/Active": {
    pill: "bg-[#1e90ff] text-white",
    soft: "bg-sky-50 text-sky-700",
    icon: FiThumbsUp,
    displayName: "Approved/Active",
  },
  Active: {
    pill: "bg-[#1e90ff] text-white",
    soft: "bg-sky-50 text-sky-700",
    icon: FiThumbsUp,
    displayName: "Approved/Active",
  },
  Pending: {
    pill: "bg-orange-500 text-white",
    soft: "bg-orange-50 text-orange-600",
    icon: FiClock,
    displayName: "Pending",
  },
  Resolved: {
    pill: "bg-emerald-600 text-white",
    soft: "bg-emerald-50 text-emerald-600",
    icon: FiCheck,
    displayName: "Resolved",
  },
  Rejected: {
    pill: "bg-rose-600 text-white",
    soft: "bg-rose-50 text-rose-600",
    icon: FiX,
    displayName: "Rejected",
  },
  "Under Review": {
    pill: "bg-blue-600 text-white",
    soft: "bg-blue-50 text-blue-700",
    icon: FiClock,
    displayName: "Under Review",
  },
};

export const getStatusConfig = (status = "") => {
  const norm = normalizeStatus(status);
  if (norm === "approved-active") return statusConfig["Approved-Active"];
  if (norm === "pending") return statusConfig["Pending"];
  if (norm === "rejected") return statusConfig["Rejected"];
  if (norm === "resolved") return statusConfig["Resolved"];
  if (norm === "under-review") return statusConfig["Under Review"];

  return (
    statusConfig[status] || {
      pill: "bg-slate-500 text-white",
      soft: "bg-slate-100 text-slate-600",
      icon: FiClock,
      displayName: status || "Unknown",
    }
  );
};

/*report type color -> lost = red, found = green */
export const getTypeStyles = (reportType = "") =>
  reportType.toLowerCase().includes("lost")
    ? { text: "text-rose-600", badge: "bg-rose-500 text-white" }
    : { text: "text-emerald-600", badge: "bg-emerald-600 text-white" };

/*date time format (short)*/
export const formatReportDate = (isoString) => {
  if (!isoString) return "";
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

/*long date format e.g. "20 September 2026"*/
export const formatLongReportDate = (dateInput) => {
  if (!dateInput) return "20 September 2026";
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) {
    return String(dateInput);
  }

  const day = date.getDate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};