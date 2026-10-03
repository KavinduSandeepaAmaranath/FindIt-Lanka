import { FiUser } from "react-icons/fi";
import defaultAvatar from "../../../assets/images/LpKasunPerera.jpg";
import NotificationBell from "../../common/NotificationBell";

function MyReturnsUserBar({ user }) {
  return (
    <div className="flex items-center justify-end gap-4">
      {/* Notification bell */}
      <NotificationBell />

      {/* User profile capsule matching sketch */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-slate-900 leading-tight">
            {user?.name || "Kasun Perera"}
          </p>
          <p className="text-xs text-orange-600 font-semibold mt-0.5">
            {user?.membership || "Pro Member"}
          </p>
        </div>
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-blue-500 ring-2 ring-blue-100 flex items-center justify-center text-white shrink-0 shadow-sm">
          {defaultAvatar ? (
            <img
              src={defaultAvatar}
              alt={user?.name || "Kasun Perera"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <FiUser className="w-5 h-5" />
          )}
        </div>
      </div>
    </div>
  );
}

export default MyReturnsUserBar;
