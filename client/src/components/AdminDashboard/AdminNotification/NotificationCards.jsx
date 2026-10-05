import {
  notificationCardsData,
} from "../../../data/AdminModuleData/AdminNotification";

const NotificationCards = () => {
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

      {notificationCardsData.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className="
              group
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-5
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-[#2563EB]
              hover:shadow-lg
            "
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
                  ↑ {card.change}
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