const SafetyReminder = ({ formData }) => {
  const Icon = formData.sections.reminder.icon;

  return (
    <section className="mb-8">

      <div
        className="
          flex
          items-start
          gap-4
          rounded-2xl
          border
          border-blue-200
          bg-blue-50
          p-5
        "
      >

        {/* Icon */}
        <div className="flex-shrink-0 rounded-xl bg-blue-100 p-3">

          <Icon className="text-2xl text-blue-600" />

        </div>

        {/* Content */}
        <div>

          <h3 className="text-base sm:text-lg font-semibold text-blue-800">
            {formData.safetyReminder.title}
          </h3>

          <p className="mt-2 text-sm text-slate-600 leading-6">
            {formData.safetyReminder.description}
          </p>

        </div>

      </div>

    </section>
  );
};

export default SafetyReminder;