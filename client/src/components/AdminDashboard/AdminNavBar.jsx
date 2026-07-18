import LogoImg from "../../assets/images/LogoImg.jpg";

import {
  MdDashboard,
  MdPeople,
  MdNotifications,
  MdSettings,
  MdInventory,
  MdAssignment,
  MdVerifiedUser,
  MdAssessment,
  MdClose,
} from "react-icons/md";

const menuItems = [
  {
    title: "Admin Dashboard",
    icon: MdDashboard,
    active: true,
  },
  {
    title: "Users",
    icon: MdPeople,
  },
  {
    title: "Reports",
    icon: MdAssessment,
  },
  {
    title: "All Items",
    icon: MdInventory,
  },
  {
    title: "Approvals",
    icon: MdVerifiedUser,
  },
  {
    title: "Claims",
    icon: MdAssignment,
  },
  {
    title: "Notifications",
    icon: MdNotifications,
  },
  {
    title: "Settings",
    icon: MdSettings,
  },
];

export default function AdminNavBar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

<aside
  className={`
    fixed top-0 left-0 z-50
    h-screen
    w-72 lg:w-64
    bg-gradient-to-b
    from-blue-700
    to-blue-600
    text-white
    shadow-2xl
    transition-transform
    duration-300

    ${isOpen ? "translate-x-0" : "-translate-x-full"}

    lg:translate-x-0
    lg:fixed
  `}
>
        {/* Close Button - Mobile Only */}
        <div className="flex justify-end p-4 lg:hidden">
          <button onClick={() => setIsOpen(false)}>
            <MdClose className="text-3xl text-white" />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-blue-500">

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

        </div>

        {/* Menu */}
        <nav className="mt-6 px-4">

          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={index}
                className={`
                  flex
                  items-center
                  w-full
                  gap-4
                  rounded-xl
                  px-5
                  py-3
                  mb-2
                  transition-all
                  duration-300

                  ${
                    item.active
                      ? "bg-white text-blue-700 shadow-lg"
                      : "hover:bg-blue-500/40 hover:text-white"
                  }
                `}
              >
                <Icon
                  className={`text-xl ${
                    item.active
                      ? "text-blue-700"
                      : "text-blue-100"
                  }`}
                />

                <span className="font-medium">
                  {item.title}
                </span>
              </button>
            );
          })}

        </nav>
      </aside>
    </>
  );
}