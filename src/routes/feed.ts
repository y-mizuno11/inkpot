import type { Context, Hono } from "hono";
import { buildRss } from "../services/feed";
import { buildSitemap } from "../services/sitemap";

async function handleFeed(c: Context) {
  return c.body(await buildRss(new URL(c.req.url).origin), 200, { "Content-Type": "application/rss+xml" });
}

async function handleSitemap(c: Context) {
  return c.body(await buildSitemap(new URL(c.req.url).origin), 200, { "Content-Type": "application/xml" });
}

export function registerFeedRoutes(app: Hono) {
  app.get("/feed.xml", handleFeed);
  app.get("/sitemap.xml", handleSitemap);
}
