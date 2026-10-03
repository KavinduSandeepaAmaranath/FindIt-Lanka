import { FiShield, FiInfo, FiX, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import iphoneImg from "../../../assets/images/LpIphone1.avif";

function ClaimApprovedModal({ isOpen, onClose, notification }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border-[3.5px] border-blue-700 shadow-2xl w-full max-w-[480px] p-6 space-y-4 animate-scaleIn">
        {/* Header */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <FiShield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Claim Approved!
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Your ownership claim has been verified.
            </p>
          </div>
        </div>

        {/* Item Preview Box */}
        <div className="border border-slate-200 rounded-xl p-3 flex items-center gap-4 bg-slate-50/40">
          <img
            src={iphoneImg}
            alt="iPhone 13"
            className="w-16 h-16 object-cover rounded-lg border border-slate-200 shrink-0"
          />
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-slate-900 leading-tight">
              iPhone 13
            </h4>
            <p className="text-xs text-slate-500">Electronics</p>
            <p className="text-xs font-semibold text-emerald-600">Approved</p>
          </div>
        </div>

        {/* Claim Information */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-900 underline underline-offset-4">
            Claim Information
          </h4>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Approved Date</span>
              <span className="font-semibold text-slate-900">21 Sep 2026</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Verified By</span>
              <span className="font-semibold text-slate-900">Admin</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Next Step</span>
              <span className="font-semibold text-emerald-600">
                Arrange Handover
              </span>
            </div>
          </div>
        </div>

        {/* Instruction Info Callout */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-blue-900">
          <FiInfo className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Your claim is approved. Follow the platform&apos;s handover instructions to recover your item safely.
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
            to="/dashboard/my-claims"
            onClick={onClose}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors shadow-sm"
          >
            <FiEye className="w-4 h-4" />
            <span>View Claims details</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ClaimApprovedModal;