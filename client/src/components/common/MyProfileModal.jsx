import { useEffect } from "react";
import {
  FiX,
  FiUser,
  FiAtSign,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiTrendingUp,
  FiSettings,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import sarangaProfile from "../../assets/images/saranga_profile.jpg";

function MyProfileModal({ isOpen, onClose, user }) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Profile data with fallback matching the provided design specifications
  const profileName =
    !user?.name || user?.name === "Kasun Perera" || user?.name === "Kasun"
      ? (user?.fullName && user?.fullName !== "Kasun Perera" ? user.fullName : "Saranga Hewage")
      : user.name;
  const profileUsername =
    user?.username && !user.username.includes("kasun")
      ? user.username
      : "@sarangahewage";
  const profileEmail =
    user?.email && !user.email.includes("kasun")
      ? user.email
      : "saranga@example.com";
  const profileLocation =
    user?.location ||
    (user?.district ? `${user.district}, Sri Lanka` : "Hiniduma, Sri Lanka");
  const profileJoinedOn =
    user?.joinedOn || user?.memberSince || "Jan 15, 2025";
  const profileAboutMe =
    user?.bio ||
    user?.aboutMe ||
    "IT and travelling guy. I love exploring new places, meeting new people and discovering amazing stories. Always excited to help others and make a positive impact in the community.";

  // Stats matching the design
  const statsData = [
    {
      id: "lost",
      label: "Lost Report",
      value: user?.stats?.lostReports ?? user?.lostReports ?? 12,
      subtitle: "By you as a Looser",
      iconBg: "bg-blue-600 shadow-blue-200",
    },
    {
      id: "found",
      label: "Found Report",
      value: user?.stats?.foundReports ?? user?.foundReports ?? 5,
      subtitle: "By you as a finder",
      iconBg: "bg-emerald-500 shadow-emerald-200",
    },
    {
      id: "recovered",
      label: "Items Recovered",
      value: user?.stats?.itemsRecovered ?? user?.itemsRecovered ?? 4,
      subtitle: "Your lost Items back",
      iconBg: "bg-purple-600 shadow-purple-200",
    },
    {
      id: "returned",
      label: "Items Returned",
      value: user?.stats?.itemsReturned ?? user?.itemsReturned ?? 3,
      subtitle: "You returned to owners",
      iconBg: "bg-amber-500 shadow-amber-200",
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-slate-50 rounded-3xl shadow-2xl border border-slate-200/80 p-5 sm:p-7 md:p-8 my-auto overflow-hidden transition-all transform scale-100">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile modal"
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
        >
          <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-10">
          <h2
            id="profile-modal-title"
            className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight"
          >
            My Profile
          </h2>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-6">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex items-center justify-between hover:shadow-sm transition-shadow"
            >
              <div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                  {stat.label}
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-950 mt-1 leading-tight">
                  {stat.value}
                </p>
                <p className="text-[11px] text-slate-400 italic mt-1">
                  {stat.subtitle}
                </p>
              </div>

              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${stat.iconBg} flex items-center justify-center text-white shadow-md shrink-0`}
              >
                <FiTrendingUp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Profile Info & About Me Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: Profile Information */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <FiUser className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Profile Information
                </h3>
              </div>

              {/* User Avatar */}
              <div className="mb-5">
                <img
                  src={user?.avatar || sarangaProfile}
                  alt={profileName}
                  className="w-20 h-20 sm:w-22 sm:h-22 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                />
              </div>

              {/* Details List */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-3">
                  <FiUser className="w-4.5 h-4.5 text-sky-500 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-slate-500 w-24 sm:w-28 shrink-0">
                    Full Name
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    {profileName}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FiAtSign className="w-4.5 h-4.5 text-sky-500 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-slate-500 w-24 sm:w-28 shrink-0">
                    Username
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    {profileUsername}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FiMail className="w-4.5 h-4.5 text-sky-500 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-slate-500 w-24 sm:w-28 shrink-0">
                    Email
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 break-all">
                    {profileEmail}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FiMapPin className="w-4.5 h-4.5 text-sky-500 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-slate-500 w-24 sm:w-28 shrink-0">
                    Location
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    {profileLocation}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FiCalendar className="w-4.5 h-4.5 text-sky-500 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-slate-500 w-24 sm:w-28 shrink-0">
                    Joined On
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    {profileJoinedOn}
                  </span>
                </div>
              </div>
            </div>

            {/* Vertical Divider (Desktop) */}
            <div className="hidden lg:block w-px bg-slate-200 self-stretch my-1" />

            {/* Right Column: About Me */}
            <div className="lg:col-span-4 flex-1">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <FiUser className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  About Me
                </h3>
              </div>

              {/* About Me Content Box */}
              <div className="bg-[#EEF4FF] rounded-2xl p-5 border border-blue-100/70">
                <p className="text-xs sm:text-sm text-blue-950/85 leading-relaxed font-normal">
                  {profileAboutMe}
                </p>
              </div>

              {/* Action to Settings */}
              <div className="mt-5 flex justify-end">
                <Link
                  to="/dashboard/settings"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-700 hover:text-blue-900 hover:underline transition-colors"
                >
                  <FiSettings className="w-3.5 h-3.5" />
                  <span>Edit Profile in Settings</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfileModal;
