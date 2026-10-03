import { FiFileText, FiShoppingBag, FiSearch, FiShield, FiArrowRight } from "react-icons/fi";

const features = [
  {
    title: "Report Lost Item",
    description: "Lost something? Report it and let others help you find it.",
    icon: FiFileText,
    bg: "bg-rose-400",
  },
  {
    title: "Report Found Item",
    description: "Found something? Report it and help reunite it with the owner.",
    icon: FiShoppingBag,
    bg: "bg-blue-600",
  },
  {
    title: "Browse Item",
    description: "Explore lost and found items in your area.",
    icon: FiSearch,
    bg: "bg-orange-500",
  },
  {
    title: "Safe & Trusted",
    description: "Community verified reports. Secure and trusted by everyone.",
    icon: FiShield,
    bg: "bg-violet-500",
  },
];

function FeatureCards() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 -mt-2 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ title, description, icon: Icon, bg }) => (
          <div
            key={title}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-8 flex flex-col items-center text-center"
          >
            <div
              className={`w-14 h-14 rounded-xl ${bg} flex items-center justify-center mb-5`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {description}
            </p>
            <button
              aria-label={title}
              className="mt-6 w-10 h-10 rounded-full border border-blue-200 text-blue-700 flex items-center justify-center hover:bg-blue-50 transition-colors"
            >
              <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureCards;
