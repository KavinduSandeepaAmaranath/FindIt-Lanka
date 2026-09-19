//sample data
import iphone1 from "../assets/images/LpIphone1.avif";
import iphone2 from "../assets/images/iphone.png";
import carKey1 from "../assets/images/UdbCarKey1.webp";
import leatherBag from "../assets/images/UdbLeatherBag.avif";
import watch1 from "../assets/images/UdbWatch1.avif";
import bag2 from "../assets/images/UdpBag2.webp";
import umbrella1 from "../assets/images/UdbUmbrella1.avif";
import handBag from "../assets/images/LpLeatherHandbag.avif";
import dog1 from "../assets/images/UdbDog1.avif";
import watch2 from "../assets/images/LpWristWatch2.avif";
import carKey2 from "../assets/images/LpCarKey.webp";
import bicycle from "../assets/images/LpBicycle1.avif";

/*summary cards data*/
export const claimStats = [
  {
    id: "claimed",
    label: "Successfully Claimed",
    value: "12",
    note: "+2 this month",
    icon: "claimed",
    accent: "blue",
  },
  {
    id: "approved",
    label: "Admin Approved",
    value: "02",
    note: "Approved by Admin",
    icon: "approved",
    accent: "emerald",
  },
  {
    id: "pending",
    label: "Pending verification",
    value: "02",
    note: "Admin Review Required",
    icon: "pending",
    accent: "orange",
  },
  {
    id: "rejected",
    label: "Admin Rejected",
    value: "01",
    note: "rejected by admin",
    icon: "rejected",
    accent: "rose",
  },
];

/*
status - claimed, approved, pending, rejected    
claimedOn : ISO date string
*/
export const myClaims = [
  {
    id: "clm-01",
    title: "iPhone 12",
    status: "Claimed",
    claimedOn: "2026-09-03T14:45:00",
    image: iphone1,
    location: "Colombo 07",
    category: "Electronics",
    referenceNo: "CL-2026-0012",
    reportType: "Found Item",
  },
  {
    id: "clm-02",
    title: "Toyota Car Key",
    status: "Under Review",
    claimedOn: "2026-09-04T12:45:00",
    image: carKey1,
    location: "Matara",
    category: "Keys",
    referenceNo: "CL-2026-0011",
    reportType: "Found Item",
  },
  {
    id: "clm-03",
    title: "Leather Wallet",
    status: "Pending Verification",
    claimedOn: "2026-09-06T21:45:00",
    image: leatherBag,
    location: "Haputale",
    category: "Wallet",
    referenceNo: "CL-2026-0010",
    reportType: "Lost Item",
  },
  {
    id: "clm-04",
    title: "Gold Ring",
    status: "Claimed",
    claimedOn: "2026-09-08T08:45:00",
    image: watch1,
    location: "Badulla",
    category: "Jewellery",
    referenceNo: "CL-2026-0009",
    reportType: "Found Item",
  },
  {
    id: "clm-05",
    title: "Black Backpack",
    status: "Rejected",
    claimedOn: "2026-09-12T06:45:00",
    image: bag2,
    location: "Badulla",
    category: "Bags",
    referenceNo: "CL-2026-0008",
    reportType: "Lost Item",
  },
  {
    id: "clm-06",
    title: "iPhone 13",
    status: "Claimed",
    claimedOn: "2026-09-14T09:45:00",
    image: iphone2,
    location: "Badulla",
    category: "Electronics",
    referenceNo: "CL-2026-0007",
    reportType: "Found Item",
  },
  {
    id: "clm-07",
    title: "Black Umbrella",
    status: "Claimed",
    claimedOn: "2026-08-27T10:05:00",
    image: umbrella1,
    location: "Colombo 07",
    category: "Accessories",
    referenceNo: "CL-2026-0006",
    reportType: "Found Item",
  },
  {
    id: "clm-08",
    title: "Leather Handbag",
    status: "Pending Verification",
    claimedOn: "2026-08-15T13:10:00",
    image: handBag,
    location: "Galle",
    category: "Bags",
    referenceNo: "CL-2026-0005",
    reportType: "Found Item",
  },
  {
    id: "clm-09",
    title: "Golden Retriever Dog",
    status: "Claimed",
    claimedOn: "2026-08-20T08:40:00",
    image: dog1,
    location: "Galle",
    category: "Pets",
    referenceNo: "CL-2026-0004",
    reportType: "Lost Item",
  },
  {
    id: "clm-10",
    title: "Luxury Wristwatch",
    status: "Under Review",
    claimedOn: "2026-07-05T12:00:00",
    image: watch2,
    location: "Hiniduma",
    category: "Jewellery",
    referenceNo: "CL-2026-0003",
    reportType: "Found Item",
  },
  {
    id: "clm-11",
    title: "BMW Car Key",
    status: "Rejected",
    claimedOn: "2026-06-22T15:45:00",
    image: carKey2,
    location: "Colombo 03",
    category: "Keys",
    referenceNo: "CL-2026-0002",
    reportType: "Lost Item",
  },
  {
    id: "clm-12",
    title: "Mountain Bicycle",
    status: "Claimed",
    claimedOn: "2026-07-30T17:25:00",
    image: bicycle,
    location: "Nuwara Eliya",
    category: "Vehicles",
    referenceNo: "CL-2026-0001",
    reportType: "Lost Item",
  },
];

/*dropdown options*/
export const dateFilterOptions = [
  { value: "all", label: "All Time" },
  { value: "7", label: "Last 7 Days" },
  { value: "30", label: "Last 30 Days" },
  { value: "90", label: "Last 3 Months" },
];

export const typeFilterOptions = [
  { value: "all", label: "All Status" },
  { value: "Claimed", label: "Claimed" },
  { value: "Under Review", label: "Under Review" },
  { value: "Pending Verification", label: "Pending Verification" },
  { value: "Rejected", label: "Rejected" },
];

export const CLAIMS_PER_PAGE = 6;
