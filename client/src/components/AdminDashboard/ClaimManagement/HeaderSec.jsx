import {
  claimHeaderData,
  claimHeaderIcons,
} from "../../../data/AdminModuleData/ClaimManagement";

const HeaderSec = ({ setIsOpen }) => {
  const MenuIcon = claimHeaderIcons.menu;
  const BellIcon = claimHeaderIcons.notification;
  const ProfileIcon = claimHeaderIcons.profile;

  return (
    <header className="mb-6">
      <div className="flex items-start justify-between gap-5">

        {/* left */}
        <div className="flex items-start gap-3">

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="
              mt-1 rounded-lg p-2
              text-[#24375D]
              transition
              hover:bg-gray-100
              lg:hidden
            "
          >
            <MenuIcon size={25} />
          </button>

          <div>
            <h1
              className="
                text-[28px]
                font-bold
                leading-tight
                text-[#263A63]
                sm:text-[32px]
                xl:text-[36px]
              "
            >
              {claimHeaderData.title}
            </h1>

            <p className="mt-2 text-[14px] text-[#29292D]">
              {claimHeaderData.description}
            </p>
          </div>
        </div>

        {/* right */}
        <div className="hidden items-center gap-5 sm:flex">

          {/* Notification */}
          <button
            type="button"
            className="
              relative
              text-[#F6A900]
              transition
              hover:scale-105
            "
          >
            <BellIcon size={25} />

            <span
              className="
                absolute
                -right-[2px]
                -top-[1px]
                h-[7px]
                w-[7px]
                rounded-full
                bg-red-500
              "
            />
          </button>

          {/* User info */}
          <div className="flex items-center gap-4">

            <div className="text-right">
              <p className="text-[14px] font-semibold text-[#111827]">
                {claimHeaderData.profile.name}
              </p>

              <p className="mt-[2px] text-[10px] text-[#29292D]">
                {claimHeaderData.profile.role}
              </p>
            </div>

            <div
              className="
                flex
                h-[38px]
                w-[38px]
                items-center
                justify-center
                text-[#3EA0E9]
              "
            >
              <ProfileIcon size={29} />
            </div>

          </div>
        </div>

      </div>
    </header>
  );
};

export default HeaderSec;