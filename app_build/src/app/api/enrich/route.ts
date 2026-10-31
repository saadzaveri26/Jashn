import { NextResponse } from "next/server";
import { ResponseCache } from "@/ai/cache";
import { callGeminiStructured } from "@/ai/gemini";
import { buildEnrichPrompt, SYSTEM_PROMPT } from "@/ai/prompts";
import { getPreset } from "@/engine/presets";
import { EnrichRequestSchema, EnrichResponseSchema, type EnrichResponse, type PresetId } from "@/engine/schemas";
import { globalLimiter } from "@/lib/rate-limit";

export const maxDuration = 20;

const cache = new ResponseCache<EnrichResponse>(100, 5 * 60 * 1000);
const MAX_BYTES = 16 * 1024;

function buildFallback(preset: PresetId): EnrichResponse {
  const pData = getPreset(preset);
  return {
    ideas: pData.fallbackIdeas,
    questions: pData.fallbackQuestions,
    redFlags: pData.fallbackRedFlags,
    ai: "unavailable",
  };
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
  if (!globalLimiter.check(`enrich:${ip}`).allowed) {
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
  const parsed = EnrichRequestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request payload", code: "VALIDATION_FAILED" }, { status: 400 });
  }
  const { preset, eventName, guests, cityTier, allocations } = parsed.data;
  const key = cache.hash(parsed.data);
  const cached = cache.get(key);
  if (cached) return NextResponse.json(cached);

  const userPrompt = buildEnrichPrompt(preset, eventName, guests, cityTier, allocations);
  const aiResult = await callGeminiStructured<EnrichResponse>(SYSTEM_PROMPT, userPrompt);
  const validated = aiResult ? EnrichResponseSchema.safeParse(aiResult) : null;
  if (validated && validated.success) {
    const data: EnrichResponse = { ...validated.data, ai: "enriched" };
    cache.set(key, data);
    return NextResponse.json(data);
  }

  return NextResponse.json(buildFallback(preset));
}
