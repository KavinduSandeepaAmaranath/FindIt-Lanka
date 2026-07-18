import LogoImg from "../../assets/images/LogoImg.jpg";
import { MdClose } from "react-icons/md"; // kept: UI behaviour, not menu data
import { navMenuItems } from "../../data/AdminDashboard"; // menu now comes from data

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

      {/* Sidebar */}
      <aside
        className={`
          z-40 w-72 lg:w-64 bg-gradient-to-b from-blue-700 to-blue-600 text-white
          shadow-2xl transition-transform duration-300 flex-shrink-0 overflow-y-auto
          fixed top-0 left-0 h-screen
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:sticky lg:top-0 lg:h-screen lg:translate-x-0
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
            <img src={LogoImg} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-bold">FindIt Lanka</h2>
            <p className="text-xs text-blue-100">Lost & Found Portal</p>
          </div>
        </div>

        {/* Menu - now mapped from navMenuItems (data file) */}
        <nav className="mt-6 px-4 pb-6">
          {navMenuItems.map((item) => {
            const Icon = item.icon; // may be undefined if data is wrong
            return (
              <button
                key={item.id}
                className={`
                  flex items-center w-full gap-4 rounded-xl px-5 py-3 mb-2 transition-all duration-300
                  ${
                    item.active
                      ? "bg-white text-blue-700 shadow-lg"
                      : "hover:bg-blue-500/40 hover:text-white"
                  }
                `}
              >
                {Icon && (
                  <Icon
                    className={`text-xl ${
                      item.active ? "text-blue-700" : "text-blue-100"
                    }`}
                  />
                )}
                <span className="font-medium">{item.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}