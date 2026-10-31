import { createHash } from "crypto";

type CacheEntry<T> = {
  value: T;
  expires: number;
};

export class ResponseCache<T> {
  private store = new Map<string, CacheEntry<T>>();
  private max: number;
  private ttlMs: number;

  constructor(max = 100, ttlMs = 5 * 60 * 1000) {
    this.max = max;
    this.ttlMs = ttlMs;
  }

  hash(data: unknown): string {
    return createHash("sha256").update(JSON.stringify(data)).digest("hex");
  }

  get(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expires) {
      this.store.delete(key);
      return null;
    }
    this.store.delete(key);
    this.store.set(key, entry);
    return entry.value;
  }

  set(key: string, value: T): void {
    if (this.store.size >= this.max) {
      const oldest = this.store.keys().next().value;
      if (oldest) this.store.delete(oldest);
    }
    this.store.set(key, { value, expires: Date.now() + this.ttlMs });
  }

  clear(): void {
    this.store.clear();
  }
}

