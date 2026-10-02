import { useState } from "react";
import { FiX } from "react-icons/fi";
import {
  AllItemsCardsData,
  allItemsTableData,
} from "../../../data/AdminModuleData/AllItems";

const AllItemsCards = ({ items = allItemsTableData, onCardSelect = () => {} }) => {
  const [selectedCards, setSelectedCards] = useState(null);

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
    <>
      {/* card section */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {dynamicCards.map((Card) => {
          const Icon = Card.icon;

          return (
            <button
              key={Card.id}
              type="button"
              onClick={() => {
                onCardSelect(Card.id);
                setSelectedCards(Card);
              }}
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
                +{Card.change} from last month
              </p>
            </button>
          );
        })}
      </div>

      {/* card popup */}
      {selectedCards && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm"
          onClick={() => setSelectedCards(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-5 sm:p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${selectedCards.iconBg}`}
                >
                  {(() => {
                    const Icon = selectedCards.icon;
                    return <Icon size={24} strokeWidth={2} className={selectedCards.iconColor} />;
                  })()}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#2A3B63]">
                  {selectedCards.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCards(null)}
                className="shrink-0 rounded-full p-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-[#2A3B63]"
                aria-label="Close popup"
              >
                <FiX size={22} />
              </button>
            </div>

            <div className="mt-6">
              <p className="text-sm font-normal text-[#29292D]">
                {selectedCards.description}
              </p>
              <p className="mt-2 text-4xl font-bold text-[#0F3292]">
                {selectedCards.value}
              </p>
              <p className="mt-3 text-sm font-medium text-[#0F3292]">
                +{selectedCards.change} from last month
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedCards(null)}
              className="mt-6 w-full rounded-xl bg-[#2563EB] px-4 py-3 text-base font-semibold text-white transition-all hover:bg-[#0F3292]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AllItemsCards;
