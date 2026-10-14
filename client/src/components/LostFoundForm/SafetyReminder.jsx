import { FiAlertTriangle } from "react-icons/fi";

const SafetyReminder = ({ formData }) => {
  const Icon = formData?.sections?.reminder?.icon || FiAlertTriangle;
  const reminder = formData?.safetyReminder || {
    title: "Safety First",
    description:
      "For your safety, always meet in a well-lit, public place like a police station, bank lobby, or shopping mall. Never share sensitive personal information or wire money.",
  };

  return (
    <section className="mt-8 mb-4">
      <div className="flex items-start gap-4 rounded-2xl border border-blue-200/80 bg-blue-50/70 p-4 sm:p-5">
        <div className="shrink-0 rounded-xl bg-blue-100 p-2.5 text-blue-600 mt-0.5">
          <Icon className="text-xl sm:text-2xl" />
        </div>

        <div>
          <h3 className="text-sm sm:text-base font-bold text-blue-900">
            {reminder.title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {reminder.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SafetyReminder;