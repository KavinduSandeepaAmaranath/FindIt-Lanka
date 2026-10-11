export default function DashboardCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-8 sm:mb-10">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              group flex flex-col justify-between
              rounded-2xl border border-gray-200 bg-white
              p-5 text-left shadow-sm
              transition-all duration-300 ease-in-out
              hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-lg
            "
          >
            {/* Top row: Icon + (Title, Value, Subtitle) */}
            <div className="flex items-start gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 ${
                  item.iconBg || "bg-blue-50"
                }`}
              >
                <Icon className={`text-2xl ${item.iconColor || "text-blue-600"}`} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-[#2A3B63] truncate">
                  {item.title}
                </h3>
                <p className="mt-1 text-3xl font-bold text-[#0F3292]">
                  {item.value}
                </p>
                {item.description && (
                  <p className="mt-0.5 text-xs text-[#64748B]">
                    {item.description}
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            {item.sub && (
              <p className="mt-4 text-xs font-medium text-[#0F3292]">
                {item.sub}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}