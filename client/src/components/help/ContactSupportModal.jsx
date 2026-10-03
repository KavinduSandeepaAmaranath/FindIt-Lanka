import { FiPhoneCall, FiMail, FiMessageSquare, FiX } from "react-icons/fi";

function ContactSupportModal({ isOpen, onClose, onOpenForm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border-[3.5px] border-blue-700 shadow-2xl w-full max-w-[440px] p-6 space-y-5 animate-scaleIn">
        {/* Header */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <FiPhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              Contact Support
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              We&apos;re here to help. Choose how you&apos;d like to get in touch.
            </p>
          </div>
        </div>

        {/* 3 Contact Options matching UI */}
        <div className="space-y-3 pt-1">
          {/* 1. Email Support */}
          <a
            href="mailto:support@finditlanka.lk"
            className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 transition-all cursor-pointer group"
          >
            <FiMail className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Email Support
              </h4>
              <p className="text-xs text-slate-500">support@finditlanka.lk</p>
            </div>
          </a>

          {/* 2. Send a Support Request (Opens Form Modal) */}
          <div
            onClick={() => {
              if (onOpenForm) {
                onOpenForm();
              }
            }}
            className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 transition-all cursor-pointer group"
          >
            <FiMessageSquare className="w-5 h-5 text-blue-400 shrink-0" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Send a Support Request
              </h4>
              <p className="text-xs text-slate-500">
                Fill out the form and we&apos;ll get back to you.
              </p>
            </div>
          </div>

          {/* 3. Emergency Contact */}
          <a
            href="tel:+94771234567"
            className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 transition-all cursor-pointer group"
          >
            <FiMessageSquare className="w-5 h-5 text-blue-400 shrink-0" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Emergency Contact
              </h4>
              <p className="text-xs text-slate-500">
                +94 77 123 4567 (Mon - Fri, 9AM - 5PM)
              </p>
            </div>
          </a>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-300 hover:bg-slate-400 text-slate-700 font-medium text-xs sm:text-sm transition-colors"
          >
            <FiX className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactSupportModal;