const SectionTitle = ({ icon: Icon, title, subtitle }) => {
  return (
    <div className="flex items-start gap-3.5 mb-6">
      {/* Icon Box */}
      {Icon && (
        <div className="bg-blue-600 p-2 sm:p-2.5 rounded-xl text-white shrink-0 mt-0.5 shadow-sm shadow-blue-500/20">
          <Icon className="text-lg sm:text-xl" />
        </div>
      )}

      {/* Title & Subtitle */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-800 leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default SectionTitle;