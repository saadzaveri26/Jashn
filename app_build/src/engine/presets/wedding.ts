import type { CategoryId, CityTier, Idea, PresetId, RedFlag, VendorQuestion } from "../schemas";

export type PresetData = {
  id: PresetId;
  categories: Array<{ id: CategoryId; label: string; weight: number }>;
  guestRange: { min: number; max: number };
  tasks: Array<{ title: string; categoryId: CategoryId; leadDays: number }>;
  floors: Record<CityTier, number>;
  fallbackIdeas: Idea[];
  fallbackQuestions: VendorQuestion[];
  fallbackRedFlags: RedFlag[];
};

export const weddingPreset: PresetData = {
  id: "wedding",
  categories: [
    { id: "venue", label: "Venue", weight: 0.25 },
    { id: "catering", label: "Catering", weight: 0.30 },
    { id: "decor", label: "Decor & Floral", weight: 0.10 },
    { id: "photography", label: "Photography", weight: 0.08 },
    { id: "attire", label: "Attire & Beauty", weight: 0.07 },
    { id: "music", label: "Music & Entertainment", weight: 0.06 },
    { id: "invitations", label: "Invitations & Stationery", weight: 0.04 },
    { id: "transport", label: "Transport & Logistics", weight: 0.05 },
    { id: "misc", label: "Contingency & Misc", weight: 0.05 },
  ],
  guestRange: { min: 100, max: 500 },
  floors: {
    "tier-1": 300000,
    "tier-2": 200000,
    "tier-3": 120000,
  },
  tasks: [
    { title: "Book wedding venue", categoryId: "venue", leadDays: 180 },
    { title: "Finalize caterer and menu tasting", categoryId: "catering", leadDays: 120 },
    { title: "Hire photographer and videographer", categoryId: "photography", leadDays: 90 },
    { title: "Select wedding decor theme", categoryId: "decor", leadDays: 60 },
    { title: "Order bridal and groom attire", categoryId: "attire", leadDays: 60 },
    { title: "Send formal invitations", categoryId: "invitations", leadDays: 45 },
    { title: "Book DJ and sound crew", categoryId: "music", leadDays: 30 },
    { title: "Arrange guest transport and shuttles", categoryId: "transport", leadDays: 15 },
    { title: "Final vendor payment and checklist review", categoryId: "misc", leadDays: 7 },
  ],
  fallbackIdeas: [
    { title: "Bespoke welcome drinks station", description: "Seasonal mocktails with regional herbs and personalized drink stirrers.", categoryId: "catering", costBand: "low" },
    { title: "Interactive live food counter", description: "Artisanal chaat or dessert station prepared fresh in front of guests.", categoryId: "catering", costBand: "medium" },
    { title: "Festive string light canopy", description: "Warm fairy light ceiling suspended across courtyard or banquet hall.", categoryId: "decor", costBand: "low" },
    { title: "Polaroid guest book corner", description: "Instant photo station with metallic markers and customized keepsake album.", categoryId: "photography", costBand: "low" },
  ],
  fallbackQuestions: [
    { categoryId: "venue", question: "What is your overtime policy per hour if the celebration runs late?" },
    { categoryId: "venue", question: "Does the venue fee include power backup, air conditioning, and basic lighting?" },
    { categoryId: "catering", question: "Are crockery, cutlery, serving staff, and chafing dishes covered in the per-plate fee?" },
    { categoryId: "photography", question: "How many raw and edited photographs are guaranteed, and what is delivery timeline?" },
    { categoryId: "decor", question: "Do you supply artificial vs fresh floral arrangements, and what is price variance?" },
  ],
  fallbackRedFlags: [
    { categoryId: "venue", flag: "No clear written agreement regarding sound curfew rules and decibel limits." },
    { categoryId: "catering", flag: "Refusal to provide an ingredient sourcing breakdown or food safety license." },
    { categoryId: "photography", flag: "No backup photographer or replacement equipment clauses in contract." },
  ],
};

