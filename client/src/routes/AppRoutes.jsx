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
import ReportLostItem from "../pages/ReportLostItem";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes - උඩ public navbar එක එක්ක */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-otp" element={<RegisterOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* User Routes - public navbar එක නැතිව (sidebar page එක තුළ තියෙනවා) */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/report-lost-item" element={<ReportLostItem />} />

      {/* Admin Route */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default AppRoutes;