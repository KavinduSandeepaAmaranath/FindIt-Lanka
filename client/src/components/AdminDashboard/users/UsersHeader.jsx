import { useState } from "react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { usersHeader } from "../../../data/AllUsersData";


const UsersHeader = ({ setIsOpen }) => {

  const SearchIcon = usersHeader.icons.search;

  const [filter, setFilter] = useState(usersHeader.filterOptions[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <section className="mb-6 sm:mb-8">

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="
          lg:hidden
          flex
          items-center
          justify-center
          w-11
          h-11
          mb-4
          rounded-xl
          bg-blue-600
          text-white
          shadow-md
          hover:bg-blue-700
          transition
        "
      >
        <FiMenu size={24} />
      </button>

      <div
        className="
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between
          gap-6
        "
      >

        {/* Left */}
        <div className="flex-1">

          <h1
            className="
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-bold
              text-slate-800
              leading-tight
            "
          >
            {usersHeader.title}
          </h1>

          <p
            className="
              mt-2
              text-sm
              sm:text-base
              text-gray-500
              max-w-2xl
            "
          >
            {usersHeader.subtitle}
          </p>

        </div>

        {/* Right */}
        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-4
            w-full
            xl:w-auto
          "
        >

          {/* Search */}
          <div
            className="
              relative
              flex-1
              xl:w-[480px]
            "
          >

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
                hover:bg-blue-700
                hover:shadow-md
                transition
              "
            >
              Search
            </button>

          </div>

          {/* Filter Dropdown */}
          <div className="relative w-full sm:w-52">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="
                w-full
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-gray-200
                bg-white
                py-3
                px-4
                text-sm
                font-medium
                text-slate-700
                shadow-sm
                outline-none
                transition-all
                hover:border-blue-400
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-500/10
              "
            >
              <span>{filter}</span>
              <FiChevronDown
                className={`text-gray-400 text-lg transition-transform duration-200 ${isDropdownOpen ? "rotate-180 text-blue-600" : ""
                  }`}
              />
            </button>
            {/* Floating Custom Menu */}
            {isDropdownOpen && (
              <>
                {/* Backdrop to close menu when clicking outside */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-full rounded-2xl border border-gray-100 bg-white p-2 shadow-xl z-50">
                  {usersHeader.filterOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setFilter(option);
                        setIsDropdownOpen(false);
                      }}
                      className={`
                        w-full
                        text-left
                        px-3.5
                        py-2.5
                        rounded-xl
                        text-sm
                        font-medium
                        transition-colors
                        ${filter === option
                          ? "bg-blue-50 text-blue-600 font-semibold"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }
                      `}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>

      </div>

    </section>
  );
};

export default UsersHeader;