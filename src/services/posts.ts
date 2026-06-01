import { db } from "../lib/db"
import { AppError } from "../lib/errors"
import { parseJstInput } from "../lib/time"
import { render } from "./markdown"
import { ensureUniqueSlug, toSlug } from "./slug"
import { dispatch } from "./notifications"

export const MAX_BODY_LENGTH = 100_000

export class PostRepository {
  async findBySlug(slug: string) {
    return db.post.findUnique({ where: { slug }, include: { tags: true } })
  }

  // INK-26: != draft では scheduled が通る。公開済みだけを返す（feed・sitemap・一覧で共有）
  async findPublished(limit = 20) {
    return db.post.findMany({ where: { status: "published" }, orderBy: { publishedAt: "desc" }, take: limit })
  }
}

export class PostService {
  constructor(private readonly repo = new PostRepository()) {}

  async create(authorId: number, input: { title: string; body: string }) {
    if (input.body.length > MAX_BODY_LENGTH) throw new AppError("E1004")
    const slug = await ensureUniqueSlug(toSlug(input.title, Date.now()))
    return db.post.create({ data: { ...input, slug, authorId, status: "draft" } })
  }

  async update(postId: number, input: { title?: string; body?: string }) {
    if (input.body && input.body.length > MAX_BODY_LENGTH) throw new AppError("E1004")
    return db.post.update({ where: { id: postId }, data: input })
  }

  async remove(postId: number) {
    await db.post.delete({ where: { id: postId } })
  }

  async getBySlug(slug: string, viewer?: { id: number; role: string }) {
    const post = await this.repo.findBySlug(slug)
    if (!post) throw new AppError("E1001", 404)
    // INK-7: 下書きは作者と admin だけがプレビューできる
    if (post.status === "draft" && post.authorId !== viewer?.id && viewer?.role !== "admin") {
      throw new AppError("E1002", 404)
    }
    return { ...post, html: render(post.body) }
  }

  async list(page = 1) {
    return db.post.findMany({ where: { status: "published" }, orderBy: { publishedAt: "desc" }, skip: (page - 1) * 20, take: 20 })
  }

  /** 予約公開（INK-17）。過去の日時は E1003 */
  async schedule(postId: number, publishAtInput: string) {
    const publishAt = parseJstInput(publishAtInput)
    if (publishAt.getTime() <= Date.now()) throw new AppError("E1003")
    return db.post.update({ where: { id: postId }, data: { status: "scheduled", publishAt } })
  }

  async publish(postId: number) {
    const post = await db.post.update({ where: { id: postId }, data: { status: "published", publishedAt: new Date() } })
    await dispatch("post.published", post)
    return post
  }
}
