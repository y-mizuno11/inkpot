import { db } from "../lib/db";
import { PostRepository } from "./posts";
import { estimateReadingTime } from "./reading-time";
import { config } from "../config";

const repo = new PostRepository();
let cache: { xml: string; at: number } | null = null;

/** RSS 2.0（最新 20 件） */
export async function buildRss(siteUrl: string): Promise<string> {
  if (cache && Date.now() - cache.at < config.feed.cacheSeconds * 1000) return cache.xml;
  // INK-26: != draft では scheduled が通る
  const posts = await repo.findPublished(20);
  const items = posts.map((p) => {
    const description = `約${estimateReadingTime(p.body)}分 ${p.body.slice(0, 120)}`;
    return `<item><title>${p.title}</title><link>${siteUrl}/posts/${p.slug}</link><description>${description}</description></item>`;
  });
  const xml = `<rss version="2.0"><channel><title>Inkpot</title>${items.join("")}</channel></rss>`;
  cache = { xml, at: Date.now() };
  return xml;
}

/** 記事の公開（INK-38）とタグのリネーム（INK-42）で呼ぶ */
export function invalidateFeedCache() {
  cache = null;
}
