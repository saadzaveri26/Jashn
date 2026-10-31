import { NextResponse } from "next/server";
import { ResponseCache } from "@/ai/cache";
import { callGeminiStructured } from "@/ai/gemini";
import { buildAssistantPrompt, SYSTEM_PROMPT } from "@/ai/prompts";
import { AssistantRequestSchema, AssistantResponseSchema, type AssistantResponse } from "@/engine/schemas";
import { globalLimiter } from "@/lib/rate-limit";

export const maxDuration = 20;

const cache = new ResponseCache<AssistantResponse>(100, 5 * 60 * 1000);
const MAX_BYTES = 16 * 1024;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
  if (!globalLimiter.check(`assistant:${ip}`).allowed) {
    return NextResponse.json({ error: "Rate limit exceeded", code: "RATE_LIMIT" }, { status: 429 });
  }
  const rawText = await req.text();
  if (Buffer.byteLength(rawText, "utf8") > MAX_BYTES) {
    return NextResponse.json({ error: "Payload exceeds size limit", code: "PAYLOAD_TOO_LARGE" }, { status: 413 });
  }
  let json: unknown;
  try {
    json = JSON.parse(rawText);
  } catch {
    return NextResponse.json({ error: "Malformed JSON", code: "MALFORMED_JSON" }, { status: 400 });
  }
  const parsed = AssistantRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request payload", code: "VALIDATION_FAILED" }, { status: 400 });
  }
  const { planSummary, messages, userMessage } = parsed.data;
  const key = cache.hash(parsed.data);
  const cached = cache.get(key);
  if (cached) return NextResponse.json(cached);

  const userPrompt = buildAssistantPrompt(planSummary, messages, userMessage);
  const aiResult = await callGeminiStructured<AssistantResponse>(SYSTEM_PROMPT, userPrompt);
  const validated = aiResult ? AssistantResponseSchema.safeParse(aiResult) : null;
  if (validated && validated.success) {
    const data: AssistantResponse = { ...validated.data, ai: "enriched" };
    cache.set(key, data);
    return NextResponse.json(data);
  }

  const fallback: AssistantResponse = {
    reply: "AI assistant is unavailable. Your plan tools still work — adjust budgets, add tasks, and compare quotes without AI.",
    actions: [],
    ai: "unavailable",
  };
  return NextResponse.json(fallback);
}
