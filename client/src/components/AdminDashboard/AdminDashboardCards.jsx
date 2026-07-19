import { NavLink } from "react-router-dom";

export default function DashboardCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-8 sm:mb-10">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.title}
            to={item.path}
            className="block"
          >
            <div
              className="
                bg-white/70 backdrop-blur-md
                border border-gray-200
                rounded-2xl
                p-4 sm:p-5
                shadow-md
                transition-all duration-300
                hover:-translate-y-2
                hover:shadow-2xl
                hover:border-blue-500
                hover:bg-white
                cursor-pointer
              "
            >
              {/* Card Header */}
              
              <div className="flex items-center gap-3 text-blue-500">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Icon className="text-xl sm:text-2xl" />
                </div>

                <h3 className="font-semibold text-base sm:text-lg text-slate-700">
                  {item.title}
                </h3>
              </div>

              {/* Card Value */}

              <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mt-4 sm:mt-5">
                {item.value}
              </h2>

              {/* Card Footer */}

              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                {item.sub}
              </p>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
}