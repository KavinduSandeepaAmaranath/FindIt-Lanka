import { FiAward } from "react-icons/fi";

function BadgesEarned({ badges }) {
  return (
    <section className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-extrabold text-slate-900 mb-5">
        Badges Earned
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {badges.map(({ id, label, sub, bg }) => (
          <div key={id} className="flex flex-col items-center text-center gap-2">
            <div
              className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center text-white shadow-sm`}
            >
              <FiAward className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{label}</p>
              <p className="text-xs text-slate-400">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BadgesEarned;
