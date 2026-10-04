import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import UserProfileBadge from "../common/UserProfileBadge";

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
        <Link
          to="/dashboard/notifications"
          className="relative p-2 text-amber-500 hover:text-amber-600 transition-colors"
          title="Notifications"
        >
          <FaBell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </Link>

        <UserProfileBadge user={user} />
      </div>
    </div>
  );
}

export default HelpHeader;
