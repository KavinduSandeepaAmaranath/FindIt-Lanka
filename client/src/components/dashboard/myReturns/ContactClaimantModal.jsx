import { useState } from "react";
import { FiX, FiPhone, FiMail, FiSend, FiCopy, FiCheck, FiUser } from "react-icons/fi";

function ContactClaimantModal({ item, onClose, onMessageSent }) {
  const [copiedField, setCopiedField] = useState(null);
  const [message, setMessage] = useState(
    `Hello ${item?.claimedBy || "Kasun"}, regarding your claim for "${item?.title || "the item"}" on FindIt Lanka. I would like to coordinate the handover details.`
  );
  const [isSending, setIsSending] = useState(false);

  if (!item) return null;

  const handleCopy = (text, field) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      onMessageSent?.(`Message sent successfully to ${item.claimedBy}!`);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl p-6 sm:p-7 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Claimant Header */}
        <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-blue-100 border-2 border-blue-200 flex items-center justify-center text-blue-700 font-bold shrink-0">
            {item.claimantAvatar ? (
              <img
                src={item.claimantAvatar}
                alt={item.claimedBy}
                className="w-full h-full object-cover"
              />
            ) : (
              <FiUser className="w-6 h-6" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Contact {item.claimedBy}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Claimant for: <span className="font-bold text-blue-700">{item.title}</span>
            </p>
          </div>
        </div>

        {/* Contact shortcuts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50/70 border border-blue-100">
            <div className="flex items-center gap-2.5 truncate">
              <FiPhone className="w-4 h-4 text-blue-600 shrink-0" />
              <div className="truncate">
                <p className="text-[10px] uppercase font-bold text-blue-800">Phone</p>
                <p className="text-xs font-bold text-slate-900 truncate">
                  {item.claimantPhone || "+94 77 123 4567"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(item.claimantPhone || "+94 77 123 4567", "phone")}
              className="p-1.5 rounded-lg hover:bg-white text-blue-700 transition-colors cursor-pointer"
              title="Copy phone"
            >
              {copiedField === "phone" ? (
                <FiCheck className="w-4 h-4 text-emerald-600" />
              ) : (
                <FiCopy className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50/70 border border-blue-100">
            <div className="flex items-center gap-2.5 truncate">
              <FiMail className="w-4 h-4 text-blue-600 shrink-0" />
              <div className="truncate">
                <p className="text-[10px] uppercase font-bold text-blue-800">Email</p>
                <p className="text-xs font-bold text-slate-900 truncate">
                  {item.claimantEmail || "kasun.p@example.com"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(item.claimantEmail || "kasun.perera@example.com", "email")}
              className="p-1.5 rounded-lg hover:bg-white text-blue-700 transition-colors cursor-pointer"
              title="Copy email"
            >
              {copiedField === "email" ? (
                <FiCheck className="w-4 h-4 text-emerald-600" />
              ) : (
                <FiCopy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* In-app Message Form */}
        <form onSubmit={handleSend} className="space-y-3">
          <label className="block text-xs font-bold text-slate-700">
            Send Secure Message via FindIt Lanka
          </label>
          <textarea
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full text-xs text-slate-800 border border-slate-200 rounded-2xl p-3.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
            placeholder="Type your message to claimant..."
          />

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending || !message.trim()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              <FiSend className="w-3.5 h-3.5" />
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactClaimantModal;
