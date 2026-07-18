import { recentActivities } from "../../data/AdminDashboard";

const RecentActivities = () => {
  return (
    
    <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-md p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-[1.01] hover:bg-white/90">
      
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-6">
        Recent Activities
      </h2>

      <div className="space-y-6">
        {recentActivities.map((activity) => {
          const IconComponent = activity.icon;

          return (
            <div key={activity.id} className="flex gap-4">
              <div className="bg-blue-50 p-2 rounded-lg h-fit flex-shrink-0">
                <IconComponent className="text-blue-600" size={20} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 break-words leading-tight">
                  {activity.title}
                </p>
                {activity.user && (
                  <p className="text-xs text-gray-500 mt-0.5">{activity.user}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-6">
        <button className="bg-blue-600 text-white text-sm px-5 py-2 rounded-full hover:bg-blue-700 transition">
          View All
        </button>
      </div>
    </div>
  );
};

export default RecentActivities;