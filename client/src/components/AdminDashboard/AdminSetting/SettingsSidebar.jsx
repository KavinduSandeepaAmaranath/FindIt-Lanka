import {
  settingsSidebarData,
} from "../../../data/AdminModuleData/AdminSetting";

const SettingsSidebar = ({
  activeSection,
  setActiveSection,
}) => {
  return (
    <aside
      className="
        w-full
        shrink-0
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-4
        shadow-sm
        lg:w-[230px]
        xl:w-[245px]
      "
    >

      <h2
        className="
          mb-4
          px-2
          text-sm
          font-bold
          uppercase
          tracking-wide
          text-[#2A3B63]
        "
      >
        Settings
      </h2>

      <nav
        className="
          grid
          grid-cols-2
          gap-2
          sm:grid-cols-3
          lg:grid-cols-1
        "
      >

        {settingsSidebarData.map(
          (item) => {
            const Icon = item.icon;

            const isActive =
              activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  setActiveSection(item.id)
                }
                className={`
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-3
                  text-left
                  text-sm
                  font-medium
                  transition-all
                  duration-200

                  ${
                    item.danger
                      ? `
                        text-red-500
                        hover:bg-red-50
                      `
                      : isActive
                      ? `
                        bg-blue-100
                        text-[#2563EB]
                      `
                      : `
                        text-[#2A3B63]
                        hover:bg-blue-50
                        hover:text-[#2563EB]
                      `
                  }
                `}
              >
                <Icon
                  size={18}
                  className="shrink-0"
                />

                <span>
                  {item.title}
                </span>
              </button>
            );
          }
        )}

      </nav>

    </aside>
  );
};

export default SettingsSidebar;