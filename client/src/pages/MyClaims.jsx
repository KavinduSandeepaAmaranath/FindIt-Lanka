import { useState, useMemo, useEffect } from "react";

import DashboardSidebar from "../components/dashboard/DashBoardSidebar";

import MyClaimsUserBar from "../components/dashboard/myClaims/MyClaimsUserBar";
import MyClaimsHeader from "../components/dashboard/myClaims/MyClaimsHeader";
import MyClaimsFilters from "../components/dashboard/myClaims/MyClaimsFilters";
import MyClaimsStats from "../components/dashboard/myClaims/MyClaimsStats";
import MyClaimsTabs from "../components/dashboard/myClaims/MyClaimsTabs";
import MyClaimsSearch from "../components/dashboard/myClaims/MyClaimsSearch";
import ClaimsList from "../components/dashboard/myClaims/ClaimsList";
import ClaimDetailsModal from "../components/dashboard/myClaims/ClaimDetailsModal";

/*pagination component is shared*/
import MyReportsPagination from "../components/dashboard/myReports/MyReportsPagination";

import ReportModal from "../components/LostFoundForm/ReportModal";

import { currentUser } from "../data/dashboardData";
import {
  myClaims,
  claimStats,
  dateFilterOptions,
  typeFilterOptions,
  CLAIMS_PER_PAGE,
} from "../data/myClaimsData";

import {
  reportHeader as lostHeader,
  reportForm as lostForm,
} from "../data/ReportLost";

import {
  reportHeader as foundHeader,
  reportForm as foundForm,
} from "../data/ReportFound";

/*statuses belong to each tab*/
const tabStatusMap = {
  all: null,
  pending: ["Pending Verification", "Under Review"],
  approved: ["Claimed"],
  rejected: ["Rejected"],
};

/*status card  mapping*/
const statToType = {
  claimed: "all",
  approved: "Claimed",
  pending: "Pending Verification",
  rejected: "Rejected",
};

function MyClaims() {
  const [openLostReport, setOpenLostReport] = useState(false);
  const [openFoundReport, setOpenFoundReport] = useState(false);

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeStat, setActiveStat] = useState("claimed");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClaim, setSelectedClaim] = useState(null);

  /*tab counts*/
  const tabs = useMemo(
    () => [
      { value: "all", label: "All claims", count: myClaims.length },
      {
        value: "pending",
        label: "Pending",
        count: myClaims.filter((c) =>
          tabStatusMap.pending.includes(c.status)
        ).length,
      },
      {
        value: "approved",
        label: "Approved",
        count: myClaims.filter((c) =>
          tabStatusMap.approved.includes(c.status)
        ).length,
      },
      {
        value: "rejected",
        label: "Rejected",
        count: myClaims.filter((c) =>
          tabStatusMap.rejected.includes(c.status)
        ).length,
      },
    ],
    []
  );

  /*tab + search + date + type filters*/
  const filteredClaims = useMemo(() => {
    const words = searchTerm.trim().toLowerCase();

    return myClaims
      .filter((claim) => {
        const allowed = tabStatusMap[activeTab];
        if (allowed && !allowed.includes(claim.status)) return false;

        if (typeFilter !== "all" && claim.status !== typeFilter) return false;

        if (dateFilter !== "all") {
          const days = Number(dateFilter);
          const limit = new Date();
          limit.setDate(limit.getDate() - days);
          if (new Date(claim.claimedOn) < limit) return false;
        }

        if (words) {
          const haystack = [
            claim.title,
            claim.location,
            claim.category,
            claim.referenceNo,
            claim.status,
            claim.reportType,
          ]
            .join(" ")
            .toLowerCase();

          if (!haystack.includes(words)) return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.claimedOn) - new Date(a.claimedOn));
  }, [activeTab, searchTerm, dateFilter, typeFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredClaims.length / CLAIMS_PER_PAGE)
  );

  /*go back to page 1*/
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, dateFilter, typeFilter]);

  const visibleClaims = filteredClaims.slice(
    (currentPage - 1) * CLAIMS_PER_PAGE,
    currentPage * CLAIMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectStat = (statId) => {
    setActiveStat(statId);
    setTypeFilter(statToType[statId] ?? "all");
    setActiveTab("all");
  };

  const handleTypeFilterChange = (value) => {
    setTypeFilter(value);
    const matchedStat = Object.keys(statToType).find(
      (key) => statToType[key] === value
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
          <MyClaimsUserBar user={currentUser} />

          {/*title + date / type filters*/}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <MyClaimsHeader />

            <MyClaimsFilters
              dateFilter={dateFilter}
              onDateFilterChange={setDateFilter}
              typeFilter={typeFilter}
              onTypeFilterChange={handleTypeFilterChange}
              dateOptions={dateFilterOptions}
              typeOptions={typeFilterOptions}
            />
          </div>

          <MyClaimsStats
            stats={claimStats}
            activeStat={activeStat}
            onSelectStat={handleSelectStat}
          />

          {/*tabs + search*/}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <MyClaimsTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <MyClaimsSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
          </div>

          <ClaimsList
            claims={visibleClaims}
            onViewDetails={setSelectedClaim}
          />

          <MyReportsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/*claim details popup*/}
      {selectedClaim && (
        <ClaimDetailsModal
          claim={selectedClaim}
          onClose={() => setSelectedClaim(null)}
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

export default MyClaims;
