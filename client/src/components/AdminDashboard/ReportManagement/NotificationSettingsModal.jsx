import { useState } from "react";
import { FiX } from "react-icons/fi";

import {
  notificationSettingsData,
} from "../../../data/AdminModuleData/ReportManagement";

const NotificationSettingsModal = ({ onClose }) => {
  const {
    title,
    description,
    settings,
    buttons,
    ariaLabels,
  } = notificationSettingsData;

  const initialSettings = settings.reduce((acc, setting) => {
    acc[setting.id] = setting.defaultEnabled;
    return acc;
  }, {});

  const [notificationSettings, setNotificationSettings] =
    useState(initialSettings);

  const handleToggle = (settingId) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [settingId]: !prev[settingId],
    }));
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        className="
          w-full
          max-w-lg
          rounded-2xl
          bg-white
          p-6
          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#2A3B63]">
              {title}
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-full
              p-2
              text-gray-500
              transition
              hover:bg-gray-100
              hover:text-[#2A3B63]
            "
            aria-label={ariaLabels.close}
          >
            <FiX size={21} />
          </button>
        </div>

        {/* Notification Settings */}
        <div className="mt-6 space-y-3">
          {settings.map((setting) => {
            const Icon = setting.icon;

            return (
              <NotificationOption
                key={setting.id}
                setting={setting}
                Icon={Icon}
                enabled={notificationSettings[setting.id]}
                onToggle={() => handleToggle(setting.id)}
                toggleLabel={ariaLabels.toggle}
              />
            );
          })}
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="
            mt-6
            w-full
            rounded-xl
            bg-[#2563EB]
            px-4
            py-3
            text-base
            font-semibold
            text-white
            transition
            hover:bg-[#0F3292]
          "
        >
          {buttons.done}
        </button>
      </div>
    </div>
  );
};

/* Notification Setting Option */
const NotificationOption = ({
  setting,
  Icon,
  enabled,
  onToggle,
  toggleLabel,
}) => {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        rounded-xl
        border
        border-gray-200
        bg-white
        px-4
        py-4
        transition
        hover:bg-gray-50
      "
    >
      <div className="flex min-w-0 items-center gap-3">
        {/* Notification Icon */}
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-blue-50
            text-[#2563EB]
          "
        >
          <Icon size={18} />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-[#2A3B63]">
            {setting.title}
          </h3>

          <p className="mt-1 text-xs text-[#64748B]">
            {setting.description}
          </p>
        </div>
      </div>

      {/* Toggle */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={`${toggleLabel} ${setting.title}`}
        aria-pressed={enabled}
        className={`
          relative
          h-6
          w-11
          shrink-0
          rounded-full
          transition
          duration-200
          ${enabled ? "bg-[#2563EB]" : "bg-gray-300"}
        `}
      >
        <span
          className={`
            absolute
            top-1
            h-4
            w-4
            rounded-full
            bg-white
            shadow-sm
            transition
            duration-200
            ${enabled ? "left-6" : "left-1"}
          `}
        />
      </button>
    </div>
  );
};

/* NEW CHANGE: Default export required by HeaderSec.jsx */
export default NotificationSettingsModal;