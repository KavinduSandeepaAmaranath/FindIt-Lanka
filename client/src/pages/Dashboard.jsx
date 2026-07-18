import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsOverview from "../components/dashboard/StatsOverview";
import QuickActionsBanner from "../components/dashboard/QuickActionsBanner";

import {
    currentUser,
    stats,
} from "../data/dashboardData";

function Dashboard() {
  return (
    <div className="flex bg-slate-50">
      <DashboardSidebar />

      <div className="flex-1 min-w-0" >
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8 space-y-8">
          <DashboardTopbar user={currentUser} />
          
          <WelcomeBanner user={currentUser} />

              
          <StatsOverview stats={stats} />

          <QuickActionsBanner />




        </div>

      </div>
    </div>
  );
}
export default Dashboard;