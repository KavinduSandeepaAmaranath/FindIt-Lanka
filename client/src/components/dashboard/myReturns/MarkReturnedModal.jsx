import { useState } from "react";
import { FiX, FiCheckCircle, FiPackage, FiShield } from "react-icons/fi";

function MarkReturnedModal({ item, onClose, onConfirm }) {
  const [handoverMethod, setHandoverMethod] = useState("In-Person Handover");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onConfirm(item.id, {
        handoverMethod,
        note,
        returnedOn: new Date().toISOString(),
      });
      onClose();
    }, 600);
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

        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <FiCheckCircle className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Confirm Item Return
            </h3>
            <p className="text-xs text-slate-500">
              Mark this item as successfully returned to its owner.
            </p>
          </div>
        </div>

        {/* Item preview card */}
        <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
          <img
            src={item.image}
            alt={item.title}
            className="w-16 h-14 rounded-xl object-cover bg-slate-200 shrink-0"
          />
          <div className="min-w-0">
            <h4 className="font-bold text-slate-900 text-sm truncate">
              {item.title}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Claimant: <span className="font-bold text-slate-700">{item.claimedBy}</span>
            </p>
            <p className="text-[11px] text-blue-600 font-mono mt-0.5">
              Ref: {item.referenceNo}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Handover Method
            </label>
            <select
              value={handoverMethod}
              onChange={(e) => setHandoverMethod(e.target.value)}
              className="w-full text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-500"
            >
              <option value="In-Person Handover">In-Person Handover</option>
              <option value="Campus / Building Security Desk">Campus / Building Security Desk</option>
              <option value="Police Station Lost & Found Desk">Police Station Lost & Found Desk</option>
              <option value="Courier Delivery">Courier Delivery</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Return Confirmation Note (Optional)
            </label>
            <textarea
              rows="3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Identity verified via NIC and item was handed over in good condition."
              className="w-full text-xs text-slate-800 border border-slate-200 rounded-xl p-3 focus:border-blue-500 outline-none resize-none"
            />
          </div>

          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900">
            <FiShield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              By marking this item as returned, both your profile and the claimant's trust score will increase!
            </p>
          </div>

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
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              <FiPackage className="w-4 h-4" />
              {isSubmitting ? "Confirming..." : "Confirm Handover"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MarkReturnedModal;
