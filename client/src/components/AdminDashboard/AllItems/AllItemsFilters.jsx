
import { useState } from "react";

import {
  allItemsFilterData,
  allItemsFilterIcons,
} from "../../../data/AdminModuleData/AllItems";


const AllItemsFilters = () => {
  const SearchIcon = allItemsFilterIcons.search;

  const [searchValue, setSearchValue] = useState("");

  const [selectedFilters, setSelectedFilters] = useState({
    type: "Found",
    status: "Claimed",
    date: "All Time",
  });

  const [openFilter, setOpenFilter] = useState(null);


  //search

  const handleSearch = () => {
    console.log("Search:", searchValue);
    console.log("Filters:", selectedFilters);
  };


  //filter change

  const handleFilterChange = (filterId, value) => {
    setSelectedFilters((previous) => ({
      ...previous,
      [filterId]: value,
    }));

    setOpenFilter(null);
  };


  return (
    <section className="mt-8 w-full">

      <div
        className="
          flex
          flex-col
          gap-4
          xl:flex-row
          xl:items-center
          xl:justify-between
        "
      >

        {/*search*/}

        <div
          className="
            flex
            w-full
            xl:max-w-[470px]
          "
        >

          {/* Search Input */}
          <div className="relative flex-1">

            <SearchIcon
              size={28}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-[#7EC4F5]
              "
            />

            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder={
                allItemsFilterData.search.placeholder
              }
              className="
                h-12
                w-full
                rounded-l-xl
                border
                border-gray-300
                bg-white
                pl-12
                pr-4
                text-sm
                text-[#29292D]
                outline-none
                transition-all
                duration-200
                placeholder:text-[#94A3B8]
                focus:border-[#2563EB]
                focus:ring-2
                focus:ring-[#2563EB]/10
              "
            />

          </div>


          {/* Search Button */}
          <button
            type="button"
            onClick={handleSearch}
            className="
              h-12
              rounded-r-xl
              bg-[#2563EB]
              px-7
              text-sm
              font-semibold
              text-white
              transition-all
              duration-200
              hover:bg-[#0F3292]
              hover:shadow-md
              active:scale-[0.98]
              focus:outline-none
              focus:ring-2
              focus:ring-[#2563EB]/30
              sm:px-8
            "
          >
            {allItemsFilterData.search.buttonText}
          </button>

        </div>


        {/*filters*/}

        <div
          className="
            flex
            w-full
            flex-wrap
            gap-3
            xl:w-auto
            xl:justify-end
          "
        >

          {allItemsFilterData.filters.map((filter) => (
            <FilterButton
              key={filter.id}
              filter={filter}
              value={selectedFilters[filter.id]}
              isOpen={openFilter === filter.id}
              onToggle={() =>
                setOpenFilter(
                  openFilter === filter.id
                    ? null
                    : filter.id
                )
              }
              onSelect={(value) =>
                handleFilterChange(filter.id, value)
              }
            />
          ))}

        </div>

      </div>

    </section>
  );
};


//filter btn

const FilterButton = ({
  filter,
  value,
  isOpen,
  onToggle,
  onSelect,
}) => {
  const ChevronIcon = allItemsFilterIcons.chevronDown;

  return (
    <div
      className="
        relative
        w-full
        sm:w-auto
      "
    >

      {/* Btn */}
      <button
        type="button"
        onClick={onToggle}
        className="
          flex
          min-h-[58px]
          w-full
          min-w-[145px]
          items-center
          justify-between
          gap-3
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-2
          text-left
          shadow-sm
          transition-all
          duration-200
          hover:border-[#2563EB]
          hover:shadow-md
          focus:outline-none
          focus:ring-2
          focus:ring-[#2563EB]/20
          sm:w-auto
        "
      >

        <div>

          {/* filter lable */}
          <span
            className="
              block
              text-[10px]
              font-medium
              text-[#0F3292]
            "
          >
            {filter.label}
          </span>


          {/* selected value */}
          <span
            className="
              mt-1
              block
              text-sm
              font-normal
              text-[#29292D]
            "
          >
            {value}
          </span>

        </div>


        <ChevronIcon
          size={16}
          className={`
            shrink-0
            text-[#2563EB]
            transition-transform
            duration-200
            ${isOpen ? "rotate-180" : ""}
          `}
        />

      </button>


      {/*dropdown */}

      {isOpen && (
        <div
          className="
            absolute
            left-0
            top-full
            z-30
            mt-2
            w-full
            min-w-[145px]
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            p-1
            shadow-xl
          "
        >

          {filter.options.map((option) => {
            const isSelected = option === value;

            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-lg
                  px-3
                  py-2.5
                  text-left
                  text-sm
                  transition-all
                  duration-150
                  ${
                    isSelected
                      ? "bg-[#EFF6FF] text-[#0F3292]"
                      : "text-[#29292D] hover:bg-gray-50"
                  }
                `}
              >

                <span>{option}</span>

                {isSelected && (
                  <span className="text-[#2563EB]">
                    ✓
                  </span>
                )}

              </button>
            );
          })}

        </div>
      )}

    </div>
  );
};


export default AllItemsFilters;