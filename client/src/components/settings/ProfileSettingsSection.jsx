import { FiUser } from "react-icons/fi";
import SettingsSectionCard from "./SettingsSectionCard";
import ProfileImg from "../../assets/icons/ProfileImg.jpeg";

function ProfileSettingsSection({ formData, onChange, onSave }) {
  const fields = [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "phone", label: "Phone Number", type: "text" },
    { name: "district", label: "District", type: "text" },
  ];

  return (
    <SettingsSectionCard
      icon={FiUser}
      title="Profile Settings"
      description="Update your personal information and profile photo."
    >
      <div className="flex flex-col sm:flex-row gap-6">
        {/* avatar */}
        <div className="flex flex-col items-center gap-3 shrink-0">
          <img
            src={ProfileImg}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
          />
         
          <button className="px-3 py-1.5 rounded-full border border-blue-200 text-blue-700 text-xs font-semibold hover:bg-blue-50 transition-colors">
            Change Photo
          </button>
        </div>

        {/* fields */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {fields.map(({ name, label, type }) => (
            <div key={name}>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                {label}
              </label>
              <input
                type={type}
                value={formData[name]}
                onChange={(e) => onChange(name, e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition bg-white"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onSave}
          className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold shadow-sm transition-colors"
        >
          Save Changes
        </button>
      </div>
    </SettingsSectionCard>
  );
}

export default ProfileSettingsSection;
