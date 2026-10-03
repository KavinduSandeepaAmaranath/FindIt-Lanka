import {
  FiCheckCircle,
  FiMail,
  FiAlertTriangle,
  FiXCircle,
} from "react-icons/fi";

const iconMap = {
  match: { icon: FiCheckCircle, bg: "bg-blue-50", color: "text-blue-600" },
  message: { icon: FiMail, bg: "bg-blue-50", color: "text-blue-600" },
  urgent: { icon: FiAlertTriangle, bg: "bg-orange-50", color: "text-orange-600" },
  closed: { icon: FiXCircle, bg: "bg-emerald-50", color: "text-emerald-600" },
};

function RecentActivity({ activities }) {
  return (
    <section className="bg-white rounded-2xl shadow-md p-6 flex flex-col h-full">
      <h2 className="text-xl font-extrabold text-slate-900 mb-5">
        Recent Activities
      </h2>

      <div className="space-y-5 flex-1">
        {activities.map(({ id, type, title, description, time, actionable }) => {
          const { icon: Icon, bg, color } = iconMap[type] || iconMap.message;
          return (
            <div key={id} className="flex gap-3">
              <div
                className={`w-9 h-9 rounded-full ${bg} ${color} flex items-center justify-center shrink-0`}
              >
                <Icon className="w-4.5 h-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900">{title}</p>
                <p className="text-sm text-slate-500 leading-snug mt-0.5">
                  {description}
                </p>
                <p className="text-xs text-slate-400 mt-1">{time}</p>

                {actionable && (
                  <div className="flex items-center gap-2 mt-3">
                    <button className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition-colors">
                      View Match
                    </button>
                    <button className="px-4 py-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-semibold transition-colors">
                      Dismiss
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <a
        href="#"
        className="mt-5 text-sm font-semibold text-blue-700 hover:text-blue-900 text-right"
      >
        View All
      </a>
    </section>
  );
}

export default RecentActivity;
