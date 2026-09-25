import {
  allItemsHeaderData,
  allItemsHeaderIcons,
} from "../../../data/AdminModuleData/AllItems";

const HeaderSec = ({ setIsOpen }) => {
  const { title, description, profile } = allItemsHeaderData;

  const MenuIcon = allItemsHeaderIcons.menu;
  const NotificationIcon = allItemsHeaderIcons.notification;
  const ProfileIcon = allItemsHeaderIcons.profile;

  return (
    <section className="mb-6 sm:mb-8">

      <div
        className="
          flex
          flex-col
          xl:flex-row
          xl:items-start
          xl:justify-between
          gap-6
        "
      >

        {/* Left Section */}
        <div className="flex-1">

          {/* Hamburger for responsive */}
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
            <MenuIcon size={28} />
          </button>

          {/* Heading */}
          <h1
            className="
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-bold
              text-[#2A3B63]
              leading-tight
            "
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className="
              mt-2
              text-sm
              sm:text-base
              text-[#29292D]
              max-w-2xl
            "
          >
            {description}
          </p>

        </div>


        {/* Right Profile Section */}
        <div
          className="
            flex
            items-center
            justify-between
            sm:justify-end
            gap-4
            w-full
            xl:w-auto
          "
        >

          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="
              relative
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              text-[#2A3B63]
              transition-all
              duration-200
              hover:bg-gray-100
              hover:text-[#0F3292]
              hover:scale-105
              focus:outline-none
              focus:ring-2
              focus:ring-blue-200
            "
          >
            <NotificationIcon size={25} />

            {/* Notification indicator */}
            <span
              className="
                absolute
                right-1.5
                top-1.5
                h-2.5
                w-2.5
                rounded-full
                bg-orange-400
                ring-2
                ring-white
              "
            />
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
              transition-all
              duration-200
              hover:bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-blue-200
            "
          >

            {/* Profile Icon */}
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-blue-50
                text-blue-500
                transition
                group-hover:bg-blue-100
              "
            >
              <ProfileIcon size={27} />
            </div>


            {/* Profile Information */}
            <div className="hidden min-[420px]:block">

              <p
                className="
                  text-sm
                  sm:text-base
                  font-medium
                  text-[#29292D]
                  leading-tight
                  whitespace-nowrap
                "
              >
                {profile.name}
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-[#29292D]
                  leading-tight
                  whitespace-nowrap
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