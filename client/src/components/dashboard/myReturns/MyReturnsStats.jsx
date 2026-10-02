import {
  FiCheckCircle,
  FiRotateCcw,
  FiTrendingUp,
  FiClock,
  FiCheck,
  FiPackage,
} from "react-icons/fi";

function MyReturnsStats({ stats, activeStat, onSelectStat }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map(({ id, label, value, note, icon, accent, trend }) => {
        const isActive = activeStat === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelectStat?.(id)}
            className={`text-left bg-white rounded-2xl p-5 border transition-all duration-200 cursor-pointer relative group ${
              isActive
                ? "border-blue-500 shadow-md ring-2 ring-blue-100"
                : "border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200"
            }`}
          >
            {/* Top row: Main icon + Title */}
            <div className="flex items-center gap-3">
              {/* Card Main Icon */}
              {icon === "checkCircle" && (
                <div className="w-9 h-9 rounded-full bg-blue-100/80 flex items-center justify-center text-blue-600 shrink-0">
                  <FiCheck className="w-5 h-5 stroke-[2.5]" />
                </div>
              )}
              {icon === "returnCycle" && (
                <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                  <FiRotateCcw className="w-5 h-5 stroke-[2.2]" />
                </div>
              )}
              {icon === "hourglass" && (
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  {/* Hourglass SVG */}
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 22h14" />
                    <path d="M5 2h14" />
                    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
                    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
                  </svg>
                </div>
              )}
              {icon === "completed" && (
                <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-xs">
                  <FiCheck className="w-5 h-5 stroke-[3]" />
                </div>
              )}

              <div>
                <p className="text-sm font-bold text-slate-800 underline decoration-slate-300 underline-offset-4 group-hover:text-blue-700 transition-colors">
                  {label}
                </p>
              </div>
            </div>

            {/* Middle row: Big number & Trend/Badge Icon */}
            <div className="flex items-end justify-between mt-3.5">
              <p className="text-3xl font-extrabold text-[#0f172a] tracking-tight leading-none">
                {value}
              </p>

              {/* Trend/Right icon */}
              {trend === "up" && (
                <div className="flex items-center text-cyan-500 mb-0.5">
                  <FiTrendingUp className="w-6 h-6 stroke-[2.5]" />
                </div>
              )}
              {icon === "returnCycle" && (
                <div className="text-cyan-600/80 mb-0.5">
                  <FiPackage className="w-5 h-5" />
                </div>
              )}
              {icon === "hourglass" && (
                <div className="text-blue-500/80 mb-0.5">
                  <FiClock className="w-5 h-5" />
                </div>
              )}
              {icon === "completed" && (
                <div className="text-emerald-500 mb-0.5">
                  <FiCheckCircle className="w-5 h-5 stroke-[2.5]" />
                </div>
              )}
            </div>

            {/* Bottom row: Subtitle */}
            <p className="text-xs text-slate-400 mt-2 font-medium">
              {note}
            </p>
          </button>
        );
      })}
    </div>
  );
}

export default MyReturnsStats;
