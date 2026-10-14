import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { useNotifications } from "../../context/NotificationContext";

function NotificationBell({
  className = "",
  iconClassName = "w-6 h-6",
  to = "/dashboard/notifications",
  onClick,
}) {
  const { hasUnread, unreadCount } = useNotifications();

  return (
    <Link
      to={to}
      onClick={onClick}
      aria-label={`Notifications${hasUnread ? ` (${unreadCount} unread)` : ""}`}
      title={
        hasUnread
          ? `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`
          : "Notifications"
      }
      className={`relative inline-flex items-center justify-center text-yellow-500 hover:text-yellow-600 hover:scale-105 transition-all duration-150 cursor-pointer ${className}`}
    >
      <FaBell className={`${iconClassName} text-yellow-500 drop-shadow-sm`} />
      {hasUnread && (
        <span
          className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white pointer-events-none shadow-xs"
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </Link>
  );
}

export default NotificationBell;
