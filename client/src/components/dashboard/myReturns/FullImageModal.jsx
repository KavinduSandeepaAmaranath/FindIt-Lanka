import { FiX } from "react-icons/fi";

function FullImageModal({ imageUrl, title, onClose }) {
  if (!imageUrl) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative max-w-3xl w-full bg-white rounded-2xl p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          aria-label="Close image preview"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <FiX className="w-5 h-5" />
        </button>

        <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
          Proof Image Preview • {title}
        </p>

        <div className="w-full max-h-[75vh] overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full max-h-[75vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default FullImageModal;
