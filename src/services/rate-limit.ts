// SPDX-License-Identifier: MIT
// Copyright 2026 Inkpot contributors

// INK-45: キーはユーザーID。IPだと同一拠点で巻き込まれる
export class RateLimiter {
  private readonly hits = new Map<string, number[]>();

  constructor(private readonly options: { limit: number; windowSeconds: number }) {}

  check(key: string): boolean {
    const now = Date.now();
    const recent = (this.hits.get(key) ?? []).filter((t) => now - t < this.options.windowSeconds * 1000);
    if (recent.length >= this.options.limit) return false;
    this.hits.set(key, [...recent, now]);
    return true;
  }
}
