import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getTopLocations } from "../../services/adminService";

const TopLocations = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const response = await getTopLocations();
        
        const maxReports =
          response.locations.length > 0
            ? response.locations[0].totalReports
            : 1;

        const formattedLocations = response.locations.map(
          (location, index) => ({
            id: index + 1,
            name: location._id,
            reports: location.totalReports,
            percentage:
              (location.totalReports / maxReports) * 100,
            icon: FaMapMarkerAlt,
          })
        );

        setLocations(formattedLocations);
      } catch (error) {
        console.error(error);
      }
    };

    loadLocations();
  }, []);

  // Navigate to locations page
  const handleViewAll = () => {
    navigate("/admin-locations");
  };

  return (
    <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-md p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-[1.01] hover:bg-white/90">

      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-5">
        Top Locations
      </h2>

      <div className="space-y-5 max-h-[420px] overflow-y-auto pr-2">
        {locations.map((location) => {
          const Icon = location.icon;

          return (
            <div key={location.id}>
              <div className="flex justify-between items-center text-sm mb-2">
                <div className="flex items-center gap-2 min-w-0">
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
        <button
          onClick={handleViewAll}
          className="bg-blue-600 text-white text-sm px-5 py-2 rounded-full hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default TopLocations;