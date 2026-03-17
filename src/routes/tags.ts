import type { Context, Hono } from "hono"
import { db } from "../lib/db"
import { attachTags } from "../services/tags"

async function handleAttach(c: Context) {
  await attachTags(Number(c.req.param("id")), (await c.req.json()).tags)
  return c.json({ ok: true })
}

/** 記事一覧をタグで絞り込む（INK-13） */
export async function filterByTag(c: Context) {
  const tag = c.req.query("tag") ?? ""
  return c.json(await db.post.findMany({ where: { status: "published", tags: { some: { name: tag } } } }))
}

export function registerTagRoutes(app: Hono) {
  app.post("/posts/:id/tags", handleAttach)
  app.get("/posts", filterByTag)
}
