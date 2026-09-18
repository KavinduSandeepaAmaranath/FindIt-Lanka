import { FiSearch, FiShield, FiMessageSquare, FiFileText, FiClock, FiBox, FiXCircle } from "react-icons/fi";

const iconMap = {
  search: FiSearch,
  shield: FiShield,
  message: FiMessageSquare,
  report: FiFileText,
  clock: FiClock,
  box: FiBox,
  reject: FiXCircle,
};

const toneStyles = {
  blue: {
    card: "bg-sky-50 border-sky-100",
    icon: "bg-blue-100 text-blue-600",
    button: "bg-blue-700 hover:bg-blue-800 text-white",
  },
  green: {
    card: "bg-emerald-50 border-emerald-100",
    icon: "bg-emerald-100 text-emerald-600",
    button: "bg-emerald-600 hover:bg-emerald-700 text-white",
  },
  gray: {
    card: "bg-slate-100 border-slate-200",
    icon: "bg-indigo-100 text-indigo-600",
    button: "bg-blue-100 hover:bg-blue-200 text-blue-800",
  },
  red: {
    card: "bg-red-50 border-red-100",
    icon: "bg-red-100 text-red-600",
    button: "bg-red-500 hover:bg-red-600 text-white",
  },
};


function NotificationCard({ notification, onMarkAsRead }) {
  const { id, tone, icon, title, description, time, actionLabel, isRead } = notification;

  const styles = toneStyles[tone] || toneStyles.blue;
  const Icon = iconMap[icon] || FiSearch;

  return (
    <div
      onClick={() => onMarkAsRead(id)}
      className={`relative flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border p-3 sm:p-4 cursor-pointer transition-shadow hover:shadow-md ${styles.card}`}
    >
      {/* blue dot = unread */}
      {!isRead && (
        <span
          className="absolute top-2 right-2 sm:top-1.5 sm:left-1.5 sm:right-auto w-2.5 h-2.5 rounded-full bg-blue-600"
          aria-label="Unread"
        />
      )}

      {/* icon + text */}
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${styles.icon}`}
        >
          <Icon className="w-4.5 h-4.5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <p
              className={`text-sm text-slate-900 break-words ${
                isRead ? "font-semibold" : "font-bold"
              }`}
            >
              {title}
            </p>
            <span className="text-xs text-slate-500 shrink-0 mr-3 sm:mr-0">{time}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 leading-snug mt-0.5 break-words">
            {description}
          </p>
        </div>
      </div>

      {/* action button */}
        <button
        onClick={(e) => {
          e.stopPropagation();
          onMarkAsRead(id);
        }}
        className={`w-full sm:w-auto sm:min-w-28 shrink-0 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${styles.button}`}
      >
        {actionLabel}
      </button>
    </div>
  );
}

export default NotificationCard;