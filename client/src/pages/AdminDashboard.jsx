import { useState } from "react";
import "react-day-picker/dist/style.css";

import AdminNavBar from "../components/AdminDashboard/AdminNavBar";
import AdminDashboardHeader from "../components/AdminDashboard/AdminDashboardHeader";
import DashboardCards from "../components/AdminDashboard/AdminDashboardCards";
import ApprovalTable from "../components/AdminDashboard/AdminDashboardApproval";

import {
  dashboardHeader,
  stats,
  approvals,
} from "../data/AdminDashboard";

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

      {/* Main Content */}
      <main className="flex-1 w-full overflow-x-hidden p-4 sm:p-6 lg:p-8 lg:ml-64">

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

      </main>

    </div>
  );
}