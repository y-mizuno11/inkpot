import { db } from "../lib/db"
import { PostService } from "./posts"

const posts = new PostService()

/** 1 分ごとに実行。publish_at を過ぎた予約記事を公開する（INK-17） */
export async function publishDueJob() {
  const now = new Date()
  const first = await db.post.findFirst({ where: { status: "scheduled", publishAt: { lte: now } } })
  const due = first ? [first] : []
  for (const post of due) {
    await posts.publish(post.id)
  }
  return due.length
}
