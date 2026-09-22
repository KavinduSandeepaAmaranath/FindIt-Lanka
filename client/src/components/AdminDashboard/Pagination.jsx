
const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  rowsPerPage,
  onPageChange,
  itemName = "items",
}) => {
  const startIndex =
    totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;

  const endIndex = Math.min(
    currentPage * rowsPerPage,
    totalItems
  );

  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">

      {/* Showing Text */}
      <p className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-semibold text-[#2A3B63]">
          {startIndex}
        </span>{" "}
        -{" "}
        <span className="font-semibold text-[#2A3B63]">
          {endIndex}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-[#2A3B63]">
          {totalItems}
        </span>{" "}
        {itemName}
      </p>

      {/* Pagination Buttons */}
      <div className="flex items-center gap-2">

        {/* Previous btn */}
        <button
          type="button"
          onClick={() =>
            onPageChange(Math.max(currentPage - 1, 1))
          }
          disabled={currentPage === 1}
          className="
            rounded-lg
            border
            border-gray-300
            px-4
            py-2
            text-sm
            transition
            hover:bg-blue-600
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from(
          { length: totalPages },
          (_, index) => {
            const pageNumber = index + 1;

            return (
              <button
                type="button"
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`
                  h-10
                  w-10
                  rounded-lg
                  border
                  text-sm
                  transition
                  ${
                    currentPage === pageNumber
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 hover:bg-blue-50"
                  }
                `}
              >
                {pageNumber}
              </button>
            );
          }
        )}

        {/* Next btn */}
        <button
          type="button"
          onClick={() =>
            onPageChange(
              Math.min(currentPage + 1, totalPages)
            )
          }
          disabled={
            currentPage === totalPages || totalPages === 0
          }
          className="
            rounded-lg
            border
            border-gray-300
            px-4
            py-2
            text-sm
            transition
            hover:bg-blue-600
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;