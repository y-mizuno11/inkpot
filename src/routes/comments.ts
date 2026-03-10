import type { Context, Hono } from "hono"
import { createComment, listComments } from "../services/comments"

async function handleCreateComment(c: Context) {
  const { body } = await c.req.json()
  const ip = c.req.header("x-forwarded-for") ?? "unknown"
  return c.json(await createComment(Number(c.req.param("id")), c.get("user"), body, ip))
}

async function handleListComments(c: Context) {
  return c.json(await listComments(Number(c.req.param("id"))))
}

export function registerCommentRoutes(app: Hono) {
  app.post("/posts/:id/comments", handleCreateComment)
  app.get("/posts/:id/comments", handleListComments)
}
