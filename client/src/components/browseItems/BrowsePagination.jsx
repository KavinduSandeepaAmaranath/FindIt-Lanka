import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function BrowsePagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Build page numbers array with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 1, 2, ..., totalPages
      pages.push(1);
      pages.push(2);

      if (currentPage > 3 && currentPage < totalPages - 1) {
        pages.push("...");
        pages.push(currentPage);
      }

      pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-end gap-2 pt-2 pb-6">
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs cursor-pointer"
      >
        <FiChevronLeft className="w-3.5 h-3.5" />
        <span>Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        {pages.map((p, idx) => {
          if (p === "...") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-8 h-8 flex items-center justify-center text-xs text-slate-400 select-none"
              >
                ...
              </span>
            );
          }

          const isActive = p === currentPage;
          return (
            <button
              key={`page-${p}`}
              type="button"
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                isActive
                  ? "border border-blue-600 bg-blue-50/50 text-blue-600 shadow-2xs font-bold"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs"
              }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-2xs cursor-pointer"
      >
        <span>Next</span>
        <FiChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default BrowsePagination;
