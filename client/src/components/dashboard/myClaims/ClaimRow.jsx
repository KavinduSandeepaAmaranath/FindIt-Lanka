import { FiCheckCircle, FiCalendar, FiEye, FiChevronRight } from "react-icons/fi";
import { getClaimStatusConfig, formatClaimDate } from "./claimHelpers";
import fallbackImage from "../../../assets/images/UdbFallbackImage.avif";

function ClaimRow({ claim, onViewDetails }) {
  const { title, status, claimedOn, image } = claim;

  const statusStyle = getClaimStatusConfig(status);
  const StatusIcon = statusStyle.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-lg transition-shadow p-4 sm:p-5">
      <div className="flex flex-col lg:flex-row lg:items-center gap-5">
        {/*thumbnail + title + status*/}
        <div className="flex items-center gap-4 lg:w-[300px] lg:shrink-0">
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
            <span
              className={`inline-flex items-center gap-1.5 mt-2 text-[11px] font-semibold px-3 py-1.5 rounded-lg ${statusStyle.pill}`}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              {status}
            </span>
          </div>
        </div>

        {/*status message + claimed date*/}
        <div className="flex-1 min-w-0 lg:border-l-2 lg:border-slate-100 lg:pl-6 space-y-3">
          <p className="flex gap-2 text-sm text-slate-600">
            <FiCheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>{statusStyle.message}</span>
          </p>

          <div className="flex gap-2 text-sm">
            <FiCalendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-slate-500">Claimed on :</p>
              <p className="font-semibold text-slate-700">
                {formatClaimDate(claimedOn)}
              </p>
            </div>
          </div>
        </div>

        {/*action*/}
        <div className="flex items-center gap-3 lg:border-l-2 lg:border-slate-100 lg:pl-6 lg:w-[210px] lg:shrink-0">
          <button
            type="button"
            onClick={() => onViewDetails(claim)}
            className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors"
          >
            <FiEye className="w-3.5 h-3.5" />
            View Details
          </button>

          <button
            type="button"
            onClick={() => onViewDetails(claim)}
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

export default ClaimRow;
