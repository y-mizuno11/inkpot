import { db } from "../lib/db";
import { AppError } from "../lib/errors";

export const MAX_TAGS = 5;
const RESERVED = new Set(["admin", "draft", "new"]);

/** search.ts の indexPost もタグ名をこの関数で正規化して索引に入れる（INK-32） */
export function normalizeTag(name: string): string {
  // INK-14: 小文字化。INK-27: NFKC で濁点分離と全角を揃える
  const normalized = name.normalize("NFKC").trim().toLowerCase().replace(/\s+/g, "-");
  if (!/^[\p{L}\p{N}-]+$/u.test(normalized)) throw new AppError("E2003");
  return normalized;
}

export async function attachTags(postId: number, names: string[]) {
  if (names.length > MAX_TAGS) throw new AppError("E2001");
  const tags = names.map(normalizeTag);
  if (tags.some((t) => RESERVED.has(t))) throw new AppError("E2002");
  await db.postTag.deleteMany({ where: { postId } });
  await db.postTag.createMany({ data: tags.map((name) => ({ postId, name })) });
}

/** タグのリネーム（INK-35、管理画面） */
export async function renameTag(from: string, to: string) {
  const [oldName, newName] = [normalizeTag(from), normalizeTag(to)];
  await db.postTag.updateMany({ where: { name: oldName }, data: { name: newName } });
}
