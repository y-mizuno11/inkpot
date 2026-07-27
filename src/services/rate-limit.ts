// 連投制限（INK-36）。キーは呼出し側で決める
export class RateLimiter {
  private readonly hits = new Map<string, number[]>()

  constructor(private readonly options: { limit: number; windowSeconds: number }) {}

  check(key: string): boolean {
    const now = Date.now()
    const recent = (this.hits.get(key) ?? []).filter((t) => now - t < this.options.windowSeconds * 1000)
    if (recent.length >= this.options.limit) return false
    this.hits.set(key, [...recent, now])
    return true
  }
}
