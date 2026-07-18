import { useState } from "react";
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
import { dashboardHeader, stats, approvals } from "../data/AdminDashboard";

export default function AdminDashboard() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <AdminNavBar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Right Side: Main Content + Footer stacked vertically */}
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">

        {/* Main Content */}
        <main className="flex-1 w-full overflow-x-hidden p-4 sm:p-6 lg:p-8">

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
            <DashboardCards stats={stats} />
          </section>

          {/* Approval Table */}
          <section className="mt-8">
            <ApprovalTable approvals={approvals} />
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

        {/* Footer — fits after sidebar, full width of main content */}
        <Footer />

      </div>

    </div>
  );
}