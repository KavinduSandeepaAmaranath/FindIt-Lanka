import { useState, useMemo } from "react";

import AdminNavBar from "../../components/AdminDashboard/AdminNavBar";
import HeaderSec from "../../components/AdminDashboard/AllItems/HeaderSec";
import AllItemsCards from "../../components/AdminDashboard/AllItems/AllItemsCards";
import AllItemsFilters from "../../components/AdminDashboard/AllItems/AllItemsFilters";
import AllItemsTable from "../../components/AdminDashboard/AllItems/AllItemsTable";
import Footer from "../../components/Footer";

import { allItemsTableData } from "../../data/AdminModuleData/AllItems";

const AllItems = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    type: "All",
    status: "All",
    date: "All Time",
  });

  const handleCardSelect = (cardId) => {
    if (cardId === 1) {
      setSelectedFilters({ type: "All", status: "All", date: "All Time" });
    } else if (cardId === 2) {
      setSelectedFilters((prev) => ({ ...prev, type: "Lost" }));
    } else if (cardId === 3) {
      setSelectedFilters((prev) => ({ ...prev, type: "Found" }));
    } else if (cardId === 4) {
      setSelectedFilters((prev) => ({ ...prev, status: "Claimed" }));
    } else if (cardId === 5) {
      setSelectedFilters((prev) => ({ ...prev, status: "Returned" }));
    }
  };

  const filteredItems = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return allItemsTableData.filter((item) => {
      // Type Filter
      if (
        selectedFilters.type !== "All" &&
        item.type?.toLowerCase() !== selectedFilters.type.toLowerCase()
      ) {
        return false;
      }

      // Status Filter
      if (selectedFilters.status !== "All") {
        const itemStatusMatch = item.itemStatus?.toLowerCase() === selectedFilters.status.toLowerCase();
        const claimStatusMatch = item.claimStatus?.toLowerCase() === selectedFilters.status.toLowerCase();

        if (!itemStatusMatch && !claimStatusMatch) {
          return false;
        }
      }

      // Date Filter
      if (selectedFilters.date !== "All Time") {
        const itemDate = new Date(item.date);
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
          .join(" ")
          .toLowerCase();

        if (!searchHaystack.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [searchValue, selectedFilters]);

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
            <AllItemsCards items={allItemsTableData} onCardSelect={handleCardSelect} />
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
            <AllItemsTable items={filteredItems} />
          </section>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AllItems;
