import { useEffect, useState } from "react";

function ContactFinderModal({ claim, isOpen, onClose }) {
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOpenChat = () => {
    setFeedbackMessage({
      type: "chat",
      text: "Opening chat with the finder...",
    });
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 2500);
  };

  const handleSendEmail = () => {
    const email = claim?.finderEmail || "support@finditlanka.lk";
    const subject = encodeURIComponent(
      `Inquiry regarding approved claim: ${claim?.title || "Item"}`
    );
    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[500px] sm:max-w-[540px] rounded-2xl sm:rounded-3xl bg-white border-[3px] sm:border-[4px] border-[#1d4ed8] shadow-2xl p-6 sm:p-8"
      >
        {/* Top Header */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1d4ed8] flex items-center justify-center text-white shrink-0 shadow-sm">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f2d6b] tracking-tight">
              Contact Finder
            </h2>
            <p className="text-xs sm:text-sm text-[#0f2d6b] font-medium mt-0.5">
              Choose how you want to contact the claimant.
            </p>
          </div>
        </div>

        {/* Options Cards */}
        <div className="mt-6 space-y-4">
          {/* Option 1: Open Chat */}
          <button
            type="button"
            onClick={handleOpenChat}
            className="w-full border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-center gap-4 bg-white hover:border-blue-500 hover:shadow-md transition-all text-left cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <svg
                className="w-8 h-8 text-[#2563eb] group-hover:scale-105 transition-transform"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
            </div>

            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-[#0f2d6b] underline underline-offset-2 decoration-[#0f2d6b] group-hover:text-blue-700">
                Open Chat
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Start a conversation in the app
              </p>
            </div>
          </button>

          {/* Option 2: Send Email */}
          <button
            type="button"
            onClick={handleSendEmail}
            className="w-full border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-center gap-4 bg-white hover:border-blue-500 hover:shadow-md transition-all text-left cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <svg
                className="w-8 h-8 text-[#38bdf8] group-hover:scale-105 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <line x1="8" y1="9" x2="16" y2="9" />
                <line x1="8" y1="13" x2="13" y2="13" />
              </svg>
            </div>

            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-[#0f2d6b] underline underline-offset-2 decoration-[#0f2d6b] group-hover:text-blue-700">
                Send Email
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Send an email to the claimant
              </p>
            </div>
          </button>
        </div>

        {/* Temporary Feedback Notification if clicked */}
        {feedbackMessage && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-700 font-medium text-center animate-fadeIn">
            {feedbackMessage.text}
          </div>
        )}

        {/* Bottom Cancel Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-[#b8c4d2] hover:bg-[#a6b4c4] text-slate-800 font-medium text-xs sm:text-sm transition-colors border border-slate-300 shadow-sm"
          >
            <svg
              className="w-3.5 h-3.5 text-slate-700 stroke-[2.5]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactFinderModal;
