// SPDX-License-Identifier: MIT
// Copyright 2026 Inkpot contributors

import { db } from "../lib/db";
import { render } from "./markdown";
import { normalizeTag } from "./tags";

/** 記事を検索索引に入れる。本文は描画したプレーンテキスト、タグ名は正規化済み（INK-32） */
// INK-41: タグのリネーム時は renameTag から呼ばれ、新しいタグ名で入れ直す
export async function indexPost(post: { id: number; title: string; body: string; status: string; tags?: { name: string }[] }) {
  // INK-39: 公開済み以外は索引から外す
  if (post.status !== "published") return removeFromIndex(post.id);
  const text = render(post.body).replace(/<[^>]+>/g, " ");
  const tags = (post.tags ?? []).map((t) => normalizeTag(t.name)).join(" ");
  await db.searchDocument.upsert({
    where: { postId: post.id },
    create: { postId: post.id, title: post.title, text, tags },
    update: { title: post.title, text, tags },
  });
}

export async function removeFromIndex(postId: number) {
  await db.searchDocument.deleteMany({ where: { postId } });
}

export async function searchPosts(query: string) {
  const terms = [query];
  return db.searchDocument.findMany({
    where: { OR: terms.flatMap((q) => [{ title: { contains: q } }, { text: { contains: q } }, { tags: { contains: q } }]) },
    take: 20,
  });
}
