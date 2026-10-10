import {
  claimHeaderData,
  claimHeaderIcons,
} from "../../../data/AdminModuleData/ClaimManagement";

const HeaderSec = ({ setIsOpen }) => {
  const MenuIcon = claimHeaderIcons.menu;

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

      </div>
    </header>
  );
};

export default HeaderSec;