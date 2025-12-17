// Project
export const COMPANY_NAME = "URL Shortener";
export const COMPANY_DESCRIPTION = "Pending.";

// API
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

// Selects
export const privacyItems = [
  { key: "public", label: "Public" },
  { key: "private", label: "Private" },
];

// UI Items
export const links = [
  { name: "Feedback", href: "/feedback" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms Service", href: "/terms-service" },
  { name: "Donate", href: "/donate" },
];

// Hardcoded Plans
export const plans = [
  {
    name: "Free",
    price: "$0",
    annual: "Annual fee $0",
    features: {
      "Links per month": "250",
      "Link lifespan": "Infinity",
      Analytics: "1 Month",
      "Password protection": true,
      "Privacy settings": true,
      "QR Code": true,
      "Custom alias": false,
      "Custom domain": false,
      "Link groups": false,
      "Link metadata": false,
      "Edit URL": false,
    },
  },
  {
    name: "Basic",
    price: "$4",
    annual: "Annual fee $50",
    popular: true,
    features: {
      "Links per month": "Infinity",
      "Link lifespan": "Infinity",
      Analytics: "1 Year",
      "Password protection": true,
      "Privacy settings": true,
      "QR Code": true,
      "Custom alias": true,
      "Custom domain": "1",
      "Link groups": true,
      "Link metadata": true,
      "Edit URL": true,
    },
  },
  {
    name: "Premium",
    price: "$12",
    annual: "Annual fee $150",
    features: {
      "Links per month": "Infinity",
      "Link lifespan": "Infinity",
      Analytics: "3 Years",
      "Password protection": true,
      "Privacy settings": true,
      "QR Code": true,
      "Custom alias": true,
      "Custom domain": "3",
      "Link groups": true,
      "Link metadata": true,
      "Edit URL": true,
    },
  },
];
