import {
  ActionSchema,
  AllocationSchema,
  ApiErrorSchema,
  AssistantRequestSchema,
  AssistantResponseSchema,
  DateStr,
  EnrichRequestSchema,
  EnrichResponseSchema,
  IdeaFitResultSchema,
  IdeaSchema,
  IntakeSchema,
  PlanSchema,
  QuoteComparisonSchema,
  QuoteSchema,
  TaskSchema,
  VendorGuideSchema,
} from "../schemas";

describe("schemas", () => {
  it("validates DateStr format", () => {
    expect(DateStr.safeParse("2026-12-31").success).toBe(true);
    expect(DateStr.safeParse("31-12-2026").success).toBe(false);
    expect(DateStr.safeParse("invalid").success).toBe(false);
  });

  it("validates IntakeSchema", () => {
    const valid = {
      preset: "wedding",
      eventName: "Rohan & Sneha",
      eventDate: "2026-11-20",
      guests: 250,
      totalBudget: 15000000,
      cityTier: "tier-1",
      priorities: ["venue", "catering"],
      currency: "INR",
    };
    expect(IntakeSchema.safeParse(valid).success).toBe(true);

    const invalidBudget = { ...valid, totalBudget: 0 };
    expect(IntakeSchema.safeParse(invalidBudget).success).toBe(false);

    const invalidGuests = { ...valid, guests: 20000 };
    expect(IntakeSchema.safeParse(invalidGuests).success).toBe(false);
  });

  it("validates ActionSchema discriminated union", () => {
    const actAdjust = { type: "adjust_category", categoryId: "venue", newAmount: 1000 };
    const actTask = { type: "add_task", title: "Task 1", categoryId: "venue", leadDays: 10 };
    const actGuests = { type: "set_guest_count", guests: 100 };
    const actBad = { type: "delete_everything" };

    expect(ActionSchema.safeParse(actAdjust).success).toBe(true);
    expect(ActionSchema.safeParse(actTask).success).toBe(true);
    expect(ActionSchema.safeParse(actGuests).success).toBe(true);
    expect(ActionSchema.safeParse(actBad).success).toBe(false);
  });

  it("validates TaskSchema and QuoteSchema", () => {
    const task = {
      id: "t1",
      title: "Book DJ",
      categoryId: "music",
      due: "2026-10-01",
      done: false,
      leadDays: 30,
      atRisk: false,
      compressed: false,
    };
    expect(TaskSchema.safeParse(task).success).toBe(true);

    const quote = {
      id: "q1",
      categoryId: "catering",
      vendorName: "Royal Caterers",
      amount: 4500000,
      notes: "Includes live chaat",
      addedOn: "2026-06-01",
    };
    expect(QuoteSchema.safeParse(quote).success).toBe(true);
  });

  it("validates Enrich and Assistant schemas", () => {
    const enrichReq = {
      preset: "birthday",
      allocations: [
        { categoryId: "cake", label: "Cake", amount: 100000, weight: 0.1, locked: false, pct: 10 },
      ],
      guests: 30,
      cityTier: "tier-2",
      eventName: "Riya 5th Birthday",
    };
    expect(EnrichRequestSchema.safeParse(enrichReq).success).toBe(true);

    const enrichRes = {
      ideas: [{ title: "Idea 1", description: "Desc 1", categoryId: "cake", costBand: "low" }],
      questions: [{ categoryId: "cake", question: "Can you do fondant?" }],
      redFlags: [{ categoryId: "cake", flag: "No delivery van" }],
      ai: "enriched",
    };
    expect(EnrichResponseSchema.safeParse(enrichRes).success).toBe(true);

    const asstReq = {
      planSummary: "Sample plan summary",
      messages: [{ role: "user", text: "Help me save money" }],
      userMessage: "Can we reduce catering?",
    };
    expect(AssistantRequestSchema.safeParse(asstReq).success).toBe(true);

    const asstRes = {
      reply: "You can lock catering to a lower amount.",
      actions: [{ type: "adjust_category", categoryId: "catering", newAmount: 2000000 }],
      ai: "enriched",
    };
    expect(AssistantResponseSchema.safeParse(asstRes).success).toBe(true);
  });

  it("validates ApiErrorSchema", () => {
    expect(ApiErrorSchema.safeParse({ error: "Failed", code: "SERVER_ERROR" }).success).toBe(true);
    expect(ApiErrorSchema.safeParse({ message: "Failed" }).success).toBe(false);
  });
});

