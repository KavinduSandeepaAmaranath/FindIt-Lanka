import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import NotificationBell from "../common/NotificationBell";
import UserProfileBadge from "../common/UserProfileBadge";

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

      {/* user profile & notification area */}
      <div className="flex items-center justify-end gap-5 shrink-0 self-end md:self-auto">
        <NotificationBell />

        <UserProfileBadge user={user} />
      </div>
    </div>
  );
}

export default BrowseTopbar;
