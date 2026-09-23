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
import Notification from "../pages/Notification";

import AdminDashboard from "../pages/AdminDashboard";
import AllUsers from "../pages/AllUsers";
import ReportManagement from "../pages/AdminModule/ReportManagement";

function AppRoutes() {

  return (

    <Routes>
      <Route element={<Layout />}>

        {/*public routes*/}
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

        <Route path="*" element={<NotFound />} />

      </Route>

      {/*admin route - outside the normal layout*/}
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



    </Routes>
  );
}

export default AppRoutes;