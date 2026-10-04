export const profileFormData = {
  fullName: "Saranga Hewage",
  email: "saranga@example.com",
  phone: "077 123 4567",
  district: "Hiniduma, Galle",
};

// Toggles under Notification Preferences
export const notificationPreferences = [
  {
    key: "reportUpdates",
    icon: "report",
    title: "Report Updates",
    description: "Get updates about your lost and found reports.",
    enabled: true,
  },
  {
    key: "claimUpdates",
    icon: "claim",
    title: "Claim Updates",
    description: "Get notified about claim verification and status.",
    enabled: true,
  },
  {
    key: "possibleMatches",
    icon: "match",
    title: "Possible Matches",
    description: "Notify me when a possible match is found.",
    enabled: true,
  },
  {
    key: "newMessages",
    icon: "message",
    title: "New Messages",
    description: "Get notified when someone sends you a message.",
    enabled: true,
  },
  {
    key: "itemReturned",
    icon: "returned",
    title: "Item Returned",
    description: "Get notified when an item is marked as returned.",
    enabled: false,
  },
  {
    key: "emailNotifications",
    icon: "email",
    title: "Email Notifications",
    description: "Receive important updates through email.",
    enabled: true,
  },
];

// Toggles under Privacy & Safety
export const privacySettings = [
  {
    key: "profileVisibility",
    icon: "profile",
    title: "Profile Visibility",
    description: "Allow other users to see your basic profile information.",
    enabled: true,
  },
  {
    key: "showPhoneNumber",
    icon: "phone",
    title: "Show Phone Number",
    description: "Allow other users to see your phone number.",
    enabled: false,
  },
  {
    key: "locationVisibility",
    icon: "location",
    title: "Location Visibility",
    description: "Control how your location information is displayed.",
    enabled: true,
  },
];

export const languageOptions = ["English", "Sinhala", "Tamil"];

export const themeOptions = [
  { key: "light", label: "Light", icon: "light" },
  { key: "dark", label: "Dark", icon: "dark" },
  { key: "system", label: "System", icon: "system" },
];
