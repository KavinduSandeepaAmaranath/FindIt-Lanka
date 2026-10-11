import { FiX } from "react-icons/fi";

function ReportMethodModal({ onClose, onSelectMyReport, onCreateNewReport }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-white border-4 border-blue-900 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-center">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white flex items-center justify-center shadow-xs cursor-pointer transition-colors"
        >
          <FiX className="w-3.5 h-3.5 stroke-[3]" />
        </button>

        {/* Heading & Subtitle */}
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-blue-950 inline-block border-b-2 border-blue-900 pb-0.5">
            How would you like to report this found item?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2.5">
            You can connect an existing Found Report or create a new one.
          </p>
        </div>

        {/* Option 1: Select Existing Found Report */}
        <div className="rounded-2xl border border-sky-200 bg-white p-5 text-center shadow-2xs">
          <h3 className="font-bold text-sm sm:text-base text-blue-950 mb-1">
            Select Existing Found Report
          </h3>
          <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
            Choose a Found Report you have already submitted in My Reports.
          </p>
          <button
            type="button"
            onClick={onSelectMyReport}
            className="px-8 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
          >
            Select My Report
          </button>
        </div>

        {/* Option 2: Create New Found Report */}
        <div className="rounded-2xl border border-sky-200 bg-white p-5 mt-4 text-center shadow-2xs">
          <h3 className="font-bold text-sm sm:text-base text-blue-950 mb-1">
            Create New Found Report
          </h3>
          <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
            If you haven't reported this item yet, submit a new Found Report.
          </p>
          <button
            type="button"
            onClick={onCreateNewReport}
            className="px-8 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
          >
            Create New Found Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportMethodModal;
