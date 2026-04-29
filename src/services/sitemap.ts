import { db } from "../lib/db"


export async function buildSitemap(siteUrl: string): Promise<string> {
  const posts = await db.post.findMany({ where: { status: { not: "draft" } }, take: 1000 })
  const urls = posts.map((p) => `<url><loc>${siteUrl}/posts/${p.slug}</loc></url>`).join("")
  const xml = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
  return xml
}
