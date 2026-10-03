import { useState } from "react";
import { FiMessageSquare, FiInfo, FiX, FiSend } from "react-icons/fi";

function MessageAdminModal({ isOpen, onClose, notification }) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setShowReply(false);
      setReplyText("");
    }, 1500);
  };

  const handleClose = () => {
    setShowReply(false);
    setReplyText("");
    setSent(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border-[3.5px] border-blue-700 shadow-2xl w-full max-w-[480px] p-6 space-y-4 animate-scaleIn relative">
        {/* Top Close (Red Badge) */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-5 h-5 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center text-xs transition-colors"
          aria-label="Close"
        >
          <FiX className="w-3.5 h-3.5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3.5 pr-8">
          <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <FiMessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Message from Admin
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Regarding Claim CLM-1024
            </p>
          </div>
        </div>

        {/* Message Bubble Box */}
        <div className="border border-blue-200 rounded-xl p-3.5 bg-blue-50/20 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-700">
            <FiInfo className="w-3.5 h-3.5 text-blue-500" />
            <span>Admin • 10:15 AM</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Please confirm your preferred handover location for your claim. Ensure you bring the necessary ownership verification details.
          </p>
        </div>

        {/* Details Rows */}
        <div className="space-y-1.5 text-xs pt-1">
          <div className="flex items-center justify-between text-slate-600">
            <span>Related Item</span>
            <span className="font-semibold text-blue-600">iPhone 13</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>Claim Status</span>
            <span className="font-semibold text-emerald-600">Approved</span>
          </div>
        </div>

        {/* Interactive Reply Area */}
        {showReply && (
          <form onSubmit={handleSendReply} className="pt-2 space-y-2 animate-fadeIn border-t border-slate-100">
            {sent ? (
              <p className="text-xs text-emerald-600 font-semibold text-center py-2">
                Reply sent to Admin successfully!
              </p>
            ) : (
              <>
                <textarea
                  rows={2}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your message to Admin..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 resize-none"
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors"
                  >
                    <FiSend className="w-3 h-3" />
                    <span>Send Reply</span>
                  </button>
                </div>
              </>
            )}
          </form>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-slate-300 hover:bg-slate-400 text-slate-700 font-medium text-xs transition-colors"
          >
            <FiX className="w-4 h-4" />
            <span>Close</span>
          </button>

          <button
            type="button"
            onClick={() => setShowReply(!showReply)}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors shadow-sm"
          >
            Open Conversation
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageAdminModal;
