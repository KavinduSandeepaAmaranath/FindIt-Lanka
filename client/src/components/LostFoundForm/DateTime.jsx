import SectionTitle from "./SectionTitle";

const DateTime = ({ formData }) => {
  const Icon = formData.sections.dateTime.icon;

  return (
    <section className="mb-8">

      {/* Section Title */}
      <SectionTitle
        icon={Icon}
        title={formData.sections.dateTime.title}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {formData.dateLabel}
          </label>

          <input
            type="date"
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
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

        {/* Time */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {formData.timeLabel}
          </label>

          <input
            type="time"
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
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

      </div>

    </section>
  );
};

export default DateTime;