
import { useState } from "react";

import AdminNavBar from "../../components/AdminDashboard/AdminNavBar";

import HeaderSec from "../../components/AdminDashboard/ReportManagement/HeaderSec";
import ReportCards from "../../components/AdminDashboard/ReportManagement/ReportCards";
import ReportFilters from "../../components/AdminDashboard/ReportManagement/ReportFilters";
import ReportTable from "../../components/AdminDashboard/ReportManagement/ReportTable";

import Footer from "../../components/Footer";

const ReportManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
<<<<<<< HEAD
=======
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    reportType: "All",
    status: "Pending",
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

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);

      const [lostRes, foundRes] = await Promise.all([
        getAllLostItems(),
        getAllFoundItems(),
      ]);

      const lostList = lostRes.lostItems || [];
      const foundList = foundRes.foundItems || [];

      const formattedLost = lostList.map((item) => ({
        id: item._id,
        itemName: item.title,
        reporterName: item.userId?.name || "Unknown User",
        location: item.district || "N/A",
        type: "Lost",
        rawDate: item.lostDate || item.createdAt,
        date: item.lostDate ? new Date(item.lostDate).toLocaleDateString() : "N/A",
        status: item.approvalStatus ? item.approvalStatus.charAt(0).toUpperCase() + item.approvalStatus.slice(1) : "Pending",
        itemImage: getImageUrl(item),
        category: item.category,
      }));

      const formattedFound = foundList.map((item) => ({
        id: item._id,
        itemName: item.title,
        reporterName: item.userId?.name || "Unknown User",
        location: item.district || "N/A",
        type: "Found",
        rawDate: item.foundDate || item.createdAt,
        date: item.foundDate ? new Date(item.foundDate).toLocaleDateString() : "N/A",
        status: item.approvalStatus ? item.approvalStatus.charAt(0).toUpperCase() + item.approvalStatus.slice(1) : "Pending",
        itemImage: getImageUrl(item),
        category: item.category,
      }));

      setReports([...formattedLost, ...formattedFound]);
    } catch (err) {
      setError("Failed to load reports from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleFilterChange = (filterId, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));
  };

  const filteredReports = reports.filter((report) => {
    const query = searchTerm.trim().toLowerCase();

    let matchesSearch = true;
    if (query) {
      const searchHaystack = [
        report.itemName,
        report.reporterName,
        report.location,
        report.type,
        report.status,
        report.category,
        report.id,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      matchesSearch = searchHaystack.includes(query);
    }

    const matchesType =
      !filters.reportType ||
      filters.reportType === "All" ||
      report.type?.toLowerCase() === filters.reportType.toLowerCase();

    const matchesStatus =
      !filters.status ||
      filters.status === "All" ||
      report.status?.toLowerCase() === filters.status.toLowerCase();

    let matchesDate = true;
    if (filters.date && filters.date !== "All Time") {
      const reportDate = new Date(report.rawDate || report.date);
      const now = new Date();
      if (filters.date === "Today") {
        matchesDate = reportDate.toDateString() === now.toDateString();
      } else if (filters.date === "This Week") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        matchesDate = reportDate >= oneWeekAgo;
      } else if (filters.date === "This Month") {
        matchesDate =
          reportDate.getMonth() === now.getMonth() &&
          reportDate.getFullYear() === now.getFullYear();
      }
    }

    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });
>>>>>>> 8dd1c422806a30eed6d0237448c7e727ff73ca4d

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Main Area */}
      <div className="flex flex-1">

        {/* admin navbar */}
        <AdminNavBar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        {/* Content of page */}
        <main
          className="
            flex-1
            p-4
            sm:p-6
            lg:p-8
            overflow-x-hidden
          "
        >

          {/* Headersec */}
          <HeaderSec
            setIsOpen={setIsSidebarOpen}
          />

          {/* Report Cards */}
          <section className="mt-6">
<<<<<<< HEAD
            <ReportCards />
=======
            <ReportCards
              reports={reports}
              onCardSelect={(statusVal) => handleFilterChange("status", statusVal)}
            />
>>>>>>> 8dd1c422806a30eed6d0237448c7e727ff73ca4d
          </section>

          {/* Filters */}
          <section className="mt-8">
            <ReportFilters />
          </section>

          {/* Report Table */}
          <section className="mt-8">
            <ReportTable />
          </section>

        </main>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default ReportManagement;