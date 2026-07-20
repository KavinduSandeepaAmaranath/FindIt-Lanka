import { FiLifeBuoy } from "react-icons/fi";

function SafetyTipCard() {
  return (
    <section className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-6 text-white flex flex-col gap-4">
      <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
        <FiLifeBuoy className="w-5 h-5" />
      </div>
      <div>
        <h3 className="text-lg font-extrabold">Safety Tip</h3>
        <p className="text-sm text-blue-100 leading-relaxed mt-1.5">
          Always meet in public places like police stations or malls when
          handing over found items.
        </p>
      </div>
    </section>
  );
}

export default SafetyTipCard;
