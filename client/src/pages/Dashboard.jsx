import { useState, useEffect } from "react";
import { 
  getDashboardProfile,
  getDashboardStatistics,
  getMyLostItems,
  getMyFoundItems,
  getRecentActivities,
} from "../services/dashboardService.js";

import DashboardSidebar from "../components/dashboard/DashBoardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsOverview from "../components/dashboard/StatsOverview";
import QuickActionsBanner from "../components/dashboard/QuickActionsBanner";
import ItemsGridSection from "../components/dashboard/ItemsGridSection";
import RecentActivity from "../components/dashboard/RecentActivity";
import BadgesEarned from "../components/dashboard/BadgesEarned";
import SafetyTipCard from "../components/dashboard/SafetyTipCard";


import ReportModal from "../components/LostFoundForm/ReportModal";

import { badges } from "../data/dashboardData";

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
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [openFoundReport, setOpenFoundReport] = useState(false);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const [
          profileResponse,
          statisticsResponse,
          lostItemsResponse,
          foundItemsResponse,
          activitiesResponse,
        ] = await Promise.all([
          getDashboardProfile(),
          getDashboardStatistics(),
          getMyLostItems(),
          getMyFoundItems(),
          getRecentActivities(),
        ]);

        setCurrentUser({
          ...profileResponse.profile,
          membership: "Community Member",
          trustScore: 98,
          trustLabel: "Trusted Member",
        });

        setStats([
        {
          label: "Total Reports",
          value: statisticsResponse.statistics.totalReports,
          note: `${statisticsResponse.statistics.totalLostReports} Lost • ${statisticsResponse.statistics.totalFoundReports} Found`,
          icon: "trend",
        },
        {
          label: "Recovered Items",
          value: statisticsResponse.statistics.recoveredItems,
          note: "Successfully completed",
          icon: "pie",
        },
        {
          label: "Active Cases",
          value: statisticsResponse.statistics.activeCases,
          note: "Currently active",
          icon: "alert",
        },
        {
          label: "Member Since",
          value: new Date(
            statisticsResponse.statistics.memberSince
          ).getFullYear(),
          note: "Community member",
          icon: "calendar",
        },
      ]);
      setLostItems(lostItemsResponse.lostItems);
      setFoundItems(foundItemsResponse.foundItems);
      setActivities(activitiesResponse.activities);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading Dashboard...
      </div>
    );
  }

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
                items={lostItems}
                addLabel="Add another Lost item"
                onAddClick={() => setOpenLostReport(true)}
              />
            </div>
            <RecentActivity activities={activities} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            <div className="xl:col-span-2">
              <ItemsGridSection
                title="My Found Items"
                items={foundItems}
                addLabel="Add another found item"
                onAddClick={() => setOpenFoundReport(true)}
              />
            </div>
            <div className="flex flex-col gap-6">
              <BadgesEarned badges={badges} />
              <SafetyTipCard />
            </div>
          </div>


        </div>

      </div>

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