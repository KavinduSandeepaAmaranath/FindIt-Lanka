import { Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import RegisterOTP from "../pages/RegisterOtp";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOtp from "../pages/VerifyOtp";
import NewPassword from "../pages/NewPassword";
import Dashboard from "../pages/Dashboard";
import ProtectedAdminRoute from "../components/ProtectedAdminRoute";
import MyReports from "../pages/MyReports";
import MyClaims from "../pages/MyClaims";
import AllItems from "../pages/AdminModule/AllItems";
import Settings from "../pages/Settings";
import MyReturns from "../pages/MyReturns";
import Notification from "../pages/Notification";
import Help from "../pages/Help";

import AdminDashboard from "../pages/AdminDashboard";
import AllUsers from "../pages/AllUsers";
import ReportManagement from "../pages/AdminModule/ReportManagement";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/*public & user dashboard routes*/}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-otp" element={<RegisterOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/my-reports" element={<MyReports />} />
        <Route path="/dashboard/my-claims" element={<MyClaims />} />
        <Route path="/dashboard/notifications" element={<Notification />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/my-returns" element={<MyReturns />} />
        <Route path="/dashboard/help" element={<Help />} />
        <Route path="/help" element={<Help />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      {/*protected admin routes*/}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/all-users"
        element={
          <ProtectedAdminRoute>
            <AllUsers />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/admin-reports"
        element={
          <ProtectedAdminRoute>
            <ReportManagement />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/all-items"
        element={
          <ProtectedAdminRoute>
            <AllItems />
          </ProtectedAdminRoute>
        }
      />

      <Route path="/All-Items" element={<ProtectedAdminRoute><AllItems /></ProtectedAdminRoute>} />
      <Route path="/all items" element={<ProtectedAdminRoute><AllItems /></ProtectedAdminRoute>} />
      <Route path="/all_items" element={<ProtectedAdminRoute><AllItems /></ProtectedAdminRoute>} />
      <Route path="/Admin-Dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
      <Route path="/All-Users" element={<ProtectedAdminRoute><AllUsers /></ProtectedAdminRoute>} />
      <Route path="/Report-Management" element={<ProtectedAdminRoute><ReportManagement /></ProtectedAdminRoute>} />
    </Routes>
  );
}

export default AppRoutes;
