import {
  FiFileText,
  FiEye,
  FiRefreshCw,
  FiClock,
  FiXCircle,
} from "react-icons/fi";

const iconMap = {
  total: FiFileText,
  active: FiEye,
  recovered: FiRefreshCw,
  pending: FiClock,
  rejected: FiXCircle,
};

const accentMap = {
  blue: "bg-blue-50 text-blue-600",
  emerald: "bg-emerald-50 text-emerald-600",
  orange: "bg-orange-50 text-orange-500",
  rose: "bg-rose-50 text-rose-500",
};

function MyReportsStats({ stats, activeStat, onSelectStat }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
      {stats.map(({ id, label, value, note, icon, accent }) => {
        const Icon = iconMap[icon] || FiFileText;
        const isActive = activeStat === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelectStat?.(id)}
            className={`text-left bg-white rounded-2xl p-5 border transition-all ${
              isActive
                ? "border-blue-600 shadow-lg ring-1 ring-blue-200"
                : "border-slate-100 shadow-md hover:shadow-lg hover:border-blue-200"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs sm:text-sm font-semibold text-slate-600 underline decoration-slate-200 underline-offset-4">
                {label}
              </p>
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  accentMap[accent] || accentMap.blue
                }`}
              >
                <Icon className="w-4 h-4" />
              </span>
            </div>

            <div className="flex items-baseline gap-1.5 mt-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-none">
                {value}
              </p>
              <p className="text-[11px] text-slate-400 truncate">{note}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default MyReportsStats;
