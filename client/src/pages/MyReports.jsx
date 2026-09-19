import DashboardSidebar from "../components/dashboard/DashBoardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";

import MyReportsHeader from "../components/dashboard/myReports/MyReportsHeader";

import { currentUser } from "../data/dashboardData";

function MyReports() {
  return (
    <div className="flex bg-slate-50">
      <DashboardSidebar />

      <div className="flex-1 min-w-0 pt-[60px] lg:pt-0">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8 space-y-8">
          <DashboardTopbar user={currentUser} />

          <MyReportsHeader />
        </div>
      </div>
    </div>
  );
}

export default MyReports;