import { db } from "../lib/db";
import { AppError } from "../lib/errors";
import { sanitizeHtml } from "./sanitize";
import { RateLimiter } from "./rate-limit";

export const MAX_COMMENT_LENGTH = 2_000;
const limiter = new RateLimiter({ limit: 5, windowSeconds: 60 });

export async function createComment(postId: number, user: { id: number } | null, body: string, ip: string) {
  if (!user) throw new AppError("E3001", 401);
  if (body.length > MAX_COMMENT_LENGTH) throw new AppError("E3004");
  if (!limiter.check(`user:${user.id}`)) throw new AppError("E3003", 429);
  const html = sanitizeHtml(body);
  return db.comment.create({ data: { postId, userId: user.id, body: html, status: "pending" } });
}

export async function listComments(postId: number) {
  return db.comment.findMany({ where: { postId, status: "approved" }, orderBy: { createdAt: "asc" } });
}

export async function countComments(postId: number) {
  // INK-29: 承認待ちは数えない
  return db.comment.count({ where: { postId, status: "approved" } });
}

/** editor 以上が承認する（INK-18） */
export async function approveComment(commentId: number) {
  return db.comment.update({ where: { id: commentId }, data: { status: "approved" } });
}
