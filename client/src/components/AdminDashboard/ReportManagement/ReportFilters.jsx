
import { useState } from "react";
import { reportFilterIcons, reportFiltersData } from "../../../data/AdminModuleData/ReportManagement";

const ReportFilters = () => {
  const SearchIcon = reportFilterIcons.search;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState(
    reportFiltersData.filters.reduce((acc, filter) => {
      acc[filter.id] = filter.defaultValue;
      return acc;
    }, {})
  );
  const [openFilter, setOpenFilter] = useState(null);

  const handleSearch = () => {
    console.log("Search:", searchTerm);
    console.log("Filters:", selectedFilters);
  };

  const handleFilterChange = (filterId, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));

    setOpenFilter(null);
  };

  return (
    <div className="mt-8 flex w-full flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

      {/* Search bar */}
      <div className="flex w-full xl:max-w-xl">

        <div className="relative min-w-0 flex-1">
          <SearchIcon
            size={22}
            strokeWidth={2}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder={reportFiltersData.search.placeholder}
            className="
              h-12 w-full
              rounded-l-xl
              border border-gray-300
              bg-white
              pl-11 pr-4
              text-sm
              text-[#29292D]
              outline-none
              transition
              placeholder:text-[#94A3B8]
              focus:border-[#2563EB]
              focus:ring-2
              focus:ring-[#2563EB]/10
            "
          />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="
            h-12
            shrink-0
            rounded-r-xl
            bg-[#2563EB]
            px-6
            text-base
            font-semibold
            text-white
            transition
            hover:bg-[#0F3292]
            focus:outline-none
            focus:ring-2
            focus:ring-[#2563EB]/30
            active:scale-[0.98]
            sm:px-8
          "
        >
          {reportFiltersData.search.buttonText}
        </button>

      </div>

      {/* Filters */}
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:flex xl:w-auto xl:flex-wrap">
        {reportFiltersData.filters.map((filter) => (
          <FilterButton
            key={filter.id}
            filter={filter}
            value={selectedFilters[filter.id]}
            isOpen={openFilter === filter.id}
            onToggle={() =>
              setOpenFilter(
                openFilter === filter.id ? null : filter.id
              )
            }
            onChange={handleFilterChange}
          />
        ))}
      </div>

    </div>
  );
};


const FilterButton = ({
  filter,
  value,
  isOpen,
  onToggle,
  onChange,
}) => {
  const ChevronDownIcon = reportFilterIcons.dropdown;

  return (
    <div className="relative w-full xl:w-auto">

      {/* Filter Button */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="
          flex
          min-h-[58px]
          w-full
          min-w-0
          items-center
          justify-between
          gap-4
          rounded-xl
          border border-gray-300
          bg-white
          px-4
          py-2
          text-left
          transition-all
          duration-200
          hover:border-[#2563EB]
          hover:shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-[#2563EB]/10
          xl:min-w-[150px]
        "
      >
        <span className="min-w-0">
          {/* Label */}
          <span className="block truncate text-[10px] font-medium text-[#0F3292]">
            {filter.label}
          </span>

          {/* Selected Value of filters */}
          <span className="mt-1 block truncate text-sm font-normal text-[#29292D]">
            {value}
          </span>
        </span>

        <ChevronDownIcon
          size={16}
          strokeWidth={2}
          className={`
            shrink-0
            text-[#2A3B63]
            transition-transform
            duration-200
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="
            absolute
            left-0
            right-0
            top-full
            z-30
            mt-2
            overflow-hidden
            rounded-xl
            border border-gray-200
            bg-white
            p-1
            shadow-lg
          "
        >
          {filter.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onChange(filter.id, option)}
              className={`
                w-full
                rounded-lg
                px-3
                py-2.5
                text-left
                text-sm
                transition
                ${
                  value === option
                    ? "bg-[#2563EB]/10 font-medium text-[#0F3292]"
                    : "text-[#29292D] hover:bg-gray-50"
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>
      )}

    </div>
  );
};

export default ReportFilters;