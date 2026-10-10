import {
  claimCardsData,
  claimTableData,
} from "../../../data/AdminModuleData/ClaimManagement";

const ClaimCards = ({ activeTab = "All", setActiveTab }) => {
  const totalClaims = claimTableData.length;
  const inProgressCount = claimTableData.filter(
    (c) => c.status === "In Progress" || c.status === "Submitted"
  ).length;
  const completedCount = claimTableData.filter(
    (c) => c.status === "Completed" || c.status === "Accepted"
  ).length;
  const rejectedCount = claimTableData.filter(
    (c) => c.status === "Rejected"
  ).length;

  const getCount = (cardTitle) => {
    if (cardTitle.includes("Total")) return totalClaims;
    if (cardTitle.includes("Progress")) return inProgressCount;
    if (cardTitle.includes("Completed")) return completedCount;
    if (cardTitle.includes("Rejected")) return rejectedCount;
    return 0;
  };

  const handleCardClick = (cardTitle) => {
    if (!setActiveTab) return;
    if (cardTitle.includes("Total")) setActiveTab("All");
    else if (cardTitle.includes("Progress")) setActiveTab("Submitted");
    else if (cardTitle.includes("Completed")) setActiveTab("Completed");
    else if (cardTitle.includes("Rejected")) setActiveTab("Rejected");
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5">
      {claimCardsData.map((card) => {
        const Icon = card.icon;

        const isSelected =
          (activeTab === "All" && card.title.includes("Total")) ||
          (activeTab === "Submitted" && card.title.includes("Progress")) ||
          (activeTab === "Completed" && card.title.includes("Completed")) ||
          (activeTab === "Rejected" && card.title.includes("Rejected"));

        return (
          <button
            key={card.id || card.title}
            type="button"
            onClick={() => handleCardClick(card.title)}
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
            {/* Top row: Icon + (Title, Value) */}
            <div className="flex items-start gap-4">
              <div
                className={`
                  flex h-14 w-14 shrink-0
                  items-center justify-center
                  rounded-full
                  transition-transform duration-300
                  group-hover:scale-105
                  ${card.iconBg || "bg-blue-50"}
                `}
              >
                <Icon
                  size={26}
                  strokeWidth={2}
                  className={card.iconColor || "text-blue-500"}
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-base lg:text-lg font-semibold text-[#2A3B63] truncate">
                  {card.title}
                </h3>
                <p className="mt-1 text-3xl font-bold text-[#0F3292]">
                  {getCount(card.title) || card.value}
                </p>
              </div>
            </div>

            {/* Footer */}
            {card.changeText && (
              <p className="mt-4 text-xs font-medium text-[#0F3292]">
                {card.changeText}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ClaimCards;