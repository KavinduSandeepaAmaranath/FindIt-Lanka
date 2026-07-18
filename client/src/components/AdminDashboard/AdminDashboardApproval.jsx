export default function ApprovalTable({ approvals }) {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 px-2 sm:px-6 py-4 sm:py-5">

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-700">
          Pending Approvals
        </h2>

        <button className="self-start sm:self-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm transition">
          View All
        </button>

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">

        <table className="w-full text-xs sm:text-sm min-w-[900px]">

          <thead className="bg-gray-50 border-b">
            <tr className="text-gray-700">
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center">Id</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left">Item Title</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center">Type</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center">Category</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center">Submitted By</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center">Date</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center">Status</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {approvals.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap">
                  {item.id}
                </td>

                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover"
                    />

                    <span className="font-medium whitespace-nowrap">
                      {item.title}
                    </span>
                  </div>
                </td>

                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                  <span
                    className={
                      item.type === "Lost"
                        ? "text-red-600 font-medium"
                        : "text-green-600 font-medium"
                    }
                  >
                    {item.type}
                  </span>
                </td>

                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap">
                  {item.category}
                </td>

                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap">
                  {item.user}
                </td>

                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap">
                  {item.date}
                </td>

                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                  <span className="text-orange-500 font-medium">
                    {item.status}
                  </span>
                </td>

                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <div className="flex justify-center gap-2 flex-nowrap whitespace-nowrap">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-xs transition">
                      Approve
                    </button>

                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-xs transition">
                      Reject
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </>
  );
}