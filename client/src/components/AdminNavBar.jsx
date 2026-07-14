import 'react' 

import LogoImg from "../assets/images/LogoImg.jpg";

import {
  MdDashboard,
  MdPeople,
  MdNotifications,
  MdSettings,
  MdInventory,
  MdAssignment,
  MdVerifiedUser,
  MdAssessment,

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

export default function AdminNavBar() {
  return (
    <aside className="
        
        left-0
        top-0
        h-screen
        w-64 sm:w-72
        bg-gradient-to-b
        from-blue-700
        to-blue-600
        text-white
        shadow-2xl
      "
    >

{/* logo section */}

      <div className="flex items-center gap-3 px-4 sm:px-7 py-6 sm:py-8 border-b-3 border-blue-500">

      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">

        <img
                  src={LogoImg}
                  alt="Logo"
                  className="
                    w-full
                    h-full
                    object-cover 
                  "
                />
        </div>

{/* logo title */}

        <div>
          <h2 className="text-lg sm:text-xl font-bold">
            FindIt Lanka
          </h2>

          <p className="text-xs text-blue-100">
            Lost & Found Portal
          </p>
        </div>
        </div>

      

    <nav className="mt-4 sm:mt-6 px-3 sm:px-4">

        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={index}
              className={`group flex w-full items-center gap-4 rounded-xl px-5 py-3 mb-2 transition-all duration-300 hover:bg-blue-500/40 hover:text-white hover:shadow-md


              ${
                item.active
                  ? "bg-white text-blue-700 shadow-lg"
                  : "hover:bg-blue-500 hover:text-white transition-all duration-300"
              }`}
            >
              <Icon
                className={`text-lg sm:text-xl ${
                  item.active
                    ? "text-blue-700"
                    : "text-blue-100"
                }`}
              />

              <span className="text-sm sm:text-base font-medium">
                {item.title}
              </span>
            </button>
          );
        })}
      </nav>


      </aside>

  )
}
