import { FiInbox } from "react-icons/fi";
import ReportRow from "./ReportRow";

function ReportsList({ reports, onViewDetails }) {
  if (reports.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm py-16 flex flex-col items-center gap-3 text-center px-6">
        <span className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          <FiInbox className="w-6 h-6" />
        </span>
        <p className="text-lg font-bold text-slate-900">No reports found</p>
        <p className="text-sm text-slate-500 max-w-sm">
          Try changing the filters or the search words you used. Your submitted
          reports will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {reports.map((report) => (
        <ReportRow
          key={report.id}
          report={report}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}

export default ReportsList;
