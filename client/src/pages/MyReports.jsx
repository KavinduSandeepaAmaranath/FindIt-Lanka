import { useState, useMemo, useEffect } from "react";
import { getDashboardStatistics } from "../services/dashboardService.js";

import DashboardSidebar from "../components/dashboard/DashBoardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";

import MyReportsHeader from "../components/dashboard/myReports/MyReportsHeader";
import MyReportsStats from "../components/dashboard/myReports/MyReportsStats";
import MyReportsFilters from "../components/dashboard/myReports/MyReportsFilters";
import MyReportsTabs from "../components/dashboard/myReports/MyReportsTabs";
import ReportsList from "../components/dashboard/myReports/ReportsList";
import MyReportsPagination from "../components/dashboard/myReports/MyReportsPagination";
import ReportDetailsModal from "../components/dashboard/myReports/ReportDetailsModal";

import ReportModal from "../components/LostFoundForm/ReportModal";

import { currentUser } from "../data/dashboardData";

import {
  myReports,
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

/*status card for status filter mapping*/
const statToStatus = {
  total: "all",
  active: "Under Review",
  recovered: "Resolved",
  pending: "Pending",
  rejected: "Rejected",
};

function MyReports() {
  const [openLostReport, setOpenLostReport] = useState(false);
  const [openFoundReport, setOpenFoundReport] = useState(false);

  const [activeTab, setActiveTab] = useState("all");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchDraft, setSearchDraft] = useState("");

  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [activeStat, setActiveStat] = useState("total");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);

  const [liveStats, setLiveStats] = useState(null);

  useEffect(() => {
    const fetchLiveStats = async () => {
      try {
        const res = await getDashboardStatistics();
        if (res?.statistics) {
          setLiveStats(res.statistics);
        }
      } catch (err) {
        console.warn("Could not load live backend statistics:", err);
      }
    };
    fetchLiveStats();
  }, []);

  const dynamicReportStats = useMemo(() => {
    const total = liveStats?.totalReports ?? myReports.length;
    const active = liveStats?.activeCases ?? myReports.filter((r) => r.status === "Under Review" || r.status === "Active" || r.status === "Approved").length;
    const recovered = liveStats?.recoveredItems ?? myReports.filter((r) => r.status === "Resolved" || r.status === "Recovered").length;
    const pending = liveStats?.pendingReports ?? myReports.filter((r) => r.status === "Pending" || r.status === "Under Review").length;
    const rejected = liveStats?.rejectedReports ?? myReports.filter((r) => r.status === "Rejected").length;
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
  }, [liveStats]);

  const tabs = useMemo(
    () => [
      {
        value: "all",
        label: "All Reports",
        count: myReports.length,
      },
      {
        value: "Lost Item",
        label: "Lost Reports",
        count: myReports.filter(
          (r) => r.reportType === "Lost Item"
        ).length,
      },
      {
        value: "Found Item",
        label: "Found Reports",
        count: myReports.filter(
          (r) => r.reportType === "Found Item"
        ).length,
      },
    ],
    []
  );

  const filteredReports = useMemo(() => {
    const words = searchTerm.trim().toLowerCase();

    return myReports
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchDraft.trim());
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchDraft(value);
    setSearchTerm(value.trim());
  };

  const handleClearSearch = () => {
    setSearchDraft("");
    setSearchTerm("");
  };

  const handleResetFilters = () => {
    setSearchDraft("");
    setSearchTerm("");
    setDateFilter("all");
    setStatusFilter("all");
    setActiveTab("all");
    setActiveStat("total");
  };

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

    const matchedStat = Object.keys(statToStatus).find(
      (key) => statToStatus[key] === value
    );

    setActiveStat(matchedStat || null);
  };

  return (
    <div className="flex bg-slate-50">
      <DashboardSidebar
        onOpenLostReport={() => setOpenLostReport(true)}
        onOpenFoundReport={() => setOpenFoundReport(true)}
      />

      <div className="flex-1 min-w-0 pt-[60px] lg:pt-0">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8 space-y-8">

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

          {/*report type tabs*/}
          <MyReportsTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

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
