import SectionTitle from "./SectionTitle";
import {
  FiSmartphone,
  FiShoppingBag,
  FiFileText,
  FiKey,
  FiSmile,
  FiWatch,
  FiCompass,
  FiCheck,
} from "react-icons/fi";

const categoryIcons = {
  Electronics: FiSmartphone,
  "Personal Items": FiSmile,
  "Pets & Animals": FiSmile,
  "Bags & Wallets": FiShoppingBag,
  Documents: FiFileText,
  Clothing: FiShoppingBag,
  Vehicles: FiCompass,
  Jewellery: FiWatch,
  Keys: FiKey,
};

const ItemDetails = ({
  formData,
  formValues,
  setFormValues,
  errors = {},
  setErrors,
}) => {
  const Icon = formData.sections.itemDetails.icon;

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
        title={formData.sections.itemDetails.title}
        subtitle="Provide the core details to help identify the item quickly."
      />

      {/* Item Title */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
            Item Title <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-slate-400">
            {formValues.title.length}/80 characters
          </span>
        </div>

        <input
          type="text"
          maxLength={80}
          placeholder={formData.itemTitlePlaceholder || "e.g., iPhone 13 - Midnight Blue"}
          value={formValues.title}
          onChange={(e) => handleFieldChange("title", e.target.value)}
          className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 ${
            errors.title
              ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          }`}
        />
        {errors.title && (
          <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1">
            <span>⚠️</span> {errors.title}
          </p>
        )}
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Category <span className="text-red-500">*</span>
        </label>

        {/* Quick Category Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 mb-3">
          {formData.categories.slice(0, 8).map((cat) => {
            const isSelected = formValues.category === cat;
            const CatIcon = categoryIcons[cat] || FiSmile;

            return (
              <button
                type="button"
                key={cat}
                onClick={() => handleFieldChange("category", cat)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all duration-200 text-left ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20"
                    : "bg-white text-slate-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50/40"
                }`}
              >
                <CatIcon
                  className={`w-4 h-4 shrink-0 ${
                    isSelected ? "text-white" : "text-blue-600"
                  }`}
                />
                <span className="truncate flex-1">{cat}</span>
                {isSelected && <FiCheck className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Fallback full category dropdown */}
        <div className="relative">
          <select
            value={formValues.category}
            onChange={(e) => handleFieldChange("category", e.target.value)}
            className={`w-full appearance-none rounded-xl border px-4 py-3 text-sm bg-white text-slate-700 outline-none transition-all duration-200 ${
              errors.category
                ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }`}
          >
            <option value="">-- Or choose from all categories --</option>
            {formData.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {errors.category && (
          <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1">
            <span>⚠️</span> {errors.category}
          </p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
            Description <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-slate-400">
            {formValues.description.length} / {formData.description?.maxLength || 1000} characters
          </span>
        </div>

        <textarea
          value={formValues.description}
          onChange={(e) => handleFieldChange("description", e.target.value)}
          maxLength={formData.description?.maxLength || 1000}
          rows={4}
          placeholder={
            formData.description?.placeholder ||
            "Describe unique features, colour, brand names, contents, scratches, or stickers..."
          }
          className={`w-full rounded-2xl border px-4 py-3.5 text-sm resize-none outline-none transition-all duration-200 ${
            errors.description
              ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          }`}
        />
        {errors.description && (
          <p className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1">
            <span>⚠️</span> {errors.description}
          </p>
        )}
      </div>
    </section>
  );
};

export default ItemDetails;