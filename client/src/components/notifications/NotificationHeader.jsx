import { FiShield, FiSettings, FiCheckCircle, FiUser } from "react-icons/fi";

function NotificationHeader({ user, onMarkAllRead }) {
  return (
    <div className="flex flex-col gap-5">
      {/* title + user */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <FiShield className="w-8 h-8 sm:w-9 sm:h-9 text-blue-600 shrink-0 mt-1" />
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
              Notifications
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Stay updated about your reports, claims, and lost & found activity.
            </p>
          </div>
        </div>

        {/* user info */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900">{user.name}</p>
            <p className="text-xs text-blue-600 font-medium">{user.membership}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
            <FiUser className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* buttons */}
      <div className="flex flex-wrap gap-3 sm:justify-end">
        {/* Settings page is not built yet, so this button does nothing for now */}
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold shadow-sm transition-colors">
          <FiSettings className="w-4 h-4" />
          Notification Settings
        </button>

        <button
          onClick={onMarkAllRead}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold shadow-sm transition-colors"
        >
          <FiCheckCircle className="w-4 h-4" />
          Mark all as read
        </button>
      </div>
    </div>
  );
}

export default NotificationHeader;