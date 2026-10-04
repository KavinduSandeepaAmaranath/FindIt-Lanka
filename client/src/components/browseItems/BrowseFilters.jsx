import { useState, useRef, useEffect } from "react";
import { FiClock, FiCalendar, FiChevronDown, FiX } from "react-icons/fi";

function DropdownItem({
  label,
  value,
  options,
  icon: Icon,
  onChange,
  defaultPlaceholder = "Pending",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText =
    value === "all" || !value ? defaultPlaceholder : selectedOption?.label || value;

  return (
    <div className="flex-1 min-w-[150px]" ref={containerRef}>
      <label className="block text-xs text-slate-500 font-medium mb-1.5 truncate">
        {label}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between gap-2 px-3 py-2 bg-white rounded-xl border transition-all text-left shadow-2xs cursor-pointer ${
            isOpen
              ? "border-blue-500 ring-2 ring-blue-100"
              : value !== "all"
              ? "border-blue-400 bg-blue-50/20 text-slate-900"
              : "border-slate-200 hover:border-slate-300 text-slate-700"
          }`}
        >
          <div className="flex items-center gap-2 min-w-0 truncate">
            <Icon className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs sm:text-sm font-medium truncate">
              {displayText}
            </span>
          </div>

          <FiChevronDown
            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-blue-600" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 z-30 bg-white rounded-xl shadow-lg border border-slate-200 py-1 max-h-56 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
            {options.map((opt, idx) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={`${opt.value}-${idx}`}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-xs sm:text-sm text-left flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                    isSelected
                      ? "text-blue-600 font-semibold bg-blue-50/50"
                      : "text-slate-700"
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function BrowseFilters({
  category,
  onCategoryChange,
  categoryOptions,
  district,
  onDistrictChange,
  districtOptions,
  location,
  onLocationChange,
  locationOptions,
  date,
  onDateChange,
  dateOptions,
  status,
  onStatusChange,
  statusOptions,
  onResetFilters,
  hasActiveFilters,
}) {
  return (
    <div className="bg-white/70 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4 items-end">
        <DropdownItem
          label="Filter By Category"
          value={category}
          options={categoryOptions}
          icon={FiClock}
          onChange={onCategoryChange}
          defaultPlaceholder="Pending"
        />

        <DropdownItem
          label="Filter By District"
          value={district}
          options={districtOptions}
          icon={FiClock}
          onChange={onDistrictChange}
          defaultPlaceholder="Pending"
        />

        <DropdownItem
          label="Filter By Location"
          value={location}
          options={locationOptions}
          icon={FiClock}
          onChange={onLocationChange}
          defaultPlaceholder="Pending"
        />

        <DropdownItem
          label="Filter By Date"
          value={date}
          options={dateOptions}
          icon={FiCalendar}
          onChange={onDateChange}
          defaultPlaceholder="All Time"
        />

        <DropdownItem
          label="Filter By Status"
          value={status}
          options={statusOptions}
          icon={FiClock}
          onChange={onStatusChange}
          defaultPlaceholder="Pending"
        />
      </div>

      {hasActiveFilters && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
          >
            <FiX className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default BrowseFilters;
