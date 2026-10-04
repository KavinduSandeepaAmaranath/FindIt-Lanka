import {
  claimFilterData,
  claimFilterIcons,
} from "../../../data/AdminModuleData/ClaimManagement";

const ClaimFilters = ({
  searchValue,
  setSearchValue,
  activeTab,
  setActiveTab,
}) => {
  const SearchIcon = claimFilterIcons.search;

  return (
    <section className="mt-7">

      <div
        className="
          flex
          flex-col
          gap-4
          xl:flex-row
          xl:items-center
        "
      >

        {/* search area */}
        <div
          className="
            flex
            w-full
            items-center
            overflow-hidden
            rounded-[13px]
            border
            border-[#8B8B8B]
            bg-white
            shadow-[0_3px_3px_rgba(0,0,0,0.15)]
            xl:max-w-[470px]
          "
        >

          <div className="flex flex-1 items-center">

            <SearchIcon
              size={26}
              className="ml-3 shrink-0 text-[#7CC0F5]"
            />

            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={claimFilterData.searchPlaceholder}
              className="
                h-[45px]
                w-full
                bg-transparent
                px-4
                text-[11px]
                text-[#29292D]
                outline-none
                placeholder:text-[#8C9BB2]
              "
            />

          </div>

          <button
            type="button"
            className="
              mr-2
              h-[34px]
              min-w-[110px]
              rounded-[8px]
              bg-[#2869E8]
              px-6
              text-[12px]
              font-semibold
              text-white
              transition
              hover:bg-[#164FC7]
            "
          >
            Search
          </button>

        </div>

        {/* status filters*/}
        <div className="flex flex-wrap gap-3">

          {claimFilterData.tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`
                min-w-[66px]
                rounded-[10px]
                border
                px-4
                py-[9px]
                text-[11px]
                font-medium
                transition

                ${
                  activeTab === tab
                    ? `
                      border-[#2869E8]
                      bg-[#2869E8]
                      text-white
                    `
                    : `
                      border-[#64BDE3]
                      bg-[#84D1EC]
                      text-[#073B85]
                      hover:bg-[#6AC5E7]
                    `
                }
              `}
            >
              {tab}
            </button>
          ))}

        </div>

      </div>

    </section>
  );
};

export default ClaimFilters;