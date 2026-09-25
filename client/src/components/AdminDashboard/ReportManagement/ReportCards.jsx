
import { ReportCardsData } from "../../../data/AdminModuleData/ReportManagement";
import { useState } from "react";
import { X } from "lucide-react";


const ReportCards = ({ reports = [] }) => {
  const [selectedCards, setSelectedCards] = useState(null);

  const totalReports = reports.length;
  const pendingCount = reports.filter((r) => r.status === "Pending").length;
  const approvedCount = reports.filter((r) => r.status === "Approved").length;
  const rejectedCount = reports.filter((r) => r.status === "Rejected").length;

  const getCardValue = (title) => {
    if (title.includes("Total")) {
      return totalReports;
    }
    if (title.includes("Pending")) {
      return pendingCount;
    }
    if (title.includes("Approved")) {
      return approvedCount;
    }
    if (title.includes("Rejected")) {
      return rejectedCount;
    }
  };

  return (
    <>
      {/* Report Cards */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {ReportCardsData.map((Card) => {
          const Icon = Card.icon;

          return (
            <button
              key={Card.title}
              type="button"
              onClick={() => setSelectedCards(Card)}
              className="
                group
                rounded-2xl
                border border-gray-200
                bg-white
                p-5
                text-left
                shadow-sm
                transition-all
                duration-300
                ease-in-out
                hover:-translate-y-1
                hover:border-[#2563EB]
                hover:shadow-lg
              "
            >
              <div className="flex items-start gap-4">

                {/* report card Icon */}
                <div
                  className={`
                    flex h-14 w-14 shrink-0
                    items-center justify-center
                    rounded-full
                    transition-transform duration-300
                    group-hover:scale-105
                    ${Card.iconBg}
                  `}
                >
                  <Icon
                    size={28}
                    strokeWidth={2}
                    className={Card.iconColor}
                  />
                </div>

                {/* card Content */}

                <div className="flex-1">

                  {/* Card Title */}

                  <h3 className="text-xl font-semibold text-[#2A3B63]">
                    {Card.title}
                  </h3>

                  {/* card Value */}

                  <p className="mt-1 text-3xl font-bold text-[#0F3292]">
                    {getCardValue(Card.title)}
                  </p>

                  {/*card Description */}

                  <p className="mt-1 text-sm font-normal text-[#29292D]">
                    {Card.description}
                  </p>

                </div>
              </div>

              {/* card Changes */}
              <p className="mt-4 text-xs font-medium text-[#0F3292]">
                ↑ {Card.change} from last month
              </p>
            </button>
          );
        })}
      </div>

      {/*card Popup effect */}
      {selectedCards && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setSelectedCards(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* card Popup Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${selectedCards.iconBg}`}
                >
                  <selectedCards.icon
                    size={24}
                    className={selectedCards.iconColor}
                  />
                </div>

                <h2 className="text-2xl font-bold text-[#2A3B63]">
                  {selectedCards.title}
                </h2>

              </div>

              <button
                type="button"
                onClick={() => setSelectedCards(null)}
                className="
                  rounded-full
                  p-2
                  text-gray-500
                  transition
                  hover:bg-gray-100
                  hover:text-[#2A3B63]
                "
              >
                <X size={22} />
              </button>
            </div>

            {/* Popup Content */}
            <div className="mt-6">
              <p className="text-sm text-[#29292D]">
                {selectedCards.description}
              </p>

              <p className="mt-2 text-4xl font-bold text-[#0F3292]">
                {getCardValue(selectedCards.title)}
              </p>

              <p className="mt-3 text-sm font-medium text-[#0F3292]">
                {selectedCards.change} from last month
              </p>
            </div>

            {/* Close Button(when opening of clicking card) */}
            <button
              type="button"
              onClick={() => setSelectedCards(null)}
              className="
                mt-6
                w-full
                rounded-xl
                bg-[#2563EB]
                px-4
                py-3
                text-base
                font-semibold
                text-white
                transition
                hover:bg-[#0F3292]
              "
            >
              Close
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default ReportCards;