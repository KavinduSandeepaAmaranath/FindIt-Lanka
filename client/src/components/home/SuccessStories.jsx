import { FiStar } from "react-icons/fi";
import { testimonials } from "../../data/landingData";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-amber-400 fill-amber-400" : "text-slate-300"
          }`}
        />
      ))}
    </div>
  );
}

function SuccessStories() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 text-center">
      <h2 className="text-3xl font-extrabold text-blue-950">
        Success Stories
      </h2>
      <div className="w-16 h-1 bg-blue-700 mx-auto mt-3 mb-12 rounded-full" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {testimonials.map(({ name, avatar, rating, quote }) => (
          <div
            key={name}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={avatar}
                alt={name}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{name}</h3>
                <StarRating rating={rating} />
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              &ldquo;{quote}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SuccessStories;
