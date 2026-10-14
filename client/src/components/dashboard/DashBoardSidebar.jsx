import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiGrid,
  FiFileText,
  FiCheckSquare,
  FiSearch,
  FiBell,
  FiSettings,
  FiHelpCircle,
  FiInfo,
  FiSend,
  FiMenu,
  FiX,
} from "react-icons/fi";
import logo from "../../assets/images/Loginlogo.png";
import { useNotifications } from "../../context/NotificationContext";

function MyReturnsIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M9 13.5l-3 2.5 3 2.5" />
      <path d="M6 16h6.5a2.5 2.5 0 0 0 2.5-2.5v-.5" />
    </svg>
  );
}

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: FiGrid },
  { label: "Browse Items", to: "/dashboard/browse", icon: FiSearch },
  { label: "My Reports", to: "/dashboard/my-reports", icon: FiFileText },
  { label: "My Claims", to: "/dashboard/my-claims", icon: FiCheckSquare },
  { label: "My Returns", to: "/dashboard/my-returns", icon: MyReturnsIcon },
  {
    label: "Report Lost Item",
    to: "/report-lost-item",
    icon: FiSend,
  },
  {
    label: "Report Found Item",
    to: "/report-found-item",
    icon: FiSend,
  },
  { label: "Notifications", to: "/dashboard/notifications", icon: FiBell },
  { label: "Settings", to: "/dashboard/settings", icon: FiSettings },
  { label: "Help", to: "/dashboard/help", icon: FiHelpCircle },
];

function DashboardSidebar({ onOpenLostReport, onOpenFoundReport }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { hasUnread, unreadCount } = useNotifications();

  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      {/* Mobile topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-blue-950 text-white shadow-sm">
        <Link to="/dashboard" className="flex items-center gap-2">
          <img
            src={logo}
            alt="FindIt Lanka logo"
            className="w-9 h-9 rounded-full object-cover bg-white"
          />
          <p className="text-base font-bold leading-tight">FindIt Lanka</p>
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={closeDrawer}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar drawer */}
      <aside
        className={`
          fixed top-[60px] lg:top-0 bottom-0 left-0 z-40 w-72 flex flex-col
          bg-gradient-to-b from-blue-800 to-blue-950 text-white
          transform transition-transform duration-300 ease-in-out shadow-2xl
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:sticky lg:translate-x-0 lg:flex lg:w-72 lg:shrink-0 lg:h-screen lg:self-start
        `}
      >
        <div className="px-7 pt-8 pb-6 border-b border-white/10 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3" onClick={closeDrawer}>
            <img
              src={logo}
              alt="FindIt Lanka logo"
              className="w-11 h-11 rounded-full object-cover bg-white"
            />
            <div>
              <p className="text-lg font-bold leading-tight">FindIt Lanka</p>
              <p className="text-xs text-blue-200">Lost &amp; Found Portal</p>
            </div>
          </Link>

          <button
            onClick={closeDrawer}
            aria-label="Close menu"
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map(({ label, to, icon: Icon }) => {
            const active =
              location.pathname === to ||
              (to === "/dashboard/browse" &&
                (location.pathname === "/dashboard/browse" ||
                  location.pathname === "/browse"));

            if (label === "Report Lost Item" || label === "Add Lost Reports") {
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    closeDrawer();
                    if (onOpenLostReport) {
                      onOpenLostReport();
                    } else {
                      navigate(to);
                    }
                  }}
                  className={`
                    relative
                    w-full
                    flex
                    items-center
                    px-3.5
                    py-3
                    rounded-xl
                    text-sm
                    font-semibold
                    transition-colors
                    duration-200
                    cursor-pointer
                    ${
                      active
                        ? "text-blue-900 font-semibold"
                        : "text-blue-100 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  {active && (
                    <motion.div
                      layoutId="activeUserTab"
                      className="absolute inset-0 rounded-xl bg-white shadow-md"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-3">
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{label}</span>
                  </span>
                </button>
              );
            }

            if (label === "Report Found Item" || label === "Add Found Reports") {
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    closeDrawer();
                    if (onOpenFoundReport) {
                      onOpenFoundReport();
                    } else {
                      navigate(to);
                    }
                  }}
                  className={`
                    relative
                    w-full
                    flex
                    items-center
                    px-3.5
                    py-3
                    rounded-xl
                    text-sm
                    font-semibold
                    transition-colors
                    duration-200
                    cursor-pointer
                    ${
                      active
                        ? "text-blue-900 font-semibold"
                        : "text-blue-100 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  {active && (
                    <motion.div
                      layoutId="activeUserTab"
                      className="absolute inset-0 rounded-xl bg-white shadow-md"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-3">
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{label}</span>
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={label}
                to={to}
                onClick={closeDrawer}
                className={`relative flex items-center px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors duration-200 ${
                  active
                    ? "text-blue-900 font-semibold"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeUserTab"
                    className="absolute inset-0 rounded-xl bg-white shadow-md"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 32,
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-between w-full">
                  <span className="flex items-center gap-3">
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{label}</span>
                  </span>
                  {to === "/dashboard/notifications" && hasUnread && (
                    <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default DashboardSidebar;