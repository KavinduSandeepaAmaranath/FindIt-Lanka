import { FiMapPin, FiCalendar, FiEye } from "react-icons/fi";
import fallbackImage from "../../assets/images/acerLaptop.jpg";

function BrowseItemCard({ item, onViewDetails }) {
  const isLost = item.status === "Lost";

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 p-3.5 flex flex-col group">
      {/* Top Image Container */}
      <div className="relative w-full aspect-4/3 overflow-hidden rounded-xl bg-slate-100 mb-3.5">
        <img
          src={item.image || fallbackImage}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>

      {/* Card Info Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Title, Category & Status Badge Row */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight truncate">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 font-normal mt-0.5">
                {item.category}
              </p>
            </div>

            <span
              className={`shrink-0 px-3 py-0.5 rounded-full text-xs font-semibold shadow-2xs ${
                isLost
                  ? "bg-red-500 text-white"
                  : "bg-emerald-600 text-white"
              }`}
            >
              {item.status}
            </span>
          </div>

          {/* Location Row */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-3">
            <FiMapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>

          {/* Date Row */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
            <FiCalendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{item.date}</span>
          </div>
        </div>

        {/* View Details Button */}
        <button
          type="button"
          onClick={() => {
            if (onViewDetails) {
              onViewDetails(item);
            }
          }}
          className="mt-4 w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
        >
          <FiEye className="w-4 h-4" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
}

export default BrowseItemCard;
