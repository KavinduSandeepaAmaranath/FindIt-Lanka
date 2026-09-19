import { FiChevronLeft } from "react-icons/fi";

// Decides which page buttons to show.
// Returns an array like [1, 2, "...", 5]
//   - 4 pages or fewer  -> show all of them: 1 2 3 4
//   - more than 4 pages -> show the first, last, and pages near the current one,
//                          and put "..." where pages are hidden
function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // near the start:  1 2 ... 5
  if (currentPage <= 2) {
    return [1, 2, "...", totalPages];
  }

  // near the end:  1 ... 4 5
  if (currentPage >= totalPages - 1) {
    return [1, "...", totalPages - 1, totalPages];
  }

  // in the middle:  1 ... 3 ... 5
  return [1, "...", currentPage, "...", totalPages];
}

// Previous | 1 | 2 | ... | 5 | Next
// Props:
//   currentPage  -> the page number now showing (starts at 1)
//   totalPages   -> how many pages there are
//   onPageChange -> function called with the new page number
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
        // "..." is only a label, not a clickable page
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
            className={`${baseBtn} w-10 px-0 ${
              page === currentPage
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