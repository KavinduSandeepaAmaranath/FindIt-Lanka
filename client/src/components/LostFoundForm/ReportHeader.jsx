import ProfileImg from "../../assets/icons/ProfileImg.jpeg";

const ReportHeader = ({ header, user }) => {
  const BellIcon = header.icons.bell;

  return (
    <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

      {/* Left Side */}
      <div className="flex-1">

        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-slate-800 leading-tight">
          {header.title}
        </h1>

        <p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-500 max-w-2xl">
          {header.subtitle}
        </p>

      </div>

      {/* Right Side */}
      <div className="flex items-center justify-between sm:justify-end gap-4">

        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">

          <BellIcon className="text-2xl text-orange-400" />

          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>

        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 rounded-xl p-2 hover:bg-gray-100 transition">

          <div className="hidden sm:block text-right">

            <h3 className="font-semibold text-slate-800 text-sm lg:text-base">
              {user?.name}
            </h3>

            <p className="text-xs lg:text-sm text-gray-500">
              {user?.membership || "Community Member"}
            </p>

          </div>

          <img
            src={ProfileImg}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border"
          />

        </button>

      </div>

    </header>
  );
};

export default ReportHeader;