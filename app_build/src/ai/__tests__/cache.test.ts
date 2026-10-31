import { ResponseCache } from "../cache";

describe("ResponseCache", () => {
  it("stores and retrieves cached values", () => {
    const cache = new ResponseCache<string>(5, 1000);
    const key = cache.hash({ query: "wedding ideas" });
    cache.set(key, "cached result");
    expect(cache.get(key)).toBe("cached result");
  });

  it("returns null for missing key", () => {
    const cache = new ResponseCache<string>(5, 1000);
    expect(cache.get("non-existent")).toBeNull();
  });

  it("evicts oldest entry when max limit reached", () => {
    const cache = new ResponseCache<number>(2, 10000);
    cache.set("a", 1);
    cache.set("b", 2);
    cache.set("c", 3);
    expect(cache.get("a")).toBeNull();
    expect(cache.get("b")).toBe(2);
    expect(cache.get("c")).toBe(3);
  });

  it("expires entries past TTL", async () => {
    const cache = new ResponseCache<string>(5, 50);
    cache.set("k", "v");
    expect(cache.get("k")).toBe("v");
    await new Promise((resolve) => setTimeout(resolve, 60));
    expect(cache.get("k")).toBeNull();
  });

  it("clears all entries", () => {
    const cache = new ResponseCache<string>(5, 10000);
    cache.set("k1", "v1");
    cache.clear();
    expect(cache.get("k1")).toBeNull();
  });
});

