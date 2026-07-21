import SectionTitle from "./SectionTitle";

import {
  lostFormSections,
  districts,
} from "../../data/ReportLost";

const LostLocation = () => {
  const Icon = lostFormSections.location.icon;

  return (
    <section className="mb-8">

      <SectionTitle
        icon={Icon}
        title={lostFormSections.location.title}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Lost Location */}

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Lost Location
          </label>

          <input
            type="text"
            placeholder="Street name, landmark or city"
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
            Lost District
          </label>

          <select
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
              Select District
            </option>

            {districts.map((district) => (
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

export default LostLocation;