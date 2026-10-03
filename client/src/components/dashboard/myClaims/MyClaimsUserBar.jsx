import { FiUser } from "react-icons/fi";
import NotificationBell from "../../common/NotificationBell";

function MyClaimsUserBar({ user }) {
  return (
    <div className="flex items-center justify-end gap-4">
      <NotificationBell />

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
