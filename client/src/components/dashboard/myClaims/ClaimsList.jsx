import { FiInbox } from "react-icons/fi";
import ClaimRow from "./ClaimRow";

function ClaimsList({ claims, onViewDetails }) {
  if (claims.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm py-16 flex flex-col items-center gap-3 text-center px-6">
        <span className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          <FiInbox className="w-6 h-6" />
        </span>
        <p className="text-lg font-bold text-slate-900">No claims found</p>
        <p className="text-sm text-slate-500 max-w-sm">
          Try changing the filters or the search words you used. The items you
          claim will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {claims.map((claim) => (
        <ClaimRow key={claim.id} claim={claim} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
}

export default ClaimsList;
