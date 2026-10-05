import { useState } from "react";

import {
  generalSettingsData,
  platformStatusData,
} from "../../../data/AdminModuleData/AdminSetting";

const GeneralSettings = () => {
  const [platformName, setPlatformName] =
    useState(
      generalSettingsData.fields.platformName.value
    );

  const [description, setDescription] =
    useState(
      generalSettingsData.fields.platformDescription.value
    );

  const [language, setLanguage] =
    useState(
      generalSettingsData.fields.defaultLanguage.value
    );

  const [timezone, setTimezone] =
    useState(
      generalSettingsData.fields.timeZone.value
    );

  const [dateFormat, setDateFormat] =
    useState(
      generalSettingsData.fields.dateFormat.value
    );

  const handleSave = () => {
    console.log("General settings saved");
  };

  return (
    <section
      id="general"
      className="
        scroll-mt-6
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-4
        shadow-sm
        sm:p-5
        lg:p-6
      "
    >

      {/* Header */}
      <div className="flex items-start gap-3">

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-blue-50
            text-[#2563EB]
          "
        >
          {(() => {
            const Icon =
              generalSettingsData.fields
                .platformName.icon;

            return <Icon size={21} />;
          })()}
        </div>

        <div>
          <h2
            className="
              text-lg
              font-bold
              text-[#0F3292]
              sm:text-xl
            "
          >
            {generalSettingsData.title}
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-[#64748B]
              sm:text-sm
            "
          >
            {generalSettingsData.description}
          </p>
        </div>

      </div>

      {/* Form */}
      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-4
          md:grid-cols-2
        "
      >

        {/* Platform Name */}
        <div>
          <label
            className="
              mb-2
              block
              text-xs
              font-semibold
              text-[#2A3B63]
            "
          >
            {generalSettingsData.fields.platformName.label}
            {" *"}
          </label>

          <input
            type="text"
            value={platformName}
            onChange={(e) =>
              setPlatformName(e.target.value)
            }
            className="
              h-11
              w-full
              rounded-lg
              border
              border-blue-100
              bg-white
              px-3
              text-sm
              text-[#29292D]
              outline-none
              transition
              focus:border-[#2563EB]
              focus:ring-2
              focus:ring-blue-100
            "
          />
        </div>

        {/* Language */}
        <div>
          <label
            className="
              mb-2
              block
              text-xs
              font-semibold
              text-[#2A3B63]
            "
          >
            {generalSettingsData.fields.defaultLanguage.label}
            {" *"}
          </label>

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
            className="
              h-11
              w-full
              rounded-lg
              border
              border-blue-100
              bg-white
              px-3
              text-sm
              text-[#29292D]
              outline-none
              focus:border-[#2563EB]
              focus:ring-2
              focus:ring-blue-100
            "
          >
            {generalSettingsData.fields.defaultLanguage.options.map(
              (option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              )
            )}
          </select>
        </div>

        {/* Description */}
        <div>
          <label
            className="
              mb-2
              block
              text-xs
              font-semibold
              text-[#2A3B63]
            "
          >
            {generalSettingsData.fields.platformDescription.label}
            {" *"}
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows={3}
            className="
              w-full
              resize-none
              rounded-lg
              border
              border-blue-100
              bg-white
              px-3
              py-3
              text-sm
              text-[#29292D]
              outline-none
              focus:border-[#2563EB]
              focus:ring-2
              focus:ring-blue-100
            "
          />
        </div>

        {/* Timezone */}
        <div>
          <label
            className="
              mb-2
              block
              text-xs
              font-semibold
              text-[#2A3B63]
            "
          >
            {generalSettingsData.fields.timeZone.label}
            {" *"}
          </label>

          <select
            value={timezone}
            onChange={(e) =>
              setTimezone(e.target.value)
            }
            className="
              h-11
              w-full
              rounded-lg
              border
              border-blue-100
              bg-white
              px-3
              text-sm
              text-[#29292D]
              outline-none
              focus:border-[#2563EB]
              focus:ring-2
              focus:ring-blue-100
            "
          >
            {generalSettingsData.fields.timeZone.options.map(
              (option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              )
            )}
          </select>
        </div>

        {/* Date Format */}
        <div>
          <label
            className="
              mb-2
              block
              text-xs
              font-semibold
              text-[#2A3B63]
            "
          >
            {generalSettingsData.fields.dateFormat.label}
            {" *"}
          </label>

          <select
            value={dateFormat}
            onChange={(e) =>
              setDateFormat(e.target.value)
            }
            className="
              h-11
              w-full
              rounded-lg
              border
              border-blue-100
              bg-white
              px-3
              text-sm
              text-[#29292D]
              outline-none
              focus:border-[#2563EB]
              focus:ring-2
              focus:ring-blue-100
            "
          >
            {generalSettingsData.fields.dateFormat.options.map(
              (option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              )
            )}
          </select>
        </div>

        {/* Save */}
        <div className="flex items-end justify-start md:justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="
              inline-flex
              h-11
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[#2563EB]
              px-5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#0F3292]
              sm:w-auto
            "
          >
            <generalSettingsData.saveIcon size={16} />
            {generalSettingsData.saveButton}
          </button>
        </div>

      </div>

      {/* Platform Status */}
      <div
        className="
          mt-5
          rounded-xl
          border
          border-blue-100
          bg-blue-50/40
          p-4
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-blue-100
                text-[#2563EB]
              "
            >
              <platformStatusData.icon size={20} />
            </div>

            <div>
              <h3
                className="
                  text-sm
                  font-bold
                  text-[#2A3B63]
                "
              >
                {platformStatusData.title}
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  text-[#64748B]
                "
              >
                {platformStatusData.description}
              </p>
            </div>

          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              lg:w-[310px]
            "
          >

            <div
              className="
                rounded-lg
                border
                border-blue-100
                bg-white
                p-3
              "
            >
              <div className="flex items-center gap-2">
                <span
                  className="
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-[#08A568]
                  "
                />
                <span
                  className="
                    text-xs
                    font-semibold
                    text-[#2A3B63]
                  "
                >
                  {platformStatusData.status.label}
                </span>
              </div>

              <p
                className="
                  mt-1
                  pl-4
                  text-sm
                  font-bold
                  text-[#08A568]
                "
              >
                {platformStatusData.status.value}
              </p>
            </div>

            <div
              className="
                rounded-lg
                border
                border-blue-100
                bg-white
                p-3
              "
            >
              <div className="flex items-center gap-2">
                <span
                  className="
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-slate-400
                  "
                />

                <span
                  className="
                    text-xs
                    font-semibold
                    text-[#2A3B63]
                  "
                >
                  {platformStatusData.maintenance.label}
                </span>
              </div>

              <p
                className="
                  mt-1
                  pl-4
                  text-sm
                  font-bold
                  text-[#2A3B63]
                "
              >
                {platformStatusData.maintenance.value}
              </p>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default GeneralSettings;