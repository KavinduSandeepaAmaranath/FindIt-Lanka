import { useState } from "react";
import { FiUser } from "react-icons/fi";
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
import ChangesSavedModal from "../components/settings/modals/ChangesSavedModal";
import ChangePhotoModal from "../components/settings/modals/ChangePhotoModal";
import ChangePasswordModal from "../components/settings/modals/ChangePasswordModal";
import ShowPhoneModal from "../components/settings/modals/ShowPhoneModal";
import LocationVisibilityModal from "../components/settings/modals/LocationVisibilityModal";
import LogoutModal from "../components/settings/modals/LogoutModal";
import DeleteAccountModal from "../components/settings/modals/DeleteAccountModal";
import ConfirmDeleteModal from "../components/settings/modals/ConfirmDeleteModal";
import PasswordUpdatedModal from "../components/settings/modals/PasswordUpdatedModal";
import TwoFactorModal from "../components/settings/modals/TwoFactorModal";
import TwoFactorEnabledModal from "../components/settings/modals/TwoFactorEnabledModal";
import ProfileVisibilityModal from "../components/settings/modals/ProfileVisibilityModal";

import ProfileImg from "../assets/icons/ProfileImg.jpeg";

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
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [notifPrefs, setNotifPrefs] = useState(notificationPreferences);
  const [privacy, setPrivacy] = useState(privacySettings);
  const [phoneVisibility, setPhoneVisibility] = useState("private"); // "show" | "private"
  const [locationVisibility, setLocationVisibility] = useState("exact"); // "exact" | "approximate" | "hidden"
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("light");

  // Modals state for all requested buttons
  const [openChangesSaved, setOpenChangesSaved] = useState(false);
  const [openChangePhoto, setOpenChangePhoto] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openShowPhone, setOpenShowPhone] = useState(false);
  const [openLocationVisibility, setOpenLocationVisibility] = useState(false);

  // Danger zone & 2FA modals
  const [openLogout, setOpenLogout] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openPasswordUpdated, setOpenPasswordUpdated] = useState(false);
  const [openTwoFactor, setOpenTwoFactor] = useState(false);
  const [openTwoFactorEnabled, setOpenTwoFactorEnabled] = useState(false);
  const [openProfileVisibility, setOpenProfileVisibility] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState("everyone"); // "everyone" | "registered" | "only_me"
  const [twoFactorMethod, setTwoFactorMethod] = useState("email");

  const [openLostReport, setOpenLostReport] = useState(false);
  const [openFoundReport, setOpenFoundReport] = useState(false);

  // ---------- Event handlers ----------
  const handleProfileChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  // 1. Save changes button -> Changes Saved modal
  const handleSaveProfile = () => {
    setOpenChangesSaved(true);
  };

  // 2. Change photo button -> Change Photo modal
  const handleOpenChangePhoto = () => {
    setOpenChangePhoto(true);
  };

  const handlePhotoSaved = (newPhotoUrl) => {
    setAvatarUrl(newPhotoUrl);
    setOpenChangesSaved(true);
  };

  // 3. Change password button -> Change Password modal
  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
  };

  // 4. Password updated modal
  const handlePasswordUpdated = () => {
    setOpenPasswordUpdated(true);
  };

  // 5. Two-factor authentication modal
  const handleOpenTwoFactor = () => {
    setOpenTwoFactor(true);
  };

  const handleSaveTwoFactor = ({ enabled, method }) => {
    setTwoFactorEnabled(enabled);
    if (method) setTwoFactorMethod(method);
    if (enabled) {
      setOpenTwoFactorEnabled(true);
    } else {
      setOpenChangesSaved(true);
    }
  };

  // Privacy & safety items (Profile Visibility, Show Phone Number & Location Visibility)
  const handlePrivacyItemClick = (key) => {
    if (key === "profileVisibility") {
      setOpenProfileVisibility(true);
    } else if (key === "showPhoneNumber") {
      setOpenShowPhone(true);
    } else if (key === "locationVisibility") {
      setOpenLocationVisibility(true);
    }
  };

  const handleSaveProfileVisibility = (val) => {
    setProfileVisibility(val);
    const descMap = {
      everyone: "Anyone can view your profile.",
      registered: "Only registered users can view your profile.",
      only_me: "Only you can view your profile.",
    };
    setPrivacy((prev) =>
      prev.map((item) =>
        item.key === "profileVisibility"
          ? {
              ...item,
              enabled: val !== "only_me",
              description: descMap[val] || item.description,
            }
          : item
      )
    );
  };

  const handleSavePhoneVisibility = (val) => {
    setPhoneVisibility(val);
    setPrivacy((prev) =>
      prev.map((item) =>
        item.key === "showPhoneNumber"
          ? {
              ...item,
              enabled: val === "show",
              description:
                val === "show"
                  ? "Your number will be visible to all users."
                  : "Your number will be hidden from other users.",
            }
          : item
      )
    );
  };

  const handleSaveLocationVisibility = (val) => {
    setLocationVisibility(val);
    const descMap = {
      exact: "Show your exact location.",
      approximate: "Show a generalized area (e.g., city or district).",
      hidden: "Do not show your location.",
    };
    setPrivacy((prev) =>
      prev.map((item) =>
        item.key === "locationVisibility"
          ? {
              ...item,
              enabled: val !== "hidden",
              description: descMap[val] || item.description,
            }
          : item
      )
    );
  };

  const toggleItem = (list, setList, key) => {
    setList(
      list.map((item) =>
        item.key === key ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  // 8. Logout modal
  const handleLogOut = () => {
    setOpenLogout(true);
  };

  const handleConfirmLogout = () => {
    setOpenLogout(false);
    alert("You have been logged out.");
  };

  // 9. Delete account modal
  const handleDeleteAccount = () => {
    setOpenDeleteAccount(true);
  };

  // 10. Confirm account deletion modal
  const handleContinueDelete = () => {
    setOpenDeleteAccount(false);
    setOpenConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDelete(false);
    alert("Your account has been deleted.");
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
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 overflow-hidden border border-blue-200">
                <img
                  src={avatarUrl || ProfileImg}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ProfileSettingsSection
              formData={profile}
              avatarUrl={avatarUrl}
              onChange={handleProfileChange}
              onSave={handleSaveProfile}
              onChangePhoto={handleOpenChangePhoto}
            />

            <AccountSecuritySection
              twoFactorEnabled={twoFactorEnabled}
              onChangePassword={handleOpenChangePassword}
              onOpenTwoFactor={handleOpenTwoFactor}
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
                onToggle={handlePrivacyItemClick}
                onItemClick={handlePrivacyItemClick}
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

      {/* ========================================================
          10 Modals for all requested buttons:
          1. save changes btn -> Changes Saved Confirmation
          2. change photo btn -> Change Profile Photo Modal
          3. change password btn -> Change Password Modal
          4. show phone no -> Show Phone Number Modal
          5. location visibility -> Location Visibility Modal
          6. logout -> Log Out Confirmation Modal
          7. delete account -> Delete Account Warning Modal
          8. confirm account deletion -> Confirm Deletion Modal
          9. password updated -> Password Updated Modal
          10. two-factor authentication -> Two-Factor Auth Modal
         ======================================================== */}

      {/* 1. Save Changes Confirmation Modal */}
      <ChangesSavedModal
        isOpen={openChangesSaved}
        onClose={() => setOpenChangesSaved(false)}
      />

      {/* 2. Change Profile Photo Modal */}
      <ChangePhotoModal
        isOpen={openChangePhoto}
        onClose={() => setOpenChangePhoto(false)}
        currentPhoto={avatarUrl || ProfileImg}
        onPhotoChange={handlePhotoSaved}
      />

      {/* 3. Change Password Modal */}
      <ChangePasswordModal
        isOpen={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
        onSuccess={handlePasswordUpdated}
      />

      {/* 4. Show Phone Number Modal */}
      <ShowPhoneModal
        isOpen={openShowPhone}
        onClose={() => setOpenShowPhone(false)}
        currentValue={phoneVisibility}
        onSave={handleSavePhoneVisibility}
      />

      {/* 5. Location Visibility Modal */}
      <LocationVisibilityModal
        isOpen={openLocationVisibility}
        onClose={() => setOpenLocationVisibility(false)}
        currentValue={locationVisibility}
        onSave={handleSaveLocationVisibility}
      />

      {/* 6. Logout Modal */}
      <LogoutModal
        isOpen={openLogout}
        onClose={() => setOpenLogout(false)}
        onConfirm={handleConfirmLogout}
      />

      {/* 7. Delete Account Warning Modal */}
      <DeleteAccountModal
        isOpen={openDeleteAccount}
        onClose={() => setOpenDeleteAccount(false)}
        onContinue={handleContinueDelete}
      />

      {/* 8. Confirm Account Deletion Modal */}
      <ConfirmDeleteModal
        isOpen={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* 9. Password Updated Modal */}
      <PasswordUpdatedModal
        isOpen={openPasswordUpdated}
        onClose={() => setOpenPasswordUpdated(false)}
      />

      {/* 10. Two-Factor Authentication Modal */}
      <TwoFactorModal
        isOpen={openTwoFactor}
        onClose={() => setOpenTwoFactor(false)}
        isEnabled={twoFactorEnabled}
        currentMethod={twoFactorMethod}
        onSave={handleSaveTwoFactor}
      />

      {/* 11. Two-Factor Authentication Enabled Modal */}
      <TwoFactorEnabledModal
        isOpen={openTwoFactorEnabled}
        onClose={() => setOpenTwoFactorEnabled(false)}
      />

      {/* 12. Profile Visibility Modal */}
      <ProfileVisibilityModal
        isOpen={openProfileVisibility}
        onClose={() => setOpenProfileVisibility(false)}
        currentValue={profileVisibility}
        onSave={handleSaveProfileVisibility}
      />

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
