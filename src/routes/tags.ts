import type { Context, Hono } from "hono"
import { db } from "../lib/db"
import { attachTags } from "../services/tags"

async function handleAttach(c: Context) {
  await attachTags(Number(c.req.param("id")), (await c.req.json()).tags)
  return c.json({ ok: true })
}

export function registerTagRoutes(app: Hono) {
  app.post("/posts/:id/tags", handleAttach)
}
