import type { Context, Hono } from "hono";
import { db } from "../lib/db";
import { AppError } from "../lib/errors";
import { attachTags, normalizeTag, renameTag } from "../services/tags";

async function handleAttach(c: Context) {
  try {
    await attachTags(Number(c.req.param("id")), (await c.req.json()).tags);
  } catch (e) {
    // INK-16: 上限超過の文言（E2001）をフォームに出す
    if (e instanceof AppError) return c.json({ error: e.code, message: e.message }, 400);
    throw e;
  }
  return c.json({ ok: true });
}

/** 記事一覧をタグで絞り込む（INK-13） */
export async function filterByTag(c: Context) {
  const tag = normalizeTag(c.req.query("tag") ?? "");
  return c.json(await db.post.findMany({ where: { status: "published", tags: { some: { name: tag } } } }));
}

async function handleRename(c: Context) {
  const { from, to } = await c.req.json();
  await renameTag(from, to);
  return c.json({ ok: true });
}

export function registerTagRoutes(app: Hono) {
  app.post("/posts/:id/tags", handleAttach);
  app.get("/posts", filterByTag);
  app.post("/admin/tags/rename", handleRename);
}
