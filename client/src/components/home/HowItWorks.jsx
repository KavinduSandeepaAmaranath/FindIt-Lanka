import { FiEdit3, FiSearch, FiUsers } from "react-icons/fi";

const steps = [
  {
    number: 1,
    title: "Post an Item",
    description:
      "Report your lost or found item with all the important details.",
    icon: FiEdit3,
    badge: "bg-blue-600",
    iconBg: "bg-blue-700",
  },
  {
    number: 2,
    title: "Search Matches",
    description:
      "We match your item with reports from the community in your area.",
    icon: FiSearch,
    badge: "bg-emerald-500",
    iconBg: "bg-blue-500",
  },
  {
    number: 3,
    title: "Connect & Recover",
    description:
      "Connect with the right person and safely recover your item.",
    icon: FiUsers,
    badge: "bg-orange-500",
    iconBg: "bg-blue-800",
  },
];

function HowItWorks() {
  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-10 py-16 text-center">
      <h2 className="text-3xl font-extrabold text-blue-950">How it Works</h2>
      <div className="w-16 h-1 bg-blue-700 mx-auto mt-3 mb-14 rounded-full" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {steps.map(({ number, title, description, icon: Icon, badge, iconBg }) => (
          <div key={title} className="flex flex-col items-center">
            <div className="relative mb-6">
              <div
                className={`w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center shadow-md`}
              >
                <Icon className="w-7 h-7 text-white" />
              </div>
              <span
                className={`absolute -bottom-2 -left-2 w-6 h-6 rounded-full ${badge} text-white text-xs font-bold flex items-center justify-center`}
              >
                {number}
              </span>
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
