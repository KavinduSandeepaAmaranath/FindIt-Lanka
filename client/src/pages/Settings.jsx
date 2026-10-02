import { useState } from "react";
import { FiBell,FiUser } from "react-icons/fi";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaBell } from "react-icons/fa";
import { PiShieldCheckeredFill } from "react-icons/pi";

import DashboardSidebar from "../components/dashboard/DashBoardSidebar";

import ProfileSettingsSection from "../components/settings/ProfileSettingsSection";
import AccountSecuritySection from "../components/settings/AccountSecuritySection";
import TogglePreferenceList from "../components/settings/TogglePreferenceList";
import SettingsSectionCard from "../components/settings/SettingsSectionCard";
import LanguageAppearanceSection from "../components/settings/LanguageAppearanceSection";
import DangerZoneSection from "../components/settings/DangerZoneSection";

import ReportModal from "../components/LostFoundForm/ReportModal";

import { currentUser } from "../data/dashboardData";
import {
  profileFormData,
  notificationPreferences,
  privacySettings,
  languageOptions,
  themeOptions,
} from "../data/settingsData";

import {
  reportHeader as lostHeader,
  reportForm as lostForm,
} from "../data/ReportLost";

import {
  reportHeader as foundHeader,
  reportForm as foundForm,
} from "../data/ReportFound";

function Settings() {
  const [profile, setProfile] = useState(profileFormData);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [notifPrefs, setNotifPrefs] = useState(notificationPreferences);
  const [privacy, setPrivacy] = useState(privacySettings);
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("light");

  const [openLostReport, setOpenLostReport] = useState(false);
  const [openFoundReport, setOpenFoundReport] = useState(false);

  // ---------- Event handlers ----------
  const handleProfileChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSaveProfile = () => {
    alert("Profile saved! (This is temporary frontend-only behaviour.)");
  };

  const handleChangePassword = () => {
    alert("Change Password form is not built yet.");
  };

  const toggleItem = (list, setList, key) => {
    setList(
      list.map((item) =>
        item.key === key ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  const handleLogOut = () => {
    alert("Log Out is not connected to the backend yet.");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure? This cannot be undone.")) {
      alert("Delete Account is not connected to the backend yet.");
    }
  };

  return (
    <div className="flex bg-slate-50">
      <DashboardSidebar
        onOpenLostReport={() => setOpenLostReport(true)}
        onOpenFoundReport={() => setOpenFoundReport(true)}
      />

      <div className="flex-1 min-w-0 pt-[60px] lg:pt-0">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <VscWorkspaceTrusted className="w-8 h-8 sm:w-9 sm:h-9 text-blue-600 shrink-0 mt-1" />
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-900">
                  Settings
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Manage your account, preferences, privacy and security.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="relative">
                  <FaBell className="w-6 h-6 text-yellow-500" />

                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </div>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">
                  {currentUser.name}
                </p>
                <p className="text-xs text-blue-600 font-medium">
                  {currentUser.membership}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                <FiUser className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ProfileSettingsSection
              formData={profile}
              onChange={handleProfileChange}
              onSave={handleSaveProfile}
            />

            <AccountSecuritySection
              twoFactorEnabled={twoFactorEnabled}
              onToggleTwoFactor={() => setTwoFactorEnabled(!twoFactorEnabled)}
              onChangePassword={handleChangePassword}
            />

            <SettingsSectionCard
              icon={() => <FaBell className="w-7 h-7" />}
              title="Notification Preferences"
              description="Choose what updates you want to receive."
            >
              <TogglePreferenceList
                items={notifPrefs}
                onToggle={(key) => toggleItem(notifPrefs, setNotifPrefs, key)}
              />
            </SettingsSectionCard>

            <SettingsSectionCard
              icon={() => <PiShieldCheckeredFill className="w-7 h-7" />}
              title="Privacy & Safety"
              description="Control your privacy and account visibility."
            >
              <TogglePreferenceList
                items={privacy}
                onToggle={(key) => toggleItem(privacy, setPrivacy, key)}
              />
            </SettingsSectionCard>

            <LanguageAppearanceSection
              languages={languageOptions}
              themes={themeOptions}
              language={language}
              theme={theme}
              onLanguageChange={setLanguage}
              onThemeChange={setTheme}
            />

            <DangerZoneSection
              onLogOut={handleLogOut}
              onDeleteAccount={handleDeleteAccount}
            />
          </div>
        </div>
      </div>

      {openLostReport && (
        <ReportModal
          header={lostHeader}
          formData={lostForm}
          onClose={() => setOpenLostReport(false)}
        />
      )}

      {openFoundReport && (
        <ReportModal
          header={foundHeader}
          formData={foundForm}
          onClose={() => setOpenFoundReport(false)}
        />
      )}
    </div>
  );
}

export default Settings;
