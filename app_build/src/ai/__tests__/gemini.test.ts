import { callGeminiStructured, getGeminiClient, resetGeminiClient } from "../gemini";

jest.mock("@google/genai", () => {
  return {
    GoogleGenAI: jest.fn().mockImplementation(() => ({
      models: {
        generateContent: jest.fn(),
      },
    })),
  };
});

describe("gemini client and runner", () => {
  const origKey = process.env.GEMINI_API_KEY;

  beforeEach(() => {
    resetGeminiClient();
    delete process.env.GEMINI_API_KEY;
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env.GEMINI_API_KEY = origKey;
  });

  it("returns null when GEMINI_API_KEY is unset", () => {
    expect(getGeminiClient()).toBeNull();
  });

  it("returns singleton instance when GEMINI_API_KEY is set", () => {
    process.env.GEMINI_API_KEY = "test-key";
    const c1 = getGeminiClient();
    const c2 = getGeminiClient();
    expect(c1).not.toBeNull();
    expect(c1).toBe(c2);
  });

  it("returns parsed json on successful generateContent", async () => {
    process.env.GEMINI_API_KEY = "test-key";
    const client = getGeminiClient();
    const mockGenerate = client?.models.generateContent as jest.Mock;
    mockGenerate.mockResolvedValueOnce({
      text: JSON.stringify({ reply: "Hello host", actions: [] }),
    });

    const res = await callGeminiStructured("sys", "user");
    expect(res).toEqual({ reply: "Hello host", actions: [] });
    expect(mockGenerate).toHaveBeenCalledTimes(1);
  });

  it("retries once on 500 error then succeeds", async () => {
    process.env.GEMINI_API_KEY = "test-key";
    const client = getGeminiClient();
    const mockGenerate = client?.models.generateContent as jest.Mock;
    mockGenerate
      .mockRejectedValueOnce(new Error("500 internal server error"))
      .mockResolvedValueOnce({
        text: JSON.stringify({ reply: "Recovered", actions: [] }),
      });

    const res = await callGeminiStructured("sys", "user");
    expect(res).toEqual({ reply: "Recovered", actions: [] });
    expect(mockGenerate).toHaveBeenCalledTimes(2);
  });

  it("returns null when retry also fails", async () => {
    process.env.GEMINI_API_KEY = "test-key";
    const client = getGeminiClient();
    const mockGenerate = client?.models.generateContent as jest.Mock;
    mockGenerate
      .mockRejectedValueOnce(new Error("503 service unavailable"))
      .mockRejectedValueOnce(new Error("503 service unavailable"));

    const res = await callGeminiStructured("sys", "user");
    expect(res).toBeNull();
    expect(mockGenerate).toHaveBeenCalledTimes(2);
  });

  it("returns null on non-retryable error without retrying", async () => {
    process.env.GEMINI_API_KEY = "test-key";
    const client = getGeminiClient();
    const mockGenerate = client?.models.generateContent as jest.Mock;
    mockGenerate.mockRejectedValueOnce(new Error("400 invalid argument"));

    const res = await callGeminiStructured("sys", "user");
    expect(res).toBeNull();
    expect(mockGenerate).toHaveBeenCalledTimes(1);
  });
});
