import { db } from "../lib/db"
import { toRomaji } from "./romaji"

export function toSlug(title: string, postId: number): string {
  // INK-23: 日本語タイトルはローマ字化。変換できなければ記事 ID
  const base = toRomaji(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
  return base || String(postId)
}

/** INK-8: 重複したら -2、-3 と連番を付ける */
export async function ensureUniqueSlug(slug: string): Promise<string> {
  let candidate = slug
  for (let n = 2; await db.post.findUnique({ where: { slug: candidate } }); n++) {
    candidate = `${slug}-${n}`
  }
  return candidate
}
