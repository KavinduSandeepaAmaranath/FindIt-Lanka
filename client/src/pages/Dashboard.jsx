import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsOverview from "../components/dashboard/StatsOverview";
import QuickActionsBanner from "../components/dashboard/QuickActionsBanner";
import ItemsGridSection from "../components/dashboard/ItemsGridSection";
import RecentActivity from "../components/dashboard/RecentActivity";
import BadgesEarned from "../components/dashboard/BadgesEarned";
import SafetyTipCard from "../components/dashboard/SafetyTipCard";
import {
    currentUser,
    stats,
    myLostItems,
    myFoundItems,
    recentActivities,
    badges,
} from "../data/dashboardData";

function Dashboard() {
  return (
    <div className="flex bg-slate-50">
      <DashboardSidebar />

      <div className="flex-1 min-w-0 pt-[60px] lg:pt-0">
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8 space-y-8">
          <DashboardTopbar user={currentUser} />
          
          <WelcomeBanner user={currentUser} />

              
          <StatsOverview stats={stats} />

          <QuickActionsBanner />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            <div className="xl:col-span-2">
              <ItemsGridSection
                title="My Lost Items"
                items={myLostItems}
                addLabel="Add another Lost item"
              />
            </div>
            <RecentActivity activities={recentActivities} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            <div className="xl:col-span-2">
              <ItemsGridSection
                title="My Found Items"
                items={myFoundItems}
                addLabel="Add another found item"
              />
            </div>
            <div className="flex flex-col gap-6">
              <BadgesEarned badges={badges} />
              <SafetyTipCard />
            </div>
          </div>


        </div>

      </div>
    </div>
  );
}
export default Dashboard;