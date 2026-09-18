function NotificationCategories({ categories, counts, activeCategory, onSelect }) {
  return (
    <aside className="bg-white rounded-2xl shadow-md border border-slate-100 p-4 lg:w-60 lg:shrink-0 lg:self-start">
      <h2 className="text-sm font-extrabold text-blue-800 mb-3 text-center lg:text-left">
        Notification Categories
      </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-2">
        {categories.map(({ key, label }) => {
          const active = activeCategory === key;
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                active
                  ? "bg-blue-100 text-blue-800"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="truncate">{label}</span>
              <span className="text-xs shrink-0">({counts[key]})</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default NotificationCategories;