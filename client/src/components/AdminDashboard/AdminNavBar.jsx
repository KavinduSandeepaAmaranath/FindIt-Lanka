import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";
import LogoImg from "../../assets/images/LogoImg.jpg";
import { navMenuItems, navbarIcons } from "../../data/AdminDashboard";
import { logout } from "../../services/authService";
import AdminLogoutModal from "./AdminLogoutModal";
import { useNotifications } from "../../context/NotificationContext";

export default function AdminNavBar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const CloseIcon = navbarIcons.close;
  const { hasUnread, unreadCount } = useNotifications();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Extract admin name & initials from stored user data
  let adminName = "Admin";
  let adminInitials = "AD";

  try {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      const fullName =
        [parsed.firstName, parsed.lastName].filter(Boolean).join(" ") ||
        parsed.name ||
        parsed.email;
      if (fullName) {
        adminName = fullName;
        const parts = fullName.trim().split(" ");
        if (parts.length >= 2) {
          adminInitials = (parts[0][0] + parts[1][0]).toUpperCase();
        } else if (parts[0]) {
          adminInitials = parts[0].slice(0, 2).toUpperCase();
        }
      }
    }
  } catch {
    // fallback to defaults
  }

  const handleConfirmLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen
          w-72 lg:w-64
          bg-gradient-to-b from-blue-700 to-blue-600
          text-white shadow-2xl
          flex flex-col justify-between
          transition-transform duration-300
          z-40

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          lg:sticky lg:top-0 lg:translate-x-0
        `}
      >
        {/* Top Scrollable Section: Logo & Nav Links */}
        <div className="flex-1 overflow-y-auto">
          {/* Close Button on Mobile */}
          <div className="flex justify-end p-4 lg:hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-blue-200 transition"
              aria-label="Close navigation"
            >
              <CloseIcon className="text-3xl" />
            </button>
          </div>

          {/* Logo */}
          <NavLink
            to="/admin-dashboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-6 py-6 border-b border-blue-500/80"
          >
            <div className="h-12 w-12 rounded-full bg-white/20 overflow-hidden shrink-0">
              <img
                src={LogoImg}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                FindIt Lanka
              </h2>
              <p className="text-xs text-blue-100">
                Lost & Found Portal
              </p>
            </div>
          </NavLink>

          {/* Navigation */}
          <nav className="mt-6 px-4 pb-4">
            {navMenuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `relative flex items-center gap-4 rounded-xl px-5 py-3 mb-2 transition-colors duration-200 ${
                      isActive
                        ? "text-blue-700 font-semibold"
                        : "text-white/90 hover:bg-blue-500/40 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="activeAdminTab"
                          className="absolute inset-0 rounded-xl bg-white shadow-lg"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                          }}
                        />
                      )}

                      <span className="relative z-10 flex items-center justify-between w-full">
                        <span className="flex items-center gap-4">
                          <Icon className="text-xl" />
                          <span className="font-medium">
                            {item.title}
                          </span>
                        </span>
                        {item.path === "/admin-notification" && hasUnread && (
                          <span
                            className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                              isActive
                                ? "bg-red-500 text-white"
                                : "bg-white text-red-600 font-extrabold shadow-xs"
                            }`}
                          >
                            {unreadCount > 99 ? "99+" : unreadCount}
                          </span>
                        )}
                      </span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Admin User Info & Logout Button */}
        <div className="p-4 border-t border-blue-500/60 bg-blue-800/20 backdrop-blur-xs shrink-0">
          {/* Admin User Info Card */}
          <div className="flex items-center gap-3 px-3 py-2 mb-2.5 rounded-xl bg-white/10 text-white">
            <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs shrink-0 border border-white/20">
              {adminInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold truncate text-white">
                {adminName}
              </p>
              <p className="text-[11px] text-blue-200 truncate">
                Administrator
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setShowLogoutModal(true);
            }}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white/95 bg-white/10 hover:bg-rose-600 active:bg-rose-700 transition-all duration-200 border border-white/15 hover:border-rose-500 hover:shadow-md cursor-pointer group"
          >
            <FiLogOut className="text-base transition-transform group-hover:-translate-x-0.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Confirmation Modal */}
      <AdminLogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
        isLoading={isLoggingOut}
      />
    </>
  );
}