import { FiChevronLeft } from "react-icons/fi";

function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 2) {
    return [1, 2, "...", totalPages];
  }

  if (currentPage >= totalPages - 1) {
    return [1, "...", totalPages - 1, totalPages];
  }

  return [1, "...", currentPage, "...", totalPages];
}

function NotificationPagination({ currentPage, totalPages, onPageChange }) {
  const pages = getPageNumbers(currentPage, totalPages);

  const baseBtn =
    "h-10 px-3 rounded-lg border text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseBtn} flex items-center gap-1 bg-white border-slate-200 text-slate-700 hover:bg-slate-50`}
      >
        <FiChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`dots-${index}`}
              className="h-10 w-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 text-sm font-semibold"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${baseBtn} w-10 px-0 ${page === currentPage
                ? "bg-blue-500 border-blue-500 text-white"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${baseBtn} bg-white border-slate-200 text-slate-700 hover:bg-slate-50`}
      >
        Next
      </button>
    </div>
  );
}

export default NotificationPagination;