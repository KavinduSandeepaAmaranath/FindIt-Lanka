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
    <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-2xl shadow-sm border border-slate-200 px-4 py-3 shrink-0">
      <div className="min-w-[170px]">
        <label
          htmlFor="claim-filter-date"
          className="block text-[11px] font-semibold text-slate-400 mb-1"
        >
          Filter By Date
        </label>
        <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-2.5 py-1.5">
          <FiCalendar className="w-4 h-4 text-blue-600 shrink-0" />
          <select
            id="claim-filter-date"
            value={dateFilter}
            onChange={(e) => onDateFilterChange(e.target.value)}
            className="w-full text-sm font-medium text-slate-700 bg-transparent outline-none cursor-pointer"
          >
            {dateOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="min-w-[170px]">
        <label
          htmlFor="claim-filter-type"
          className="block text-[11px] font-semibold text-slate-400 mb-1"
        >
          Filter By Type
        </label>
        <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-2.5 py-1.5">
          <FiClock className="w-4 h-4 text-blue-600 shrink-0" />
          <select
            id="claim-filter-type"
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value)}
            className="w-full text-sm font-medium text-slate-700 bg-transparent outline-none cursor-pointer"
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
