import { db } from "../lib/db"
import { nowJst } from "../lib/time"
import { alertOps } from "../lib/alert"
import { PostService } from "./posts"

const posts = new PostService()

/** 1 分ごとに実行。publish_at を過ぎた予約記事を公開する（INK-17） */
export async function publishDueJob() {
  const now = nowJst()
  // INK-28: 同時刻の予約が複数あるため take: 50
  const due = await db.post.findMany({ where: { status: "scheduled", publishAt: { lte: now } }, take: 50 })
  for (const post of due) {
    try {
      await posts.publish(post.id)
    } catch (e) {
      await alertOps(`予約公開に失敗しました: post=${post.id}`, e)
    }
  }
  return due.length
}
