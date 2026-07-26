import { useState } from "react";
import UserViewModal from "./UserViewModal";

const UsersTable = ({ users }) => {
  // Pagination
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const currentRows = users.slice(startIndex, endIndex);

  const [selectedUser, setSelectedUser] =
useState(null);

  return (
    <>
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">

        <table className="min-w-[1200px] w-full">

          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr className="text-sm text-slate-700">

              <th className="px-4 py-4 border">User ID</th>
              <th className="px-4 py-4 border">Profile</th>
              <th className="px-4 py-4 border">Full Name</th>
              <th className="px-4 py-4 border">Email</th>
              <th className="px-4 py-4 border">Phone</th>
              <th className="px-4 py-4 border">District</th>
              <th className="px-4 py-4 border">Registered</th>
              <th className="px-4 py-4 border">Lost</th>
              <th className="px-4 py-4 border">Found</th>
              <th className="px-4 py-4 border">Claims</th>
              <th className="px-4 py-4 border">Status</th>
              <th className="px-4 py-4 border">Action</th>

            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {currentRows.map((user) => (
             <tr
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className="cursor-pointer hover:bg-blue-50 transition-colors duration-200"
             >
                <td className="border px-4 py-4">
                  {user.id}
                </td>

                <td className="border px-4 py-4">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover mx-auto"
                  />
                </td>

                <td className="border px-4 py-4">
                  {user.name}
                </td>

                <td className="border px-4 py-4">
                  {user.email}
                </td>

                <td className="border px-4 py-4">
                  {user.phone}
                </td>

                <td className="border px-4 py-4">
                  {user.district}
                </td>

                <td className="border px-4 py-4">
                  {user.registered}
                </td>

                <td className="border px-4 py-4 text-center">
                  {user.lost}
                </td>

                <td className="border px-4 py-4 text-center">
                  {user.found}
                </td>

                <td className="border px-4 py-4 text-center">
                  {user.claims}
                </td>

                <td className="border px-4 py-4 text-center">
                  <span
                    className={`font-semibold ${
                      user.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="border px-4 py-4">
                  <div className="flex justify-center gap-2">

                    <button onClick={(e) => {e.stopPropagation();}}
                      className="
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        text-xs
                        px-4
                        py-1
                        rounded-lg
                        transition
                      "
                    >
                      Block
                    </button>

                    <button
                  onClick={(e) => {e.stopPropagation();setSelectedUser(user);}}
                        className="
                         bg-green-600
                          hover:bg-green-700
                           text-white
                          text-xs
                             px-4
                           py-1
                            rounded-lg
                              transition
                               "
                               >
                        View
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">

        {/* Showing */}
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold">
            {startIndex + 1}
          </span>
          {" - "}
          <span className="font-semibold">
            {Math.min(endIndex, users.length)}
          </span>
          {" of "}
          <span className="font-semibold">
            {users.length}
          </span>{" "}
          users
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-2">

          {/* Previous */}
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.max(prev - 1, 1)
              )
            }
            disabled={currentPage === 1}
            className="
              px-4
              py-2
              border
              rounded-lg
              disabled:opacity-40
              hover:bg-blue-600
              hover:text-white
              transition
            "
          >
            Previous
          </button>

          {/* Numbers */}
          {Array.from(
            { length: totalPages },
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentPage(index + 1)
                }
                className={`w-10 h-10 rounded-lg border transition ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-50"
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(
                  prev + 1,
                  totalPages
                )
              )
            }
            disabled={
              currentPage === totalPages
            }
            className="
              px-4
              py-2
              border
              rounded-lg
              disabled:opacity-40
              hover:bg-blue-600
              hover:text-white
              transition
            "
          >
            Next
          </button>
          

        </div>

      </div>

        {selectedUser && (
      <UserViewModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    )}

    </>
    
  );
};

export default UsersTable;