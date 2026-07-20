import { useState, useEffect } from "react";
import {
  FaUsers,
  FaSearch,
  FaBoxOpen,
  FaClipboardCheck,
} from "react-icons/fa";
import { 
  getDashboardStatistics, 
  getPendingLostItems, 
  getPendingFoundItems, 
  approveLostItem,
  rejectLostItem,
  approveFoundItem,
  rejectFoundItem,
} from "../services/adminService";
import "react-day-picker/dist/style.css";

import AdminNavBar from "../components/AdminDashboard/AdminNavBar";
import AdminDashboardHeader from "../components/AdminDashboard/AdminDashboardHeader";
import DashboardCards from "../components/AdminDashboard/AdminDashboardCards";
import ApprovalTable from "../components/AdminDashboard/AdminDashboardApproval";
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
  const [pendingApprovals, setPendingApprovals] = useState([]);
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
        const [
          dashboardResponse,
          lostResponse,
          foundResponse,
        ] = await Promise.all([
          getDashboardStatistics(),
          getPendingLostItems(),
          getPendingFoundItems(),
        ]);

        setStatistics(dashboardResponse.statistics);

        const lostItems = lostResponse.lostItems.map((item) => ({
          id: item._id,
          image: item.images?.[0] || "",
          title: item.title,
          type: "Lost",
          category: item.category,
          user: item.userId?.name || "Unknown",
          date: new Date(item.lostDate).toLocaleDateString(),
          status: item.approvalStatus,
        }));

        const foundItems = foundResponse.foundItems.map((item) => ({
          id: item._id,
          image: item.images?.[0] || "",
          title: item.title,
          type: "Found",
          category: item.category,
          user: item.userId?.name || "Unknown",
          date: new Date(item.foundDate).toLocaleDateString(),
          status: item.approvalStatus,
        }));

        setPendingApprovals([
          ...lostItems,
          ...foundItems,
        ]);
        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleApprove = async (item) => {
  try {
    if (item.type === "Lost") {
      await approveLostItem(item.id);
    } else {
      await approveFoundItem(item.id);
    }

    setPendingApprovals((prev) =>
      prev.filter((report) => report.id !== item.id)
    );
  } catch (error) {
    console.error(error);
  }
};

const handleReject = async (item) => {
  try {
    if (item.type === "Lost") {
      await rejectLostItem(item.id);
    } else {
      await rejectFoundItem(item.id);
    }

    setPendingApprovals((prev) =>
      prev.filter((report) => report.id !== item.id)
    );
  } catch (error) {
    console.error(error);
  }
};

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

        <main className="flex-1 w-full min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-8">

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

          <section className="mt-6">
            <DashboardCards stats={dashboardStats} />
          </section>

          {/* Approval Table */}

          <section className="mt-8">
            <ApprovalTable 
              approvals={pendingApprovals} 
              onApprove={handleApprove}
              onReject={handleReject}
            />

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

        </main>

      </div>

      {/* Footer */}
      
      <Footer />

    </div>
  );
}