import { FiX } from "react-icons/fi";

const UserViewModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-red-500 hover:text-white transition"
        >
          <FiX size={20} />
        </button>

        {/* Profile */}
        <div className="flex flex-col items-center">

          <img
            src={user.image}
            alt={user.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-200"
          />

          <h2 className="mt-4 text-2xl font-bold text-slate-800">
            {user.name}
          </h2>

          <p className="text-gray-500">
            {user.email}
          </p>

        </div>

        {/* Details */}

        <div className="grid grid-cols-2 gap-5 mt-8">

          <div>
            <p className="text-sm text-gray-500">
              Phone
            </p>

            <h3 className="font-semibold">
              {user.phone}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              District
            </p>

            <h3 className="font-semibold">
              {user.district}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Registered
            </p>

            <h3 className="font-semibold">
              {user.registered}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Status
            </p>

            <h3
              className={`font-semibold ${
                user.status === "Active"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {user.status}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Lost Reports
            </p>

            <h3 className="font-semibold">
              {user.lost}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Found Reports
            </p>

            <h3 className="font-semibold">
              {user.found}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Claims
            </p>

            <h3 className="font-semibold">
              {user.claims}
            </h3>
          </div>

        </div>

      </div>

    </div>
  );
};

export default UserViewModal;