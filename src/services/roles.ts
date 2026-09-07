export type Role = "admin" | "editor" | "author" | "reader";
export type Action = "edit" | "publish" | "approve-comment" | "manage-tags";

/** 役割ごとにできること（INK-33） */
export function can(user: { id: number; role: Role }, action: Action, post?: { authorId: number }): boolean {
  if (user.role === "admin") return true;
  const own = post?.authorId === user.id;
  switch (action) {
    case "edit":
      return own || user.role === "editor";
    case "publish":
      // INK-43: editor でも公開は自分の記事だけ
      return own && user.role !== "reader";
    case "approve-comment":
      return user.role === "editor";
    default:
      return false;
  }
}
