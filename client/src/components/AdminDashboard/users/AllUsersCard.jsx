const UsersCard = ({ stats, selectedFilter = "All Users", onCardClick }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
      {stats.map((item) => {
        const Icon = item.icon;

        // Check whether this card matches the active filter
        const isSelected =
          (selectedFilter === "All Users" && item.title === "Total Users") ||
          (selectedFilter === "Active Users" && item.title === "Active Users") ||
          ((selectedFilter === "Suspend Users" || selectedFilter === "Suspended Users") &&
            item.title === "Suspended Users") ||
          (selectedFilter === "New Users" && (item.title === "New Users" || item.title.includes("New")));

        return (
          <button
            key={item.title}
            type="button"
            onClick={() => onCardClick?.(item.title)}
            className={`
              group flex flex-col justify-between
              rounded-2xl border bg-white
              p-5 text-left shadow-sm
              transition-all duration-300 ease-in-out
              hover:-translate-y-1 hover:shadow-lg
              cursor-pointer focus:outline-none
              ${
                isSelected
                  ? "border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-md"
                  : "border-gray-200 hover:border-[#2563EB]"
              }
            `}
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
          </button>
        );
      })}
    </section>
  );
};

export default UsersCard;