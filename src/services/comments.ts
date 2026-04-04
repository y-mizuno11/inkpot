import { db } from "../lib/db"
import { AppError } from "../lib/errors"
import { sanitizeHtml } from "./sanitize"

export const MAX_COMMENT_LENGTH = 2_000

export async function createComment(postId: number, user: { id: number } | null, body: string, ip: string) {
  if (!user) throw new AppError("E3001", 401)
  if (body.length > MAX_COMMENT_LENGTH) throw new AppError("E3004")
  const html = sanitizeHtml(body)
  return db.comment.create({ data: { postId, userId: user.id, body: html } })
}

export async function listComments(postId: number) {
  return db.comment.findMany({ where: { postId }, orderBy: { createdAt: "asc" } })
}

export async function countComments(postId: number) {
  return db.comment.count({ where: { postId } })
}
