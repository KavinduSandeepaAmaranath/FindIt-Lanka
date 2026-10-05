import { useState, useMemo, useEffect } from "react";
import { getMyFoundItems } from "../../services/foundItemService.js";
import { FiX, FiSearch, FiMapPin, FiCheckSquare, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import fallbackImage from "../../assets/images/LpIphone1.avif";

function EligibleFoundReportsModal({ onClose, onSubmit, initialSelectedId }) {
  const [reportsList, setReportsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReportId, setSelectedReportId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    setLoading(true);
    getMyFoundItems()
      .then((res) => {
        if (res?.foundItems && res.foundItems.length > 0) {
          const liveFound = res.foundItems.map((item) => ({
            ...item,
            id: item._id,
            title: item.title,
            location: item.location || item.district || "Sri Lanka",
            district: item.district || "Galle",
            reportType: "Found Item",
            reportedOn: new Date(item.createdAt || item.foundDate).toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            description: item.description || "Found report",
            status: item.approvalStatus === "approved" ? "Approved/Active" : item.approvalStatus,
            image: item.images && item.images.length > 0
              ? (item.images[0].startsWith("http") ? item.images[0] : `http://localhost:5000/${item.images[0]}`)
              : fallbackImage,
          }));
          setReportsList(liveFound);
          if (liveFound.length > 0) {
            setSelectedReportId(liveFound[0].id);
          }
        } else {
          setReportsList([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching user found items:", err);
        setReportsList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredReports = useMemo(() => {
    if (!searchTerm) return reportsList;
    const q = searchTerm.toLowerCase();
    return reportsList.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );
  }, [reportsList, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const visibleReports = filteredReports.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchQuery.trim());
    setCurrentPage(1);
  };

  const handleContinue = () => {
    const selected = reportsList.find((r) => r.id === selectedReportId);
    if (onSubmit && selected) {
      onSubmit(selected);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-xl w-full shadow-2xl relative border border-slate-100 max-h-[90vh] flex flex-col justify-between">
        {/* Header */}
        <div className="text-center mb-4 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-0 right-0 w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-md transition-transform hover:scale-105"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5 stroke-[2.5]" />
          </button>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 border-b-2 border-blue-600 inline-block pb-1">
            Your Eligible Found Reports
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Select one report to continue.
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-md mx-auto flex items-center bg-white rounded-full border border-slate-300 shadow-2xs px-3 py-1 mb-4 focus-within:border-blue-500 transition-colors"
        >
          <FiSearch className="w-4 h-4 text-sky-500 ml-1 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value === "") setSearchTerm("");
            }}
            placeholder="Search reports..."
            className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-hidden py-1 px-2"
          />
          <button
            type="submit"
            className="px-4 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
          >
            Search
          </button>
        </form>

        {/* Reports List */}
        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 flex-1">
          {loading ? (
            <div className="text-center py-8 text-xs text-slate-500">
              Loading your found reports...
            </div>
          ) : visibleReports.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              {searchTerm
                ? `No eligible found reports found matching "${searchTerm}".`
                : "You don't have any eligible found reports yet."}
            </div>
          ) : (
            visibleReports.map((report) => {
              const isSelected = selectedReportId === report.id;
              return (
                <div
                  key={report.id}
                  onClick={() => setSelectedReportId(report.id)}
                  className={`border rounded-2xl p-3.5 flex items-center justify-between gap-3 bg-white transition-all cursor-pointer ${isSelected
                      ? "border-blue-600 ring-2 ring-blue-100 shadow-xs"
                      : "border-slate-200 hover:border-slate-300"
                    }`}
                >
                  {/* Left Column: Image, Title, Location, Found Item Pill */}
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={report.image || fallbackImage}
                      alt={report.title}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-50"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackImage;
                      }}
                    />

                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 leading-tight truncate">
                        {report.title}
                      </h4>
                      <p className="flex items-center gap-1 text-xs text-slate-500 mt-0.5 truncate">
                        <FiMapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{report.location}</span>
                      </p>
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-600 text-white shadow-2xs">
                        Found Item
                      </span>
                    </div>
                  </div>

                  {/* Middle Column- Details & Approved Status */}
                  <div className="hidden sm:block min-w-0 flex-1 px-2 text-left">
                    <p className="text-xs text-slate-600">
                      <span className="text-slate-500">Report Type:</span>{" "}
                      <span className="text-emerald-600 font-semibold">
                        {report.reportType}
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Reported On: {report.reportedOn}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5 truncate">
                      Description: {report.description}
                    </p>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-sky-500 text-white mt-1 shadow-2xs">
                      <FiCheckSquare className="w-2.5 h-2.5" />
                      Approved/Active
                    </span>
                  </div>

                  {/* Right Column- Custom Radio Button */}
                  <div className="shrink-0 pl-1">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected
                          ? "border-blue-600 bg-white"
                          : "border-slate-300 hover:border-slate-400"
                        }`}
                    >
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-4">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="flex items-center gap-1 px-3 py-1 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <FiChevronLeft className="w-3 h-3" />
              <span>Previous</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${pageNum === safePage
                    ? "border border-blue-600 text-blue-600 bg-blue-50/50"
                    : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="flex items-center gap-1 px-3 py-1 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <span>Next</span>
              <FiChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Bottom Actions- Close & Continue & Submit */}
        <div className="flex items-center justify-center gap-3 mt-5">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-slate-300 hover:bg-slate-400 active:scale-95 text-slate-800 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <FiX className="w-3.5 h-3.5" />
            <span>Close</span>
          </button>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedReportId}
            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
          >
            Continue & Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EligibleFoundReportsModal;
