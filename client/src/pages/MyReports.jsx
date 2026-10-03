import { useState, useMemo, useEffect } from "react";
import DashboardSidebar from "../components/dashboard/DashBoardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";

import MyReportsHeader from "../components/dashboard/myReports/MyReportsHeader";
import MyReportsStats from "../components/dashboard/myReports/MyReportsStats";
import MyReportsFilters from "../components/dashboard/myReports/MyReportsFilters";
import MyReportsTabs from "../components/dashboard/myReports/MyReportsTabs";
import MyReportsSearch from "../components/dashboard/myReports/MyReportsSearch";
import ReportsList from "../components/dashboard/myReports/ReportsList";
import MyReportsPagination from "../components/dashboard/myReports/MyReportsPagination";
import ReportDetailsModal from "../components/dashboard/myReports/ReportDetailsModal";

import ReportModal from "../components/LostFoundForm/ReportModal";

import { currentUser } from "../data/dashboardData";

import {
  myReports as mockReports,
  dateFilterOptions,
  statusFilterOptions,
  REPORTS_PER_PAGE,
} from "../data/myReportsData";

import {
  reportHeader as lostHeader,
  reportForm as lostForm,
} from "../data/ReportLost";

import {
  reportHeader as foundHeader,
  reportForm as foundForm,
} from "../data/ReportFound";

import { normalizeStatus } from "../components/dashboard/myReports/reportHelpers";

/*status card for status filter mapping*/
const statToStatus = {
  total: "all",
  active: "Approved-Active",
  recovered: "Resolved",
  pending: "Pending",
  rejected: "Rejected",
};

function MyReports() {
  const [openLostReport, setOpenLostReport] = useState(false);
  const [openFoundReport, setOpenFoundReport] = useState(false);

  const [activeTab, setActiveTab] = useState("all");

  const [searchTerm, setSearchTerm] = useState("");

  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [activeStat, setActiveStat] = useState("total");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);

  const [reportsList, setReportsList] = useState(mockReports);
  const [liveStats, setLiveStats] = useState(null);

  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const [statsRes, lostRes, foundRes] = await Promise.all([
          getDashboardStatistics().catch(() => null),
          getMyLostItems().catch(() => null),
          getMyFoundItems().catch(() => null),
        ]);

        if (statsRes?.statistics) {
          setLiveStats(statsRes.statistics);
        }

        const lostItems = lostRes?.lostItems || [];
        const foundItems = foundRes?.foundItems || [];

        const formatBackendItem = (item, type) => {
          let statusLabel = "Under Review";
          if (item.approvalStatus === "pending") {
            statusLabel = "Pending";
          } else if (item.approvalStatus === "rejected") {
            statusLabel = "Rejected";
          } else if (item.status === "recovered" || item.status === "returned") {
            statusLabel = "Resolved";
          } else if (item.approvalStatus === "approved") {
            statusLabel = "Under Review";
          }

          const rawImg = item.images && item.images.length > 0 ? item.images[0] : null;
          let imageUrl = "https://via.placeholder.com/150?text=No+Image";
          if (rawImg) {
            imageUrl = rawImg.startsWith("http")
              ? rawImg
              : `http://localhost:5000${rawImg.startsWith("/") ? "" : "/"}${rawImg}`;
          }

          const refNum = item._id ? `FL-2026-${item._id.slice(-4).toUpperCase()}` : "FL-2026-0000";

          return {
            id: item._id,
            title: item.title,
            location: `${item.location || ""}, ${item.district || ""}`.replace(/^,\s*/, "").replace(/,\s*$/, ""),
            reportType: type,
            reportedOn: item.lostDate || item.foundDate || item.createdAt,
            description: item.description,
            status: statusLabel,
            image: imageUrl,
            category: item.category || "General",
            referenceNo: refNum,
          };
        };

        const formattedLost = lostItems.map((item) => formatBackendItem(item, "Lost Item"));
        const formattedFound = foundItems.map((item) => formatBackendItem(item, "Found Item"));
        const allFetched = [...formattedLost, ...formattedFound];

        if (allFetched.length > 0) {
          setReportsList(allFetched);
        }
      } catch (err) {
        console.warn("Could not fetch user backend items:", err);
      }
    };

    fetchBackendData();
  }, []);

  const dynamicReportStats = useMemo(() => {
    const total = liveStats?.totalReports ?? reportsList.length;
    const active = liveStats?.activeCases ?? reportsList.filter((r) => r.status === "Under Review" || r.status === "Active" || r.status === "Approved").length;
    const recovered = liveStats?.recoveredItems ?? reportsList.filter((r) => r.status === "Resolved" || r.status === "Recovered").length;
    const pending = liveStats?.pendingReports ?? reportsList.filter((r) => r.status === "Pending" || r.status === "Under Review").length;
    const rejected = liveStats?.rejectedReports ?? reportsList.filter((r) => r.status === "Rejected").length;
    const thisMonth = liveStats?.thisMonthCount ?? 2;

    const formatVal = (val) => (val < 10 ? `0${val}` : `${val}`);

    return [
      {
        id: "total",
        label: "Total Reports",
        value: formatVal(total),
        note: `+${thisMonth} this month`,
        icon: "total",
        accent: "blue",
      },
      {
        id: "active",
        label: "Active Reports",
        value: formatVal(active),
        note: "still being processed",
        icon: "active",
        accent: "blue",
      },
      {
        id: "recovered",
        label: "Recovered",
        value: formatVal(recovered),
        note: "successfully recovered",
        icon: "recovered",
        accent: "emerald",
      },
      {
        id: "pending",
        label: "Pending",
        value: formatVal(pending),
        note: "Review Required",
        icon: "pending",
        accent: "orange",
      },
      {
        id: "rejected",
        label: "Rejected",
        value: formatVal(rejected),
        note: "rejected by admin",
        icon: "rejected",
        accent: "rose",
      },
    ];
  }, [liveStats, reportsList]);

  const tabs = useMemo(
    () => [
      {
        value: "all",
        label: "All Reports",
        count: reportsList.length,
      },
      {
        value: "Lost Item",
        label: "Lost Reports",
        count: reportsList.filter(
          (r) => r.reportType === "Lost Item"
        ).length,
      },
      {
        value: "Found Item",
        label: "Found Reports",
        count: reportsList.filter(
          (r) => r.reportType === "Found Item"
        ).length,
      },
    ],
    [],
  );

  const computedStats = useMemo(() => {
    return reportStats.map((st) => {
      if (st.id === "total") {
        return {
          ...st,
          value: String(myReports.length).padStart(2, "0"),
        };
      }
      if (st.id === "active") {
        const count = myReports.filter(
          (r) => normalizeStatus(r.status) === "approved-active"
        ).length;
        return {
          ...st,
          value: String(count).padStart(2, "0"),
        };
      }
      if (st.id === "recovered") {
        const count = myReports.filter(
          (r) => normalizeStatus(r.status) === "resolved"
        ).length;
        return {
          ...st,
          value: String(count).padStart(2, "0"),
        };
      }
      if (st.id === "pending") {
        // Pending card includes both Pending and Under Review items
        const count = myReports.filter((r) => {
          const s = normalizeStatus(r.status);
          return s === "pending" || s === "under-review";
        }).length;
        return {
          ...st,
          value: String(count).padStart(2, "0"),
        };
      }
      if (st.id === "rejected") {
        const count = myReports.filter(
          (r) => normalizeStatus(r.status) === "rejected"
        ).length;
        return {
          ...st,
          value: String(count).padStart(2, "0"),
        };
      }
      return st;
    });
  }, []);

  const filteredReports = useMemo(() => {
    const words = searchTerm.trim().toLowerCase();

    return reportsList
      .filter((report) => {
        if (
          activeTab !== "all" &&
          report.reportType !== activeTab
        ) {
          return false;
        }

        if (
          statusFilter !== "all" &&
          report.status?.toLowerCase() !== statusFilter?.toLowerCase()
        ) {
          return false;
        }

        if (dateFilter !== "all") {
          const days = Number(dateFilter);
          const limit = new Date();

          limit.setDate(limit.getDate() - days);

          if (new Date(report.reportedOn) < limit) {
            return false;
          }
        }

        if (words) {
          const haystack = [
            report.title,
            report.location,
            report.description,
            report.category,
            report.referenceNo,
            report.reportType,
            report.status,
          ]
            .join(" ")
            .toLowerCase();

          if (!haystack.includes(words)) {
            return false;
          }
        }

        return true;
      })
      .sort(
        (a, b) =>
          new Date(b.reportedOn) - new Date(a.reportedOn)
      );
  }, [
    reportsList,
    activeTab,
    searchTerm,
    dateFilter,
    statusFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredReports.length / REPORTS_PER_PAGE
    )
  );

  /*go back to page 1 when filters change*/
  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeTab,
    searchTerm,
    dateFilter,
    statusFilter,
  ]);

  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const visibleReports = filteredReports.slice(
    (safePage - 1) * REPORTS_PER_PAGE,
    safePage * REPORTS_PER_PAGE
  );



  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSelectStat = (statId) => {
    setActiveStat(statId);
    setStatusFilter(statToStatus[statId] ?? "all");
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);

    if (value === "all") {
      setActiveStat("total");
    } else if (
      normalizeStatus(value) === "pending" ||
      normalizeStatus(value) === "under-review"
    ) {
      setActiveStat("pending");
    } else {
      const matchedStat = Object.keys(statToStatus).find(
        (key) => statToStatus[key] === value
      );
      setActiveStat(matchedStat || null);
    }
  };

  return (
    <div className="flex bg-slate-50">
      <DashboardSidebar
        onOpenLostReport={() => setOpenLostReport(true)}
        onOpenFoundReport={() => setOpenFoundReport(true)}
      />

      <div className="flex-1 min-w-0 pt-[60px] lg:pt-0">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8 space-y-8">

          {/*topbar without search*/}
          <DashboardTopbar
            user={currentUser}
            hideSearch
          />

          {/*title + date / status filters*/}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <MyReportsHeader />

            <MyReportsFilters
              dateFilter={dateFilter}
              onDateFilterChange={setDateFilter}
              statusFilter={statusFilter}
              onStatusFilterChange={handleStatusFilterChange}
              dateOptions={dateFilterOptions}
              statusOptions={statusFilterOptions}
            />
          </div>

          {/*statistics*/}
          <MyReportsStats
            stats={computedStats}
          {/* Header & User Profile Topbar in one aligned row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <MyReportsHeader />
            <DashboardTopbar
              user={currentUser}
              hideSearch
            />
          </div>

          {/* Statistics overview cards */}
          <MyReportsStats
            stats={dynamicReportStats}
            activeStat={activeStat}
            onSelectStat={handleSelectStat}
          />

          {/*tabs + search*/}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <MyReportsTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          {/* Search Bar & Custom Filters Toolbar */}
          <MyReportsFilters
            searchDraft={searchDraft}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
            onClearSearch={handleClearSearch}
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            dateOptions={dateFilterOptions}
            statusOptions={statusFilterOptions}
          />

            <MyReportsSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
          </div>

          {/*reports*/}
          <ReportsList
            reports={visibleReports}
            onViewDetails={setSelectedReport}
            onResetFilters={handleResetFilters}
          />

          {/*pagination*/}
          <MyReportsPagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/*report details popup*/}
      {selectedReport && (
        <ReportDetailsModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onEdit={(report) => {
            setSelectedReport(null);
            if (report.reportType === "Found Item") {
              setOpenFoundReport(true);
            } else {
              setOpenLostReport(true);
            }
          }}
          onEditAndResubmit={(report) => {
            setSelectedReport(null);
            if (report.reportType === "Found Item") {
              setOpenFoundReport(true);
            } else {
              setOpenLostReport(true);
            }
          }}
        />
      )}

      {/*sidebar quick report modals*/}
      {openLostReport && (
        <ReportModal
          header={lostHeader}
          formData={lostForm}
          onClose={() => setOpenLostReport(false)}
        />
      )}

      {openFoundReport && (
        <ReportModal
          header={foundHeader}
          formData={foundForm}
          onClose={() => setOpenFoundReport(false)}
        />
      )}
    </div>
  );
}

export default MyReports;
