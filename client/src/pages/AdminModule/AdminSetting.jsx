import { useState } from "react";

import AdminNavBar from "../../components/AdminDashboard/AdminNavBar";

import HeaderSec from "../../components/AdminDashboard/AdminSetting/HeaderSec";
import SettingsSidebar from "../../components/AdminDashboard/AdminSetting/SettingsSidebar";
import GeneralSettings from "../../components/AdminDashboard/AdminSetting/GeneralSettings";
import AdminProfile from "../../components/AdminDashboard/AdminSetting/AdminProfile";
import SecuritySettings from "../../components/AdminDashboard/AdminSetting/SecuritySettings";
import NotificationPreferences from "../../components/AdminDashboard/AdminSetting/NotificationPreferences";
import PlatformSettings from "../../components/AdminDashboard/AdminSetting/PlatformSettings";
import DangerZone from "../../components/AdminDashboard/AdminSetting/DangerZone";

import Footer from "../../components/Footer";

const AdminSetting = () => {
  const [isOpen, setIsOpen] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("general");

  const handleSectionChange = (
    section
  ) => {
    setActiveSection(section);

    const element =
      document.getElementById(section);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
        bg-gray-50
      "
    >

      <div className="flex flex-1">

        {/* Admin Navbar */}
        <AdminNavBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <main
          className="
            min-w-0
            flex-1
            overflow-x-hidden
            p-4
            sm:p-6
            lg:p-8
            xl:p-10
          "
        >

          {/* Header */}
          <HeaderSec
            setIsOpen={setIsOpen}
          />

          {/* Settings Layout */}
          <div
            className="
              flex
              flex-col
              gap-5
              xl:flex-row
              xl:items-start
            "
          >

            {/* Settings Navigation */}
            <SettingsSidebar
              activeSection={
                activeSection
              }
              setActiveSection={
                handleSectionChange
              }
            />

            {/* Settings Content */}
            <div
              className="
                min-w-0
                flex-1
                space-y-5
              "
            >

              <GeneralSettings />

              <AdminProfile />

              <SecuritySettings />

              <NotificationPreferences />

              <PlatformSettings />

              <DangerZone />

            </div>

          </div>

        </main>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default AdminSetting;