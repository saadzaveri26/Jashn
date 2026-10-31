import { MemoryRateLimiter } from "../rate-limit";

describe("MemoryRateLimiter", () => {
  it("allows requests under the limit", () => {
    const limiter = new MemoryRateLimiter(3, 1000);
    expect(limiter.check("ip-1").allowed).toBe(true);
    expect(limiter.check("ip-1").allowed).toBe(true);
    expect(limiter.check("ip-1").allowed).toBe(true);
  });

  it("blocks requests exceeding the limit", () => {
    const limiter = new MemoryRateLimiter(2, 1000);
    expect(limiter.check("ip-2").allowed).toBe(true);
    expect(limiter.check("ip-2").allowed).toBe(true);
    const blocked = limiter.check("ip-2");
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it("tracks different keys independently", () => {
    const limiter = new MemoryRateLimiter(1, 1000);
    expect(limiter.check("user-a").allowed).toBe(true);
    expect(limiter.check("user-b").allowed).toBe(true);
    expect(limiter.check("user-a").allowed).toBe(false);
    expect(limiter.check("user-b").allowed).toBe(false);
  });

  it("resets limits when window passes", async () => {
    const limiter = new MemoryRateLimiter(1, 50);
    expect(limiter.check("client").allowed).toBe(true);
    expect(limiter.check("client").allowed).toBe(false);
    await new Promise((r) => setTimeout(r, 60));
    expect(limiter.check("client").allowed).toBe(true);
  });
});

