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

import { getMyClaims, approveClaim } from "../services/claimService.js";

import {
  myClaims as initialClaims,
  claimStats as initialStats,
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

import fallbackImg from "../assets/images/LpIphone1.avif";

/*statuses belong to each tab*/
const tabStatusMap = {
  all: null,
  pending: ["Pending Verification", "Under Review", "pending"],
  approved: ["Claimed", "approved"],
  rejected: ["Rejected", "rejected"],
};

/*status card mapping*/
const statToType = {
  claimed: "all",
  approved: "Claimed",
  pending: "Pending Verification",
  rejected: "Rejected",
};

function MyClaims() {
  const [claimsList, setClaimsList] = useState([]);
  const [openLostReport, setOpenLostReport] = useState(false);
  const [openFoundReport, setOpenFoundReport] = useState(false);

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeStat, setActiveStat] = useState("claimed");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    getMyClaims()
      .then((res) => {
        if (res?.claims) {
          const liveClaims = res.claims.map((c) => {
            const lost = c.lostItemId || {};
            const found = c.foundItemId || {};
            const imgPath = lost.images?.[0] || found.images?.[0];
            const fullImg = imgPath
              ? (imgPath.startsWith("http") ? imgPath : `http://localhost:5000/${imgPath}`)
              : fallbackImg;

            let uiStatus = "Pending Verification";
            if (c.status === "approved") uiStatus = "Claimed";
            if (c.status === "rejected") uiStatus = "Rejected";
            if (c.status === "cancelled") uiStatus = "Cancelled";

            const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
            const currentUserId = savedUser.id || savedUser._id || localStorage.getItem("userId");
            const isReturnOffer = c.foundItemId?.userId ? (c.foundItemId.userId.toString() !== currentUserId?.toString()) : true;

            const founderUser = c.foundItemId?.userId || c.claimantId || {};
            const displayUser = founderUser.fullName || founderUser.name || (isReturnOffer ? "Item Founder" : "Claimant");
            const isApproved = c.status === "approved" || c.status === "returned";

            const claimantEmail = isApproved 
              ? (founderUser.email || "Contact via system") 
              : "Contact via system (Protected until approval)";
            const claimantPhone = isApproved 
              ? (founderUser.phone || founderUser.phoneNumber || "Contact via system") 
              : "Contact via system (Protected until approval)";

            const userPic = founderUser.profilePicture || founderUser.avatar || founderUser.profileImage;
            const hasRealAvatar = Boolean(userPic);
            const claimantAvatar = hasRealAvatar
              ? (userPic.startsWith("http") ? userPic : `http://localhost:5000/${userPic}`)
              : null;

            const itemDesc = lost.description || found.description || c.message || "Report details registered in system.";
            const proofImgs = (lost.images && lost.images.length > 0)
              ? lost.images.map(img => img.startsWith("http") ? img : `http://localhost:5000/${img}`)
              : (found.images && found.images.length > 0)
              ? found.images.map(img => img.startsWith("http") ? img : `http://localhost:5000/${img}`)
              : [fullImg];

            return {
              ...c,
              id: c._id,
              referenceNo: `CLM-${c._id.slice(-6).toUpperCase()}`,
              title: lost.title || found.title || "Claimed Item",
              category: lost.category || found.category || "General",
              location: lost.district || found.district || lost.location || found.location || "Sri Lanka",
              claimedBy: displayUser,
              claimantEmail: claimantEmail,
              claimantPhone: claimantPhone,
              claimantAvatar: claimantAvatar,
              hasRealAvatar: hasRealAvatar,
              itemDescription: itemDesc,
              proofImages: proofImgs,
              isReturnOffer: isReturnOffer,
              claimedOn: new Date(c.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }),
              status: uiStatus,
              reportType: "Claim Request",
              image: fullImg,
            };
          });
          setClaimsList(liveClaims);
        } else {
          setClaimsList([]);
        }
      })
      .catch((err) => {
        console.error("Error loading my claims:", err);
        setClaimsList([]);
      });
  }, []);

  /*tab counts*/
  const tabs = useMemo(
    () => [
      { value: "all", label: "All claims", count: claimsList.length },
      {
        value: "pending",
        label: "Pending",
        count: claimsList.filter((c) =>
          tabStatusMap.pending.includes(c.status)
        ).length,
      },
      {
        value: "approved",
        label: "Approved",
        count: claimsList.filter((c) =>
          tabStatusMap.approved.includes(c.status)
        ).length,
      },
      {
        value: "rejected",
        label: "Rejected",
        count: claimsList.filter((c) =>
          tabStatusMap.rejected.includes(c.status)
        ).length,
      },
    ],
    [claimsList]
  );

  /*computed stats*/
  const computedStats = useMemo(() => {
    return [
      { id: "claimed", label: "Total Claims", value: claimsList.length },
      {
        id: "approved",
        label: "Approved Claims",
        value: claimsList.filter((c) => tabStatusMap.approved.includes(c.status)).length,
      },
      {
        id: "pending",
        label: "Pending Verification",
        value: claimsList.filter((c) => tabStatusMap.pending.includes(c.status)).length,
      },
      {
        id: "rejected",
        label: "Rejected Claims",
        value: claimsList.filter((c) => tabStatusMap.rejected.includes(c.status)).length,
      },
    ];
  }, [claimsList]);

  /*tab + search + date + type filters*/
  const filteredClaims = useMemo(() => {
    const words = searchTerm.trim().toLowerCase();

    return claimsList
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
  }, [claimsList, activeTab, searchTerm, dateFilter, typeFilter]);

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

    const handleConfirmApprove = async (claim) => {
    try {
      await approveClaim(claim.id || claim._id, "Return confirmed and accepted by owner.");
      setSelectedClaim(null);
      getMyClaims()
        .then((res) => {
          if (res?.claims) {
            const liveClaims = res.claims.map((c) => {
              const lost = c.lostItemId || {};
              const found = c.foundItemId || {};
              const imgPath = lost.images?.[0] || found.images?.[0];
              const fullImg = imgPath
                ? (imgPath.startsWith("http") ? imgPath : `http://localhost:5000/${imgPath}`)
                : fallbackImg;

              let uiStatus = "Pending Verification";
              if (c.status === "approved") uiStatus = "Claimed";
              if (c.status === "rejected") uiStatus = "Rejected";
              if (c.status === "cancelled") uiStatus = "Cancelled";

              const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
              const currentUserId = savedUser.id || savedUser._id || localStorage.getItem("userId");
              const isReturnOffer = c.foundItemId?.userId ? (c.foundItemId.userId.toString() !== currentUserId?.toString()) : true;

              const founderUser = c.foundItemId?.userId || c.claimantId || {};
              const displayUser = founderUser.fullName || founderUser.name || (isReturnOffer ? "Item Founder" : "Claimant");
              const isApproved = c.status === "approved" || c.status === "returned";

              const claimantEmail = isApproved 
                ? (founderUser.email || "Contact via system") 
                : "Contact via system (Protected until approval)";
              const claimantPhone = isApproved 
                ? (founderUser.phone || founderUser.phoneNumber || "Contact via system") 
                : "Contact via system (Protected until approval)";

              const userPic = founderUser.profilePicture || founderUser.avatar || founderUser.profileImage;
              const hasRealAvatar = Boolean(userPic);
              const claimantAvatar = hasRealAvatar
                ? (userPic.startsWith("http") ? userPic : `http://localhost:5000/${userPic}`)
                : null;

              const itemDesc = lost.description || found.description || c.message || "Report details registered in system.";
              const proofImgs = (lost.images && lost.images.length > 0)
                ? lost.images.map(img => img.startsWith("http") ? img : `http://localhost:5000/${img}`)
                : (found.images && found.images.length > 0)
                ? found.images.map(img => img.startsWith("http") ? img : `http://localhost:5000/${img}`)
                : [fullImg];

              return {
                ...c,
                id: c._id,
                referenceNo: `CLM-${c._id.slice(-6).toUpperCase()}`,
                title: lost.title || found.title || "Claimed Item",
                category: lost.category || found.category || "General",
                location: lost.district || found.district || lost.location || found.location || "Sri Lanka",
                claimedBy: displayUser,
                claimantEmail: claimantEmail,
                claimantPhone: claimantPhone,
                claimantAvatar: claimantAvatar,
                hasRealAvatar: hasRealAvatar,
                itemDescription: itemDesc,
                proofImages: proofImgs,
                isReturnOffer: isReturnOffer,
                claimedOn: new Date(c.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }),
                status: uiStatus,
                reportType: "Claim Request",
                image: fullImg,
              };
            });
            setClaimsList(liveClaims);
          }
        });
    } catch (err) {
      console.error("Error approving claim:", err);
    }
  };

  return (
    <div className="flex bg-[#f8faff] min-h-screen">
      <DashboardSidebar
        onOpenLostReport={() => setOpenLostReport(true)}
        onOpenFoundReport={() => setOpenFoundReport(true)}
      />

      <div className="flex-1 min-w-0 pt-[60px] lg:pt-0">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8 space-y-8">
          <MyClaimsUserBar user={undefined} />

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
            stats={computedStats}
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
            onConfirmApprove={handleConfirmApprove}
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
          onConfirmApprove={handleConfirmApprove}
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
