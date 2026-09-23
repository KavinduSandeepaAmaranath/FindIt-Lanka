import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import {
  FaUserPlus,
  FaSearch,
  FaBoxOpen,
} from "react-icons/fa";
import { getRecentActivities } from "../../services/adminService";

const RecentActivities = () => {
  const navigate = useNavigate();

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await getRecentActivities();

        const formattedActivities = response.activities.map(
          (activity, index) => ({
            id: index + 1,
            title: activity.title,
            user: activity.user || "",
            time: new Date(activity.createdAt).toLocaleString(),
            icon:
              activity.type === "user"
                ? FaUserPlus
                : activity.type === "lost"
                ? FaSearch
                : FaBoxOpen,
          })
        );

        setRecentActivities(formattedActivities);
      } catch (error) {
        console.error(error);
      }
    };

    loadActivities();
  }, []);

  const openModal = (activity) => {
    setSelectedActivity(activity);
  };

  const closeModal = () => {
    setSelectedActivity(null);
  };

  const handleViewAll = () => {
    navigate("/admin-notifications");
  };

  return (
    <>
      {/* Activity Details Modal */}

      {selectedActivity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="relative flex flex-col items-center gap-4 px-8 py-6 rounded-2xl shadow-2xl border-t-4 bg-blue-50 border-blue-400 min-w-[320px] max-w-md mx-4 animate-pop-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}

            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-blue-800 hover:opacity-70 transition"
            >
              <FiX className="text-xl" />
            </button>

            {/* Icon */}

            <div className="p-3 rounded-full bg-blue-100">
              {(() => {
                const IconComponent = selectedActivity.icon;
                return <IconComponent className="text-blue-600 text-3xl" />;
              })()}
            </div>

            {/* Title */}

            <h3 className="text-center font-bold text-lg text-blue-900">
              Activity Details
            </h3>

            {/* Message */}

            <p className="text-center font-semibold text-base text-blue-800">
              {selectedActivity.title}
            </p>

            {/* User */}

            {selectedActivity.user && (
              <p className="text-center text-sm text-blue-700">
                {selectedActivity.user}
              </p>
            )}

            {/* Time */}

            <p className="text-center text-xs text-blue-500 mt-1">
              🕒 {selectedActivity.time}
            </p>

            {/* OK Button */}

            <button
              onClick={closeModal}
              className="mt-2 px-6 py-2 rounded-lg text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Main Card */}

      <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-md p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-[1.01] hover:bg-white/90">

        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-6">
          Recent Activities
        </h2>

        <div className="space-y-6 max-h-[420px] overflow-y-auto pr-2">
          {recentActivities.map((activity) => {
            const IconComponent = activity.icon;

            return (
              <div
                key={activity.id}
                onClick={() => openModal(activity)}
                className="flex gap-4 cursor-pointer p-2 -mx-2 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-sm active:scale-[0.98]"
              >
                <div className="bg-blue-50 p-2 rounded-lg h-fit flex-shrink-0">
                  <IconComponent className="text-blue-600" size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-800 break-words leading-tight hover:text-blue-600 transition-colors">
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
          <button
            onClick={handleViewAll}
            className="bg-blue-600 text-white text-sm px-5 py-2 rounded-full hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            View All
          </button>
        </div>
      </div>
    </>
  );
};

export default RecentActivities;