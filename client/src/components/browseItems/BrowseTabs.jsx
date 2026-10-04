function BrowseTabs({ activeTab, onTabChange, counts }) {
  const tabs = [
    {
      id: "all",
      label: "All Items",
      count: counts.all,
    },
    {
      id: "Lost",
      label: "Lost Items",
      count: counts.lost,
    },
    {
      id: "Found",
      label: "Found Items",
      count: counts.found,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer active:scale-95 ${
              isActive
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-sky-200 hover:bg-sky-300 text-sky-900"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        );
      })}
    </div>
  );
}

export default BrowseTabs;
