import { useState } from "react";

import {
  platformSettingsData,
} from "../../../data/AdminModuleData/AdminSetting";

const PlatformSettings = () => {
  const [toggleState, setToggleState] =
    useState(
      Object.fromEntries(
        platformSettingsData.toggles.map(
          (item) => [
            item.id,
            item.enabled,
          ]
        )
      )
    );

  const [imageSize, setImageSize] =
    useState(
      platformSettingsData.fields
        .maximumImageUploadSize.value
    );

  const [itemsPerPage, setItemsPerPage] =
    useState(
      platformSettingsData.fields
        .defaultItemsPerPage.value
    );

  const togglePlatformSetting = (id) => {
    setToggleState((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  const MainIcon =
    platformSettingsData.mainIcon;

  return (
    <section
      id="platform"
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
          <MainIcon size={21} />
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
            {platformSettingsData.title}
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-[#64748B]
              sm:text-sm
            "
          >
            {platformSettingsData.description}
          </p>
        </div>

      </div>

      {/* Content */}
      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-6
          lg:grid-cols-2
        "
      >

        {/* Toggle Settings */}
        <div className="space-y-5">

          {platformSettingsData.toggles.map(
            (item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >

                  <div className="flex min-w-0 items-center gap-3">

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-50
                        text-[#2563EB]
                      "
                    >
                      <Icon size={18} />
                    </div>

                    <div>
                      <h3
                        className="
                          text-xs
                          font-bold
                          text-[#2A3B63]
                        "
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          mt-1
                          text-[11px]
                          leading-4
                          text-[#64748B]
                        "
                      >
                        {item.description}
                      </p>
                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      togglePlatformSetting(
                        item.id
                      )
                    }
                    className={`
                      relative
                      h-5
                      w-10
                      shrink-0
                      rounded-full
                      transition
                      ${
                        toggleState[item.id]
                          ? "bg-[#2563EB]"
                          : "bg-slate-300"
                      }
                    `}
                  >
                    <span
                      className={`
                        absolute
                        top-0.5
                        h-4
                        w-4
                        rounded-full
                        bg-white
                        shadow
                        transition
                        ${
                          toggleState[item.id]
                            ? "left-5"
                            : "left-0.5"
                        }
                      `}
                    />
                  </button>

                </div>
              );
            }
          )}

        </div>

        {/* Platform Fields */}
        <div className="space-y-4">

          <SelectField
            label={
              platformSettingsData.fields
                .maximumImageUploadSize.label
            }
            value={imageSize}
            setValue={setImageSize}
            options={
              platformSettingsData.fields
                .maximumImageUploadSize.options
            }
          />

          <SelectField
            label={
              platformSettingsData.fields
                .defaultItemsPerPage.label
            }
            value={itemsPerPage}
            setValue={setItemsPerPage}
            options={
              platformSettingsData.fields
                .defaultItemsPerPage.options
            }
          />

          <div className="flex justify-start lg:justify-end">
            <button
              type="button"
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
              <platformSettingsData.saveIcon
                size={16}
              />

              {platformSettingsData.saveButton}
            </button>
          </div>

        </div>

      </div>

    </section>
  );
};

const SelectField = ({
  label,
  value,
  setValue,
  options,
}) => {
  return (
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
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          setValue(e.target.value)
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
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlatformSettings;