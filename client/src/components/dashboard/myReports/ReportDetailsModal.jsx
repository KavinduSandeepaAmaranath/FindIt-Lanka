import { FiX, FiMapPin, FiCalendar, FiTag, FiHash } from "react-icons/fi";
import {
  getStatusConfig,
  getTypeStyles,
  formatReportDate,
} from "./reportHelpers";
import fallbackImage from "../../../assets/images/UdbFallbackImage.avif";

function ReportDetailsModal({ report, onClose }) {
  if (!report) return null;

  const statusStyle = getStatusConfig(report.status);
  const StatusIcon = statusStyle.icon;
  const typeStyle = getTypeStyles(report.reportType);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-5">
      <div className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-gray-50 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:bg-red-500 hover:text-white hover:scale-110"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="bg-gradient-to-r from-blue-800 to-blue-950 text-white px-6 sm:px-8 py-7 rounded-t-2xl sm:rounded-t-3xl">
          <p className="text-xs uppercase tracking-wide text-blue-200">
            Report Details
          </p>
          <h2 className="text-2xl font-extrabold mt-1">{report.title}</h2>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${typeStyle.badge}`}
            >
              {report.reportType}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-md ${statusStyle.pill}`}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              {report.status}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <img
            src={report.image}
            alt={report.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImage;
            }}
            className="w-full h-56 object-cover rounded-2xl bg-slate-100"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <FiMapPin className="w-4 h-4 text-blue-600" />
                Location
              </p>
              <p className="text-sm font-bold text-slate-900 mt-1.5">
                {report.location}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <FiCalendar className="w-4 h-4 text-blue-600" />
                Reported On
              </p>
              <p className="text-sm font-bold text-slate-900 mt-1.5">
                {formatReportDate(report.reportedOn)}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <FiTag className="w-4 h-4 text-blue-600" />
                Category
              </p>
              <p className="text-sm font-bold text-slate-900 mt-1.5">
                {report.category}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <FiHash className="w-4 h-4 text-blue-600" />
                Reference No
              </p>
              <p className="text-sm font-bold text-slate-900 mt-1.5">
                {report.referenceNo}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5">
            <p className="text-xs font-semibold text-slate-400 mb-2">
              Description
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              {report.description}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportDetailsModal;
