import { NavLink } from "react-router-dom";
import LogoImg from "../../assets/images/LogoImg.jpg";
import { navMenuItems, navbarIcons } from "../../data/AdminDashboard";

export default function AdminNavBar({ isOpen, setIsOpen }) {
  const CloseIcon = navbarIcons.close;

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
          overflow-y-auto
          transition-transform duration-300
          z-40

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          lg:sticky lg:top-0 lg:translate-x-0
        `}
      >
        {/* Close Button */}

        <div className="flex justify-end p-4 lg:hidden">
          <button onClick={() => setIsOpen(false)}>
            <CloseIcon className="text-3xl" />
          </button>
        </div>

        {/* Logo */}

        <NavLink
          to="/admin-dashboard"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 px-6 py-6 border-b border-blue-500"
        >
          <div className="h-12 w-12 rounded-full bg-white/20 overflow-hidden">
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

        <nav className="mt-6 px-4 pb-6">
          {navMenuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-xl px-5 py-3 mb-2 transition-all duration-300 ${
                    isActive
                      ? "bg-white text-blue-700 shadow-lg"
                      : "hover:bg-blue-500/40 hover:text-white"
                  }`
                }
              >
                <Icon className="text-xl" />

                <span className="font-medium">
                  {item.title}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}