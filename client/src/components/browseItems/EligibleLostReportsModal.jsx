import { useState, useMemo } from "react";
import { FiX, FiSearch, FiMapPin, FiCheckSquare, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import fallbackImage from "../../assets/images/LpIphone1.avif";
import iphoneImg from "../../assets/images/LpIphone1.avif";
import laptopImg from "../../assets/images/acerLaptop.jpg";
import bagImg from "../../assets/images/LpLeatherHandbag.avif";
import watchImg from "../../assets/images/UdbWatch1.avif";
import keyImg from "../../assets/images/UdbCarKey1.webp";

const defaultEligibleLostReports = [
  {
    id: "lost-rep-01",
    title: "iPhone 13",
    location: "Matara",
    district: "Matara",
    reportType: "Lost Item",
    reportedOn: "Sep 02, 2026 04:15 PM",
    description: "Found near the ICT building.",
    status: "Approved/Active",
    image: iphoneImg,
  },
  {
    id: "lost-rep-02",
    title: "iPhone 13",
    location: "Matara",
    district: "Matara",
    reportType: "Lost Item",
    reportedOn: "Sep 02, 2026 04:15 PM",
    description: "Found near the ICT building.",
    status: "Approved/Active",
    image: iphoneImg,
  },
  {
    id: "lost-rep-03",
    title: "iPhone 13",
    location: "Matara",
    district: "Matara",
    reportType: "Lost Item",
    reportedOn: "Sep 02, 2026 04:15 PM",
    description: "Found near the ICT building.",
    status: "Approved/Active",
    image: iphoneImg,
  },
  {
    id: "lost-rep-04",
    title: "Dell Laptop",
    location: "Galle",
    district: "Galle",
    reportType: "Lost Item",
    reportedOn: "Aug 28, 2026 11:30 AM",
    description: "Lost in the computer lab second floor.",
    status: "Approved/Active",
    image: laptopImg,
  },
  {
    id: "lost-rep-05",
    title: "Leather Handbag",
    location: "Galle Fort",
    district: "Galle",
    reportType: "Lost Item",
    reportedOn: "Aug 20, 2026 02:45 PM",
    description: "Brown leather handbag lost near the lighthouse.",
    status: "Approved/Active",
    image: bagImg,
  },
  {
    id: "lost-rep-06",
    title: "Luxury Wristwatch",
    location: "Kandy",
    district: "Kandy",
    reportType: "Lost Item",
    reportedOn: "Aug 15, 2026 05:00 PM",
    description: "Lost near the library reading hall.",
    status: "Approved/Active",
    image: watchImg,
  },
  {
    id: "lost-rep-07",
    title: "Toyota Smart Key",
    location: "Matara",
    district: "Matara",
    reportType: "Lost Item",
    reportedOn: "Aug 10, 2026 09:15 AM",
    description: "Lost near the university parking lot.",
    status: "Approved/Active",
    image: keyImg,
  },
];

function EligibleLostReportsModal({ onClose, onSubmit }) {
  const [reports] = useState(defaultEligibleLostReports);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReportId, setSelectedReportId] = useState("lost-rep-01");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const filteredReports = useMemo(() => {
    if (!searchTerm) return reports;
    const q = searchTerm.toLowerCase();
    return reports.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );
  }, [reports, searchTerm]);

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
    const selected = reports.find((r) => r.id === selectedReportId);
    if (onSubmit) {
      onSubmit(selected);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card with dark blue border */}
      <div className="relative z-10 w-full max-w-xl bg-white border-4 border-blue-900 rounded-3xl shadow-2xl p-5 sm:p-7 my-6 text-left">
        {/* Red Circular Close Button (top-right) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white flex items-center justify-center shadow-xs cursor-pointer transition-colors"
        >
          <FiX className="w-3.5 h-3.5 stroke-[3]" />
        </button>

        {/* Heading & Subtitle */}
        <div className="text-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-950 inline-block border-b-2 border-blue-900 pb-0.5">
            Your Eligible Lost Reports
          </h2>
          <p className="text-xs text-slate-600 mt-1">
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
            placeholder="Search reports...."
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
        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {visibleReports.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No eligible lost reports found matching "{searchTerm}".
            </div>
          ) : (
            visibleReports.map((report) => {
              const isSelected = selectedReportId === report.id;
              return (
                <div
                  key={report.id}
                  onClick={() => setSelectedReportId(report.id)}
                  className={`border rounded-2xl p-3.5 flex items-center justify-between gap-3 bg-white transition-all cursor-pointer ${
                    isSelected
                      ? "border-blue-600 ring-2 ring-blue-100 shadow-xs"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {/* Left Column: Image, Title, Location, Lost Item Pill */}
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
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-500 text-white shadow-2xs">
                        Lost Item
                      </span>
                    </div>
                  </div>

                  {/* Middle Column: Details & Approved Status */}
                  <div className="hidden sm:block min-w-0 flex-1 px-2 text-left">
                    <p className="text-xs text-slate-600">
                      <span className="text-slate-500">Report Type:</span>{" "}
                      <span className="text-red-500 font-semibold">
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

                  {/* Right Column: Custom Radio Button */}
                  <div className="shrink-0 pl-1">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
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
                className={`w-7 h-7 rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
                  pageNum === safePage
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

        {/* Bottom Actions: Close & Continue & Submit */}
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
            Continue &amp; Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EligibleLostReportsModal;
