import { FiFileText,FiCheckSquare,FiSearch,FiMessageSquare,FiRepeat,FiMail,FiUsers,FiPhone,FiMapPin } from "react-icons/fi";
import ToggleSwitch from "./ToggleSwitch";

const iconMap = {
  report: FiFileText,
  claim: FiCheckSquare,
  match: FiSearch,
  message: FiMessageSquare,
  returned: FiRepeat,
  email: FiMail,
  profile: FiUsers,
  phone: FiPhone,
  location: FiMapPin,
};

function TogglePreferenceList({ items, onToggle, onItemClick }) {
  return (
    <div className="space-y-3">
      {items.map(({ key, icon, title, description, enabled, isActionable }) => {
        const Icon = iconMap[icon] || FiFileText;
        const clickable = Boolean(
          onItemClick &&
            (isActionable ||
              key === "profileVisibility" ||
              key === "showPhoneNumber" ||
              key === "locationVisibility")
        );

        return (
          <div
            key={key}
            onClick={() => {
              if (clickable) {
                onItemClick(key);
              }
            }}
            className={`flex items-center justify-between gap-4 bg-white rounded-xl border border-slate-100 p-4 transition-all ${
              clickable
                ? "cursor-pointer hover:border-blue-200 hover:shadow-xs"
                : ""
            }`}
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-blue-300 text-blue-600 flex items-center justify-center shrink-0">
                <Icon className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-blue-700">{title}</p>
                <p className="text-sm text-slate-500">{description}</p>
              </div>
            </div>

            <div
              onClick={(e) => {
                if (clickable) {
                  e.stopPropagation();
                  onItemClick(key);
                }
              }}
            >
              <ToggleSwitch
                enabled={enabled}
                onToggle={() => {
                  if (clickable) {
                    onItemClick(key);
                  } else {
                    onToggle(key);
                  }
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TogglePreferenceList;
