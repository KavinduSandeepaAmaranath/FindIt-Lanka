import { locations } from "../../data/AdminDashboard";

const TopLocations = () => {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-md p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-[1.01] hover:bg-white/90">

      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-5">
        Top Locations
      </h2>

      <div className="space-y-5">
        {locations.map((location) => {
          const Icon = location.icon; // now comes from the data file

          return (
            <div key={location.id}>
              <div className="flex justify-between items-center text-sm mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  {/* SAFE: only render if the icon exists */}
                  {Icon && <Icon className="text-blue-500 flex-shrink-0" />}
                  <span className="font-medium truncate">{location.name}</span>
                </div>

                <span className="text-gray-500 text-xs sm:text-sm whitespace-nowrap ml-2">
                  {location.reports} Reports
                </span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full w-full">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${location.percentage}%` }}
                />
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

export default TopLocations;