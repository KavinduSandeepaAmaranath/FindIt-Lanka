import { FiHelpCircle, FiChevronUp } from "react-icons/fi";

function HelpFaqSection({ faqs, onSelectFaq }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
      {/* Section Header */}
      <div className="flex items-center gap-3.5 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 shrink-0">
          <FiHelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-blue-950">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Quick answers to common questions.
          </p>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            onClick={() => onSelectFaq(faq)}
            className="rounded-xl border bg-slate-50/80 hover:bg-blue-50/40 hover:border-blue-300 border-slate-200/70 transition-all duration-200 cursor-pointer group shadow-2xs"
          >
            <div className="w-full flex items-center justify-between text-left px-5 py-4">
              <span className="text-sm sm:text-base font-medium text-slate-800 group-hover:text-blue-700 transition-colors pr-4">
                {faq.question}
              </span>

              <div className="text-blue-400 group-hover:text-blue-600 shrink-0 transition-transform">
                <FiChevronUp className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HelpFaqSection;
