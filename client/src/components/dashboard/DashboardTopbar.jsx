import { FiSearch, FiShield } from "react-icons/fi";
import NotificationBell from "../common/NotificationBell";
import UserProfileBadge from "../common/UserProfileBadge";

function DashboardTopbar({ user, hideSearch = false }) {
  let storedUser = null;
  try {
    storedUser = JSON.parse(localStorage.getItem("user") || "null");
  } catch (e) {
    storedUser = null;
  }

  const activeUser = (user?.name && user.name !== "Kasun Perera" && user.name !== "Kasun") ? user : storedUser;

  const trustScore = activeUser?.trustScore ?? 95;
  const trustLabel = activeUser?.trustLabel ?? "Verified Member";

  return (
    <div
      className={`flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8 ${
        hideSearch ? "lg:justify-end" : ""
      }`}
    >
      {/*search bar*/}
      {!hideSearch && (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex-1 flex items-center bg-white rounded-2xl shadow-sm border border-slate-200 px-2 py-1.5"
        >
          <FiSearch className="w-5 h-5 text-slate-400 ml-3" />
          <input
            type="text"
            placeholder="Search reports, items, or locations..."
            className="flex-1 px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none bg-transparent"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold transition-colors"
          >
            Search
          </button>
        </form>
      )}

      {/*user & trust score*/}
      <div className="flex items-center gap-5">
        <NotificationBell />

        <UserProfileBadge user={activeUser} />

        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-2xl px-5 py-3 shadow-sm shrink-0">
          <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
            <FiShield className="w-4.5 h-4.5" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-blue-200">
              Trust Score
            </p>
            <p className="text-lg font-extrabold leading-tight">
              {trustScore}/100
            </p>
            <p className="text-[11px] text-blue-200">{trustLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardTopbar;
