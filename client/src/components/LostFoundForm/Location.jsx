import SectionTitle from "./SectionTitle";

const Location = ({
  formData,
  formValues,
  setFormValues,
}) => {
  const Icon = formData.sections.location.icon;

  return (
    <section className="mb-8">

      {/* Section Title */}
      <SectionTitle
        icon={Icon}
        title={formData.sections.location.title}
      />

      {/* Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Location */}
        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {formData.locationLabel}
          </label>

          <input
            type="text"
            placeholder={formData.locationPlaceholder}
            value={formValues.location}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                location: e.target.value,
              })
            }
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
              text-sm
              outline-none
              transition
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />

        </div>

        {/* District */}
        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {formData.districtLabel}
          </label>

          <select
            value={formValues.district}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                district: e.target.value,
              })
            }
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              px-4
              py-3
              text-sm
              text-gray-500
              outline-none
              transition
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          >
            <option value="">
              {formData.districtPlaceholder}
            </option>

            {formData.districts.map((district) => (
              <option
                key={district}
                value={district}
              >
                {district}
              </option>
            ))}

          </select>

        </div>

      </div>

    </section>
  );
};

export default Location;