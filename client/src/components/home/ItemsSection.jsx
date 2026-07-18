import ItemCard from "./ItemCard";

function ItemsSection({ title, subtitle, items }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-blue-950">{title}</h2>
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        </div>
        <a
          href="#"
          className="text-sm font-semibold text-blue-700 hover:text-blue-900 whitespace-nowrap"
        >
          View All Items
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {items.map((item) => (
          <ItemCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}

export default ItemsSection;
