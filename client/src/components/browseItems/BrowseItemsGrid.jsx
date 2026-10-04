import BrowseItemCard from "./BrowseItemCard";
import { FiInbox } from "react-icons/fi";

function BrowseItemsGrid({ items, onResetFilters, onViewDetails }) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
          <FiInbox className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-800">
          No items found matching your filters
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mt-1 mb-5">
          Try adjusting your search terms, removing filter constraints, or switching categories.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
      {items.map((item) => (
        <BrowseItemCard
          key={item.id}
          item={item}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}

export default BrowseItemsGrid;
