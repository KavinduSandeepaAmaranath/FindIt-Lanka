import {
  AllItemsCardsData,
  allItemsTableData,
} from "../../../data/AdminModuleData/AllItems";

const AllItemsCards = ({ items = allItemsTableData, onCardSelect = () => { } }) => {
  //Dynamic card value & percentage calculations
  const totalCount = items.length;
  const lostCount = items.filter((i) => i.type === "Lost").length;
  const foundCount = items.filter((i) => i.type === "Found").length;
  const claimedCount = items.filter((i) => i.claimStatus === "Claimed").length;
  const returnedCount = items.filter((i) => i.itemStatus === "Returned").length;

  const calcPercent = (count) =>
    totalCount > 0 ? ((count / totalCount) * 100).toFixed(1) : "0.0";

  const dynamicCards = AllItemsCardsData.map((card) => {
    let val = card.value;
    let subtitle = "";

    if (card.id === 1) {
      val = String(totalCount);
      subtitle = String(totalCount) + " total registered items";
    } else if (card.id === 2) {
      val = String(lostCount);
      subtitle = calcPercent(lostCount) + "% of total items";
    } else if (card.id === 3) {
      val = String(foundCount);
      subtitle = calcPercent(foundCount) + "% of total items";
    } else if (card.id === 4) {
      val = String(claimedCount);
      subtitle = calcPercent(claimedCount) + "% of total items";
    } else if (card.id === 5) {
      val = String(returnedCount);
      subtitle = calcPercent(returnedCount) + "% of total items";
    }

    return {
      ...card,
      value: val,
      subtitle,
    };
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {dynamicCards.map((Card) => {
        const Icon = Card.icon;

        return (
          <button
            key={Card.id}
            type="button"
            onClick={() => onCardSelect(Card.id)}
            className="
              group flex flex-col justify-between w-full min-h-[145px] rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 text-left shadow-sm
              transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30
            "
          >
            {/*card headers*/}
            <div className="flex items-start gap-3">
              {/* Icons */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 ${Card.iconBg}`}
              >
                <Icon size={22} strokeWidth={2} className={Card.iconColor} />
              </div>

              {/*card content */}
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-base font-semibold text-[#2A3B63] leading-snug">
                  {Card.title}
                </h3>
                <p className="mt-1 text-2xl sm:text-3xl font-bold text-[#0F3292] leading-tight">
                  {Card.value}
                </p>
                <p className="mt-0.5 text-xs font-normal text-[#64748B] leading-tight">
                  {Card.description}
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs font-medium text-[#0F3292]">
              {Card.subtitle}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default AllItemsCards;
