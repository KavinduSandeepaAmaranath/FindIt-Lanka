import { useState } from "react";{/* අලුතින් ඇඩ් කලා */}

import DashboardSidebar from "../components/dashboard/DashBoardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsOverview from "../components/dashboard/StatsOverview";
import QuickActionsBanner from "../components/dashboard/QuickActionsBanner";
import ItemsGridSection from "../components/dashboard/ItemsGridSection";
import RecentActivity from "../components/dashboard/RecentActivity";
import BadgesEarned from "../components/dashboard/BadgesEarned";
import SafetyTipCard from "../components/dashboard/SafetyTipCard";


import ReportModal from "../components/LostFoundForm/ReportModal";{/*අලුතින් ඇඩ් කලා */}

import {
    currentUser,
    stats,
    myLostItems,
    myFoundItems,
    recentActivities,
    badges,
} from "../data/dashboardData";

import {
  reportHeader as lostHeader,
  reportForm as lostForm,
} from "../data/ReportLost";

import {
  reportHeader as foundHeader,
  reportForm as foundForm,
} from "../data/ReportFound";

function Dashboard() {

  const [openLostReport, setOpenLostReport] = useState(false);
  const [openFoundReport, setOpenFoundReport] = useState(false); {/* අලුතින් ඇඩ් කලා */}

  return (
    <div className="flex bg-slate-50">
      <DashboardSidebar   onOpenLostReport={() => setOpenLostReport(true)} onOpenFoundReport={() => setOpenFoundReport(true)} /> {/* do update newly */}

      <div className="flex-1 min-w-0 pt-[60px] lg:pt-0">
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8 space-y-8">
          <DashboardTopbar user={currentUser} />
          
          <WelcomeBanner user={currentUser} />

              
          <StatsOverview stats={stats} />

          <QuickActionsBanner onOpenLostReport={() => setOpenLostReport(true)} onOpenFoundReport={() => setOpenFoundReport(true)} /> {/* do update newly */}

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

{/* Lost Report Modal අලුතින් ඇඩ් කලා */}

{openLostReport && (
  <ReportModal
    header={lostHeader}
    formData={lostForm}
    onClose={() => setOpenLostReport(false)}
  />
)}

{openFoundReport && (
  <ReportModal
    header={foundHeader}
    formData={foundForm}
    onClose={() => setOpenFoundReport(false)}
  />
)}

    </div>
  );
}
export default Dashboard;