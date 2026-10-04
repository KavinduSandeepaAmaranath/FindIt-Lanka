import { FiSettings, FiCheckCircle, FiTrash2 } from "react-icons/fi";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import NotificationBell from "../common/NotificationBell";
import UserProfileBadge from "../common/UserProfileBadge";

function NotificationHeader({
  user,
  onOpenSettings,
  onOpenMarkAllRead,
  onMarkAllRead,
  onOpenDeleteAll,
}) {
  const handleMarkAll = onOpenMarkAllRead || onMarkAllRead;

  return (
    <div className="flex flex-col gap-5">
      {/* title + user */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <VscWorkspaceTrusted className="w-8 h-8 sm:w-9 sm:h-9 text-blue-600 shrink-0 mt-1" />
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-900">
              Notifications
            </h1>
            <p className="text-sm text-slate-500 mt-3">
              Stay updated about your reports, claims, and lost &amp; found activity.
            </p>
          </div>
        </div>

        {/* user info */}
        <div className="flex items-center gap-3 shrink-0">
          <NotificationBell />
          <UserProfileBadge user={user} />
        </div>
      </div>

      {/* buttons */}
      <div className="flex flex-wrap gap-3 sm:justify-end items-center">
        <button
          type="button"
          onClick={onOpenSettings}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-100 hover:bg-blue-300 text-blue-700 text-sm font-semibold shadow-sm transition-colors cursor-pointer"
        >
          <FiSettings className="w-4 h-4" />
          Notification Settings
        </button>

        <button
          type="button"
          onClick={handleMarkAll}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-100 hover:bg-blue-300 text-blue-700 text-sm font-semibold shadow-sm transition-colors cursor-pointer"
        >
          <FiCheckCircle className="w-4 h-4" />
          Mark all as read
        </button>

        {/* Trash bin button to delete all notifications on the right side */}
        <button
          type="button"
          onClick={onOpenDeleteAll}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 text-sm font-semibold shadow-sm transition-colors cursor-pointer"
          title="Delete all notifications"
        >
          <FiTrash2 className="w-4 h-4" />
          Delete All
        </button>
      </div>
    </div>
  );
}

export default NotificationHeader;