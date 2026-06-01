import { db } from "../lib/db"
import { PostRepository } from "./posts"
import { estimateReadingTime } from "./reading-time"

const repo = new PostRepository()

/** RSS 2.0（最新 20 件） */
export async function buildRss(siteUrl: string): Promise<string> {
  // INK-26: != draft では scheduled が通る
  const posts = await repo.findPublished(20)
  const items = posts.map((p) => {
    const description = `約${estimateReadingTime(p.body)}分 ${p.body.slice(0, 120)}`
    return `<item><title>${p.title}</title><link>${siteUrl}/posts/${p.slug}</link><description>${description}</description></item>`
  })
  const xml = `<rss version="2.0"><channel><title>Inkpot</title>${items.join("")}</channel></rss>`
  return xml
}
