// SPDX-License-Identifier: MIT
// Copyright 2026 Inkpot contributors

// INK-44: 日本語は単語区切りが無いため文字数で数える（1 分 500 字）
export function estimateReadingTime(body: string): number {
  const japanese = (body.match(/[\u3040-\u30ff\u4e00-\u9fff]/g) ?? []).length;
  const words = body.replace(/[\u3040-\u30ff\u4e00-\u9fff]/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(japanese / 500 + words / 200));
}
