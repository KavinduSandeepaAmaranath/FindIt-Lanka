import { FiMenu } from "react-icons/fi";

import { reportHeaderData } from "../../../data/AdminModuleData/ReportManagement";

const HeaderSec = ({ setIsOpen }) => {
  const { title, description, buttons } = reportHeaderData;

  return (
    <section className="mb-6 sm:mb-8">
      <div
        className="
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between
          gap-6
        "
      >
        {/* Left Side */}

        <div className="flex-1">

          {/* Mobile Hamburger for responsive */}
          
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
            <FiMenu size={28} />
          </button>

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

        {/* notifi setting & export Btn */}
        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-4
            w-full
            xl:w-auto
          "
        >
          {buttons.map((button) => {
            const Icon = button.icon;

            return (
              <button
                key={button.id}
                className="
                  flex
                  w-full
                  sm:w-auto
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  sm:px-5
                  py-3
                  text-sm
                  sm:text-base
                  font-medium
                  text-blue-600
                  shadow-sm
                  outline-none
                  transition
                  hover:bg-gray-50
                  hover:shadow-md
                "
              >
                <Icon
                  size={17}
                  className="shrink-0"
                />

                <span className="whitespace-nowrap">
                  {button.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeaderSec;