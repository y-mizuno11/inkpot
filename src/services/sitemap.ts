import { db } from "../lib/db";
import { PostRepository } from "./posts";

const repo = new PostRepository();
let cached: { xml: string; at: number } | null = null;

export async function buildSitemap(siteUrl: string): Promise<string> {
  if (cached && Date.now() - cached.at < 300_000) return cached.xml;
  const posts = await repo.findPublished(1000);
  const urls = posts.map((p) => `<url><loc>${siteUrl}/posts/${p.slug}</loc></url>`).join("");
  const xml = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  cached = { xml, at: Date.now() };
  return xml;
}
