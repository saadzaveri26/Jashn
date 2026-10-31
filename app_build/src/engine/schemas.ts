import { z } from "zod";

export const DateStr = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
export const MinorUnits = z.number().int().nonnegative();
export const Pct = z.number().min(0).max(100);

export const CityTier = z.enum(["tier-1", "tier-2", "tier-3"]);
export type CityTier = z.infer<typeof CityTier>;

export const PresetId = z.enum(["wedding", "birthday", "community"]);
export type PresetId = z.infer<typeof PresetId>;

export const CostBand = z.enum(["low", "medium", "high"]);
export type CostBand = z.infer<typeof CostBand>;

export const FeasibilityVerdict = z.enum(["comfortable", "tight", "unrealistic"]);
export type FeasibilityVerdict = z.infer<typeof FeasibilityVerdict>;

export const QuoteVerdict = z.enum(["under", "within", "over"]);
export type QuoteVerdict = z.infer<typeof QuoteVerdict>;

export const CategoryId = z.string().min(1).max(30);
export type CategoryId = z.infer<typeof CategoryId>;

export const IntakeSchema = z.object({
  preset: PresetId,
  eventName: z.string().min(1).max(120),
  eventDate: DateStr,
  guests: z.number().int().min(1).max(10000),
  totalBudget: MinorUnits.min(1),
  cityTier: CityTier,
  priorities: z.array(CategoryId).max(3),
  currency: z.string().length(3).default("INR"),
});
export type Intake = z.infer<typeof IntakeSchema>;

export const AllocationSchema = z.object({
  categoryId: CategoryId,
  label: z.string().min(1).max(60),
  amount: MinorUnits,
  weight: z.number().positive(),
  locked: z.boolean(),
  pct: Pct,
});
export type Allocation = z.infer<typeof AllocationSchema>;

export const TaskSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(120),
  categoryId: CategoryId,
  due: DateStr,
  done: z.boolean(),
  leadDays: z.number().int().nonnegative(),
  atRisk: z.boolean(),
  compressed: z.boolean(),
  compressReason: z.string().max(200).optional(),
});
export type Task = z.infer<typeof TaskSchema>;

export const QuoteSchema = z.object({
  id: z.string().min(1),
  categoryId: CategoryId,
  vendorName: z.string().min(1).max(120),
  amount: MinorUnits,
  notes: z.string().max(500).default(""),
  addedOn: DateStr,
});
export type Quote = z.infer<typeof QuoteSchema>;

export const QuoteComparisonSchema = z.object({
  verdict: QuoteVerdict,
  deltaPct: z.number(),
  deltaMinor: z.number().int(),
});
export type QuoteComparison = z.infer<typeof QuoteComparisonSchema>;

export const IdeaSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(300),
  categoryId: CategoryId,
  costBand: CostBand,
});
export type Idea = z.infer<typeof IdeaSchema>;

export const IdeaFitResultSchema = z.object({
  fits: z.boolean(),
  bandCeiling: MinorUnits,
  allocation: MinorUnits,
});
export type IdeaFitResult = z.infer<typeof IdeaFitResultSchema>;

export const VendorQuestionSchema = z.object({
  categoryId: CategoryId,
  question: z.string().min(1).max(300),
});
export type VendorQuestion = z.infer<typeof VendorQuestionSchema>;

export const RedFlagSchema = z.object({
  categoryId: CategoryId,
  flag: z.string().min(1).max(300),
});
export type RedFlag = z.infer<typeof RedFlagSchema>;

export const VendorGuideSchema = z.object({
  questions: z.array(VendorQuestionSchema).min(1).max(60),
  redFlags: z.array(RedFlagSchema).min(1).max(40),
});
export type VendorGuide = z.infer<typeof VendorGuideSchema>;

export const AdjustCategoryAction = z.object({
  type: z.literal("adjust_category"),
  categoryId: CategoryId,
  newAmount: MinorUnits,
});
export type AdjustCategoryAction = z.infer<typeof AdjustCategoryAction>;

export const AddTaskAction = z.object({
  type: z.literal("add_task"),
  title: z.string().min(1).max(120),
  categoryId: CategoryId,
  leadDays: z.number().int().nonnegative().max(365),
});
export type AddTaskAction = z.infer<typeof AddTaskAction>;

export const SetGuestCountAction = z.object({
  type: z.literal("set_guest_count"),
  guests: z.number().int().min(1).max(10000),
});
export type SetGuestCountAction = z.infer<typeof SetGuestCountAction>;

export const ActionSchema = z.discriminatedUnion("type", [
  AdjustCategoryAction,
  AddTaskAction,
  SetGuestCountAction,
]);
export type Action = z.infer<typeof ActionSchema>;

export const PlanSchema = z.object({
  id: z.string().min(1),
  version: z.number().int().min(1),
  schemaVersion: z.literal(1),
  intake: IntakeSchema,
  allocations: z.array(AllocationSchema),
  tasks: z.array(TaskSchema),
  quotes: z.array(QuoteSchema).max(200),
  ideas: z.array(IdeaSchema).max(100),
  vendorGuide: VendorGuideSchema.nullable(),
  feasibility: FeasibilityVerdict.nullable(),
  createdAt: DateStr,
  updatedAt: DateStr,
  ai: z.enum(["enriched", "unavailable"]).nullable(),
});
export type Plan = z.infer<typeof PlanSchema>;

export const EnrichRequestSchema = z.object({
  preset: PresetId,
  allocations: z.array(AllocationSchema),
  guests: z.number().int().min(1).max(10000),
  cityTier: CityTier,
  eventName: z.string().min(1).max(120),
});
export type EnrichRequest = z.infer<typeof EnrichRequestSchema>;

export const EnrichResponseSchema = z.object({
  ideas: z.array(IdeaSchema).min(1).max(30),
  questions: z.array(VendorQuestionSchema).min(1).max(60),
  redFlags: z.array(RedFlagSchema).min(1).max(40),
  ai: z.enum(["enriched", "unavailable"]),
});
export type EnrichResponse = z.infer<typeof EnrichResponseSchema>;

export const AssistantMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  text: z.string().min(1).max(2000),
});
export type AssistantMessage = z.infer<typeof AssistantMessageSchema>;

export const AssistantRequestSchema = z.object({
  planSummary: z.string().min(1).max(4000),
  messages: z.array(AssistantMessageSchema).max(10),
  userMessage: z.string().min(1).max(1000),
});
export type AssistantRequest = z.infer<typeof AssistantRequestSchema>;

export const AssistantResponseSchema = z.object({
  reply: z.string().min(1).max(2000),
  actions: z.array(ActionSchema).max(3),
  ai: z.enum(["enriched", "unavailable"]),
});
export type AssistantResponse = z.infer<typeof AssistantResponseSchema>;

export const ApiErrorSchema = z.object({
  error: z.string(),
  code: z.string(),
});
export type ApiError = z.infer<typeof ApiErrorSchema>;

