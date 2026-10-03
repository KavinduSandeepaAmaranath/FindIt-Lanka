import { FiPlus } from "react-icons/fi";
import DashboardItemCard from "./DashboardItemCard";

function ItemsGridSection({ title, items, addLabel, viewAllHref = "#" }) {
  return (
    <section className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-extrabold text-slate-900">{title}</h2>
        <a
          href={viewAllHref}
          className="text-sm font-semibold text-blue-700 hover:text-blue-900 whitespace-nowrap"
        >
          View All
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {items.map((item) => (
          <DashboardItemCard key={item.id} {...item} />
        ))}

        <button className="rounded-2xl border-2 border-dashed border-blue-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors flex flex-col items-center justify-center gap-3 py-10 text-blue-700">
          <span className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center">
            <FiPlus className="w-5 h-5" />
          </span>
          <span className="text-sm font-semibold">{addLabel}</span>
        </button>
      </div>
    </section>
  );
}

export default ItemsGridSection;
