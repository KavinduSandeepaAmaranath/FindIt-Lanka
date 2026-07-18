import DashboardSidebar from "../components/dashboard/DashboardSidebar";

function Dashboard() {
  return (
    <div className="flex bg-slate-100">
      <DashboardSidebar />
      <div className="flex-1 min-w-0" />
    </div>
  );
}
export default Dashboard;