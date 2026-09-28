// SPDX-License-Identifier: MIT
// Copyright 2026 Inkpot contributors

// INK-48: 検索の同義語辞書（作業中）
const SYNONYMS: Record<string, string[]> = { js: ["javascript"], ts: ["typescript"], k8s: ["kubernetes"] };

export function expandSynonyms(query: string): string[] {
  return [query, ...(SYNONYMS[query.toLowerCase()] ?? [])];
}
