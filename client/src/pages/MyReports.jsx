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
  myReports,
  reportStats,
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

    return myReports
      .filter((report) => {
        if (
          activeTab !== "all" &&
          report.reportType !== activeTab
        ) {
          return false;
        }

        if (statusFilter !== "all") {
          const filterNorm = normalizeStatus(statusFilter);
          const reportNorm = normalizeStatus(report.status);

          if (filterNorm === "pending") {
            if (reportNorm !== "pending" && reportNorm !== "under-review") {
              return false;
            }
          } else if (reportNorm !== filterNorm) {
            return false;
          }
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

  const visibleReports = filteredReports.slice(
    (currentPage - 1) * REPORTS_PER_PAGE,
    currentPage * REPORTS_PER_PAGE
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

            <MyReportsSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
          </div>

          {/*reports*/}
          <ReportsList
            reports={visibleReports}
            onViewDetails={setSelectedReport}
          />

          {/*pagination*/}
          <MyReportsPagination
            currentPage={currentPage}
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