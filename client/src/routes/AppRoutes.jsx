import { Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import RegisterOTP from "../pages/RegisterOTP";
import AdminDashboard from "../pages/AdminDashboard";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOtp from "../pages/VerifyOtp";
import NewPassword from "../pages/NewPassword";
import Dashboard from "../pages/Dashboard";
import AllUsers from "../pages/AllUsers";
import ReportManagement from "../pages/AdminModule/ReportManagement";
import Notification from "../pages/Notification";
import MyReports from "../pages/MyReports";
import MyClaims from "../pages/MyClaims";



function AppRoutes() {
  
  return (
    
      <Routes>
        <Route element={<Layout />}>

        {/*public routes*/}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register-otp" element={<RegisterOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/dashboard/notifications" element={<Notification />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/dashboard/my-reports" element={<MyReports/>} />
        <Route path="/dashboard/my-claims" element={<MyClaims/>} />

        </Route>

        {/*admin route - outside the normal layout*/}
        <Route path="/Admin-Dashboard" element={<AdminDashboard/>} />
        <Route path="/All-Users" element={<AllUsers/>} />
        <Route path="/Report-Management" element={<ReportManagement/>} />

      </Routes>
  );
}

export default AppRoutes;