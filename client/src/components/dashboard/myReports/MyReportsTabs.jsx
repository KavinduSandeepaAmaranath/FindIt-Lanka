function MyReportsTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {tabs.map(({ value, label, count }) => {
        const active = activeTab === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => onTabChange(value)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              active
                ? "bg-blue-700 text-white shadow-sm"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            {label} ({count})
          </button>
        );
      })}
    </div>
  );
}

export default MyReportsTabs;
