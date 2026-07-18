import { FiSearch, FiBell, FiCalendar, FiMenu } from "react-icons/fi";
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
  return (
    <>
      {/* Top Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

        {/* Search Bar + Hamburger */}
        <div className="flex items-center gap-3 w-full">

          {/* Hamburger - Mobile & Tablet */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 rounded-lg bg-white shadow border hover:bg-gray-100 transition"
          >
            <FiMenu className="text-2xl text-gray-700" />
          </button>

          {/* Search Bar */}
          <div className="flex items-center bg-white/70 backdrop-blur-md border border-white/30 rounded-xl px-3 sm:px-4 py-2 sm:py-3 w-full lg:max-w-[430px] shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-white">

            <FiSearch className="text-gray-400 text-lg sm:text-xl" />

            <input
              type="text"
              placeholder={header.searchPlaceholder}
              className="flex-1 px-2 sm:px-3 bg-transparent outline-none placeholder:text-gray-500 text-sm sm:text-base"
            />

            <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base transition-all duration-300 hover:bg-blue-700 hover:scale-105">
              Search
            </button>

          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center justify-end gap-3 sm:gap-5">

          <FiBell className="text-xl sm:text-2xl text-orange-400 cursor-pointer" />

          <div className="text-right hidden sm:block">
            <h3 className="font-semibold text-sm sm:text-base">
              {header.adminName}
            </h3>

            <p className="text-xs sm:text-sm text-gray-500">
              {header.adminRole}
            </p>
          </div>

          <img
            src={ProfileImg}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />

        </div>

      </div>

      {/* Heading + Calendar */}
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
            className="flex items-center gap-2 sm:gap-3 border border-gray-300 rounded-xl px-4 sm:px-5 py-2 sm:py-3 bg-white shadow-sm hover:shadow-md transition"
          >
            <FiCalendar className="text-blue-600 text-lg sm:text-xl" />

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