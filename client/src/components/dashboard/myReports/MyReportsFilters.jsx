import { useState } from "react";
import { FiSearch, FiChevronDown, FiX } from "react-icons/fi";

function MyReportsFilters({
  searchDraft = "",
  onSearchChange = () => {},
  onSearchSubmit = () => {},
  onClearSearch = () => {},
  dateFilter = "all",
  onDateFilterChange = () => {},
  statusFilter = "all",
  onStatusFilterChange = () => {},
  dateOptions = [],
  statusOptions = [],
}) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const selectedDateLabel =
    dateOptions.find((opt) => String(opt.value) === String(dateFilter))?.label ||
    "All Time";

  const selectedStatusLabel =
    statusOptions.find((opt) => String(opt.value) === String(statusFilter))?.label ||
    "All Status";

  return (
    <div className="flex w-full flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
      {/* Search Bar */}
      <form
        onSubmit={onSearchSubmit}
        className="flex w-full xl:max-w-xl"
      >
        <div className="relative min-w-0 flex-1">
          <FiSearch
            size={20}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
          />

          <input
            type="text"
            value={searchDraft}
            onChange={onSearchChange}
            placeholder="Search your reports..."
            className="
              h-12 w-full
              rounded-l-xl
              border border-gray-300
              bg-white
              pl-11 pr-10
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

          {searchDraft && (
            <button
              type="button"
              onClick={onClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
              title="Clear search"
            >
              <FiX size={16} />
            </button>
          )}
        </div>

        <button
          type="submit"
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
          Search
        </button>
      </form>

      {/* Filters */}
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:flex xl:w-auto xl:flex-wrap">
        {/* Date Filter Dropdown */}
        <div className="relative w-full xl:w-auto">
          <button
            type="button"
            onClick={() =>
              setOpenDropdown(openDropdown === "date" ? null : "date")
            }
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
              xl:min-w-[160px]
            "
          >
            <span className="min-w-0">
              <span className="block truncate text-[10px] font-medium text-[#0F3292]">
                Filter By Date
              </span>
              <span className="mt-1 block truncate text-sm font-normal text-[#29292D]">
                {selectedDateLabel}
              </span>
            </span>

            <FiChevronDown
              size={16}
              className={`
                shrink-0
                text-[#2A3B63]
                transition-transform
                duration-200
                ${openDropdown === "date" ? "rotate-180" : ""}
              `}
            />
          </button>

          {openDropdown === "date" && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setOpenDropdown(null)}
              />
              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-full
                  z-40
                  mt-2
                  overflow-hidden
                  rounded-xl
                  border border-gray-200
                  bg-white
                  p-1
                  shadow-lg
                  xl:w-48
                "
              >
                {dateOptions.map((opt) => {
                  const isSelected = String(dateFilter) === String(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        onDateFilterChange(opt.value);
                        setOpenDropdown(null);
                      }}
                      className={`
                        w-full
                        rounded-lg
                        px-3
                        py-2.5
                        text-left
                        text-sm
                        transition
                        ${
                          isSelected
                            ? "bg-[#2563EB]/10 font-medium text-[#0F3292]"
                            : "text-[#29292D] hover:bg-gray-50"
                        }
                      `}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Status Filter Dropdown */}
        <div className="relative w-full xl:w-auto">
          <button
            type="button"
            onClick={() =>
              setOpenDropdown(openDropdown === "status" ? null : "status")
            }
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
              xl:min-w-[160px]
            "
          >
            <span className="min-w-0">
              <span className="block truncate text-[10px] font-medium text-[#0F3292]">
                Filter By Status
              </span>
              <span className="mt-1 block truncate text-sm font-normal text-[#29292D]">
                {selectedStatusLabel}
              </span>
            </span>

            <FiChevronDown
              size={16}
              className={`
                shrink-0
                text-[#2A3B63]
                transition-transform
                duration-200
                ${openDropdown === "status" ? "rotate-180" : ""}
              `}
            />
          </button>

          {openDropdown === "status" && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setOpenDropdown(null)}
              />
              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-full
                  z-40
                  mt-2
                  overflow-hidden
                  rounded-xl
                  border border-gray-200
                  bg-white
                  p-1
                  shadow-lg
                  xl:w-52
                "
              >
                {statusOptions.map((opt) => {
                  const isSelected = String(statusFilter) === String(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        onStatusFilterChange(opt.value);
                        setOpenDropdown(null);
                      }}
                      className={`
                        w-full
                        rounded-lg
                        px-3
                        py-2.5
                        text-left
                        text-sm
                        transition
                        ${
                          isSelected
                            ? "bg-[#2563EB]/10 font-medium text-[#0F3292]"
                            : "text-[#29292D] hover:bg-gray-50"
                        }
                      `}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyReportsFilters;
