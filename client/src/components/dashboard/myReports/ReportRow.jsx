import { FiMapPin, FiEye, FiChevronRight } from "react-icons/fi";
import {
  getStatusConfig,
  getTypeStyles,
  formatReportDate,
} from "./reportHelpers";
import fallbackImage from "../../../assets/images/UdbFallbackImage.avif";

function ReportRow({ report, onViewDetails }) {
  const {
    title,
    location,
    reportType,
    reportedOn,
    description,
    status,
    image,
  } = report;

  const statusStyle = getStatusConfig(status);
  const StatusIcon = statusStyle.icon;
  const typeStyle = getTypeStyles(reportType);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-lg transition-shadow p-4 sm:p-5">
      <div className="flex flex-col lg:flex-row lg:items-center gap-5">
        {/*thumbnail + title*/}
        <div className="flex items-center gap-4 lg:w-[260px] lg:shrink-0">
          <img
            src={image}
            alt={title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImage;
            }}
            className="w-20 h-16 rounded-xl object-cover bg-slate-100 shrink-0"
          />

          <div className="min-w-0">
            <h3 className="font-bold text-slate-900 truncate">{title}</h3>
            <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <FiMapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              {location}
            </p>
            <span
              className={`inline-block mt-2 text-[11px] font-semibold px-2.5 py-1 rounded-md ${typeStyle.badge}`}
            >
              {reportType}
            </span>
          </div>
        </div>

        {/*details*/}
        <div className="flex-1 min-w-0 lg:border-l-2 lg:border-slate-100 lg:pl-6 space-y-2">
          <div className="flex gap-2 text-sm">
            <span className="text-slate-500 w-28 shrink-0">Report Type:</span>
            <span className={`font-semibold ${typeStyle.text}`}>
              {reportType}
            </span>
          </div>

          <div className="flex gap-2 text-sm">
            <span className="text-slate-500 w-28 shrink-0">Reported On:</span>
            <span className="font-medium text-slate-700">
              {formatReportDate(reportedOn)}
            </span>
          </div>

          <div className="flex gap-2 text-sm">
            <span className="text-slate-500 w-28 shrink-0">Description:</span>
            <span className="font-medium text-slate-700 line-clamp-2">
              {description}
            </span>
          </div>
        </div>

        {/*status + actions*/}
        <div className="flex items-center gap-3 lg:border-l-2 lg:border-slate-100 lg:pl-6 lg:w-[230px] lg:shrink-0">
          <div className="flex flex-col items-start gap-3 flex-1">
            <span
              className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg ${statusStyle.pill}`}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              {status}
            </span>

            <button
              type="button"
              onClick={() => onViewDetails(report)}
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors"
            >
              <FiEye className="w-3.5 h-3.5" />
              View Details
            </button>
          </div>

          <button
            type="button"
            onClick={() => onViewDetails(report)}
            aria-label={`Open ${title}`}
            className="hidden lg:flex w-8 h-8 rounded-full items-center justify-center text-slate-400 hover:text-blue-700 hover:bg-blue-50 transition-colors shrink-0"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportRow;
