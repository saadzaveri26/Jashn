type RateRecord = {
  timestamps: number[];
};

export class MemoryRateLimiter {
  private records = new Map<string, RateRecord>();
  private limit: number;
  private windowMs: number;

  constructor(limit = 10, windowMs = 60000) {
    this.limit = limit;
    this.windowMs = windowMs;
  }

  check(key: string): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const record = this.records.get(key) ?? { timestamps: [] };
    const valid = record.timestamps.filter((t) => now - t < this.windowMs);
    if (valid.length >= this.limit) {
      this.records.set(key, { timestamps: valid });
      return { allowed: false, remaining: 0 };
    }
    valid.push(now);
    this.records.set(key, { timestamps: valid });
    return { allowed: true, remaining: this.limit - valid.length };
  }

  reset(): void {
    this.records.clear();
  }
}

export const globalLimiter = new MemoryRateLimiter(10, 60000);

