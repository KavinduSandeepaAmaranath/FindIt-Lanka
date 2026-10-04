import { useState } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import NotificationBell from "../common/NotificationBell";
import userPhoto from "../../assets/images/LpKasunPerera.jpg";

function BrowseTopbar({ user, onSearch, initialSearchTerm = "" }) {
  const [searchInput, setSearchInput] = useState(initialSearchTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchInput.trim());
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchInput(val);
    if (val === "" && onSearch) {
      onSearch("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
      {/* Search Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:max-w-xl flex items-center bg-white rounded-full border border-slate-200 shadow-xs px-2 py-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all"
      >
        <div className="pl-3 pr-2 text-slate-400">
          <FiSearch className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Search reports, items, or locations..."
          className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-hidden py-1 px-1"
        />
        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold transition-all shadow-xs cursor-pointer"
        >
          Search
        </button>
      </form>

      {/* User profile & Notification area */}
      <div className="flex items-center justify-end gap-5 shrink-0 self-end md:self-auto">
        <NotificationBell />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-900 leading-tight">
              {user?.name || "Kasun Perera"}
            </p>
            <p className="text-xs text-amber-500 font-medium">
              {user?.membership || "Pro Member"}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white overflow-hidden shadow-xs border-2 border-white">
            {userPhoto ? (
              <img
                src={userPhoto}
                alt={user?.name || "User Avatar"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <FiUser className="w-5 h-5 text-white" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseTopbar;
