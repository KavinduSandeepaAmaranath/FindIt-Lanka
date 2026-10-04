import { claimCardsData } from "../../../data/AdminModuleData/ClaimManagement";

const ClaimCards = () => {
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
      {claimCardsData.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className="
              group
              min-h-[135px]
              rounded-[14px]
              border
              border-[#8F8F8F]
              bg-white
              px-4
              py-4
              shadow-[0_3px_3px_rgba(0,0,0,0.16)]
              transition-all
              duration-300
              ease-in-out
              hover:-translate-y-1
              hover:border-[#2563EB]
              hover:shadow-[0_6px_14px_rgba(37,99,235,0.18)]
            "
          >
            {/* TOP */}
            <div className="flex items-start gap-5">
              {/* ICON */}
              <div
                className={`
                  flex
                  h-[52px]
                  w-[52px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  ${card.iconBg}
                  transition-transform
                  duration-300
                  ease-in-out
                  group-hover:scale-105
                `}
              >
                <Icon
                  size={31}
                  strokeWidth={2.5}
                  className={card.iconColor}
                />
              </div>

              {/* TEXT */}
              <div>
                <h3
                  className="
                    text-[16px]
                    font-semibold
                    text-[#283A5E]
                    underline
                    decoration-[1px]
                    underline-offset-2
                  "
                >
                  {card.title}
                </h3>

                <p
                  className="
                    mt-1
                    text-[28px]
                    font-bold
                    leading-tight
                    text-[#123E91]
                  "
                >
                  {card.value}
                </p>
              </div>
            </div>

            {/* CHANGE */}
            <p className="mt-5 text-[8px] text-[#173D7A]">
              {card.changeText}
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default ClaimCards;