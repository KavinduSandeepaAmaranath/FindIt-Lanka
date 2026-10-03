import { FiHeadphones } from "react-icons/fi";

function HelpStillNeedHelp({ onContactSupport }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5">
      {/* Left side: Icon & Text */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 shrink-0">
          <FiHeadphones className="w-7 h-7" />
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Still need help?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Our support team is here to help you with your questions.
          </p>
        </div>
      </div>

      {/* Right side: Contact Support Button */}
      <button
        type="button"
        onClick={onContactSupport}
        className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-sm hover:shadow active:scale-[0.98] shrink-0 self-start sm:self-auto"
      >
        Contact Support
      </button>
    </div>
  );
}

export default HelpStillNeedHelp;