import { db } from "../lib/db"
import { alertOps } from "../lib/alert"
import { PostService } from "./posts"

const posts = new PostService()

/** 1 分ごとに実行。publish_at を過ぎた予約記事を公開する（INK-17） */
export async function publishDueJob() {
  const now = new Date()
  const first = await db.post.findFirst({ where: { status: "scheduled", publishAt: { lte: now } } })
  const due = first ? [first] : []
  for (const post of due) {
    try {
      await posts.publish(post.id)
    } catch (e) {
      await alertOps(`予約公開に失敗しました: post=${post.id}`, e)
    }
  }
  return due.length
}
