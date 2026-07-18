import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import ProfileImg from "../../assets/icons/ProfileImg.jpeg";

// icons දැන් data file එකෙන් props හරහා එනවා
// component එකේ කිසිදු icon import එකක් නැත

export default function AdminDashboardHeader({
  showCalendar,
  setShowCalendar,
  selectedDate,
  setSelectedDate,
  header,
  setIsOpen,
}) {
  // Data file එකෙන් icons extract කරනවා
  // Capital letter නිසා React component ලෙස render වේ
  const SearchIcon = header.icons.search;
  const BellIcon = header.icons.bell;
  const CalendarIcon = header.icons.calendar;
  const MenuIcon = header.icons.menu;

  return (
    <>
      {/* ── Top Bar ── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">

        {/* Left: Hamburger + Search Bar */}
        <div className="flex items-center gap-2 sm:gap-3 w-full">

          {/* Hamburger - Mobile & Tablet Only */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden flex-shrink-0 p-1.5 sm:p-2 rounded-lg bg-white shadow border border-gray-200 hover:bg-gray-100 transition"
          >
            <MenuIcon className="text-xl sm:text-2xl text-gray-700" />
          </button>

          {/* Search Bar */}
          <div className="flex items-center bg-white/70 backdrop-blur-md border border-white/30 rounded-xl px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 w-full lg:max-w-[430px] shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-white gap-1 sm:gap-2">

            <SearchIcon className="text-gray-400 text-base sm:text-lg lg:text-xl flex-shrink-0" />

            <input
              type="text"
              placeholder={header.searchPlaceholder}
              className="flex-1 min-w-0 px-1 sm:px-2 bg-transparent outline-none placeholder:text-gray-400 text-xs sm:text-sm lg:text-base"
            />

            <button className="flex-shrink-0 bg-blue-600 text-white px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm lg:text-base transition-all duration-300 hover:bg-blue-700 hover:scale-105 whitespace-nowrap">
              Search
            </button>
          </div>
        </div>

        {/* Right: Bell + Profile */}
        <div className="flex items-center justify-end gap-2 sm:gap-4 lg:gap-5 flex-shrink-0">

          {/* Bell Icon */}
          <BellIcon className="text-xl sm:text-2xl text-orange-400 cursor-pointer hover:text-orange-500 transition-colors" />

          {/* Admin Name + Role - Mobile හිදී hidden */}
          <div className="text-right hidden sm:block">
            <h3 className="font-semibold text-sm sm:text-base leading-tight">
              {header.adminName}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              {header.adminRole}
            </p>
          </div>

          {/* Profile Image */}
          <img
            src={ProfileImg}
            alt="Profile"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
          />
        </div>
      </div>

      {/* ── Heading + Calendar ── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-5 mb-6 sm:mb-8">

        {/* Title + Subtitle */}
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-700 leading-tight">
            {header.title}
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-gray-500 mt-1 sm:mt-2 leading-relaxed">
            {header.subtitle}
          </p>
        </div>

        {/* Calendar Button */}
        <div className="relative w-fit flex-shrink-0">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center gap-2 sm:gap-3 border border-gray-300 rounded-xl px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 bg-white shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap"
          >
            <CalendarIcon className="text-blue-600 text-base sm:text-lg lg:text-xl flex-shrink-0" />
            <span className="text-xs sm:text-sm lg:text-base text-gray-700 font-medium">
              {selectedDate.toLocaleDateString()}
            </span>
          </button>

          {/* Calendar Dropdown */}
          {showCalendar && (
            <div className="absolute right-0 mt-2 sm:mt-3 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 sm:p-4 z-50">
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