import { FiUser } from "react-icons/fi";
import NotificationBell from "../common/NotificationBell";

function HelpHeader({ user }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-950 tracking-tight">
          Help &amp; Support
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-1">
          Find answers to common questions and learn how to use FindIt Lanka.
        </p>
      </div>

      {/* User Profile & Notifications */}
      <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
        <NotificationBell />

        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-slate-900 leading-tight">
            {user?.name || "Kasun Perera"}
          </p>
          <p className="text-xs text-blue-600 font-medium">
            {user?.membership || "Pro Member"}
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm ring-2 ring-blue-100">
          <FiUser className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

export default HelpHeader;
