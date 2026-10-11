import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import AdminNavBar from "../../components/AdminDashboard/AdminNavBar";

import HeaderSec from "../../components/AdminDashboard/ClaimManagement/HeaderSec";
import ClaimCards from "../../components/AdminDashboard/ClaimManagement/ClaimCards";
import ClaimFilters from "../../components/AdminDashboard/ClaimManagement/ClaimFilters";
import ClaimsTable from "../../components/AdminDashboard/ClaimManagement/ClaimsTable";

import Footer from "../../components/Footer";

import { getAllClaims } from "../../services/claimService";

const ClaimManagement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [claimType, setClaimType] = useState("All");

  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatClaimData = (claim) => {
    const foundItem = claim.foundItemId;
    const lostItem = claim.lostItemId;
    const claimant = claim.claimantId;

    const primaryItem = foundItem || lostItem;

    const rawImage = primaryItem?.images?.[0] || primaryItem?.image;
    let image = "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200";
    if (rawImage) {
      if (rawImage.startsWith("http")) {
        image = rawImage;
      } else {
        const clean = rawImage.replace(/^(\.\/|\/)/, "");
        image = `http://localhost:5000/${clean}`;
      }
    }

    const ownerUser = lostItem?.userId || claimant;
    const ownerName = ownerUser?.fullName || ownerUser?.name || "Lost Owner";
    const ownerEmail = ownerUser?.email || "No email available";
    const rawOwnerImg = ownerUser?.profilePicture || ownerUser?.avatar;
    const ownerImage = rawOwnerImg?.startsWith("http")
      ? rawOwnerImg
      : rawOwnerImg
      ? `http://localhost:5000/${rawOwnerImg.replace(/^(\.\/|\/)/, "")}`
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(ownerName)}&background=2563EB&color=fff`;

    const finderUser = foundItem?.userId;
    const finderName = finderUser?.fullName || finderUser?.name || "Finder";
    const finderEmail = finderUser?.email || "No email available";
    const rawFinderImg = finderUser?.profilePicture || finderUser?.avatar;
    const finderImage = rawFinderImg?.startsWith("http")
      ? rawFinderImg
      : rawFinderImg
      ? `http://localhost:5000/${rawFinderImg.replace(/^(\.\/|\/)/, "")}`
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(finderName)}&background=10B981&color=fff`;

    let displayStatus = "Submitted";
    if (claim.status === "approved") {
      displayStatus = "Accepted";
    } else if (claim.status === "rejected") {
      displayStatus = "Rejected";
    } else if (claim.status === "cancelled") {
      displayStatus = "Cancelled";
    } else {
      displayStatus = "Submitted";
    }

    return {
      id: claim._id,
      itemName: primaryItem?.title || "Item",
      image,
      type: foundItem ? "Found" : "Lost",
      owner: ownerName,
      ownerEmail,
      ownerImage,
      finder: finderName,
      finderEmail,
      finderImage,
      date: claim.createdAt ? new Date(claim.createdAt).toLocaleDateString() : "N/A",
      createdAt: claim.createdAt,
      status: displayStatus,
      rawStatus: claim.status,
      message: claim.message || "",
      reviewNote: claim.reviewNote || "",
      foundItem,
      lostItem,
      claimant,
    };
  };

  const fetchClaims = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllClaims();
      const rawList = data?.claims || [];
      const mapped = rawList.map(formatClaimData);
      setClaims(mapped);
    } catch (err) {
      console.error("Failed to load claims:", err);
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load claims from database."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* Main Area */}
      <div className="flex flex-1">

        {/* Admin Navbar */}
        <AdminNavBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="
            flex-1
            p-4
            sm:p-6
            lg:p-8
            overflow-x-hidden
          "
        >
          {/* Header */}
          <HeaderSec setIsOpen={setIsOpen} />

          {/*Cards */}
          <section className="mt-6">
            <ClaimCards
              claims={claims}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </section>

          {/* Search + Filters */}
          <section className="mt-8">
            <ClaimFilters
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              claimType={claimType}
              setClaimType={setClaimType}
            />
          </section>

          {/* Claims Table */}
          <section className="mt-8">
            <ClaimsTable
              claims={claims}
              loading={loading}
              error={error}
              onRefresh={fetchClaims}
              searchValue={searchValue}
              activeTab={activeTab}
              claimType={claimType}
            />
          </section>
        </motion.main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ClaimManagement;