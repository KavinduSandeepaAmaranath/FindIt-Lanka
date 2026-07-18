//Mock(sample) data for the User Dashboard Page.
//Kavindu - Replace with real API data + uploaded image URLs once backend finished
import leatherBag from "../assets/images/UdbLeatherBag.avif";
import dog1 from "../assets/images/UdbDog1.avif";
import carKey1 from "../assets/images/UdbCarKey1.webp";
import bag2 from "../assets/images/UdpBag2.webp";
import umbrella1 from "../assets/images/UdbUmbrella1.avif";
import watch1 from "../assets/images/UdbWatch1.avif";

export const currentUser = {
    name: "Kasun Perera",
    membership: "Pro Member",
    trustScore: 98,
    memberSince: "Feb 2026",
    pendingNotifications: 2,
};

/*card data - Total Report, Items Recovered, Active Cases, Member Since*/
export const stats = [
    {
        label: "Total Reports",
        value: "12",
        note: "+2 this month",
        icon: "trend",
    },

    {
        label: "Items Recovered",
        value: "8",
        note: "66% success rate",
        icon: "pie",
    },

    {
        label: "Active Cases",
        value: "4",
        note: "Action required",
        icon: "alert",
    },

    {
        label: "Member Since",
        value: "Feb 2026",
        note: "Trusted Member",
        icon: "calendar",
    }
]

/*my lost items data */
export const myLostItems = [
    {
        id: "lost-1",
        title: "Leather Bag",
        location: "Colombo 07",
        date: "April 25, 2026",
        reportedAgo: "Reported 2 days ago",
        status: "Active",
        image: leatherBag,
    },

    {
        id: "lost-2",
        title: "Golden Retriever Dog",
        location: "Galle",
        date: "June 20, 2026",
        reportedAgo: "Reported 5 hours ago",
        stats: "Active",
        image: dog1,
    },

    {
        id: "lost-3",
        title: "Toyota Car Keys",
        location: "Matara",
        date: "July 14, 2026",
        reportedAgo: "Reported 10 hours ago",
        stats: "Matched",
        image: carKey1,
    }
]

/*my found items data */
export const myFoundItems = [
  {
    id: "found-1",
    title: "Leather Handbag",
    location: "Galle",
    date: "May 20, 2026",
    reportedAgo: "Reported 2 days ago",
    status: "Pending Claim",
    image:bag2,
  },

  {
    id: "found-2",
    title: "Black Umbrella",
    location: "Colombo 07",
    date: "August 27, 2026",
    reportedAgo: "Reported 5 hours ago",
    status: "Returned",
    image: umbrella1,
  },

  {
    id: "found-3",
    title: "Luxury Wristwatch",
    location: "Hiniduma",
    date: "December 19, 2025",
    reportedAgo: "Reported 5 hours ago",
    status: "Pending Claim",
    image: watch1,
  },
];

/*recent activities */
export const recentActivities = [
  {
    id: "act-1",
    type: "match",
    title: "Match Found!",
    description:
      'Your report for "Keys" has a potential match from user @Sam_Silva.',
    time: "10 minutes ago",
    actionable: true,
  },

  {
    id: "act-2",
    type: "message",
    title: "New Message",
    description:
      'New message regarding "Blue Leather Wallet" from Admin.',
    time: "2 hours ago",
  },

  {
    id: "act-3",
    type: "urgent",
    title: "Urgent",
    description: "Please verify your identity to claim the found iPhone 13.",
    time: "3 hours ago",
  },

  {
    id: "act-4",
    type: "closed",
    title: "Case Closed",
    description: '"Black Umbrella" successfully returned to owner.',
    time: "1 day ago",
  },

  {
    id: "act-5",
    type: "message",
    title: "New Message",
    description: 'New message regarding "BMW Car Key" from Admin.',
    time: "3 days ago",
  },
];

export const badges = [
  { id: "badge-1", label: "Best Member", sub: "Top Rated", bg: "bg-rose-400" },
  { id: "badge-2", label: "Trusted", sub: "Level 2", bg: "bg-blue-600" },
  { id: "badge-3", label: "Helper", sub: "Level 5", bg: "bg-orange-500" },
  { id: "badge-4", label: "Sharp Eye", sub: "Level 8", bg: "bg-violet-500" },
];
