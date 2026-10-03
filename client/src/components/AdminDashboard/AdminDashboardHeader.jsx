import { useState } from "react";
import { NavLink } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import ProfileImg from "../../assets/icons/ProfileImg.jpeg";

export default function AdminDashboardHeader({
  showCalendar,
  setShowCalendar,
  selectedDate,
  setSelectedDate,
  header,
  setIsOpen,
}) {
  const SearchIcon = header.icons.search;
  const BellIcon = header.icons.bell;
  const CalendarIcon = header.icons.calendar;
  const MenuIcon = header.icons.menu;

  const [searchText, setSearchText] = useState("");
  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const handleSearch = () => {
    console.log("Searching:", searchText);

    // TODO:
    // API call or search functionality goes here
  };

  return (
    <>
      {/* Top Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">

        {/* Search Area */}
        <div className="flex items-center gap-2 sm:gap-3 w-full">

          {/* Mobile Menu */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden flex-shrink-0 p-2 rounded-lg bg-white shadow border border-gray-200 hover:bg-gray-100 transition"
          >
            <MenuIcon className="text-xl sm:text-2xl text-gray-700" />
          </button>

          {/* Search Box */}
          <div className="relative flex-1 lg:max-w-[480px]">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg sm:text-xl pointer-events-none" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder={header.searchPlaceholder}
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
              onClick={handleSearch}
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
        </div>

        {/* Profile */}
        <div className="flex items-center justify-end gap-3 sm:gap-5">

          {/* Notification */}
          <NavLink
            to="/admin-notifications"
            className="hover:scale-110 transition"
          >
            <BellIcon className="text-xl sm:text-2xl text-orange-400" />
          </NavLink>

          {/* Profile */}
          <NavLink
            to="/admin-profile"
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <div className="text-right hidden sm:block">
              <h3 className="font-semibold text-sm sm:text-base">
                {user?.name || "Administrator"}
              </h3>

              <p className="text-xs sm:text-sm text-gray-500">
                {user?.role === "admin"
                  ? "Administrator"
                  : "User"}
              </p>
            </div>

            <img
              src={ProfileImg}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
            />
          </NavLink>

        </div>
      </div>

      {/* Title + Calendar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-700">
            {header.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-2">
            {header.subtitle}
          </p>
        </div>

        {/* Calendar */}
        <div className="relative w-fit">

          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 sm:px-5 py-2 sm:py-3 bg-white shadow-sm hover:shadow-md transition"
          >
            <CalendarIcon className="text-blue-600 text-lg sm:text-xl" />

            <span className="text-sm sm:text-base text-gray-700 font-medium">
              {selectedDate.toLocaleDateString()}
            </span>

          </button>

          {showCalendar && (
            <div className="absolute right-0 mt-3 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 z-50">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) {
                    setSelectedDate(date);
                    setShowCalendar(false);
                  }
                }}
              />
            </div>
          )}

        </div>
      </div>
    </>
  );
}