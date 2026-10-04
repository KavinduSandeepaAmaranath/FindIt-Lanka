import { FiCalendar, FiClock } from "react-icons/fi";

function MyClaimsFilters({
  dateFilter,
  onDateFilterChange,
  typeFilter,
  onTypeFilterChange,
  dateOptions,
  typeOptions,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 bg-white rounded-2xl shadow-xs border border-slate-200 px-4 py-2.5 shrink-0">
      <div className="w-full sm:w-[155px]">
        <label
          htmlFor="claim-filter-date"
          className="block text-[10px] font-semibold tracking-wide text-slate-400 mb-1"
        >
          Filter By Date
        </label>
        <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
          <FiCalendar className="w-4 h-4 text-blue-600 shrink-0" />
          <select
            id="claim-filter-date"
            value={dateFilter}
            onChange={(e) => onDateFilterChange(e.target.value)}
            className="w-full text-xs font-semibold text-slate-700 bg-transparent outline-none cursor-pointer"
          >
            {dateOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full sm:w-[155px]">
        <label
          htmlFor="claim-filter-type"
          className="block text-[10px] font-semibold tracking-wide text-slate-400 mb-1"
        >
          Filter By Type
        </label>
        <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50/50 hover:bg-slate-50 transition-colors">
          <FiClock className="w-4 h-4 text-blue-600 shrink-0" />
          <select
            id="claim-filter-type"
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value)}
            className="w-full text-xs font-semibold text-slate-700 bg-transparent outline-none cursor-pointer"
          >
            {typeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default MyClaimsFilters;
