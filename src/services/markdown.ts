import { sanitizeHtml } from "./sanitize"

/** Markdown を HTML にする（v1：見出し・段落・リンク・コード） */
export function render(markdown: string): string {
  const html = markdown
    .split(/\n{2,}/)
    .map((block) => (block.startsWith("#") ? `<h2>${block.replace(/^#+\s*/, "")}</h2>` : `<p>${block}</p>`))
    .join("\n")
  return sanitizeHtml(html)
}
