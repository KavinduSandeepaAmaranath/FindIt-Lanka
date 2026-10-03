import { FiX, FiCheck, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function CategoryGuideModal({ category, isOpen, onClose, onOpenLost, onOpenFound, onOpenContact }) {
  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-scaleIn border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/70">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{category.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{category.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {category.guides?.map((guide, idx) => (
            <div key={idx} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70">
              <h4 className="text-sm font-bold text-blue-900 mb-2.5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">
                  {idx + 1}
                </span>
                {guide.title}
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 pl-8">
                {guide.steps.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2">
                    <FiCheck className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contextual Action Buttons */}
          <div className="pt-2 flex flex-wrap gap-3">
            {category.id === "getting-started" && (
              <>
                <button
                  onClick={() => {
                    onClose();
                    onOpenLost();
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <span>Submit Lost Item</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenFound();
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                >
                  Submit Found Item
                </button>
              </>
            )}

            {category.id === "finding-claiming" && (
              <Link
                to="/dashboard/browse-found"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>Browse Items</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            {category.id === "safety-account" && (
              <Link
                to="/dashboard/settings"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>Account Settings</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            {category.id === "contact-support" && (
              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>Open Contact Modal</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryGuideModal;
