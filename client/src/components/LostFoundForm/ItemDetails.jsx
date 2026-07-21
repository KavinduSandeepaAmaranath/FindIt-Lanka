import SectionTitle from "./SectionTitle";

const ItemDetails = ({ formData }) => {
  const Icon = formData.sections.itemDetails.icon;

  return (
    <section className="mb-8">
      {/* Section Title */}
      <SectionTitle
        icon={Icon}
        title={formData.sections.itemDetails.title}
      />

      {/* Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Item Title */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Item Title
          </label>

          <input
            type="text"
            placeholder={formData.itemTitlePlaceholder}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Category
          </label>

          <select
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white text-gray-600 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
          >
            <option value="">
              {formData.categoryPlaceholder}
            </option>

            {formData.categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

      </div>
    </section>
  );
};

export default ItemDetails;