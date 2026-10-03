import {
  FiBookOpen,
  FiSearch,
  FiShield,
  FiPhoneCall,
  FiChevronRight,
} from "react-icons/fi";

const iconMap = {
  book: FiBookOpen,
  search: FiSearch,
  shield: FiShield,
  phone: FiPhoneCall,
};

function HelpCategoryCard({ category, onClick }) {
  const IconComponent = iconMap[category.icon] || FiBookOpen;

  return (
    <div
      onClick={() => onClick(category)}
      className="group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer"
    >
      <div>
        {/* Card Header: Icon container & Chevron */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-200 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-105">
            <IconComponent className="w-5 h-5" />
          </div>

          <FiChevronRight className="w-4 h-4 text-blue-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
        </div>

        {/* Title & Description */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
          {category.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
          {category.description}
        </p>

        {/* Bullet List */}
        <ul className="space-y-1.5 text-xs text-slate-600">
          {category.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800 shrink-0 mt-1.5" />
              <span className="leading-snug hover:text-blue-600 transition-colors">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HelpCategoryCard;