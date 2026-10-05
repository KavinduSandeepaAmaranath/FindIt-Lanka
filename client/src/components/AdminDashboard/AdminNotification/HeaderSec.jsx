import {
  notificationHeaderData,
  notificationHeaderIcons,
} from "../../../data/AdminModuleData/AdminNotification";

const HeaderSec = ({
  setIsOpen,
  onMarkAllRead,
}) => {
  const {
    title,
    description,
    profile,
  } = notificationHeaderData;

  const NotificationIcon =
    notificationHeaderIcons.notification;

  const ProfileIcon =
    notificationHeaderIcons.profile;

  const MenuIcon =
    notificationHeaderIcons.menu;

  return (
    <section className="mb-6 sm:mb-8">

      <div
        className="
          flex
          flex-col
          gap-5
          xl:flex-row
          xl:items-center
          xl:justify-between
        "
      >

        {/* Left Section */}
        <div className="flex-1">

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="
              mb-3
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
            <MenuIcon size={28} />
          </button>

          <div className="flex items-start gap-3">

            <div
              className="
                hidden
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                text-[#2563EB]
                sm:flex
              "
            >
              <NotificationIcon size={27} />
            </div>

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
                {title}
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
                {description}
              </p>
            </div>

          </div>
        </div>

        {/* Right Section */}
        <div
          className="
            flex
            w-full
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
            sm:justify-end
            xl:w-auto
          "
        >

          {/* Mark All Read */}
          <button
            type="button"
            onClick={onMarkAllRead}
            className="
              flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#2563EB]
              bg-white
              px-4
              text-sm
              font-semibold
              text-[#2563EB]
              transition-all
              duration-200
              hover:bg-[#2563EB]
              hover:text-white
              focus:outline-none
              focus:ring-2
              focus:ring-blue-200
              sm:px-5
            "
          >
            <span>✓</span>
            <span>Mark all as read</span>
          </button>

          {/* Profile */}
          <button
            type="button"
            className="
              flex
              items-center
              gap-3
              rounded-xl
              px-2
              py-2
              text-left
              transition
              hover:bg-gray-50
            "
          >

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
              <ProfileIcon size={25} />
            </div>

            <div className="min-w-0">
              <p
                className="
                  whitespace-nowrap
                  text-sm
                  font-semibold
                  text-[#2A3B63]
                "
              >
                {profile.name}
              </p>

              <p
                className="
                  mt-0.5
                  text-xs
                  text-[#64748B]
                "
              >
                {profile.role}
              </p>
            </div>

          </button>

        </div>

      </div>

    </section>
  );
};

export default HeaderSec;