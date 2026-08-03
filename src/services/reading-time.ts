/** 読了時間（分）。英語の単語数 ÷ 200 */
export function estimateReadingTime(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
