import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaSearch,
  FaBoxOpen,
  FaClipboardCheck,
} from "react-icons/fa";
import { getDashboardStatistics } from "../services/adminService";
import "react-day-picker/dist/style.css";

import AdminNavBar from "../components/AdminDashboard/AdminNavBar";
import AdminDashboardHeader from "../components/AdminDashboard/AdminDashboardHeader";
import DashboardCards from "../components/AdminDashboard/AdminDashboardCards";
import TopLocations from "../components/AdminDashboard/TopLocations";
import RecentActivities from "../components/AdminDashboard/RecentActivities";
import ReportsByCategory from "../components/AdminDashboard/ReportsByCategory";
import ReportOverview from "../components/AdminDashboard/ReportOverview";

import Footer from "../components/Footer";
import { dashboardHeader } from "../data/AdminDashboard";

export default function AdminDashboard() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  const dashboardStats = statistics
    ? [
      {
        title: "Users",
        value: statistics.totalUsers,
        sub: "Registered users",
        icon: FaUsers,
        path: "/admin/users",
      },
      {
        title: "Lost Reports",
        value: statistics.totalLostItems,
        sub: `${statistics.pendingLostItems} pending approval`,
        icon: FaSearch,
        path: "/admin/lost-items",
      },
      {
        title: "Found Reports",
        value: statistics.totalFoundItems,
        sub: `${statistics.pendingFoundItems} pending approval`,
        icon: FaBoxOpen,
        path: "/admin/found-items",
      },
      {
        title: "Recovered / Returned",
        value:
          statistics.recoveredItems +
          statistics.returnedItems,
        sub: "Completed cases",
        icon: FaClipboardCheck,
        path: "/admin/dashboard",
      },
    ]
    : [];

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const dashboardResponse = await getDashboardStatistics();
        setStatistics(dashboardResponse.statistics);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  console.log(statistics);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading Dashboard...
      </div>
    );
  }

  return (

    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* Sidebar + Main Content*/}

      <div className="flex flex-1 items-start">

        {/* Sidebar  */}

        <AdminNavBar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        {/* Main Content */}

        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-1 w-full min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-8"
        >

          {/* Header */}

          <AdminDashboardHeader
            header={dashboardHeader}
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setIsOpen={setIsSidebarOpen}
          />

          {/* Dashboard Cards */}

          <section className="mt-4">
            <DashboardCards stats={dashboardStats} />
          </section>

          {/* Top Locations & Recent Activities */}

          <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopLocations />
            <RecentActivities />
          </section>

          {/* Charts */}

          <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReportsByCategory />
            <ReportOverview />
          </section>

        </motion.main>

      </div>

      {/* Footer */}

      <Footer />

    </div>
  );
}