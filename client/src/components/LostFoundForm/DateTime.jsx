import SectionTitle from "./SectionTitle";
import { FiCalendar, FiClock, FiCheck } from "react-icons/fi";

const DateTime = ({
  formData,
  formValues,
  setFormValues,
  errors = {},
  setErrors,
}) => {
  const Icon = formData.sections.dateTime.icon || FiCalendar;

  const todayStr = new Date().toISOString().split("T")[0];
  const yesterdayObj = new Date();
  yesterdayObj.setDate(yesterdayObj.getDate() - 1);
  const yesterdayStr = yesterdayObj.toISOString().split("T")[0];

  const handleFieldChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (setErrors && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const timePresets = [
    { label: "Morning", sub: "6am - 12pm", value: "09:00" },
    { label: "Afternoon", sub: "12pm - 5pm", value: "14:00" },
    { label: "Evening", sub: "5pm - 9pm", value: "18:00" },
    { label: "Night", sub: "9pm - 6am", value: "22:00" },
  ];

  return (
    <section className="space-y-6">
      {/* Section Title */}
      <SectionTitle
        icon={Icon}
        title={formData.sections.dateTime.title}
        subtitle="When did the incident take place?"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Date Selector */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {formData.dateLabel || "Date"} <span className="text-red-500">*</span>
          </label>

          {/* Quick Date Presets */}
          <div className="flex gap-2 mb-2.5">
            <button
              type="button"
              onClick={() => handleFieldChange("date", todayStr)}
              className={`px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition flex items-center gap-1.5 ${
                formValues.date === todayStr
                  ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                  : "bg-white text-slate-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
              }`}
            >
              <span>Today</span>
              {formValues.date === todayStr && <FiCheck className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={() => handleFieldChange("date", yesterdayStr)}
              className={`px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition flex items-center gap-1.5 ${
                formValues.date === yesterdayStr
                  ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                  : "bg-white text-slate-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
              }`}
            >
              <span>Yesterday</span>
              {formValues.date === yesterdayStr && <FiCheck className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="relative">
            <input
              type="date"
              max={todayStr}
              value={formValues.date}
              onChange={(e) => handleFieldChange("date", e.target.value)}
              className={`w-full rounded-xl border px-4 py-3 text-sm bg-white text-slate-700 outline-none transition-all duration-200 ${
                errors.date
                  ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              }`}
            />
          </div>

          {errors.date && (
            <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1">
              <span>⚠️</span> {errors.date}
            </p>
          )}
        </div>

        {/* Time Selector */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {formData.timeLabel || "Approximate Time"}
          </label>

          {/* Quick Time Presets */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-2.5">
            {timePresets.map((preset) => {
              const isMatch = formValues.time === preset.value;
              return (
                <button
                  type="button"
                  key={preset.label}
                  onClick={() => handleFieldChange("time", preset.value)}
                  className={`px-2 py-1.5 rounded-lg border text-xs font-medium transition text-center ${
                    isMatch
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white text-slate-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                  }`}
                >
                  <div className="font-semibold">{preset.label}</div>
                  <div className={`text-[10px] ${isMatch ? "text-blue-100" : "text-slate-400"}`}>
                    {preset.sub}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative">
            <input
              type="time"
              value={formValues.time}
              onChange={(e) => handleFieldChange("time", e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <p className="mt-1 text-xs text-slate-400">
            If unsure, select an approximate time of day above.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DateTime;