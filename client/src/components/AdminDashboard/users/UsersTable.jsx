import { useState } from "react";
import UserViewModal from "./UserViewModal";
import SuspendUserModal from "./SuspendUserModal";
import Pagination from "../Pagination";
import { Eye, ShieldOff } from "lucide-react";

const UsersTable = ({ users = [] }) => {
  // Pagination
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = users.slice(startIndex, endIndex);

  const [selectedUser, setSelectedUser] = useState(null);
  const [suspendUser, setSuspendUser] = useState(null);

  return (
    <>
      <div className="mt-8 w-full overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1200px] border-collapse">
            {/* Table Header */}
            <thead className="border-b border-gray-300 bg-gray-50">
              <tr className="text-sm font-semibold text-[#2A3B63]">
                <th className="border-r border-gray-200 px-3 py-4 text-left underline">User ID</th>
                <th className="border-r border-gray-200 px-3 py-4 text-center underline">Profile</th>
                <th className="border-r border-gray-200 px-3 py-4 text-left underline">Full Name</th>
                <th className="border-r border-gray-200 px-3 py-4 text-left underline">Email</th>
                <th className="border-r border-gray-200 px-3 py-4 text-left underline">Phone</th>
                <th className="border-r border-gray-200 px-3 py-4 text-left underline">District</th>
                <th className="border-r border-gray-200 px-3 py-4 text-left underline">Registered</th>
                <th className="border-r border-gray-200 px-3 py-4 text-center underline">Lost</th>
                <th className="border-r border-gray-200 px-3 py-4 text-center underline">Found</th>
                <th className="border-r border-gray-200 px-3 py-4 text-center underline">Claims</th>
                <th className="border-r border-gray-200 px-3 py-4 text-center underline">Status</th>
                <th className="px-3 py-4 text-center underline">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {currentRows.map((user) => (
                <tr
                  key={user.id || user._id}
                  onClick={() => setSelectedUser(user)}
                  className="cursor-pointer border-b border-gray-200 transition-colors duration-200 hover:bg-gray-50"
                >
                  <td className="border-r border-gray-200 px-3 py-3 text-sm text-[#29292D]">
                    {user.id || user._id}
                  </td>

                  <td className="border-r border-gray-200 px-3 py-3">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="mx-auto h-10 w-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150?text=User";
                      }}
                    />
                  </td>

                  <td className="border-r border-gray-200 px-3 py-3 text-sm font-medium text-[#29292D]">
                    {user.name}
                  </td>

                  <td className="border-r border-gray-200 px-3 py-3 text-sm text-[#29292D]">
                    {user.email}
                  </td>

                  <td className="border-r border-gray-200 px-3 py-3 text-sm text-[#29292D]">
                    {user.phone}
                  </td>

                  <td className="border-r border-gray-200 px-3 py-3 text-sm text-[#29292D]">
                    {user.district}
                  </td>

                  <td className="border-r border-gray-200 px-3 py-3 text-sm text-[#29292D]">
                    {user.registered}
                  </td>

                  <td className="border-r border-gray-200 px-3 py-3 text-center text-sm font-medium text-[#29292D]">
                    {user.lost}
                  </td>

                  <td className="border-r border-gray-200 px-3 py-3 text-center text-sm font-medium text-[#29292D]">
                    {user.found}
                  </td>

                  <td className="border-r border-gray-200 px-3 py-3 text-center text-sm font-medium text-[#29292D]">
                    {user.claims}
                  </td>

                  <td className="border-r border-gray-200 px-3 py-3 text-center">
                    <UserStatusBadge status={user.status} />
                  </td>

                  <td className="px-3 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUser(user);
                        }}
                        className="
                          inline-flex
                          items-center
                          gap-1
                          rounded-full
                          bg-[#2563EB]
                          px-3
                          py-1.5
                          text-xs
                          font-semibold
                          text-white
                          transition-all
                          duration-200
                          hover:bg-[#0F3292]
                          hover:shadow-md
                          active:scale-95
                          focus:outline-none
                        "
                      >
                        <Eye size={13} />
                        View
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSuspendUser(user);
                        }}
                        className="
                          inline-flex
                          items-center
                          gap-1
                          rounded-full
                          bg-[#B63838]
                          px-3
                          py-1.5
                          text-xs
                          font-semibold
                          text-white
                          transition-all
                          duration-200
                          hover:bg-[#8F2C2C]
                          hover:shadow-md
                          active:scale-95
                          focus:outline-none
                        "
                      >
                        <ShieldOff size={13} />
                        Suspend
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={users.length}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            itemName="users"
          />
        </div>
      </div>

      {selectedUser && (
        <UserViewModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {suspendUser && (
        <SuspendUserModal
          user={suspendUser}
          onClose={() => setSuspendUser(null)}
        />
      )}
    </>
  );
};

/* User Status Badge */
const UserStatusBadge = ({ status }) => {
  const isActive = status === "Active";

  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${isActive
          ? "bg-[#009B50]/10 text-[#009B50]"
          : "bg-[#B63838]/10 text-[#B63838]"
        }
      `}
    >
      {status}
    </span>
  );
};

export default UsersTable;
