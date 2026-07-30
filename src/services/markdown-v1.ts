/** 旧レンダラ（v1）。renderer_version = 1 の記事が約 120 件残っているため削除しない（INK-40） */
export function renderV1(markdown: string): string {
  return markdown
    .split(/\n{2,}/)
    .map((block) => (block.startsWith("#") ? `<h2>${block.replace(/^#+\s*/, "")}</h2>` : `<p>${block}</p>`))
    .join("\n")
}
