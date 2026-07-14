import { Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import RegisterOTP from "../pages/RegisterOTP";
import AdminDashboard from "../pages/AdminDashboard";


function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/register-otp" element={<RegisterOTP />} />

        <Route path="/Admin-Dashboard" element={<AdminDashboard/>} />

      </Routes>
    </Layout>
  );
}

export default AppRoutes;