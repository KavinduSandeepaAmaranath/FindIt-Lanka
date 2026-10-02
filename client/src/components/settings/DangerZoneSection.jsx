import { FiAlertTriangle, FiLogOut, FiTrash2 } from "react-icons/fi";
import SettingsSectionCard from "./SettingsSectionCard";

function DangerZoneSection({ onLogOut, onDeleteAccount }) {
  return (
    <SettingsSectionCard
      icon={() => <FiAlertTriangle className="w-6 h-6" />}
      title="Danger Zone"
      description="These actions are permanent and cannot be undone."
      danger
    >
      <div className="space-y-3">
        {/* Log Out */}
        <div className="flex items-center justify-between gap-4 bg-white rounded-xl border border-red-100 p-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">
              <FiLogOut className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-red-600">Log Out</p>
              <p className="text-sm text-slate-500">Sign out from your FindIt Lanka account.</p>
            </div>
          </div>
          <button
            onClick={onLogOut}
            className="shrink-0 px-4 py-2 rounded-lg border border-red-300 text-red-600 text-xs font-semibold hover:bg-red-50 transition-colors"
          >
            Log Out
          </button>
        </div>

        {/* Delete Account */}
        <div className="flex items-center justify-between gap-4 bg-white rounded-xl border border-red-100 p-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">
              <FiTrash2 className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-red-600">Delete Account</p>
              <p className="text-sm text-slate-500">
                Permanently delete your account and associated data.
              </p>
            </div>
          </div>
          <button
            onClick={onDeleteAccount}
            className="shrink-0 px-4 py-2 rounded-lg border border-red-300 text-red-600 text-xs font-semibold hover:bg-red-50 transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </SettingsSectionCard>
  );
}

export default DangerZoneSection;
