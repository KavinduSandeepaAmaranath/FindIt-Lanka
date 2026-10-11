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
  const BellIcon = header.icons.bell;
  const CalendarIcon = header.icons.calendar;
  const MenuIcon = header.icons.menu;

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const handleSearch = () => {
    console.log("Searching:", searchText);

    // API call or search functionality goes here
  };

  return (
    <div className="mb-4 sm:mb-6">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex-shrink-0 mb-3 p-2 rounded-lg bg-white shadow border border-gray-200 hover:bg-gray-100 transition"
      >
        <MenuIcon className="text-xl sm:text-2xl text-gray-700" />
      </button>

      {/* Main Header Row: Title on Left, Actions on Right */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
        {/* Left: Title & Subtitle */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 leading-tight">
            {header.title}
          </h1>

          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-500 max-w-2xl">
            {header.subtitle}
          </p>
        </div>

        {/* Right: Actions (Calendar, Notification, Profile) */}
        <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
          {/* Calendar */}
          <div className="relative w-fit">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="flex items-center gap-2 sm:gap-3 border border-gray-300 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 bg-white shadow-sm hover:shadow-md transition"
            >
              <CalendarIcon className="text-blue-600 text-base sm:text-lg" />
              <span className="text-xs sm:text-sm text-gray-700 font-medium whitespace-nowrap">
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

          {/* Notification */}
          <NavLink
            to="/admin-notifications"
            className="hover:scale-110 transition flex items-center justify-center p-1"
          >
            <BellIcon className="text-xl sm:text-2xl text-orange-400" />
          </NavLink>

          {/* Profile */}
          <NavLink
            to="/admin-profile"
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <div className="text-right hidden sm:block">
              <h3 className="font-semibold text-sm sm:text-base text-slate-800">
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
    </div>
  );
}