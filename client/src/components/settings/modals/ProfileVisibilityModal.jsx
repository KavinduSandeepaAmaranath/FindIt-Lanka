import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

function ProfileVisibilityModal({
  isOpen,
  onClose,
  currentValue = "everyone", // "everyone", "registered", or "only_me"
  onSave,
}) {
  const [selected, setSelected] = useState(currentValue);

  useEffect(() => {
    if (isOpen) {
      setSelected(currentValue);
    }
  }, [isOpen, currentValue]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onSave(selected);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border-[3px] border-[#1e3a8a] shadow-2xl p-6 sm:p-7 max-w-[380px] w-full relative animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:bg-red-500 hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer"
          aria-label="Close"
        >
          <FiX className="w-4 h-4" />
        </button>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900">
          Profile Visibility
        </h3>
        <p className="text-[11px] text-slate-500 mt-0.5 mb-4 leading-normal">
          Who can view your basic profile information?
        </p>

        {/* Radio Options List */}
        <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden bg-white">
          {/* Option 1: Everyone */}
          <div
            onClick={() => setSelected("everyone")}
            className={`p-3 sm:p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
              selected === "everyone" ? "bg-blue-50/30" : "hover:bg-slate-50"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                  selected === "everyone"
                    ? "border-2 border-blue-600"
                    : "border border-slate-300 bg-white"
                }`}
              >
                {selected === "everyone" && (
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                )}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">
                Everyone
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Anyone can view your profile.
              </p>
            </div>
          </div>

          {/* Option 2: Registered Users */}
          <div
            onClick={() => setSelected("registered")}
            className={`p-3 sm:p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
              selected === "registered" ? "bg-blue-50/30" : "hover:bg-slate-50"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                  selected === "registered"
                    ? "border-2 border-blue-600"
                    : "border border-slate-300 bg-white"
                }`}
              >
                {selected === "registered" && (
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                )}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">
                Registered Users
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Only registered users can view your profile.
              </p>
            </div>
          </div>

          {/* Option 3: Only Me */}
          <div
            onClick={() => setSelected("only_me")}
            className={`p-3 sm:p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
              selected === "only_me" ? "bg-blue-50/30" : "hover:bg-slate-50"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                  selected === "only_me"
                    ? "border-2 border-blue-600"
                    : "border border-slate-300 bg-white"
                }`}
              >
                {selected === "only_me" && (
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                )}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">
                Only Me
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Only you can view your profile.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <FiX className="w-3.5 h-3.5" />
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold transition shadow-sm cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileVisibilityModal;
