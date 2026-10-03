
import { ReportCardsData } from "../../../data/AdminModuleData/ReportManagement";
<<<<<<< HEAD
import { useState } from "react";
import { X } from "lucide-react";


const ReportCards = () => {
  const [selectedCards, setSelectedCards] = useState(null);

=======

const ReportCards = ({ reports = [], onCardSelect = () => {} }) => {
  const totalReports = reports.length;
  const pendingCount = reports.filter((r) => r.status === "Pending").length;
  const approvedCount = reports.filter((r) => r.status === "Approved").length;
  const rejectedCount = reports.filter((r) => r.status === "Rejected").length;

  const getCardValue = (title) => {
    if (title.includes("Total")) return totalReports;
    if (title.includes("Pending")) return pendingCount;
    if (title.includes("Approved")) return approvedCount;
    if (title.includes("Rejected")) return rejectedCount;
    return 0;
  };

  const getCardPercentageChange = (title) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const prevDate = new Date(currentYear, currentMonth - 1, 1);
    const prevMonth = prevDate.getMonth();
    const prevYear = prevDate.getFullYear();

    let targetReports = reports;
    if (title.includes("Pending")) {
      targetReports = reports.filter((r) => r.status === "Pending");
    } else if (title.includes("Approved")) {
      targetReports = reports.filter((r) => r.status === "Approved");
    } else if (title.includes("Rejected")) {
      targetReports = reports.filter((r) => r.status === "Rejected");
    }

    const currentCount = targetReports.filter((r) => {
      const d = new Date(r.rawDate || r.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }).length;
    const prevCount = targetReports.filter((r) => {
      const d = new Date(r.rawDate || r.date);
      return d.getMonth() === prevMonth && d.getFullYear() === prevYear;
    }).length;

    if (prevCount === 0) {
      return currentCount > 0 ? "+100%" : "0%";
    }
    const percent = ((currentCount - prevCount) / prevCount) * 100;
    const prefix = percent >= 0 ? "+" : "";
    return prefix + percent.toFixed(1) + "%";
  };

  const handleCardClick = (title) => {
    if (title.includes("Total")) onCardSelect("All");
    else if (title.includes("Pending")) onCardSelect("Pending");
    else if (title.includes("Approved")) onCardSelect("Approved");
    else if (title.includes("Rejected")) onCardSelect("Rejected");
  };

>>>>>>> 8dd1c422806a30eed6d0237448c7e727ff73ca4d
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {ReportCardsData.map((Card) => {
        const Icon = Card.icon;

<<<<<<< HEAD
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
                    {Card.value}
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
=======
        return (
          <button
            key={Card.title}
            type="button"
            onClick={() => handleCardClick(Card.title)}
            className="group rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
>>>>>>> 8dd1c422806a30eed6d0237448c7e727ff73ca4d
          >
            <div className="flex items-start gap-4">
              <div className={"flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 " + Card.iconBg}>
                <Icon size={28} strokeWidth={2} className={Card.iconColor} />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#2A3B63]">
                  {Card.title}
                </h3>
                <p className="mt-1 text-3xl font-bold text-[#0F3292]">
                  {getCardValue(Card.title)}
                </p>
              </div>
            </div>

<<<<<<< HEAD
            {/* Popup Content */}
            <div className="mt-6">
              <p className="text-sm text-[#29292D]">
                {selectedCards.description}
              </p>

              <p className="mt-2 text-4xl font-bold text-[#0F3292]">
                {selectedCards.value}
              </p>

              <p className="mt-3 text-sm font-medium text-[#0F3292]">
                ↑ {selectedCards.change} from last month
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
=======
            <p className="mt-4 text-xs font-medium text-[30F3292]">
              {getCardPercentageChange(Card.title)} from last month
            </p>
          </button>
        );
      })}
    </div>
>>>>>>> 8dd1c422806a30eed6d0237448c7e727ff73ca4d
  );

};

export default ReportCards;