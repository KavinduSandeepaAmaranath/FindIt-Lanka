import { FiInbox } from "react-icons/fi";
import ReturnCard from "./ReturnCard";

function ReturnsList({
  returns,
  onViewDetails,
  onContactClaimant,
  onMarkReturned,
}) {
  if (returns.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-slate-200 shadow-xs py-16 flex flex-col items-center gap-3 text-center px-6">
        <span className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          <FiInbox className="w-6 h-6" />
        </span>
        <p className="text-lg font-bold text-slate-900">No returns found</p>
        <p className="text-sm text-slate-500 max-w-sm">
          No return items match your active filters or search keywords. Try adjusting the filter or search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {returns.map((item) => (
        <ReturnCard
          key={item.id}
          item={item}
          onViewDetails={onViewDetails}
          onContactClaimant={onContactClaimant}
          onMarkReturned={onMarkReturned}
        />
      ))}
    </div>
  );
}

export default ReturnsList;
