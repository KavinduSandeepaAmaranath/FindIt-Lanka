import { FiSend } from "react-icons/fi";

function BrowseHeader({ onOpenFoundReport, onOpenLostReport }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
      {/* Title & 3D Isometric Cube Icon */}
      <div className="flex items-start gap-4">
        {/* Green 3D Isometric Cube matching screenshot */}
        <div className="w-12 h-12 shrink-0 flex items-center justify-center">
          <svg
            className="w-11 h-11"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top Face */}
            <path
              d="M24 4L42 14.5L24 25L6 14.5L24 4Z"
              fill="#86EFAC"
              fillOpacity="0.4"
              stroke="#16A34A"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Left Face */}
            <path
              d="M6 14.5V33.5L24 44V25L6 14.5Z"
              fill="#4ADE80"
              fillOpacity="0.3"
              stroke="#16A34A"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Right Face */}
            <path
              d="M24 25V44L42 33.5V14.5L24 25Z"
              fill="#22C55E"
              fillOpacity="0.2"
              stroke="#16A34A"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Cube Inner Highlight */}
            <path
              d="M24 25V44"
              stroke="#16A34A"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Browse Items
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Discover lost and found items around your university and community.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
        <button
          type="button"
          onClick={onOpenFoundReport}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-sky-200 bg-sky-50/80 hover:bg-sky-100 text-sky-700 text-xs md:text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <FiSend className="w-3.5 h-3.5 rotate-45 text-sky-600" />
          <span>Report Found Item</span>
        </button>

        <button
          type="button"
          onClick={onOpenLostReport}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-sky-200 bg-sky-50/80 hover:bg-sky-100 text-sky-700 text-xs md:text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <FiSend className="w-3.5 h-3.5 rotate-45 text-sky-600" />
          <span>Report Lost Item</span>
        </button>
      </div>
    </div>
  );
}

export default BrowseHeader;
