import {
  notificationFilterData,
  notificationFilterIcons,
} from "../../../data/AdminModuleData/AdminNotification";

const NotificationFilters = ({
  searchValue,
  setSearchValue,
  activeFilter,
  setActiveFilter,
}) => {
  const SearchIcon =
    notificationFilterIcons.search;

  return (
    <section className="w-full">

      <div
        className="
          flex
          flex-col
          gap-3
          xl:flex-row
          xl:items-center
        "
      >

        {/* Search */}
        <div className="relative w-full xl:max-w-[430px]">

          <SearchIcon
            size={21}
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
            onChange={(event) =>
              setSearchValue(event.target.value)
            }
            placeholder={
              notificationFilterData.searchPlaceholder
            }
            className="
              h-12
              w-full
              rounded-xl
              border
              border-gray-200
              bg-white
              pl-11
              pr-4
              text-sm
              text-[#29292D]
              outline-none
              shadow-sm
              transition-all
              placeholder:text-[#94A3B8]
              focus:border-[#2563EB]
              focus:ring-2
              focus:ring-[#2563EB]/10
            "
          />

        </div>

        {/* Filter Buttons */}
        <div
          className="
            flex
            w-full
            gap-2
            overflow-x-auto
            pb-1
            xl:w-auto
            xl:flex-1
            xl:justify-end
          "
        >

          {notificationFilterData.filters.map(
            (filter) => {
              const isActive =
                activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() =>
                    setActiveFilter(filter)
                  }
                  className={`
                    shrink-0
                    rounded-xl
                    border
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? `
                          border-[#2563EB]
                          bg-[#2563EB]
                          text-white
                          shadow-sm
                        `
                        : `
                          border-gray-200
                          bg-white
                          text-[#2A3B63]
                          hover:border-[#2563EB]
                          hover:bg-blue-50
                          hover:text-[#2563EB]
                        `
                    }
                  `}
                >
                  {filter}
                </button>
              );
            }
          )}

        </div>

      </div>

    </section>
  );
};

export default NotificationFilters;