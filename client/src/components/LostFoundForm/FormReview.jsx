import { FiPackage, FiMapPin, FiCalendar, FiImage, FiEdit3 } from "react-icons/fi";
import SafetyReminder from "./SafetyReminder";

const FormReview = ({ formData, formValues, onEditStep }) => {
  const isFound = formData.type === "found";
  const previews = formValues.imagePreviews || [];

  return (
    <div className="space-y-6">
      <div className="border border-blue-100 bg-blue-50/40 rounded-2xl p-5">
        <h3 className="text-base font-bold text-blue-900 mb-1">
          Review Your {isFound ? "Found Item" : "Lost Item"} Report
        </h3>
        <p className="text-xs text-blue-800/80">
          Please confirm all details are accurate before publishing to the community.
        </p>
      </div>

      {/* Item Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5">
        {/* Title & Category */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600 mt-0.5">
              <FiPackage className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Item Identity
              </div>
              <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                {formValues.title || "Untitled Item"}
              </h4>
              <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                {formValues.category || "Uncategorized"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 p-1.5 rounded-lg hover:bg-blue-50 transition"
          >
            <FiEdit3 className="w-3.5 h-3.5" /> Edit
          </button>
        </div>

        {/* Location & Date */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 mt-0.5">
              <FiMapPin className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Where & When
              </div>
              <div className="text-sm font-semibold text-slate-800">
                {formValues.location ? `${formValues.location}, ` : ""}
                <span className="text-slate-900 font-bold">{formValues.district || "District not set"}</span>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <FiCalendar className="w-3.5 h-3.5" />
                <span>
                  {formValues.date || "Date not set"} {formValues.time ? `• ${formValues.time}` : ""}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 p-1.5 rounded-lg hover:bg-blue-50 transition"
          >
            <FiEdit3 className="w-3.5 h-3.5" /> Edit
          </button>
        </div>

        {/* Description */}
        <div className="border-b border-slate-100 pb-4">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Description
          </div>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
            {formValues.description || "No description provided."}
          </p>
        </div>

        {/* Uploaded Photos */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FiImage className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Photos ({previews.length})
              </span>
            </div>

            <button
              type="button"
              onClick={() => onEditStep(3)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 p-1.5 rounded-lg hover:bg-blue-50 transition"
            >
              <FiEdit3 className="w-3.5 h-3.5" /> Edit
            </button>
          </div>

          {previews.length > 0 ? (
            <div className="flex gap-2.5 overflow-x-auto pb-2">
              {previews.map((img, i) => (
                <div
                  key={img.id}
                  className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 shrink-0"
                >
                  <img src={img.url} alt="Uploaded item" className="w-full h-full object-cover" />
                  {i === (formValues.coverIndex ?? 0) && (
                    <span className="absolute bottom-1 left-1 right-1 text-[8px] bg-blue-600 text-white font-bold text-center rounded py-0.5">
                      Cover
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No photos attached.</p>
          )}
        </div>
      </div>

      {/* Safety Reminder */}
      <SafetyReminder formData={formData} />
    </div>
  );
};

export default FormReview;
