import { FiBookOpen } from "react-icons/fi";

function GettingStartedModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border-[3.5px] border-blue-700 shadow-2xl w-full max-w-[440px] p-6 space-y-5 animate-scaleIn">
        {/* Header */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <FiBookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              Getting Started
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Follow these steps to start using FindIt Lanka.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3.5 pt-1">
          <div className="flex items-start gap-3">
            <span className="w-5.5 h-5.5 rounded-full bg-blue-100 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                Create an Account
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Sign up with your email or phone number.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-5.5 h-5.5 rounded-full bg-blue-100 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                Submit a Report
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Report a lost or found item with details and images.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-5.5 h-5.5 rounded-full bg-blue-100 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                Track Your Item
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Check the status of your report or claim in My Reports.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

export default GettingStartedModal;