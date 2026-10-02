import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

function LocationVisibilityModal({
  isOpen,
  onClose,
  currentValue = "exact", // "exact", "approximate", or "hidden"
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
          Location Visibility
        </h3>
        <p className="text-[11px] text-slate-500 mt-0.5 mb-4 leading-normal">
          Control how your location information is displayed.
        </p>

        {/* Radio Options List */}
        <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden bg-white">
          {/* Option 1: Exact Location */}
          <div
            onClick={() => setSelected("exact")}
            className={`p-3 sm:p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
              selected === "exact" ? "bg-blue-50/30" : "hover:bg-slate-50"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                  selected === "exact"
                    ? "border-2 border-blue-600"
                    : "border border-slate-300 bg-white"
                }`}
              >
                {selected === "exact" && (
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                )}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">
                Exact Location
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Show your exact location.
              </p>
            </div>
          </div>

          {/* Option 2: Approximate Location */}
          <div
            onClick={() => setSelected("approximate")}
            className={`p-3 sm:p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
              selected === "approximate" ? "bg-blue-50/30" : "hover:bg-slate-50"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                  selected === "approximate"
                    ? "border-2 border-blue-600"
                    : "border border-slate-300 bg-white"
                }`}
              >
                {selected === "approximate" && (
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                )}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">
                Approximate Location
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Show a generalized area (e.g., city or district).
              </p>
            </div>
          </div>

          {/* Option 3: Hide Location */}
          <div
            onClick={() => setSelected("hidden")}
            className={`p-3 sm:p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
              selected === "hidden" ? "bg-blue-50/30" : "hover:bg-slate-50"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                  selected === "hidden"
                    ? "border-2 border-blue-600"
                    : "border border-slate-300 bg-white"
                }`}
              >
                {selected === "hidden" && (
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                )}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">
                Hide Location
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Do not show your location.
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

export default LocationVisibilityModal;
