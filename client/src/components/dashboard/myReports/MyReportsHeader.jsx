import { FiFileText } from "react-icons/fi";

function MyReportsHeader() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-700 shrink-0 mt-1">
        <FiFileText className="w-5.5 h-5.5" />
      </div>

      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 leading-tight">
          My Reports
        </h1>
        <p className="text-sm text-slate-500 mt-1.5">
          View and manage the lost and found reports you have submitted.
        </p>
      </div>
    </div>
  );
}

export default MyReportsHeader;
