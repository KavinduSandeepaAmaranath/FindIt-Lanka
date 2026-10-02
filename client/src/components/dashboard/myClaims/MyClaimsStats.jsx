import {
  FiCheckCircle,
  FiRefreshCw,
  FiClock,
  FiFileText,
} from "react-icons/fi";

const iconMap = {
  claimed: FiCheckCircle,
  approved: FiRefreshCw,
  pending: FiClock,
  rejected: FiFileText,
};

const accentMap = {
  blue: "bg-blue-50 text-blue-600",
  emerald: "bg-emerald-50 text-emerald-600",
  orange: "bg-orange-50 text-orange-500",
  rose: "bg-rose-50 text-rose-500",
};

function MyClaimsStats({ stats, activeStat, onSelectStat }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map(({ id, label, value, note, icon, accent }) => {
        const Icon = iconMap[icon] || FiCheckCircle;
        const isActive = activeStat === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelectStat?.(id)}
            className={`text-left bg-white rounded-2xl p-6 border transition-all ${
              isActive
                ? "border-blue-600 shadow-lg ring-1 ring-blue-200"
                : "border-slate-100 shadow-md hover:shadow-lg hover:border-blue-200"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-slate-600 underline decoration-slate-200 underline-offset-4">
                {label}
              </p>
              <span
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  accentMap[accent] || accentMap.blue
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
              </span>
            </div>

            <div className="flex items-end gap-2 mt-4">
              <p className="text-3xl font-extrabold text-slate-900 leading-none">
                {value}
              </p>
              <p className="text-xs text-slate-400 pb-0.5">{note}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default MyClaimsStats;
