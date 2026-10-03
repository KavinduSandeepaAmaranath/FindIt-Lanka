import { useState } from "react";
import DashboardSidebar from "../components/dashboard/DashBoardSidebar";
import HelpHeader from "../components/help/HelpHeader";
import HelpCategoryGrid from "../components/help/HelpCategoryGrid";
import HelpFaqSection from "../components/help/HelpFaqSection";
import HelpStillNeedHelp from "../components/help/HelpStillNeedHelp";

// Modals matching all attached UI designs
import GettingStartedModal from "../components/help/GettingStartedModal";
import FindingClaimingModal from "../components/help/FindingClaimingModal";
import SafetyAccountModal from "../components/help/SafetyAccountModal";
import ContactSupportModal from "../components/help/ContactSupportModal";
import ContactSupportFormModal from "../components/help/ContactSupportFormModal";
import FaqDropdownModal from "../components/help/FaqDropdownModal";

import ReportModal from "../components/LostFoundForm/ReportModal";

import { currentUser } from "../data/dashboardData";
import { helpCategories, faqList } from "../data/helpData";

import {
  reportHeader as lostHeader,
  reportForm as lostForm,
} from "../data/ReportLost";

import {
  reportHeader as foundHeader,
  reportForm as foundForm,
} from "../data/ReportFound";

function Help() {
  // Sidebar modals
  const [openLostReport, setOpenLostReport] = useState(false);
  const [openFoundReport, setOpenFoundReport] = useState(false);

  // Modals matching user specifications
  const [openGettingStarted, setOpenGettingStarted] = useState(false);
  const [openFindingClaiming, setOpenFindingClaiming] = useState(false);
  const [openSafetyAccount, setOpenSafetyAccount] = useState(false);
  const [openContactSupport, setOpenContactSupport] = useState(false);
  const [openContactForm, setOpenContactForm] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);

  // Handle category card click
  const handleSelectCategory = (category) => {
    switch (category.id) {
      case "getting-started":
        setOpenGettingStarted(true);
        break;
      case "finding-claiming":
        setOpenFindingClaiming(true);
        break;
      case "safety-account":
        setOpenSafetyAccount(true);
        break;
      case "contact-support":
        setOpenContactSupport(true);
        break;
      default:
        break;
    }
  };

  // Handle FAQ item click
  const handleSelectFaq = (faq) => {
    setSelectedFaq(faq);
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Dashboard Sidebar */}
      <DashboardSidebar
        onOpenLostReport={() => setOpenLostReport(true)}
        onOpenFoundReport={() => setOpenFoundReport(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 pt-[60px] lg:pt-0">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 space-y-6 sm:space-y-8">
          {/* Page Top Header */}
          <HelpHeader user={currentUser} />

          {/* 4 Category Cards */}
          <HelpCategoryGrid
            categories={helpCategories}
            onSelectCategory={handleSelectCategory}
          />

          {/* Frequently Asked Questions */}
          <HelpFaqSection
            faqs={faqList}
            onSelectFaq={handleSelectFaq}
          />

          {/* Still need help? Banner */}
          <HelpStillNeedHelp
            onContactSupport={() => setOpenContactForm(true)}
          />
        </div>
      </div>

      {/* ========================================================
          Modals matching attached UI designs:
          1. getting_start_card -> GettingStartedModal
          2. finding__claiming_card -> FindingClaimingModal
          3. safty__account_card -> SafetyAccountModal
          4. contact_support_card -> ContactSupportModal (3 options)
          5. contact_support_form -> ContactSupportFormModal (Subject, Message, Attachment)
          6. faq_dropdown_modal -> FaqDropdownModal
         ======================================================== */}

      {/* 1. Getting Started Modal */}
      <GettingStartedModal
        isOpen={openGettingStarted}
        onClose={() => setOpenGettingStarted(false)}
      />

      {/* 2. Finding & Claiming Items Modal */}
      <FindingClaimingModal
        isOpen={openFindingClaiming}
        onClose={() => setOpenFindingClaiming(false)}
      />

      {/* 3. Safety & Account Modal */}
      <SafetyAccountModal
        isOpen={openSafetyAccount}
        onClose={() => setOpenSafetyAccount(false)}
      />

      {/* 4. Contact Support Modal (Options: Email, Support Request, Emergency) */}
      <ContactSupportModal
        isOpen={openContactSupport}
        onClose={() => setOpenContactSupport(false)}
        onOpenForm={() => {
          setOpenContactSupport(false);
          setOpenContactForm(true);
        }}
      />

      {/* 5. Contact Support Form Modal (Subject dropdown, Message, Attachment, Send/Cancel) */}
      <ContactSupportFormModal
        isOpen={openContactForm}
        onClose={() => setOpenContactForm(false)}
      />

      {/* 6. FAQ Dropdown Modal */}
      <FaqDropdownModal
        faq={selectedFaq}
        isOpen={Boolean(selectedFaq)}
        onClose={() => setSelectedFaq(null)}
      />

      {/* Sidebar Lost Report Modal */}
      {openLostReport && (
        <ReportModal
          header={lostHeader}
          formData={lostForm}
          onClose={() => setOpenLostReport(false)}
        />
      )}

      {/* Sidebar Found Report Modal */}
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

export default Help;