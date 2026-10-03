import { useState, useRef } from "react";
import { FiHeadphones, FiUploadCloud, FiChevronDown, FiCheckCircle, FiFile, FiX } from "react-icons/fi";

function ContactSupportFormModal({ isOpen, onClose }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }
      setAttachment(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject) {
      alert("Please select a subject.");
      return;
    }
    if (!message.trim()) {
      alert("Please enter your message.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        handleReset();
      }, 1800);
    }, 600);
  };

  const handleReset = () => {
    setSubject("");
    setMessage("");
    setAttachment(null);
    setIsSubmitted(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border-[3.5px] border-blue-700 shadow-2xl w-full max-w-[440px] p-6 space-y-4 animate-scaleIn">
        {/* Header */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <FiHeadphones className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Contact Support
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Send us your question or issue and we&apos;ll get back to you soon.
            </p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <FiCheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Message Sent!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Thank you for contacting us. Our support team will review your request and get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Subject Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Subject
              </label>
              <div className="relative">
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-9 transition-colors"
                  required
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Report Lost Item Help">Report Lost Item Help</option>
                  <option value="Report Found Item Help">Report Found Item Help</option>
                  <option value="Claim Verification & Dispute">Claim Verification &amp; Dispute</option>
                  <option value="Technical Issue or Bug">Technical Issue or Bug</option>
                  <option value="Account & Security Concern">Account &amp; Security Concern</option>
                </select>
                <FiChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Message
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none transition-colors"
                required
              />
            </div>

            {/* Attachment Dropzone */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                Add Attachment (optional)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              {attachment ? (
                <div className="flex items-center justify-between p-3 rounded-xl border border-blue-200 bg-blue-50/40 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <FiFile className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="font-medium text-slate-800 truncate">
                      {attachment.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachment(null)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
                  >
                    <FiX className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border border-dashed border-blue-300 rounded-xl py-4 px-3 flex flex-col items-center justify-center text-center bg-blue-50/10 hover:bg-blue-50/30 transition-colors cursor-pointer group"
                >
                  <FiUploadCloud className="w-6 h-6 text-blue-400 mb-1 group-hover:scale-105 transition-transform" />
                  <p className="text-xs text-slate-600 font-medium">
                    Drag and drop or click to upload
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">(Max 5MB)</p>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-slate-300 hover:bg-slate-400 text-slate-700 font-medium text-xs sm:text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ContactSupportFormModal;