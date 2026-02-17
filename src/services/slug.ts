import { db } from "../lib/db"

export function toSlug(title: string, postId: number): string {
  const base = title
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
