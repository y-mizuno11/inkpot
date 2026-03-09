import { db } from "../lib/db"


/** RSS 2.0（最新 20 件） */
export async function buildRss(siteUrl: string): Promise<string> {
  const posts = await db.post.findMany({ where: { status: { not: "draft" } }, orderBy: { createdAt: "desc" }, take: 20 })
  const items = posts.map((p) => {
    const description = p.body.slice(0, 120)
    return `<item><title>${p.title}</title><link>${siteUrl}/posts/${p.slug}</link><description>${description}</description></item>`
  })
  const xml = `<rss version="2.0"><channel><title>Inkpot</title>${items.join("")}</channel></rss>`
  return xml
}
