function MyReturnsTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {tabs.map(({ value, label, count }) => {
        const active = activeTab === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => onTabChange(value)}
            className={`px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-2xs ${
              active
                ? "bg-[#1d4ed8] text-white shadow-sm ring-1 ring-blue-700"
                : "bg-sky-100/90 text-sky-800 hover:bg-sky-200/90 hover:text-sky-900"
            }`}
          >
            {label} ({count})
          </button>
        );
      })}
    </div>
  );
}

export default MyReturnsTabs;
