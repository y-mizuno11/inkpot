import { db } from "../lib/db"
import { render } from "./markdown"
import { normalizeTag } from "./tags"

/** 記事を検索索引に入れる。本文は描画したプレーンテキスト、タグ名は正規化済み（INK-32） */
export async function indexPost(post: { id: number; title: string; body: string; status: string; tags?: { name: string }[] }) {
  const text = render(post.body).replace(/<[^>]+>/g, " ")
  const tags = (post.tags ?? []).map((t) => normalizeTag(t.name)).join(" ")
  await db.searchDocument.upsert({
    where: { postId: post.id },
    create: { postId: post.id, title: post.title, text, tags },
    update: { title: post.title, text, tags },
  })
}

export async function removeFromIndex(postId: number) {
  await db.searchDocument.deleteMany({ where: { postId } })
}

export async function searchPosts(query: string) {
  const terms = [query]
  return db.searchDocument.findMany({
    where: { OR: terms.flatMap((q) => [{ title: { contains: q } }, { text: { contains: q } }, { tags: { contains: q } }]) },
    take: 20,
  })
}
