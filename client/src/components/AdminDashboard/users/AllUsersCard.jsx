const UsersCard = ({ stats }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              bg-white
              rounded-2xl
              border
              border-gray-200
              shadow-sm
              p-5
              transition-all
              duration-300
              hover:shadow-xl
              hover:-translate-y-1
            "
          >

            {/* Header */}
            <div className="flex items-center gap-4">

              <div
                className="
                  h-14
                  w-14
                  rounded-full
                  bg-blue-100
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                <Icon
                  className="text-3xl text-blue-500"
                />
              </div>

              <div className="min-w-0">

                <h3
                  className="
                    text-base
                    lg:text-lg
                    font-bold
                    text-slate-700
                    truncate
                  "
                >
                  {item.title}
                </h3>

              </div>

            </div>

            {/* Body */}

            <div className="mt-5">

              <h2
                className="
                  text-3xl
                  lg:text-4xl
                  font-bold
                  text-blue-700
                "
              >
                {item.value}
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-slate-600
                "
              >
                {item.description}
              </p>

            </div>

            {/* Footer */}

            <div className="mt-4">

              <span
                className="
                  text-xs
                  text-blue-500
                  font-medium
                "
              >
                {item.change}
              </span>

            </div>

          </div>
        );
      })}

    </section>
  );
};

export default UsersCard;