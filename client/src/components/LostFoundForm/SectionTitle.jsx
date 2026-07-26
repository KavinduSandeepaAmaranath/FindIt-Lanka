const SectionTitle = ({ icon: Icon, title }) => {
  return (
    <div className="flex items-center gap-3 mb-5">

      {/* Icon Box */}
      <div className="bg-blue-600 p-2 sm:p-2.5 rounded-xl text-white flex-shrink-0">
        <Icon className="text-lg sm:text-xl" />
      </div>

      {/* Title */}
      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-800 leading-tight">
        {title}
      </h2>

    </div>
  );
};

export default SectionTitle;