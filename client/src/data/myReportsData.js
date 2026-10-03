/*sample data */

import carKey1 from "../assets/images/UdbCarKey1.webp";
import watch1 from "../assets/images/UdbWatch1.avif";
import leatherBag from "../assets/images/UdbLeatherBag.avif";
import iphone1 from "../assets/images/LpIphone1.avif";
import bag2 from "../assets/images/UdpBag2.webp";
import umbrella1 from "../assets/images/UdbUmbrella1.avif";
import dog1 from "../assets/images/UdbDog1.avif";
import handBag from "../assets/images/LpLeatherHandbag.avif";
import bicycle from "../assets/images/LpBicycle1.avif";
import cat from "../assets/images/LpPersianCat.avif";
import watch2 from "../assets/images/LpWristWatch2.avif";
import carKey2 from "../assets/images/LpCarKey.webp";

/*summary cards data - total, active, recovered, pending, rejected */
export const reportStats = [
  {
    id: "total",
    label: "Total Reports",
    value: "12",
    note: "+2 this month",
    icon: "total",
    accent: "blue",
  },
  {
    id: "active",
    label: "Active Reports",
    value: "06",
    note: "still being processed",
    icon: "active",
    accent: "blue",
  },
  {
    id: "recovered",
    label: "Recovered",
    value: "02",
    note: "successfully recovered",
    icon: "recovered",
    accent: "emerald",
  },
  {
    id: "pending",
    label: "Pending",
    value: "02",
    note: "Review Required",
    icon: "pending",
    accent: "orange",
  },
  {
    id: "rejected",
    label: "Rejected",
    value: "01",
    note: "rejected by admin",
    icon: "rejected",
    accent: "rose",
  },
];

/*
report type : lost item, found item
status      : pending, resolved, rejected, under review
reportedOn  : ISO date string (for filter and sorting)
 */

export const myReports = [
  {
    id: "rep-01",
    title: "Toyota Car Keys",
    location: "Matara",
    reportType: "Found Item",
    reportedOn: "2026-09-02T16:15:00",
    description: "Found near the ICT building.",
    status: "Pending",
    image: carKey1,
    category: "Keys",
    referenceNo: "FL-2026-0012",
  },
  {
    id: "rep-02",
    title: "Gold Ring",
    location: "Badulla",
    reportType: "Found Item",
    reportedOn: "2026-09-05T14:30:00",
    description: "Found at the main entrance.",
    status: "Resolved",
    image: watch1,
    category: "Jewellery",
    referenceNo: "FL-2026-0011",
  },
  {
    id: "rep-03",
    title: "Leather Wallet",
    location: "Haputale",
    reportType: "Lost Item",
    reportedOn: "2026-09-08T09:45:00",
    description: "Brown leather wallet with ID cards and two bank cards inside.",
    status: "Rejected",
    image: leatherBag,
    category: "Wallet",
    referenceNo: "FL-2026-0010",
  },
  {
    id: "rep-04",
    title: "iPhone 13",
    location: "Badulla",
    reportType: "Found Item",
    reportedOn: "2026-09-10T11:20:00",
    description: "Found at the main bus stand.",
    status: "Pending",
    image: iphone1,
    category: "Electronics",
    referenceNo: "FL-2026-0009",
  },
  {
    id: "rep-05",
    title: "Black Backpack",
    location: "Badulla",
    reportType: "Lost Item",
    reportedOn: "2026-09-12T16:15:00",
    description: "Black backpack with laptop, charger and a few notebooks.",
    status: "Under Review",
    image: bag2,
    category: "Bags",
    referenceNo: "FL-2026-0008",
  },
  {
    id: "rep-06",
    title: "Black Umbrella",
    location: "Colombo 07",
    reportType: "Found Item",
    reportedOn: "2026-08-27T10:05:00",
    description: "Left behind inside the train compartment.",
    status: "Resolved",
    image: umbrella1,
    category: "Accessories",
    referenceNo: "FL-2026-0007",
  },
  {
    id: "rep-07",
    title: "Golden Retriever Dog",
    location: "Galle",
    reportType: "Lost Item",
    reportedOn: "2026-08-20T08:40:00",
    description: "Wearing a red collar, answers to the name Rocky.",
    status: "Under Review",
    image: dog1,
    category: "Pets",
    referenceNo: "FL-2026-0006",
  },
  {
    id: "rep-08",
    title: "Leather Handbag",
    location: "Galle",
    reportType: "Found Item",
    reportedOn: "2026-08-15T13:10:00",
    description: "Found at the bus halt near the fort.",
    status: "Pending",
    image: handBag,
    category: "Bags",
    referenceNo: "FL-2026-0005",
  },
  {
    id: "rep-09",
    title: "Mountain Bicycle",
    location: "Nuwara Eliya",
    reportType: "Lost Item",
    reportedOn: "2026-07-30T17:25:00",
    description: "Blue mountain bicycle taken from outside the market.",
    status: "Under Review",
    image: bicycle,
    category: "Vehicles",
    referenceNo: "FL-2026-0004",
  },
  {
    id: "rep-10",
    title: "Persian Cat",
    location: "Kandy",
    reportType: "Found Item",
    reportedOn: "2026-07-18T19:00:00",
    description: "White Persian cat found near the temple road.",
    status: "Under Review",
    image: cat,
    category: "Pets",
    referenceNo: "FL-2026-0003",
  },
  {
    id: "rep-11",
    title: "Luxury Wristwatch",
    location: "Hiniduma",
    reportType: "Found Item",
    reportedOn: "2026-07-05T12:00:00",
    description: "Silver wristwatch found inside the university library.",
    status: "Under Review",
    image: watch2,
    category: "Jewellery",
    referenceNo: "FL-2026-0002",
  },
  {
    id: "rep-12",
    title: "BMW Car Key",
    location: "Colombo 03",
    reportType: "Lost Item",
    reportedOn: "2026-06-22T15:45:00",
    description: "Single black car key with a leather tag.",
    status: "Under Review",
    image: carKey2,
    category: "Keys",
    referenceNo: "FL-2026-0001",
  },
];

/*dropdown options*/
export const dateFilterOptions = [
  { value: "all", label: "All Time" },
  { value: "7", label: "Last 7 Days" },
  { value: "30", label: "Last 30 Days" },
  { value: "90", label: "Last 3 Months" },
];

export const statusFilterOptions = [
  { value: "all", label: "All Status" },
  { value: "Pending", label: "Pending" },
  { value: "Under Review", label: "Under Review" },
  { value: "Resolved", label: "Resolved" },
  { value: "Rejected", label: "Rejected" },
];

export const REPORTS_PER_PAGE = 5;
