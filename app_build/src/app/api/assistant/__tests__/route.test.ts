import { POST } from "../route";
import { callGeminiStructured } from "@/ai/gemini";
import { applyAction } from "@/engine/actions";
import { allocateBudget } from "@/engine/allocate";
import { buildTimeline } from "@/engine/timeline";
import type { Plan } from "@/engine/schemas";
import { globalLimiter } from "@/lib/rate-limit";

jest.mock("@/ai/gemini", () => ({
  callGeminiStructured: jest.fn(),
}));

describe("POST /api/assistant", () => {
  const validPayload = {
    planSummary: "Wedding with 200 guests, budget ₹10,00,000",
    messages: [{ role: "user", text: "How can I reduce catering costs?" }],
    userMessage: "Can we trim catering by 10%?",
  };

  beforeEach(() => {
    globalLimiter.reset();
    jest.clearAllMocks();
  });

  function createReq(body: unknown, headers?: Record<string, string>): Request {
    const text = typeof body === "string" ? body : JSON.stringify(body);
    return new Request("http://localhost:3000/api/assistant", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": "192.168.2.1",
        ...headers,
      },
      body: text,
    });
  }

  it("returns 200 with reply and proposed actions on success", async () => {
    const mockData = {
      reply: "You can adjust catering down to save funds.",
      actions: [{ type: "adjust_category", categoryId: "catering", newAmount: 2500000 }],
      ai: "enriched",
    };
    (callGeminiStructured as jest.Mock).mockResolvedValueOnce(mockData);

    const res = await POST(createReq(validPayload));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ai).toBe("enriched");
    expect(json.reply).toContain("catering");
    expect(json.actions.length).toBe(1);
  });

  it("returns 400 for invalid payload schema", async () => {
    const res = await POST(createReq({ bad: "format" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.code).toBe("VALIDATION_FAILED");
  });

  it("returns 413 for oversized body", async () => {
    const huge = "x".repeat(20 * 1024);
    const res = await POST(createReq({ ...validPayload, userMessage: huge }));
    expect(res.status).toBe(413);
    const json = await res.json();
    expect(json.code).toBe("PAYLOAD_TOO_LARGE");
  });

  it("returns 429 when rate limit exceeded", async () => {
    for (let i = 0; i < 10; i++) {
      (callGeminiStructured as jest.Mock).mockResolvedValueOnce(null);
      await POST(createReq(validPayload, { "x-forwarded-for": "10.10.10.10" }));
    }
    const res = await POST(createReq(validPayload, { "x-forwarded-for": "10.10.10.10" }));
    expect(res.status).toBe(429);
    const json = await res.json();
    expect(json.code).toBe("RATE_LIMIT");
  });

  it("returns fallback response when model fails or times out", async () => {
    (callGeminiStructured as jest.Mock).mockResolvedValueOnce(null);
    const res = await POST(createReq({ ...validPayload, userMessage: "Fallback unique message" }, { "x-forwarded-for": "192.168.2.99" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ai).toBe("unavailable");
    expect(json.actions).toEqual([]);
    expect(json.reply).toContain("AI assistant is unavailable");
  });

  it("proves engine rejects a mocked malicious or out-of-bounds action", () => {
    const alloc = allocateBudget({
      totalMinor: 5000000,
      preset: "birthday",
      guests: 30,
      priorities: [],
      locks: new Map(),
    });
    const time = buildTimeline({
      eventDate: "2026-10-10",
      today: "2026-05-01",
      preset: "birthday",
    });
    const plan: Plan = {
      id: "p1",
      version: 1,
      schemaVersion: 1,
      intake: {
        preset: "birthday",
        eventName: "Bday",
        eventDate: "2026-10-10",
        guests: 30,
        totalBudget: 5000000,
        cityTier: "tier-2",
        priorities: [],
        currency: "INR",
      },
      allocations: alloc.ok ? alloc.allocations : [],
      tasks: time.tasks,
      quotes: [],
      ideas: [],
      vendorGuide: null,
      feasibility: "comfortable",
      createdAt: "2026-05-01",
      updatedAt: "2026-05-01",
      ai: null,
    };

    const maliciousAction = {
      type: "adjust_category" as const,
      categoryId: "catering",
      newAmount: 999999999,
    };
    const applyRes = applyAction(plan, maliciousAction, "2026-05-02");
    expect(applyRes.ok).toBe(false);
  });
});

