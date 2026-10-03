import { FiHelpCircle } from "react-icons/fi";

function FaqDropdownModal({ faq, isOpen, onClose }) {
  if (!isOpen || !faq) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border-[3.5px] border-blue-700 shadow-2xl w-full max-w-[440px] p-6 space-y-5 animate-scaleIn">
        {/* Header */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <FiHelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              {faq.question}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {faq.subtitle || "To proceed, follow these steps:"}
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3 pt-1">
          {faq.steps?.map((stepText, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="w-5.5 h-5.5 rounded-full bg-blue-100 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                {stepText}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default FaqDropdownModal;
