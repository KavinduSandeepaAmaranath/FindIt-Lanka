import { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

function SettingsSectionCard({ icon: Icon, title, description, danger, children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section
      className={`rounded-2xl shadow-md border p-5 sm:p-6 ${
        danger ? "bg-red-200 border-red-100" : "bg-sky-50/60 border-sky-100"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between gap-4 text-left"
      >
        <div className="flex items-start gap-3 min-w-0">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
              danger ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
            }`}
          >
            <Icon className="w-4.5 h-4.5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-extrabold text-blue-800">{title}</h2>
            <p className="text-sm text-slate-500 mt-0.5">{description}</p>
          </div>
        </div>

        <span className="text-blue-500 shrink-0 mt-1">
          {isOpen ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
        </span>
      </button>

      {isOpen && <div className="mt-5">{children}</div>}
    </section>
  );
}

export default SettingsSectionCard;
