import { FiUser, FiBell } from "react-icons/fi";

function MyClaimsUserBar({ user }) {
  return (
    <div className="flex items-center justify-end gap-4">
      <button
        type="button"
        aria-label="Notifications"
        className="relative w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-blue-700 transition-colors"
      >
        <FiBell className="w-5 h-5" />
        {user.pendingNotifications > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
            {user.pendingNotifications}
          </span>
        )}
      </button>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-slate-900">{user.name}</p>
          <p className="text-xs text-blue-600 font-medium">{user.membership}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
          <FiUser className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export default MyClaimsUserBar;
