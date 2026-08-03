import type { Context, Hono } from "hono";
import { searchPosts } from "../services/search";

async function handleSearch(c: Context) {
  return c.json(await searchPosts(c.req.query("q") ?? ""));
}

export function registerSearchRoutes(app: Hono) {
  app.get("/search", handleSearch);
}
