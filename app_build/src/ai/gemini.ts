import { GoogleGenAI, type Schema } from "@google/genai";

let instance: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  if (!instance) {
    instance = new GoogleGenAI({ apiKey: key });
  }
  return instance;
}

export function resetGeminiClient(): void {
  instance = null;
}

function isRetryable(err: unknown): boolean {
  if (err instanceof Error) {
    const msg = err.message.toLowerCase();
    if (msg.includes("500") || msg.includes("503") || msg.includes("504") || msg.includes("network") || msg.includes("fetch failed") || msg.includes("econnreset")) {
      return true;
    }
  }
  return false;
}

async function withTimeout<T>(promise: Promise<T>, ms = 15000): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("Timeout")), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

export async function callGeminiStructured<T>(
  systemPrompt: string,
  userPrompt: string,
  schema?: Schema
): Promise<T | null> {
  const ai = getGeminiClient();
  if (!ai) return null;
  const invoke = async () => {
    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });
    const text = res.text;
    if (!text) throw new Error("Empty model response");
    return JSON.parse(text) as T;
  };
  try {
    return await withTimeout(invoke());
  } catch (err1) {
    if (isRetryable(err1)) {
      try {
        return await withTimeout(invoke());
      } catch {
        return null;
      }
    }
    return null;
  }
}
