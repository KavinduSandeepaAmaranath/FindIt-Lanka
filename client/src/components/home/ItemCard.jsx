import { FiMapPin, FiCalendar } from "react-icons/fi";

function ItemCard({ image, title, location, date }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
        <p className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
          <FiMapPin className="w-3.5 h-3.5 text-blue-600" />
          {location}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-slate-500">
          <FiCalendar className="w-3.5 h-3.5 text-blue-600" />
          {date}
        </p>
      </div>
    </div>
  );
}

export default ItemCard;
