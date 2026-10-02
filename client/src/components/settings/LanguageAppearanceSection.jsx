import { FiGlobe, FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { FaPalette } from "react-icons/fa";
import SettingsSectionCard from "./SettingsSectionCard";

const themeIconMap = { light: FiSun, dark: FiMoon, system: FiMonitor };

function LanguageAppearanceSection({
  languages,
  themes,
  language,
  theme,
  onLanguageChange,
  onThemeChange,
}) {
  return (
    <SettingsSectionCard
      icon={() => <FaPalette  className="w-6 h-6" />}
      title="Language & Appearance"
      description="Set your preferred language and theme."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Language dropdown */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Language</label>
          <div className="relative">
            <FiGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-sm bg-white text-gray-700 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition appearance-none"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Theme buttons */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Theme</label>
          <div className="grid grid-cols-3 gap-2">
            {themes.map(({ key, label, icon }) => {
              const Icon = themeIconMap[icon] || FiSun;
              const active = theme === key;
              return (
                <button
                  key={key}
                  onClick={() => onThemeChange(key)}
                  className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl border text-sm font-semibold transition-colors ${
                    active
                      ? "bg-blue-100 border-blue-300 text-blue-700"
                      : "bg-white border-gray-300 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </SettingsSectionCard>
  );
}

export default LanguageAppearanceSection;
