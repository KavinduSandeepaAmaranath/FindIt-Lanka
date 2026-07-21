import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiFileText,
  FiCheckSquare,
  FiSearch,
  FiBell,
  FiSettings,
  FiHelpCircle,
  FiSend,
  FiMenu,
  FiX,
} from "react-icons/fi";
import logo from "../../assets/images/Loginlogo.png";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: FiGrid },
  { label: "My Reports", to: "/dashboard/my-reports", icon: FiFileText },
  { label: "My Found Items", to: "/dashboard/my-found-items", icon: FiCheckSquare },
  { label: "Browse Found Items", to: "/dashboard/browse-found", icon: FiSearch },
  {
    label: "Add Lost Reports",
    to: "/report-lost-item",
    icon: FiSend,
  },
  {
    label: "Add Found Reports",
    to: "/report-found-item",
    icon: FiSend,
  },
  { label: "Notifications", to: "/dashboard/notifications", icon: FiBell },
  { label: "Settings", to: "/dashboard/settings", icon: FiSettings },
  { label: "Help", to: "/dashboard/help", icon: FiHelpCircle },
  
];

function DashboardSidebar({onOpenLostReport}) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const closeDrawer = () => setIsOpen(false);

  return (
    <>
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

      {/*overlay*/}
      {isOpen && (
        <div
          onClick={closeDrawer}
          className="fixed top-[60px] inset-x-0 bottom-0 z-30 bg-black/50 lg:hidden"
        />
      )}

      {/*sidebar drawer*/}
      <aside
        className={`
          fixed top-[60px] bottom-0 left-0 z-40 w-72 flex flex-col
          bg-gradient-to-b from-blue-800 to-blue-950 text-white
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:sticky lg:top-0 lg:translate-x-0 lg:flex lg:w-72 lg:shrink-0 lg:h-screen lg:self-start
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

        {/*new update this nav part*/}

        <nav className="flex-1 px-4 py-6 space-y-1">
  {navItems.map(({ label, to, icon: Icon }) => {
    const active = location.pathname === to;

    // ✅ Add Lost Reports -> Modal Open
    if (label === "Add Lost Reports") {
      return (
        <button
          key={label}
          onClick={() => {
            closeDrawer();
            onOpenLostReport();
          }}
          className="
            w-full
            flex
            items-center
            gap-3
            px-3.5
            py-3
            rounded-xl
            text-sm
            font-semibold
            text-blue-100
            hover:bg-white/10
            hover:text-white
            transition-colors
          "
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </button>
      );
    }

    // ✅ All other menu items
    return (
      <Link
        key={label}
        to={to}
        onClick={closeDrawer}
        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
          active
            ? "bg-white text-blue-900 shadow-sm"
            : "text-blue-100 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Icon className="w-5 h-5" />
        <span>{label}</span>
      </Link>
    );
  })}
</nav>

      </aside>
    </>
  );
}

export default DashboardSidebar;