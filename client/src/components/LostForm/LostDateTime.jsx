import SectionTitle from "./SectionTitle";
import { lostFormSections } from "../../data/ReportLost";

const LostDateTime = () => {
  const Icon = lostFormSections.dateTime.icon;

  return (
    <section className="mb-8">

      <SectionTitle
        icon={Icon}
        title={lostFormSections.dateTime.title}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Lost Date */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Lost Date
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

        {/* Lost Time */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Lost Time
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

export default LostDateTime;