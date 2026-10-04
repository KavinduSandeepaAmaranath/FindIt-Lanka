import { FiUser } from "react-icons/fi";
import { useProfileModal } from "../../context/ProfileModalContext";
import sarangaProfile from "../../assets/images/saranga_profile.jpg";

function UserProfileBadge({
  user,
  className = "",
  showText = true,
  avatarClassName = "w-10 h-10",
  textClassName = "",
  roleClassName = "text-blue-600",
  onClick,
}) {
  const { openProfile } = useProfileModal();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    openProfile(user);
  };

  const displayName =
    !user?.name || user?.name === "Kasun Perera" || user?.name === "Kasun"
      ? (user?.fullName && user?.fullName !== "Kasun Perera" ? user.fullName : "Saranga Hewage")
      : user.name;
  const displayRole = "Pro Member";
  const avatarSrc = user?.avatar || sarangaProfile;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`View ${displayName}'s profile`}
      title="View My Profile"
      className={`group flex items-center gap-3 text-left p-1 rounded-2xl hover:bg-slate-100/80 active:scale-95 transition-all cursor-pointer select-none ${className}`}
    >
      {showText && (
        <div className={`text-right hidden sm:block ${textClassName}`}>
          <p className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
            {displayName}
          </p>
          <p className={`text-xs font-medium mt-0.5 ${roleClassName}`}>
            {displayRole}
          </p>
        </div>
      )}

      <div
        className={`relative ${avatarClassName} rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 overflow-hidden ring-2 ring-transparent group-hover:ring-blue-300 transition-all shadow-xs`}
      >
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={displayName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <FiUser className="w-5 h-5 text-blue-700" />
        )}
      </div>
    </button>
  );
}

export default UserProfileBadge;
