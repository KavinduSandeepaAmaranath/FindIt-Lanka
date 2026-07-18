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
} from "react-icons/fi";
import logo from "../../assets/images/Loginlogo.png";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: FiGrid },
  { label: "My Reports", to: "/dashboard/my-reports", icon: FiFileText },
  { label: "My Found Items", to: "/dashboard/my-found-items", icon: FiCheckSquare },
  { label: "Browse Found Items", to: "/dashboard/browse-found", icon: FiSearch },
  { label: "Notifications", to: "/dashboard/notifications", icon: FiBell },
  { label: "Settings", to: "/dashboard/settings", icon: FiSettings },
  { label: "Help", to: "/dashboard/help", icon: FiHelpCircle },
];

function DashboardSidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:shrink-0 bg-gradient-to-b from-blue-800 to-blue-950 text-white min-h-screen sticky top-0">
      <div className="px-7 pt-8 pb-6 border-b border-white/10">
        <Link to="/dashboard" className="flex items-center gap-3">
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
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ label, to, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={label}
              to={to}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                active
                  ? "bg-white text-blue-900 shadow-sm"
                  : "text-blue-100 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-7 pt-3 border-t border-white/10">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold transition-colors shadow-sm">
          <FiSend className="w-4 h-4" />
          Report Lost Item
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
