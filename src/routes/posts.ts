import type { Context, Hono } from "hono"
import { PostService } from "../services/posts"
import { PostView } from "../views/post"

const posts = new PostService()

async function showPost(c: Context) {
  const post = await posts.getBySlug(c.req.param("slug") ?? "", c.get("user"))
  return c.html(PostView({ post }))
}

async function handleUpdate(c: Context) {
  const input = await c.req.json()
  return c.json(await posts.update(Number(c.req.param("id")), input))
}

async function handlePublish(c: Context) {
  return c.json(await posts.publish(Number(c.req.param("id"))))
}

export function registerPostRoutes(app: Hono) {
  app.get("/posts/:slug", showPost)
  app.put("/posts/:id", handleUpdate)
  app.post("/posts/:id/publish", handlePublish)
}
