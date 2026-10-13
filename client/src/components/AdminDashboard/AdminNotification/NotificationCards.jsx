import {
  FiBell,
  FiCheckCircle,
  FiFileText,
  FiShield,
} from "react-icons/fi";

const NotificationCards = ({
  notifications = [],
  activeFilter = "All",
  setActiveFilter,
}) => {
  const totalCount = notifications.length;
  const unreadCount = notifications.filter(
    (n) => !n.read && !n.isRead
  ).length;
  const reportsCount = notifications.filter(
    (n) =>
      (n.category && n.category.toLowerCase() === "reports") ||
      n.type === "approval" ||
      n.type === "rejection" ||
      n.type === "report" ||
      n.type === "found"
  ).length;
  const claimsCount = notifications.filter(
    (n) =>
      (n.category && n.category.toLowerCase() === "claims") ||
      n.type === "claim"
  ).length;

  const cards = [
    {
      id: "all",
      filterKey: "All",
      title: "Total Notifications",
      value: totalCount,
      change: `${totalCount} logged`,
      icon: FiBell,
      iconBg: "bg-[#E0F2FE]",
      iconColor: "text-[#2563EB]",
      changeColor: "text-[#08A568]",
    },
    {
      id: "unread",
      filterKey: "Unread",
      title: "Unread",
      value: unreadCount,
      change: unreadCount > 0 ? `${unreadCount} requires review` : "All caught up",
      icon: FiCheckCircle,
      iconBg: unreadCount > 0 ? "bg-amber-100" : "bg-[#E0F2FE]",
      iconColor: unreadCount > 0 ? "text-amber-600" : "text-[#2563EB]",
      changeColor: unreadCount > 0 ? "text-amber-600" : "text-[#08A568]",
    },
    {
      id: "reports",
      filterKey: "Reports",
      title: "Report Notifications",
      value: reportsCount,
      change: `${reportsCount} reports`,
      icon: FiFileText,
      iconBg: "bg-[#DDF8EC]",
      iconColor: "text-[#08A568]",
      changeColor: "text-[#08A568]",
    },
    {
      id: "claims",
      filterKey: "Claims",
      title: "Claim Notifications",
      value: claimsCount,
      change: `${claimsCount} claims`,
      icon: FiShield,
      iconBg: "bg-[#EEE8FF]",
      iconColor: "text-[#7C3AED]",
      changeColor: "text-[#08A568]",
    },
  ];

  return (
    <section
      className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = activeFilter === card.filterKey;

        return (
          <div
            key={card.id}
            onClick={() => {
              if (setActiveFilter) {
                setActiveFilter(card.filterKey);
              }
            }}
            role={setActiveFilter ? "button" : undefined}
            tabIndex={setActiveFilter ? 0 : undefined}
            onKeyDown={(e) => {
              if (setActiveFilter && (e.key === "Enter" || e.key === " ")) {
                setActiveFilter(card.filterKey);
              }
            }}
            className={`
              group
              rounded-2xl
              border
              p-5
              shadow-sm
              transition-all
              duration-300
              ${setActiveFilter ? "cursor-pointer" : ""}
              ${
                isSelected
                  ? "border-[#2563EB] ring-2 ring-[#2563EB]/20 bg-blue-50/20 shadow-md -translate-y-0.5"
                  : "border-gray-200 bg-white hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-lg"
              }
            `}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={`
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  transition-transform
                  duration-300
                  group-hover:scale-105
                  ${card.iconBg}
                `}
              >
                <Icon
                  size={24}
                  strokeWidth={2}
                  className={card.iconColor}
                />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <h3
                  className="
                    text-base
                    font-semibold
                    leading-tight
                    text-[#2A3B63]
                    sm:text-lg
                  "
                >
                  {card.title}
                </h3>

                <p
                  className="
                    mt-2
                    text-3xl
                    font-bold
                    leading-tight
                    text-[#0F3292]
                  "
                >
                  {card.value}
                </p>

                <p
                  className={`
                    mt-2
                    text-xs
                    font-medium
                    ${card.changeColor}
                  `}
                >
                  ● {card.change}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default NotificationCards;