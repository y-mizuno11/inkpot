// SPDX-License-Identifier: MIT
// Copyright 2026 Inkpot contributors

import type { Context, Hono } from "hono";
import { PostService } from "../services/posts";
import { can } from "../services/roles";
import { AppError } from "../lib/errors";
import { PostView } from "../views/post";

const posts = new PostService();

async function showPost(c: Context) {
  const post = await posts.getBySlug(c.req.param("slug") ?? "", c.get("user"));
  return c.html(PostView({ post }));
}

async function handleUpdate(c: Context) {
  const post = await posts.getBySlug(c.req.param("slug") ?? "", c.get("user"));
  if (!can(c.get("user"), "edit", post)) throw new AppError("E4002", 403);
  const input = await c.req.json();
  return c.json(await posts.update(Number(c.req.param("id")), input));
}

async function handlePublish(c: Context) {
  // INK-43: 公開できるかは roles.ts の can に集約（editor の抜け穴を塞いだ）
  const post = await posts.getBySlug(c.req.param("slug") ?? "", c.get("user"));
  if (!can(c.get("user"), "publish", post)) throw new AppError("E4002", 403);
  return c.json(await posts.publish(Number(c.req.param("id"))));
}

export function registerPostRoutes(app: Hono) {
  app.get("/posts/:slug", showPost);
  app.put("/posts/:id", handleUpdate);
  app.post("/posts/:id/publish", handlePublish);
}
