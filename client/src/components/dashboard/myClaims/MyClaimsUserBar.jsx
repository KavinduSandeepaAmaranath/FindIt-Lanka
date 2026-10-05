import NotificationBell from "../../common/NotificationBell";
import UserProfileBadge from "../../common/UserProfileBadge";

function MyClaimsUserBar({ user }) {
  return (
    <div className="flex items-center justify-end gap-4">
      <NotificationBell />

      <UserProfileBadge user={user} />
    </div>
  );
}

export default MyClaimsUserBar;

