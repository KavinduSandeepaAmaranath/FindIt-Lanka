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
import ProtectedRoute from "../components/ProtectedRoute";
import ProtectedAdminRoute from "../components/ProtectedAdminRoute";
import MyReports from "../pages/MyReports";
import MyClaims from "../pages/MyClaims";
import AllItems from "../pages/AdminModule/AllItems";
import Settings from "../pages/Settings";
import MyReturns from "../pages/MyReturns";
import Notification from "../pages/Notification";
import Help from "../pages/Help";
import BrowseItems from "../pages/BrowseItems";
import ReportLostItem from "../pages/ReportLostItem";
import ReportFoundItem from "../pages/ReportFoundItem";

import AdminDashboard from "../pages/AdminDashboard";
import AllUsers from "../pages/AllUsers";
import ReportManagement from "../pages/AdminModule/ReportManagement";
import ClaimManagement from "../pages/AdminModule/ClaimManagement";
import AdminNotification from "../pages/AdminModule/AdminNotification";
import AdminSetting from "../pages/AdminModule/AdminSetting";

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
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/my-reports"
          element={
            <ProtectedRoute>
              <MyReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/my-claims"
          element={
            <ProtectedRoute>
              <MyClaims />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/notifications"
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/my-returns"
          element={
            <ProtectedRoute>
              <MyReturns />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/browse"
          element={
            <ProtectedRoute>
              <BrowseItems />
            </ProtectedRoute>
          }
        />
        <Route path="/browse" element={<BrowseItems />} />
        <Route
          path="/dashboard/help"
          element={
            <ProtectedRoute>
              <Help />
            </ProtectedRoute>
          }
        />
        <Route path="/help" element={<Help />} />
        <Route
          path="/report-lost-item"
          element={
            <ProtectedRoute>
              <ReportLostItem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report-found-item"
          element={
            <ProtectedRoute>
              <ReportFoundItem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report-lost"
          element={
            <ProtectedRoute>
              <ReportLostItem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report-found"
          element={
            <ProtectedRoute>
              <ReportFoundItem />
            </ProtectedRoute>
          }
        />

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
        path="/Admin-Dashboard"
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
        path="/All-Users"
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
        path="/Report-Management"
        element={
          <ProtectedAdminRoute>
            <ReportManagement />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/report-management"
        element={
          <ProtectedAdminRoute>
            <ReportManagement />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin-approvals"
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
      <Route
        path="/All-Items"
        element={
          <ProtectedAdminRoute>
            <AllItems />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/all items"
        element={
          <ProtectedAdminRoute>
            <AllItems />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/all_items"
        element={
          <ProtectedAdminRoute>
            <AllItems />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin-locations"
        element={
          <ProtectedAdminRoute>
            <AllItems />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/claim-management"
        element={
          <ProtectedAdminRoute>
            <ClaimManagement />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/Claim-Management"
        element={
          <ProtectedAdminRoute>
            <ClaimManagement />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/admin-notification"
        element={
          <ProtectedAdminRoute>
            <AdminNotification />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/Admin-Notification"
        element={
          <ProtectedAdminRoute>
            <AdminNotification />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin-notifications"
        element={
          <ProtectedAdminRoute>
            <AdminNotification />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/Admin-Notifications"
        element={
          <ProtectedAdminRoute>
            <AdminNotification />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path="/admin-setting"
        element={
          <ProtectedAdminRoute>
            <AdminSetting />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/Admin-Setting"
        element={
          <ProtectedAdminRoute>
            <AdminSetting />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin-settings"
        element={
          <ProtectedAdminRoute>
            <AdminSetting />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/Admin-Settings"
        element={
          <ProtectedAdminRoute>
            <AdminSetting />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="/admin-profile"
        element={
          <ProtectedAdminRoute>
            <AdminSetting />
          </ProtectedAdminRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;
