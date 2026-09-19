import { useState } from "react";
import { FiSearch, FiCalendar, FiClock } from "react-icons/fi";

function MyReportsFilters({
  searchTerm,
  onSearch,
  dateFilter,
  onDateFilterChange,
  statusFilter,
  onStatusFilterChange,
  dateOptions,
  statusOptions,
}) {
  const [draft, setDraft] = useState(searchTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(draft.trim());
  };

  return (
    <div className="flex flex-col xl:flex-row xl:items-center gap-5">
      {/*search your reports*/}
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex items-center bg-white rounded-2xl shadow-sm border border-slate-200 px-2 py-1.5"
      >
        <FiSearch className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
        <input
          type="text"
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            if (e.target.value === "") onSearch("");
          }}
          placeholder="Search your reports..."
          className="flex-1 min-w-0 px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none bg-transparent"
        />
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold transition-colors shrink-0"
        >
          Search
        </button>
      </form>

      {/*filters*/}
      <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-2xl shadow-sm border border-slate-200 px-4 py-3">
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
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="w-full text-sm font-medium text-slate-700 bg-transparent outline-none cursor-pointer"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyReportsFilters;
