import { FiCalendar, FiClock } from "react-icons/fi";

function MyReportsFilters({
  dateFilter,
  onDateFilterChange,
  statusFilter,
  onStatusFilterChange,
  dateOptions,
  statusOptions,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-2xl shadow-sm border border-slate-200 px-4 py-3">
      {/*date filter*/}
      <div className="min-w-[170px]">
        <label
          htmlFor="filter-date"
          className="block text-[11px] font-semibold text-slate-400 mb-1"
        >
          Filter By Date
        </label>

        <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-2.5 py-1.5">
          <FiCalendar className="w-4 h-4 text-blue-600 shrink-0" />

          <select
            id="filter-date"
            value={dateFilter}
            onChange={(e) =>
              onDateFilterChange(e.target.value)
            }
            className="w-full text-sm font-medium text-slate-700 bg-transparent outline-none cursor-pointer"
          >
            {dateOptions.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/*status filter*/}
      <div className="min-w-[170px]">
        <label
          htmlFor="filter-status"
          className="block text-[11px] font-semibold text-slate-400 mb-1"
        >
          Filter By Status
        </label>

        <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-2.5 py-1.5">
          <FiClock className="w-4 h-4 text-blue-600 shrink-0" />

          <select
            id="filter-status"
            value={statusFilter}
            onChange={(e) =>
              onStatusFilterChange(e.target.value)
            }
            className="w-full text-sm font-medium text-slate-700 bg-transparent outline-none cursor-pointer"
          >
            {statusOptions.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default MyReportsFilters;