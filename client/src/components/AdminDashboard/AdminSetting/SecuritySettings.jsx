import { useState } from "react";

import {
  securitySettingsData,
} from "../../../data/AdminModuleData/AdminSetting";

const SecuritySettings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] =
    useState(false);

  const MainIcon =
    securitySettingsData.mainIcon;

  return (
    <section
      id="security"
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
            {securitySettingsData.title}
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-[#64748B]
              sm:text-sm
            "
          >
            {securitySettingsData.description}
          </p>
        </div>

      </div>

      {/* Security Items */}
      <div
        className="
          mt-6
          grid
          grid-cols-1
          divide-y
          divide-gray-200
          md:grid-cols-3
          md:divide-x
          md:divide-y-0
        "
      >

        {/* Password */}
        <SecurityItem
          icon={
            securitySettingsData.changePassword.icon
          }
          title={
            securitySettingsData.changePassword.title
          }
          description={
            securitySettingsData.changePassword.description
          }
        >
          <button
            type="button"
            className="
              mt-4
              rounded-lg
              border
              border-[#2563EB]
              bg-white
              px-4
              py-2
              text-xs
              font-semibold
              text-[#2563EB]
              transition
              hover:bg-[#2563EB]
              hover:text-white
            "
          >
            {
              securitySettingsData.changePassword
                .buttonText
            }
          </button>
        </SecurityItem>

        {/* Two Factor */}
        <SecurityItem
          icon={
            securitySettingsData.twoFactor.icon
          }
          title={
            securitySettingsData.twoFactor.title
          }
          description={
            securitySettingsData.twoFactor.description
          }
        >
          <div className="mt-4 flex items-center gap-3">

            <button
              type="button"
              onClick={() =>
                setTwoFactorEnabled(
                  !twoFactorEnabled
                )
              }
              className={`
                relative
                h-5
                w-10
                rounded-full
                transition
                ${
                  twoFactorEnabled
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
                    twoFactorEnabled
                      ? "left-5"
                      : "left-0.5"
                  }
                `}
              />
            </button>

            <span
              className="
                text-xs
                text-[#64748B]
              "
            >
              {twoFactorEnabled
                ? "Enabled"
                : securitySettingsData
                    .twoFactor.disabledText}
            </span>

          </div>
        </SecurityItem>

        {/* Login Activity */}
        <SecurityItem
          icon={
            securitySettingsData.loginActivity.icon
          }
          title={
            securitySettingsData.loginActivity.title
          }
          description={
            securitySettingsData.loginActivity.description
          }
        >
          <button
            type="button"
            className="
              mt-4
              rounded-lg
              border
              border-[#2563EB]
              bg-white
              px-4
              py-2
              text-xs
              font-semibold
              text-[#2563EB]
              transition
              hover:bg-[#2563EB]
              hover:text-white
            "
          >
            {
              securitySettingsData.loginActivity
                .buttonText
            }
          </button>
        </SecurityItem>

      </div>

    </section>
  );
};

const SecurityItem = ({
  icon: Icon,
  title,
  description,
  children,
}) => {
  return (
    <div
      className="
        px-0
        py-5
        first:pt-0
        last:pb-0
        md:px-5
        md:py-2
        md:first:pl-0
        md:last:pr-0
      "
    >

      <div className="flex items-start gap-3">

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
          <Icon size={19} />
        </div>

        <div className="min-w-0">
          <h3
            className="
              text-xs
              font-bold
              text-[#2A3B63]
              sm:text-sm
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-1
              text-[11px]
              leading-5
              text-[#64748B]
            "
          >
            {description}
          </p>

          {children}

        </div>

      </div>

    </div>
  );
};

export default SecuritySettings;