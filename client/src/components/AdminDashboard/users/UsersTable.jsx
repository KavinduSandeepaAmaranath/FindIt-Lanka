import { useState } from "react";
import UserViewModal from "./UserViewModal";
import SuspendUserModal from "./SuspendUserModal";
import Pagination from "../Pagination";
import { Eye, ShieldOff, UserCheck, User } from "lucide-react";

const tableHeaderClass = "px-4 py-4 text-xs font-semibold text-[#2A3B63] underline underline-offset-2";

/* Fallback Profile Avatar Component */
const UserAvatar = ({ image, name }) => {
  const [imgError, setImgError] = useState(false);

  if (!image || imgError) {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-gray-100 text-gray-400 mx-auto">
        <User className="h-5 w-5 text-gray-400" />
      </div>
    );
  }

  return (
    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100 mx-auto">
      <img
        src={image}
        alt={name || "User"}
        className="h-full w-full object-cover"
        onError={() => setImgError(true)}
      />
    </div>
  );
};

const UsersTable = ({ users = [], onUserStatusChange }) => {
  // Pagination
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = users.slice(startIndex, endIndex);

  const [selectedUser, setSelectedUser] = useState(null);
  const [suspendUser, setSuspendUser] = useState(null);

  const handleStatusChange = (userId, newStatus) => {
    if (onUserStatusChange) {
      onUserStatusChange(userId, newStatus);
    }
  };

  return (
    <>
      <section className="mt-8 w-full">
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-gray-300 bg-gray-50">
                  <th className={`${tableHeaderClass} border-r border-gray-300 text-center`}>
                    Profile
                  </th>
                  <th className={`${tableHeaderClass} border-r border-gray-300 text-left`}>
                    Full Name
                  </th>
                  <th className={`${tableHeaderClass} border-r border-gray-300 text-left`}>
                    Email
                  </th>
                  <th className={`${tableHeaderClass} border-r border-gray-300 text-left`}>
                    Phone
                  </th>
                  <th className={`${tableHeaderClass} border-r border-gray-300 text-left`}>
                    District
                  </th>
                  <th className={`${tableHeaderClass} border-r border-gray-300 text-left`}>
                    Registered
                  </th>
                  <th className={`${tableHeaderClass} border-r border-gray-300 text-center`}>
                    Lost
                  </th>
                  <th className={`${tableHeaderClass} border-r border-gray-300 text-center`}>
                    Found
                  </th>
                  <th className={`${tableHeaderClass} border-r border-gray-300 text-center`}>
                    Claims
                  </th>
                  <th className={`${tableHeaderClass} border-r border-gray-300 text-center`}>
                    Status
                  </th>
                  <th className={`${tableHeaderClass} text-center`}>
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {currentRows.map((user) => {
                  const isSuspended = user.status === "Suspended" || user.status === "suspended";

                  return (
                    <tr
                      key={user.id || user._id}
                      onClick={() => setSelectedUser(user)}
                      className="cursor-pointer border-b border-gray-200 transition-all duration-200 hover:bg-blue-50/40"
                    >
                      <td className="border-r border-gray-200 px-4 py-2.5">
                        <UserAvatar image={user.image} name={user.name} />
                      </td>

                      <td className="border-r border-gray-200 px-4 py-2.5 text-sm font-medium text-[#29292D]">
                        {user.name}
                      </td>

                      <td className="border-r border-gray-200 px-4 py-2.5 text-sm text-[#29292D]">
                        {user.email}
                      </td>

                      <td className="border-r border-gray-200 px-4 py-2.5 text-sm text-[#29292D]">
                        {user.phone}
                      </td>

                      <td className="border-r border-gray-200 px-4 py-2.5 text-sm text-[#29292D]">
                        {user.district}
                      </td>

                      <td className="border-r border-gray-200 px-4 py-2.5 text-sm text-[#29292D]">
                        {user.registered}
                      </td>

                      <td className="border-r border-gray-200 px-4 py-2.5 text-center text-sm font-medium text-[#29292D]">
                        {user.lost ?? user.lostItemsCount ?? 0}
                      </td>

                      <td className="border-r border-gray-200 px-4 py-2.5 text-center text-sm font-medium text-[#29292D]">
                        {user.found ?? user.foundItemsCount ?? 0}
                      </td>

                      <td className="border-r border-gray-200 px-4 py-2.5 text-center text-sm font-medium text-[#29292D]">
                        {user.claims ?? user.claimsCount ?? 0}
                      </td>

                      <td className="border-r border-gray-200 px-4 py-2.5 text-center">
                        <UserStatusBadge status={user.status} />
                      </td>

                      <td className="px-4 py-2.5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUser(user);
                            }}
                            className="inline-flex min-w-[72px] items-center justify-center gap-1.5 rounded-full bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-[#0F3292] hover:shadow-md active:scale-95 focus:outline-none"
                          >
                            <Eye size={14} strokeWidth={2.5} />
                            View
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSuspendUser(user);
                            }}
                            className={`inline-flex min-w-[72px] items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:shadow-md active:scale-95 focus:outline-none ${
                              isSuspended
                                ? "bg-[#08A568] hover:bg-[#067A4D]"
                                : "bg-[#B63838] hover:bg-[#8F2C2C]"
                            }`}
                          >
                            {isSuspended ? (
                              <UserCheck size={14} strokeWidth={2.5} />
                            ) : (
                              <ShieldOff size={14} strokeWidth={2.5} />
                            )}
                            <span>{isSuspended ? "Activate" : "Suspend"}</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination outside table card */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
          itemName="users"
        />
      </section>

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
          onSuccess={handleStatusChange}
        />
      )}
    </>
  );
};

/* User Status Badge */
const UserStatusBadge = ({ status }) => {
  const isActive = status === "Active" || status === "active";

  return (
    <span
      className={`inline-flex min-w-[95px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium ${
        isActive ? "bg-[#08A568] text-white" : "bg-[#BE3B40] text-white"
      }`}
    >
      {status}
    </span>
  );
};

export default UsersTable;
