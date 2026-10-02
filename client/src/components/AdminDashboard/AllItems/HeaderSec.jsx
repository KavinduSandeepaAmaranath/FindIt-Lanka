import {
  allItemsHeaderData,
  allItemsHeaderIcons,
} from "../../../data/AdminModuleData/AllItems";

const HeaderSec = ({ setIsOpen }) => {
  const { title, description } = allItemsHeaderData;
  const MenuIcon = allItemsHeaderIcons.menu;

  return (
    <section className="mb-6 sm:mb-8">
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
        {/* Left Section Header */}
        <div className="flex-1">
          {/* Mobile Menu Button */}
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

          {/* Header Title */}
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
      </div>
    </section>
  );
};

export default HeaderSec;
