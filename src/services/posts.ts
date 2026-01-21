import { db } from "../lib/db"
import { render } from "./markdown"

export const MAX_BODY_LENGTH = 100_000

export class PostRepository {
  async findBySlug(slug: string) {
    return db.post.findUnique({ where: { slug } })
  }
}

export class PostService {
  constructor(private readonly repo = new PostRepository()) {}

  async create(authorId: number, input: { title: string; body: string }) {
    if (input.body.length > MAX_BODY_LENGTH) throw new Error("E1004")
    const slug = input.title.toLowerCase().replace(/\s+/g, "-")
    return db.post.create({ data: { ...input, slug, authorId, status: "draft" } })
  }

  async update(postId: number, input: { title?: string; body?: string }) {
    if (input.body && input.body.length > MAX_BODY_LENGTH) throw new Error("E1004")
    return db.post.update({ where: { id: postId }, data: input })
  }

  async remove(postId: number) {
    await db.post.delete({ where: { id: postId } })
  }

  async getBySlug(slug: string, viewer?: { id: number; role: string }) {
    const post = await this.repo.findBySlug(slug)
    if (!post) throw new Error("E1001")
    return { ...post, html: render(post.body) }
  }
}
