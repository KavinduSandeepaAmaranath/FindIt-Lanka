import SectionTitle from "./SectionTitle";
import { FiMapPin, FiShield, FiCheck } from "react-icons/fi";

const TOP_DISTRICTS = ["Colombo", "Gampaha", "Kandy", "Galle", "Kurunegala"];

const Location = ({
  formData,
  formValues,
  setFormValues,
  errors = {},
  setErrors,
}) => {
  const Icon = formData.sections.location.icon || FiMapPin;
  const isFound = formData.type === "found";

  const handleFieldChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (setErrors && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  return (
    <section className="space-y-6">
      {/* Section Title */}
      <SectionTitle
        icon={Icon}
        title={formData.sections.location.title}
        subtitle="Where was the item lost or discovered in Sri Lanka?"
      />

      {/* District Selection */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          {formData.districtLabel || "District"} <span className="text-red-500">*</span>
        </label>

        {/* Quick District Chips */}
        <div className="flex flex-wrap gap-2 mb-3">
          {TOP_DISTRICTS.map((district) => {
            const isSelected = formValues.district === district;
            return (
              <button
                type="button"
                key={district}
                onClick={() => handleFieldChange("district", district)}
                className={`px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition-all duration-150 flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-white text-slate-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                }`}
              >
                <span>{district}</span>
                {isSelected && <FiCheck className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>

        {/* Full District Dropdown */}
        <div className="relative">
          <select
            value={formValues.district}
            onChange={(e) => handleFieldChange("district", e.target.value)}
            className={`w-full appearance-none rounded-xl border px-4 py-3 text-sm bg-white text-slate-700 outline-none transition-all duration-200 ${
              errors.district
                ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }`}
          >
            <option value="">
              {formData.districtPlaceholder || "-- Select District --"}
            </option>
            {formData.districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {errors.district && (
          <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1">
            <span>⚠️</span> {errors.district}
          </p>
        )}
      </div>

      {/* Specific Location / Landmark */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          {formData.locationLabel || "Specific Location / Landmark"}{" "}
          <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <input
            type="text"
            placeholder={
              formData.locationPlaceholder ||
              "e.g., Majestic City 3rd floor, 138 Bus to Pettah, Peradeniya Campus"
            }
            value={formValues.location}
            onChange={(e) => handleFieldChange("location", e.target.value)}
            className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 ${
              errors.location
                ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }`}
          />
        </div>
        <p className="mt-1 text-xs text-slate-400">
          Tip: Mention specific spots (e.g., bus route, shop name, station platform, floor).
        </p>
        {errors.location && (
          <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1">
            <span>⚠️</span> {errors.location}
          </p>
        )}
      </div>

      {/* Found Item Custody Status (for found items only) */}
      {isFound && (
        <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-xl text-amber-700 shrink-0 mt-0.5">
              <FiShield className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-amber-900">
                Item Custody Status (Optional)
              </h4>
              <p className="text-xs text-amber-800/90 mt-0.5 mb-3">
                Where is the found item being held right now?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: "with_me", label: "Safely with me" },
                  { id: "security", label: "At Security / Reception" },
                  { id: "police", label: "Handed to Police" },
                ].map((option) => {
                  const isChecked = (formValues.custodyStatus || "with_me") === option.id;
                  return (
                    <button
                      type="button"
                      key={option.id}
                      onClick={() => handleFieldChange("custodyStatus", option.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition text-center ${
                        isChecked
                          ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                          : "bg-white text-amber-900 border-amber-200 hover:bg-amber-100/50"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Location;