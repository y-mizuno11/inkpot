import { db } from "../lib/db"
import { AppError } from "../lib/errors"
import { render } from "./markdown"
import { ensureUniqueSlug, toSlug } from "./slug"

export const MAX_BODY_LENGTH = 100_000

export class PostRepository {
  async findBySlug(slug: string) {
    return db.post.findUnique({ where: { slug } })
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
    return db.post.findMany({ where: { status: { not: "draft" } }, orderBy: { createdAt: "desc" }, skip: (page - 1) * 20, take: 20 })
  }
}
