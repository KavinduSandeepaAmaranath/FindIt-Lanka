import { useState } from "react";
import { usersHeader } from "../../../data/AllUsersData";

const UsersHeader = () => {
  const SearchIcon = usersHeader.icons.search;

  const [filter, setFilter] = useState(
    usersHeader.filterOptions[0]
  );

  return (
    <section className="mb-6 sm:mb-8">

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

        {/* Left */}
        <div className="flex-1">

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 leading-tight">
            {usersHeader.title}
          </h1>

          <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-2xl">
            {usersHeader.subtitle}
          </p>

        </div>

        {/* Right */}
        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">

          {/* Search */}
          <div className="relative flex-1 xl:w-[480px]">

            <SearchIcon
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
                text-lg
                sm:text-xl
              "
            />

            <input
              type="text"
              placeholder={usersHeader.searchPlaceholder}
              className="
                w-full
                rounded-2xl
                border
                border-gray-300
                bg-white
                py-3
                pl-11
                pr-24
                sm:pr-28
                text-sm
                sm:text-base
                shadow-sm
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
              "
            />

            <button
              className="
                absolute
                right-2
                top-1/2
                -translate-y-1/2
                rounded-xl
                bg-blue-600
                px-4
                sm:px-5
                lg:px-6
                py-2
                text-xs
                sm:text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:bg-blue-700
                hover:shadow-md
              "
            >
              Search
            </button>

          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="
              w-full
              sm:w-48
              rounded-2xl
              border
              border-gray-300
              bg-white
              px-4
              py-3
              text-sm
              sm:text-base
              outline-none
              transition
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-200
            "
          >
            {usersHeader.filterOptions.map(
              (option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              )
            )}
          </select>

        </div>

      </div>

    </section>
  );
};

export default UsersHeader;