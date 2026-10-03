import { FiSearch, FiInfo, FiX, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import iphoneImg from "../../../assets/images/LpIphone1.avif";

function PossibleMatchModal({ isOpen, onClose, notification }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border-[3.5px] border-blue-700 shadow-2xl w-full max-w-[480px] p-6 space-y-3.5 animate-scaleIn max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <FiSearch className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Possible Match Found
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              A potentially matching item was reported.
            </p>
          </div>
        </div>

        {/* Item Image Card */}
        <div className="border border-slate-200 rounded-2xl p-2.5 bg-slate-50/50 flex justify-center max-w-[240px] mx-auto shadow-2xs">
          <img
            src={iphoneImg}
            alt="iPhone 13"
            className="w-40 h-40 object-cover rounded-xl"
          />
        </div>

        {/* Item Meta */}
        <div className="space-y-0.5">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
            iPhone 13
          </h4>
          <p className="text-xs font-semibold text-emerald-600">Found Item</p>
          <p className="text-xs font-medium text-blue-600">Active</p>
        </div>

        {/* Item Information */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold text-slate-900 underline underline-offset-4">
            Item Information
          </h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Location</span>
              <span className="font-semibold text-slate-900">
                University Library
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Date Found</span>
              <span className="font-semibold text-slate-900">20 Sep 2026</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Category</span>
              <span className="font-semibold text-slate-900">Electronics</span>
            </div>
          </div>
        </div>

        {/* Info Callout */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-2.5 flex items-start gap-2.5 text-xs text-blue-900">
          <FiInfo className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Compare the item&apos;s identifying details with your lost report before submitting a claim.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-slate-300 hover:bg-slate-400 text-slate-700 font-medium text-xs transition-colors"
          >
            <FiX className="w-4 h-4" />
            <span>Close</span>
          </button>

          <Link
            to="/dashboard/browse-found"
            onClick={onClose}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors shadow-sm"
          >
            <FiEye className="w-4 h-4" />
            <span>View Full Item</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PossibleMatchModal;