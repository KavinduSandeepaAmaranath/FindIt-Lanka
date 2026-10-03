// Mock data for Help & Support page

export const helpCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Basic guidance for using the portal.",
    icon: "book",
    items: [
      "How to create an account",
      "How to submit a lost item report",
      "How to submit a found item report",
    ],
    modalSubtitle: "Follow these steps to start using FindIt Lanka.",
    steps: [
      {
        number: 1,
        title: "Create an Account",
        description: "Sign up with your email or phone number.",
      },
      {
        number: 2,
        title: "Submit a Report",
        description: "Report a lost or found item with details and images.",
      },
      {
        number: 3,
        title: "Track Your Item",
        description: "Check the status of your report or claim in My Reports.",
      },
    ],
  },
  {
    id: "finding-claiming",
    title: "Finding & Claiming Items",
    description: "Help users recover their belongings.",
    icon: "search",
    items: [
      "How to search for items",
      "How to submit a claim",
      "What proof is required?",
      "How to track claim status",
    ],
    modalSubtitle: "Learn how to find and claim your lost items.",
    steps: [
      {
        number: 1,
        title: "Search for Items",
        description: "Use the search and filters to find matching items.",
      },
      {
        number: 2,
        title: "Submit a Claim",
        description: "Click on the item and provide the required details.",
      },
      {
        number: 3,
        title: "Track Claim Status",
        description: "Check updates in My Claims and Notifications.",
      },
    ],
  },
  {
    id: "safety-account",
    title: "Safety & Account",
    description: "Account management and safe item handovers.",
    icon: "shield",
    items: [
      "How to update profile details",
      "How to change password",
      "How to safely return an item",
      "How to report suspicious activity",
    ],
    modalSubtitle: "Keep your account secure and follow safe practices.",
    steps: [
      {
        number: 1,
        title: "Update Your Profile",
        description: "Keep your information up to date.",
      },
      {
        number: 2,
        title: "Change Password",
        description: "Use a strong password for better security.",
      },
      {
        number: 3,
        title: "Safe Handover",
        description: "Meet in a safe place and verify the item.",
      },
      {
        number: 4,
        title: "Report Suspicious Activity",
        description: "Contact support if you notice anything unusual.",
      },
    ],
  },
  {
    id: "contact-support",
    title: "Contact Support",
    description: "Get help when a problem cannot be solved through FAQs.",
    icon: "phone",
    items: [
      "Email support",
      "Report a technical issue",
      "Send a support request",
    ],
    modalSubtitle: "We're here to help. Choose how you'd like to get in touch.",
    options: [
      {
        id: "email",
        type: "email",
        title: "Email Support",
        subtitle: "support@finditlanka.lk",
      },
      {
        id: "form",
        type: "form",
        title: "Send a Support Request",
        subtitle: "Fill out the form and we'll get back to you.",
      },
      {
        id: "emergency",
        type: "phone",
        title: "Emergency Contact",
        subtitle: "+94 77 123 4567 (Mon - Fri, 9AM - 5PM)",
      },
    ],
  },
];

export const faqList = [
  {
    id: "faq-1",
    question: "How do I report a lost item?",
    subtitle: "To report a lost item, follow these steps:",
    steps: [
      "Go to My Reports in the sidebar.",
      "Click on Report Lost Item.",
      "Fill in the item details, location, date and description.",
      "Add an image (if available) and submit the report.",
    ],
    answer:
      "To report a lost item, click the 'Add Lost Reports' button in the sidebar or dashboard. Fill out the report form with item details including the item name, category, date and time lost, last known location, and upload clear photos. Include unique distinguishing features like scratches, engravings, or stickers to help match with found items.",
  },
  {
    id: "faq-2",
    question: "How can I claim an item?",
    subtitle: "To claim an item, follow these steps:",
    steps: [
      "Go to Browse Items in the sidebar.",
      "Find your matching lost item from the list.",
      "Click on the item and click Claim This Item.",
      "Provide required proof of ownership and submit your claim.",
    ],
    answer:
      "Browse the 'Browse Items' section to locate your item among reported found items. Once located, click 'Claim This Item' on the item card. Submit proof of ownership, such as purchase receipts, serial numbers, matching photo evidence, or specific details only the true owner would know.",
  },
  {
    id: "faq-3",
    question: "Why is my claim pending?",
    subtitle: "Understanding your claim verification process:",
    steps: [
      "The finder or an admin is reviewing your proof of ownership.",
      "Verification typically takes 24 to 48 hours to complete.",
      "Check your notifications for any request for additional information.",
      "Track the real-time status under My Claims in the sidebar.",
    ],
    answer:
      "Claims require verification by the person who found the item or our admin team to safeguard against false claims. The reviewer will examine your proof of ownership within 24 to 48 hours. You can monitor the real-time status under 'My Claims' in your dashboard.",
  },
  {
    id: "faq-4",
    question: "How will I know if my item is returned?",
    subtitle: "Follow these steps to check return confirmation:",
    steps: [
      "You will receive an instant notification when marked as returned.",
      "Check the Notifications tab in the sidebar.",
      "Your report in My Reports will automatically update to Resolved.",
      "Confirm receipt and leave feedback for the finder.",
    ],
    answer:
      "When a claim is accepted and the handover arranged, the item status is marked as 'Returned'. You will receive an immediate notification in your Notifications tab, an email update, and your dashboard report record will show as 'Resolved'.",
  },
  {
    id: "faq-5",
    question: "What should I do if I find someone else's item?",
    subtitle: "To report a found item, follow these steps:",
    steps: [
      "Go to Add Found Reports in the sidebar.",
      "Fill in the item details, location, date, and condition.",
      "Upload photos of the item without exposing sensitive info.",
      "Keep the item safe until a verified claim is submitted.",
    ],
    answer:
      "Click 'Add Found Reports' from the sidebar and provide the location and condition of the found item. Please do not publish sensitive identifiers (like passport numbers or bank card security codes) in public descriptions. Store the item safely until a verified claim is confirmed or hand it to local police / FindIt Lanka partners.",
  },
];