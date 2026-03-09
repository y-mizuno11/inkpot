import { db } from "../lib/db"
import { AppError } from "../lib/errors"

export const MAX_TAGS = 5
const RESERVED = new Set(["admin", "draft", "new"])

export async function attachTags(postId: number, names: string[]) {
  if (names.length > MAX_TAGS) throw new AppError("E2001")
  const tags = names.map((n) => n.trim())
  if (tags.some((t) => RESERVED.has(t))) throw new AppError("E2002")
  await db.postTag.deleteMany({ where: { postId } })
  await db.postTag.createMany({ data: tags.map((name) => ({ postId, name })) })
}
