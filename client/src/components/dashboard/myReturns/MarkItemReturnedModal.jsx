import { useState } from "react";
import { FiX, FiPackage } from "react-icons/fi";

function MarkItemReturnedModal({ item, onClose, onConfirm }) {
  const [returnMethod, setReturnMethod] = useState("University Collection Point");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!item) return null;

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onConfirm(item.id, {
        handoverMethod: returnMethod,
        note,
        returnedOn: new Date().toISOString(),
      });
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-md rounded-2xl bg-white border-2 border-blue-700 shadow-2xl p-6 sm:p-7 space-y-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-slate-700 hover:text-rose-600 transition-colors cursor-pointer p-1"
        >
          <FiX className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Header row with green package circle */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#16a34a] flex items-center justify-center text-white shrink-0 shadow-xs">
            <FiPackage className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              Mark Item as Returned
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Have you successfully returned this item to the claimant?
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* Return Date */}
          <div className="text-xs space-y-0.5">
            <p className="text-slate-500 font-semibold">Return Date</p>
            <p className="font-bold text-slate-900">{currentDate}</p>
          </div>

          {/* Return Method Radio Options */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-900 border-b border-slate-300 pb-0.5 inline-block">
              Return Method
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="returnMethod"
                  value="In Person"
                  checked={returnMethod === "In Person"}
                  onChange={(e) => setReturnMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                />
                <span className="font-semibold text-slate-800">In Person</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="returnMethod"
                  value="University Collection Point"
                  checked={returnMethod === "University Collection Point"}
                  onChange={(e) => setReturnMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                />
                <span className="font-semibold text-slate-800">
                  University Collection Point
                </span>
              </label>
            </div>
          </div>

          {/* Optional Note */}
          <div>
            <label
              htmlFor="return-note"
              className="block text-xs font-bold text-slate-900 mb-1.5"
            >
              Optional Note
            </label>
            <textarea
              id="return-note"
              rows="3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add any additional notes..."
              className="w-full text-xs text-slate-800 border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none transition-colors"
            />
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1 px-5 py-2 rounded-full bg-slate-400 hover:bg-slate-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <FiX className="w-3.5 h-3.5 stroke-[2.5]" />
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Confirming..." : "Confirm Return"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MarkItemReturnedModal;
