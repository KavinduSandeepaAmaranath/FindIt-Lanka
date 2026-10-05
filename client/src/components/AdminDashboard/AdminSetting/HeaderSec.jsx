import {
  adminSettingHeaderData,
  adminSettingHeaderIcons,
} from "../../../data/AdminModuleData/AdminSetting";

const HeaderSec = ({ setIsOpen }) => {
  const SettingsIcon =
    adminSettingHeaderIcons.settings;

  return (
    <section className="mb-6 sm:mb-8">

      {/* Mobile Menu */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="
          mb-4
          flex
          items-center
          justify-center
          rounded-lg
          p-2
          text-[#2A3B63]
          transition
          hover:bg-gray-100
          lg:hidden
        "
        aria-label="Open navigation menu"
      >
        <span className="text-2xl">☰</span>
      </button>

      <div className="flex items-start gap-4">

        {/* Icon */}
        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-blue-50
            text-[#2563EB]
          "
        >
          <SettingsIcon size={29} />
        </div>

        {/* Text */}
        <div>
          <h1
            className="
              text-2xl
              font-bold
              leading-tight
              text-[#2A3B63]
              sm:text-3xl
              lg:text-4xl
            "
          >
            {adminSettingHeaderData.title}
          </h1>

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              text-[#29292D]
              sm:text-base
            "
          >
            {adminSettingHeaderData.description}
          </p>
        </div>

      </div>

    </section>
  );
};

export default HeaderSec;