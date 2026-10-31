import type { PresetData } from "./wedding";

export const communityPreset: PresetData = {
  id: "community",
  categories: [
    { id: "venue", label: "Community Hall or Park", weight: 0.30 },
    { id: "catering", label: "Community Feast & Refreshments", weight: 0.25 },
    { id: "decor", label: "Banners & Festive Decor", weight: 0.10 },
    { id: "sound", label: "Public Address & Sound", weight: 0.12 },
    { id: "permits", label: "Permits & Municipal Licenses", weight: 0.08 },
    { id: "volunteers", label: "Volunteer Supplies & Badges", weight: 0.05 },
    { id: "misc", label: "Emergency & Waste Management", weight: 0.10 },
  ],
  guestRange: { min: 50, max: 300 },
  floors: {
    "tier-1": 80000,
    "tier-2": 50000,
    "tier-3": 30000,
  },
  tasks: [
    { title: "Submit municipal permits and police intimation", categoryId: "permits", leadDays: 60 },
    { title: "Book open ground or community hall", categoryId: "venue", leadDays: 45 },
    { title: "Book PA sound system and generator backup", categoryId: "sound", leadDays: 30 },
    { title: "Plan community meal buffet and water points", categoryId: "catering", leadDays: 20 },
    { title: "Print route banners and stage signage", categoryId: "decor", leadDays: 14 },
    { title: "Distribute volunteer safety kit and schedule", categoryId: "volunteers", leadDays: 7 },
    { title: "Deploy waste segregation bins and sanitation", categoryId: "misc", leadDays: 2 },
  ],
  fallbackIdeas: [
    { title: "Zero-waste banana leaf buffet", description: "Traditional community meal served on biodegradable plates with local sourcing.", categoryId: "catering", costBand: "low" },
    { title: "Community talent open-mic segment", description: "Structured evening showcase for neighborhood youth and cultural groups.", categoryId: "sound", costBand: "low" },
  ],
  fallbackQuestions: [
    { categoryId: "permits", question: "What is exact cutoff hour for loudspeakers as per municipal clearance?" },
    { categoryId: "sound", question: "Does the sound setup include emergency horn speakers and backup battery supply?" },
    { categoryId: "venue", question: "Are commercial water tankers and waste dumpsters permitted on the grounds?" },
  ],
  fallbackRedFlags: [
    { categoryId: "venue", flag: "No fire safety clearance certificate or designated emergency vehicle entrance." },
    { categoryId: "sound", flag: "Sound vendor operates uncalibrated amps prone to tripping venue transformers." },
  ],
};

