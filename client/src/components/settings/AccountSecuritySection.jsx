import { PiShieldCheckeredFill } from "react-icons/pi";
import { HiShieldCheck } from "react-icons/hi";
import SettingsSectionCard from "./SettingsSectionCard";
import ToggleSwitch from "./ToggleSwitch";
import { MdLockOutline } from "react-icons/md";

function AccountSecuritySection({ twoFactorEnabled, onToggleTwoFactor, onChangePassword }) {
  return (
    <SettingsSectionCard
      icon={() => <PiShieldCheckeredFill className="w-7 h-7" />}
      title="Account & Security"
      description="Keep your account safe and secure."
    >
      <div className="space-y-3">
        {/* Change Password */}
        <div className="flex items-center justify-between gap-4 bg-white rounded-xl border border-slate-100 p-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-blue-300 text-blue-600 flex items-center justify-center shrink-0">
              <HiShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-blue-700">Change Password</p>
              <p className="text-sm text-slate-500">
                Update your password regularly to keep your account secure.
              </p>
            </div>
          </div>
          
          <button
            onClick={onChangePassword}
            className="shrink-0 px-4 py-2 rounded-lg border border-blue-200 text-blue-700 text-xs font-semibold hover:bg-blue-50 transition-colors"
          >
            Change Password
          </button>
        </div>

        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between gap-4 bg-white rounded-xl border border-slate-100 p-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-blue-300 text-blue-600 flex items-center justify-center shrink-0">
              <MdLockOutline  className="w=6.5 h-6.5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-blue-700">Two-Factor Authentication</p>
              <p className="text-sm text-slate-500">
                Add an extra layer of security to your account.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-slate-500">
              {twoFactorEnabled ? "Enabled" : "Disabled"}
            </span>
            <ToggleSwitch enabled={twoFactorEnabled} onToggle={onToggleTwoFactor} />
          </div>
        </div>
      </div>
    </SettingsSectionCard>
  );
}

export default AccountSecuritySection;
