import type { Context, Hono } from "hono"
import { buildRss } from "../services/feed"

async function handleFeed(c: Context) {
  return c.body(await buildRss(new URL(c.req.url).origin), 200, { "Content-Type": "application/rss+xml" })
}

export function registerFeedRoutes(app: Hono) {
  app.get("/feed.xml", handleFeed)
}
