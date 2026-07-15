import { FiHeart, FiArrowRight } from "react-icons/fi";

function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-10 pb-20">
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-3xl px-8 py-12 md:px-14 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6 text-center md:text-left flex-col md:flex-row">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <FiHeart className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug">
              Help Someone Recover
              <br className="hidden md:block" /> Their Belongings Today
            </h2>
            <p className="text-blue-100 text-sm mt-2">
              Small actions can make a big difference.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
          <div className="flex gap-3">
            
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-blue-900 text-sm font-semibold shadow hover:bg-blue-50 transition-colors whitespace-nowrap">
            Get Started
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
