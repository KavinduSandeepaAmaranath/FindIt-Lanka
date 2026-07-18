import { FiMapPin, FiCalendar } from "react-icons/fi";

const statusStyles = {
  Active: "bg-blue-50 text-blue-700",
  Matched: "bg-emerald-50 text-emerald-700",
  Returned: "bg-emerald-50 text-emerald-700",
  "Pending Claim": "bg-orange-50 text-orange-700",
};

const FALLBACK_IMAGE = "../../assets/images/UdbFallbackImage.avif"

function DashboardItemCard({ title, location, date, reportedAgo, status, image }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-36 object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
        {status && (
          <span
            className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
              statusStyles[status] || "bg-slate-100 text-slate-600"
            }`}
          >
            {status}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
        <p className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
          <FiMapPin className="w-3.5 h-3.5 text-blue-600" />
          {location}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-slate-500">
          <FiCalendar className="w-3.5 h-3.5 text-blue-600" />
          {date}
        </p>
        <p className="text-xs font-semibold text-blue-700 mt-2.5">
          {reportedAgo}
        </p>
      </div>
    </div>
  );
}

export default DashboardItemCard;
