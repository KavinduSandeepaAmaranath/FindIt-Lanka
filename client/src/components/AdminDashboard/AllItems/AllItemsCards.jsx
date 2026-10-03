import {
  AllItemsCardsData,
  allItemsTableData,
} from "../../../data/AdminModuleData/AllItems";

const AllItemsCards = ({ items = allItemsTableData, onCardSelect = () => {} }) => {
  // Dynamic card value calculations
  const totalCount = items.length;
  const lostCount = items.filter((i) => i.type === "Lost").length;
  const foundCount = items.filter((i) => i.type === "Found").length;
  const claimedCount = items.filter((i) => i.claimStatus === "Claimed").length;
  const returnedCount = items.filter((i) => i.itemStatus === "Returned").length;

  const dynamicCards = AllItemsCardsData.map((card) => {
    let val = card.value;
    if (card.id === 1) val = `${totalCount}`;
    if (card.id === 2) val = `${lostCount}`;
    if (card.id === 3) val = `${foundCount}`;
    if (card.id === 4) val = `${claimedCount}`;
    if (card.id === 5) val = `${returnedCount}`;

    return {
      ...card,
      value: val,
    };
  });

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {dynamicCards.map((Card) => {
        const Icon = Card.icon;

        return (
          <button
            key={Card.id}
            type="button"
            onClick={() => onCardSelect(Card.id)}
            className="
              group w-full rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm
              transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30
            "
          >
            {/*card headers*/}
            <div className="flex items-start gap-4">
              {/* Icons */}
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 ${Card.iconBg}`}
              >
                <Icon size={27} strokeWidth={2} className={Card.iconColor} />
              </div>

              {/* Card Content */}
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-[#2A3B63] leading-tight truncate">
                  {Card.title}
                </h3>
                <p className="mt-1 text-3xl font-bold text-[#0F3292] leading-tight">
                  {Card.value}
                </p>
                <p className="mt-1 text-sm font-normal text-[#29292D] leading-5 truncate">
                  {Card.description}
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs font-medium text-[#0F3292]">
              +${Card.change} from last month
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default AllItemsCards;
