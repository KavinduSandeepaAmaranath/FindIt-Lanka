import { FiCheck, FiPackage, FiMapPin, FiImage, FiCheckCircle } from "react-icons/fi";

const STEP_ITEMS = [
  { step: 1, title: "Item Details", shortTitle: "Details", icon: FiPackage },
  { step: 2, title: "Location & Date", shortTitle: "Where/When", icon: FiMapPin },
  { step: 3, title: "Photos & Notes", shortTitle: "Photos", icon: FiImage },
  { step: 4, title: "Review & Submit", shortTitle: "Review", icon: FiCheckCircle },
];

const FormStepper = ({ currentStep, onSelectStep, completedSteps = [] }) => {
  return (
    <div className="mb-8">
      {/* Progress Bar Container */}
      <div className="relative">
        {/* Background Connecting Line */}
        <div className="absolute top-5 left-6 right-6 h-0.5 bg-slate-200 -z-0 hidden sm:block" />
        
        {/* Active Connecting Line */}
        <div
          className="absolute top-5 left-6 h-0.5 bg-blue-600 -z-0 transition-all duration-300 hidden sm:block"
          style={{
            width: `${((currentStep - 1) / (STEP_ITEMS.length - 1)) * 90}%`,
          }}
        />

        {/* Steps Grid */}
        <div className="grid grid-cols-4 gap-2">
          {STEP_ITEMS.map((item) => {
            const isCompleted = completedSteps.includes(item.step) && item.step < currentStep;
            const isCurrent = currentStep === item.step;
            const isClickable = item.step < currentStep || completedSteps.includes(item.step);
            const StepIcon = item.icon;

            return (
              <button
                type="button"
                key={item.step}
                disabled={!isClickable && !isCurrent}
                onClick={() => isClickable && onSelectStep(item.step)}
                className={`flex flex-col items-center text-center group transition-all duration-200 ${
                  isClickable ? "cursor-pointer" : "cursor-default"
                }`}
              >
                {/* Step Circle */}
                <div
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-200 ${
                    isCurrent
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-4 ring-blue-100"
                      : isCompleted
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-white text-slate-400 border-2 border-slate-200 group-hover:border-slate-300"
                  }`}
                >
                  {isCompleted ? (
                    <FiCheck className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <StepIcon className="w-4 h-4" />
                  )}
                </div>

                {/* Step Text Label */}
                <span
                  className={`mt-2 text-xs font-semibold transition-colors duration-200 ${
                    isCurrent
                      ? "text-blue-900 font-bold"
                      : isCompleted
                      ? "text-emerald-700"
                      : "text-slate-400"
                  }`}
                >
                  <span className="hidden sm:inline">{item.title}</span>
                  <span className="sm:hidden">{item.shortTitle}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FormStepper;
