
import { useState, useEffect } from "react";

import AdminNavBar from "../../components/AdminDashboard/AdminNavBar";

import HeaderSec from "../../components/AdminDashboard/ReportManagement/HeaderSec";
import ReportCards from "../../components/AdminDashboard/ReportManagement/ReportCards";
import ReportFilters from "../../components/AdminDashboard/ReportManagement/ReportFilters";
import ReportTable from "../../components/AdminDashboard/ReportManagement/ReportTable";

import Footer from "../../components/Footer";

import { getAllLostItems, getAllFoundItems } from "../../services/adminService";

const ReportManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        date: item.lostDate ? new Date(item.lostDate).toLocaleDateString() : "N/A",
        status: item.approvalStatus.charAt(0).toUpperCase() + item.approvalStatus.slice(1),
        itemImage: item.imageUrl || "/placeholder.png",
        category: item.category,
      }));

      const formattedFound = foundList.map((item) => ({
        id: item._id,
        itemName: item.title,
        reporterName: item.userId?.name || "Unknown User",
        location: item.district || "N/A",
        type: "Found",
        date: item.foundDate ? new Date(item.foundDate).toLocaleDateString() : "N/A",
        status: item.approvalStatus.charAt(0).toUpperCase() + item.approvalStatus.slice(1),
        itemImage: item.imageUrl || "/placeholder.png",
        category: item.category,
      }));

      setReports([...formattedLost, ...formattedFound]);
    } catch (err) {
      setError("Failed to load reports from database.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);

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
            <ReportCards
              reports={reports}
            />
          </section>

          {/* Filters */}
          <section className="mt-8">
            <ReportFilters />
          </section>

          {/* Report Table */}
          <section className="mt-8">
            <ReportTable
              reports={reports}
              loading={loading}
              error={error}
              onRefresh={fetchReports}
            />
          </section>

        </main>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default ReportManagement;