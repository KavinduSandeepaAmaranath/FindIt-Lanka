import { FiSearch, FiSend } from "react-icons/fi";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950">
      {/* Decorative background image (replace with your own hero photo) */}
      <div
        className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?q=80&w=1600&auto=format&fit=crop')",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Connecting Lost Item with their
          <br className="hidden md:block" /> Rightful Owners
        </h1>

        <p className="mt-6 text-blue-100 text-base md:text-lg max-w-2xl mx-auto">
          Sri Lanka&apos;s trusted community-driven lost and found network.
          Quickly report missing belongings or help others find what
          they&apos;ve lost.
        </p>

        {/* Search bar */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-10 max-w-2xl mx-auto flex items-center bg-white rounded-full shadow-lg p-2"
        >
          <FiSearch className="w-5 h-5 text-slate-400 ml-4" />
          <input
            type="text"
            placeholder="Search for lost keys, pets, or electronics..."
            className="flex-1 px-3 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none bg-transparent"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
          >
            Search
          </button>
        </form>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-blue-900 text-sm font-semibold shadow hover:bg-blue-50 transition-colors">
            <FiSend className="w-4 h-4" />
            Report Lost Item
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/60 text-white text-sm font-semibold hover:bg-white/20 transition-colors">
            <FiSend className="w-4 h-4" />
            Report Found Item
          </button>
        </div>

        {/* Social proof */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <div className="flex -space-x-3">
            <img
              src="https://i.pravatar.cc/64?img=32"
              alt="Community member"
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
            <img
              src="https://i.pravatar.cc/64?img=12"
              alt="Community member"
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
            <img
              src="https://i.pravatar.cc/64?img=51"
              alt="Community member"
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
          </div>
          <p className="text-white text-sm text-left">
            Join 12,000+ people
            <br />
            who have recovered their items
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
