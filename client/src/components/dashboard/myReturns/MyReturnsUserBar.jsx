import NotificationBell from "../../common/NotificationBell";
import UserProfileBadge from "../../common/UserProfileBadge";

function MyReturnsUserBar({ user }) {
  return (
    <div className="flex items-center justify-end gap-4">
      {/* Notification bell */}
      <NotificationBell />

      {/* User profile capsule */}
      <UserProfileBadge user={user} />
    </div>
  );
}

export default MyReturnsUserBar;

