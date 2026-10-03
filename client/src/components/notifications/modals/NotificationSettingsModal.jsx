import { useState } from "react";
import {
  FiBell,
  FiX,
  FiFileText,
  FiCheckSquare,
  FiSearch,
  FiMessageSquare,
  FiRefreshCw,
  FiMail,
} from "react-icons/fi";

const initialSettings = [
  {
    id: "reportUpdates",
    title: "Report Updates",
    description: "Get updates about your lost and found reports.",
    icon: FiFileText,
    enabled: true,
  },
  {
    id: "claimUpdates",
    title: "Claim Updates",
    description: "Get notified about claim verification and status.",
    icon: FiCheckSquare,
    enabled: true,
  },
  {
    id: "possibleMatches",
    title: "Possible Matches",
    description: "Notify me when a possible match is found.",
    icon: FiSearch,
    enabled: true,
  },
  {
    id: "newMessages",
    title: "New Messages",
    description: "Get notified when someone sends you a message.",
    icon: FiMessageSquare,
    enabled: true,
  },
  {
    id: "itemReturned",
    title: "Item Returned",
    description: "Get notified when an item is marked as returned.",
    icon: FiRefreshCw,
    enabled: false,
  },
  {
    id: "emailNotifications",
    title: "Email Notifications",
    description: "Receive important updates through email.",
    icon: FiMail,
    enabled: true,
  },
];

function NotificationSettingsModal({ isOpen, onClose }) {
  const [settings, setSettings] = useState(initialSettings);

  if (!isOpen) return null;

  const toggleSetting = (id) => {
    setSettings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const handleSave = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl border-[3.5px] border-blue-700 shadow-2xl w-full max-w-[480px] p-6 space-y-4 animate-scaleIn relative">
        {/* Top Close (Red Badge) */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-5 h-5 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center text-xs transition-colors"
          aria-label="Close"
        >
          <FiX className="w-3.5 h-3.5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3.5 pr-8">
          <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <FiBell className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Notification Settings
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage how you receive updates.
            </p>
          </div>
        </div>

        {/* Settings List */}
        <div className="border border-slate-200/90 rounded-2xl p-2.5 space-y-2 bg-slate-50/40 max-h-[55vh] overflow-y-auto">
          {settings.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-100 shadow-2xs gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5 truncate">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Toggle switch */}
                <button
                  type="button"
                  onClick={() => toggleSetting(item.id)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 shrink-0 ${
                    item.enabled ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                      item.enabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-slate-300 hover:bg-slate-400 text-slate-700 font-medium text-xs transition-colors"
          >
            <FiX className="w-4 h-4" />
            <span>Cancel</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationSettingsModal;
