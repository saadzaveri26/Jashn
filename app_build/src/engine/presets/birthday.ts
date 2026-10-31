import type { PresetData } from "./wedding";

export const birthdayPreset: PresetData = {
  id: "birthday",
  categories: [
    { id: "venue", label: "Venue & Space", weight: 0.25 },
    { id: "catering", label: "Food & Drinks", weight: 0.25 },
    { id: "decor", label: "Balloons & Decor", weight: 0.12 },
    { id: "entertainment", label: "Entertainment & Games", weight: 0.15 },
    { id: "cake", label: "Custom Cake", weight: 0.10 },
    { id: "favors", label: "Party Favors & Bags", weight: 0.08 },
    { id: "misc", label: "Supplies & Contingency", weight: 0.05 },
  ],
  guestRange: { min: 20, max: 100 },
  floors: {
    "tier-1": 150000,
    "tier-2": 100000,
    "tier-3": 60000,
  },
  tasks: [
    { title: "Select theme and reserve venue", categoryId: "venue", leadDays: 45 },
    { title: "Order custom sculpted cake", categoryId: "cake", leadDays: 20 },
    { title: "Book magician or host", categoryId: "entertainment", leadDays: 20 },
    { title: "Confirm menu and snack platters", categoryId: "catering", leadDays: 14 },
    { title: "Purchase balloon decor and photo props", categoryId: "decor", leadDays: 10 },
    { title: "Assemble gift hampers and favor bags", categoryId: "favors", leadDays: 7 },
    { title: "Confirm RSVP list and final count", categoryId: "misc", leadDays: 3 },
  ],
  fallbackIdeas: [
    { title: "DIY mocktail or sundae bar", description: "Interactive station where guests choose toppings, fruits, and sparkling cordials.", categoryId: "catering", costBand: "low" },
    { title: "Themed photo frame cutout", description: "Handcrafted life-sized photo frame customized with milestone name and year.", categoryId: "decor", costBand: "low" },
    { title: "Mini mystery escape puzzle", description: "Curated 20-minute table team puzzle keeping guests engaged before cake cutting.", categoryId: "entertainment", costBand: "medium" },
  ],
  fallbackQuestions: [
    { categoryId: "venue", question: "Is outside catering and cake allowed without a corkage fee?" },
    { categoryId: "entertainment", question: "Do you supply your own microphone, speaker system, and music playback device?" },
    { categoryId: "cake", question: "Can the cake be refrigerated at the venue until cutting time?" },
  ],
  fallbackRedFlags: [
    { categoryId: "cake", flag: "Baker does not offer temperature-controlled transport for multi-tier cakes." },
    { categoryId: "entertainment", flag: "No verified performance video clips or references for age-appropriate crowd handling." },
  ],
};

