import UserProfileBadge from "../common/UserProfileBadge";

const ReportHeader = ({ header, user }) => {
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
      <div className="flex items-center justify-end gap-4">

        {/* Profile */}
        <UserProfileBadge user={user} />

      </div>

    </header>
  );
};

export default ReportHeader;
