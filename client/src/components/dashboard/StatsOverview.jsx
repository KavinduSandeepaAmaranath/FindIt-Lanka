import { FiTrendingUp, FiPieChart, FiAlertCircle, FiCalendar } from "react-icons/fi";

const iconMap = {
  trend: FiTrendingUp,
  pie: FiPieChart,
  alert: FiAlertCircle,
  calendar: FiCalendar,
};

function StatsOverview({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map(({ label, value, note, icon }) => {
        const Icon = iconMap[icon] || FiTrendingUp;
        return (
          <div
            key={label}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">{label}</p>
              <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Icon className="w-4.5 h-4.5" />
              </div>
            </div>
            
            <p className="text-3xl font-extrabold text-slate-900">{value}</p>
            <p className="text-xs text-slate-400">{note}</p>
          </div>
        );
      })}
    </div>
  );
}

export default StatsOverview;
