import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { User } from "lucide-react";
import { getUserById } from "../../../services/adminService";

const UserViewModal = ({ user, onClose }) => {
  const [imgError, setImgError] = useState(false);
  const [fetchedUser, setFetchedUser] = useState(null);

  const userId = user?.id || user?._id;

  useEffect(() => {
    if (!userId) return;
    let isMounted = true;
    const fetchFreshDetails = async () => {
      try {
        const response = await getUserById(userId);
        if (isMounted && response?.user) {
          setFetchedUser(response.user);
        } else if (isMounted && response?._id) {
          setFetchedUser(response);
        }
      } catch (err) {
        console.error("Error fetching detailed user counts:", err);
      }
    };
    fetchFreshDetails();
    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (!user) return null;

  const displayUser = fetchedUser || user;

  const name = displayUser.name || user.name || "User";
  const email = displayUser.email || user.email || "N/A";
  const phone = displayUser.phone || displayUser.phoneNumber || user.phone || user.phoneNumber || "N/A";
  const district = displayUser.district || user.district || "N/A";
  const status = displayUser.status || user.status || "Active";
  const isStatusActive = status === "Active" || status === "active";

  const registered = user.registered || (displayUser.createdAt ? new Date(displayUser.createdAt).toLocaleDateString() : "N/A");

  const rawImg = displayUser.image || displayUser.profilePicture || displayUser.profileImage || user.image;
  const imageUrl = rawImg
    ? (rawImg.startsWith("http") ? rawImg : `http://localhost:5000/${rawImg.replace(/^\//, "")}`)
    : null;

  const lostCount = fetchedUser?.lostItemsCount ?? user.lost ?? user.lostItemsCount ?? 0;
  const foundCount = fetchedUser?.foundItemsCount ?? user.found ?? user.foundItemsCount ?? 0;
  const claimsCount = fetchedUser?.claimsCount ?? user.claims ?? user.claimsCount ?? 0;

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
          {imageUrl && !imgError ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-200"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex w-28 h-28 items-center justify-center rounded-full border-4 border-blue-200 bg-gray-100 text-gray-400">
              <User className="w-14 h-14 text-gray-400" />
            </div>
          )}

          <h2 className="mt-4 text-2xl font-bold text-slate-800">
            {name}
          </h2>

          <p className="text-gray-500">
            {email}
          </p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-5 mt-8">
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <h3 className="font-semibold">{phone}</h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">District</p>
            <h3 className="font-semibold">{district}</h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">Registered</p>
            <h3 className="font-semibold">{registered}</h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <h3
              className={`font-semibold ${
                isStatusActive
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {status}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">Lost Reports</p>
            <h3 className="font-semibold">{lostCount}</h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">Found Reports</p>
            <h3 className="font-semibold">{foundCount}</h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">Claims</p>
            <h3 className="font-semibold">{claimsCount}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserViewModal;
