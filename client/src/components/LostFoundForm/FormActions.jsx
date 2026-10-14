import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiLoader } from "react-icons/fi";

const FormActions = ({
  currentStep = 1,
  totalSteps = 3,
  onNext,
  onBack,
  onSubmit,
  onCancel,
  isSubmitting = false,
  isLastStep = false,
}) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-8 mt-8 border-t border-slate-100">
      {/* Left side: Back or Cancel */}
      <div className="w-full sm:w-auto flex items-center gap-2">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition shadow-xs disabled:opacity-50"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-transparent hover:bg-slate-100 text-slate-500 hover:text-slate-700 font-semibold text-sm transition"
          >
            Cancel
          </button>
        ) : null}
      </div>

      {/* Right side: Next Step or Submit */}
      <div className="w-full sm:w-auto flex items-center gap-3">
        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={onNext}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30"
          >
            <span>Continue</span>
            <FiArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <FiLoader className="w-4 h-4 animate-spin" />
                <span>Submitting Report...</span>
              </>
            ) : (
              <>
                <FiCheckCircle className="w-4 h-4" />
                <span>Publish Report</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormActions;