export default function ApprovalTable({ approvals }) {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 px-2 sm:px-6 py-4 sm:py-5">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-700">
          Pending Approvals
        </h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm transition-colors duration-200">
          View All
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-300 rounded-xl overflow-x-auto">
        <table className="w-full text-xs sm:text-sm min-w-[900px]">
          
          {/* Header Row */}
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr className="text-gray-700">
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center border-r border-gray-300">Id</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left border-r border-gray-300">Item Title</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center border-r border-gray-300">Type</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center border-r border-gray-300">Category</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center border-r border-gray-300">Submitted By</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center border-r border-gray-300">Date</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center border-r border-gray-300">Status</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {approvals.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-300 last:border-0"
              >
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center border-r border-gray-300">
                  {item.id}
                </td>

                <td className="px-3 sm:px-6 py-3 sm:py-4 border-r border-gray-300">
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

                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center border-r border-gray-300">
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

                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap border-r border-gray-300">
                  {item.category}
                </td>

                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap border-r border-gray-300">
                  {item.user}
                </td>

                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap border-r border-gray-300">
                  {item.date}
                </td>

                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center border-r border-gray-300">
                  <span className="text-orange-500 font-medium border border-orange-200 bg-orange-50 px-2 py-1 rounded">
                    {item.status}
                  </span>
                </td>

                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <div className="flex justify-center gap-2 flex-nowrap whitespace-nowrap">
                    {/* Approve Button */}
                    <button className="bg-green-500 text-white px-3 sm:px-4 py-1 rounded text-[10px] sm:text-xs 
                      transition-all duration-200 
                      hover:bg-green-600 hover:scale-105 hover:shadow-md 
                      active:scale-95">
                      Approve
                    </button>
                    
                    {/* Reject Button */}
                    <button className="bg-red-600 text-white px-3 sm:px-4 py-1 rounded text-[10px] sm:text-xs 
                      transition-all duration-200 
                      hover:bg-red-700 hover:scale-105 hover:shadow-md 
                      active:scale-95">
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