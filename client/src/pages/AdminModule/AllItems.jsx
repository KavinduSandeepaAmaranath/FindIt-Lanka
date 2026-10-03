import { useState, useEffect, useMemo } from "react";

import AdminNavBar from "../../components/AdminDashboard/AdminNavBar";
import HeaderSec from "../../components/AdminDashboard/AllItems/HeaderSec";
import AllItemsCards from "../../components/AdminDashboard/AllItems/AllItemsCards";
import AllItemsFilters from "../../components/AdminDashboard/AllItems/AllItemsFilters";
import AllItemsTable from "../../components/AdminDashboard/AllItems/AllItemsTable";
import Footer from "../../components/Footer";

import { getAllLostItems, getAllFoundItems } from "../../services/adminService";

const AllItems = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    type: "All",
    status: "All",
    date: "All Time",
  });

  const getImageUrl = (item) => {
    if (item.images && item.images.length > 0) {
      const img = item.images[0];
      if (img.startsWith("http://") || img.startsWith("https://")) {
        return img;
      }
      const cleanPath = img.startsWith("/") ? img.slice(1) : img;
      return `http://localhost:5000/${cleanPath}`;
    }
    return item.imageUrl || "https://via.placeholder.com/150?text=No+Image";
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);

      const [lostRes, foundRes] = await Promise.all([
        getAllLostItems(),
        getAllFoundItems(),
      ]);

      const lostList = (lostRes.lostItems || []).filter(
        (item) =>
          item.approvalStatus === "approved" ||
          item.approvalStatus === "Approved" ||
          (!item.approvalStatus && item.status !== "rejected")
      );
      const foundList = (foundRes.foundItems || []).filter(
        (item) =>
          item.approvalStatus === "approved" ||
          item.approvalStatus === "Approved" ||
          (!item.approvalStatus && item.status !== "rejected")
      );

      const formattedLost = lostList.map((item) => ({
        id: item._id,
        itemName: item.title || "Unnamed Item",
        image: getImageUrl(item),
        type: "Lost",
        location: item.district || item.location || "N/A",
        date: item.lostDate
          ? new Date(item.lostDate).toLocaleDateString()
          : item.createdAt
          ? new Date(item.createdAt).toLocaleDateString()
          : "N/A",
        rawDate: item.lostDate || item.createdAt,
        itemStatus: item.itemStatus || (item.status === "returned" ? "Returned" : "Active"),
        claimStatus: item.claimStatus || (item.isClaimed ? "Claimed" : "Unclaimed"),
        description: item.description || "No description provided.",
        reportedBy: item.userId?.name || "Unknown User",
        contact: item.userId?.phone || item.userId?.email || "N/A",
      }));

      const formattedFound = foundList.map((item) => ({
        id: item._id,
        itemName: item.title || "Unnamed Item",
        image: getImageUrl(item),
        type: "Found",
        location: item.district || item.location || "N/A",
        date: item.foundDate
          ? new Date(item.foundDate).toLocaleDateString()
          : item.createdAt
          ? new Date(item.createdAt).toLocaleDateString()
          : "N/A",
        rawDate: item.foundDate || item.createdAt,
        itemStatus: item.itemStatus || (item.status === "returned" ? "Returned" : "Active"),
        claimStatus: item.claimStatus || (item.isClaimed ? "Claimed" : "Unclaimed"),
        description: item.description || "No description provided.",
        reportedBy: item.userId?.name || "Unknown User",
        contact: item.userId?.phone || item.userId?.email || "N/A",
      }));

      setItems([...formattedLost, ...formattedFound]);
    } catch (err) {
      console.error("Error fetching items:", err);
      setError("Failed to load items from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleCardSelect = (cardId) => {
    if (cardId === 1) {
      setSelectedFilters({ type: "All", status: "All", date: "All Time" });
    } else if (cardId === 2) {
      setSelectedFilters((prev) => ({ ...prev, type: "Lost", status: "All" }));
    } else if (cardId === 3) {
      setSelectedFilters((prev) => ({ ...prev, type: "Found", status: "All" }));
    } else if (cardId === 4) {
      setSelectedFilters((prev) => ({ ...prev, type: "All", status: "Claimed" }));
    } else if (cardId === 5) {
      setSelectedFilters((prev) => ({ ...prev, type: "All", status: "Returned" }));
    }
  };

  const filteredItems = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return items.filter((item) => {
      // Type Filter
      if (
        selectedFilters.type !== "All" &&
        item.type?.toLowerCase() !== selectedFilters.type.toLowerCase()
      ) {
        return false;
      }

      // Status Filter
      if (selectedFilters.status !== "All") {
        const itemStatusMatch =
          item.itemStatus?.toLowerCase() === selectedFilters.status.toLowerCase();
        const claimStatusMatch =
          item.claimStatus?.toLowerCase() === selectedFilters.status.toLowerCase();

        if (!itemStatusMatch && !claimStatusMatch) {
          return false;
        }
      }

      // Date Filter
      if (selectedFilters.date !== "All Time") {
        const itemDate = new Date(item.rawDate || item.date);
        const now = new Date();

        if (selectedFilters.date === "Today") {
          if (itemDate.toDateString() !== now.toDateString()) return false;
        } else if (selectedFilters.date === "This Week") {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(now.getDate() - 7);
          if (itemDate < sevenDaysAgo) return false;
        } else if (selectedFilters.date === "This Month") {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(now.getDate() - 30);
          if (itemDate < thirtyDaysAgo) return false;
        } else if (selectedFilters.date === "This Year") {
          if (itemDate.getFullYear() !== now.getFullYear()) return false;
        }
      }

      // Search Query
      if (query) {
        const searchHaystack = [
          item.itemName,
          item.location,
          item.description,
          item.reportedBy,
          item.contact,
          item.type,
          item.itemStatus,
          item.claimStatus,
          item.id,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        if (!searchHaystack.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [items, searchValue, selectedFilters]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Area */}
      <div className="flex flex-1">
        {/* Admin Navbar */}
        <AdminNavBar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Content of Page */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {/* Header */}
          <HeaderSec setIsOpen={setIsOpen} />

          {/* All Items Cards */}
          <section className="mt-6">
            <AllItemsCards items={items} onCardSelect={handleCardSelect} />
          </section>

          {/* Filters */}
          <section className="mt-8">
            <AllItemsFilters
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              selectedFilters={selectedFilters}
              onFilterChange={(filterId, val) =>
                setSelectedFilters((prev) => ({ ...prev, [filterId]: val }))
              }
            />
          </section>

          {/* All Items Table */}
          <section className="mt-8">
            <AllItemsTable items={filteredItems} loading={loading} error={error} />
          </section>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AllItems;
