// INK-15: 許可リスト方式。script や on* 属性は除去する（コメント・記事本文の両方）
const ALLOWED_TAGS = new Set(["p", "h2", "h3", "a", "code", "pre", "ul", "ol", "li", "em", "strong", "table", "tr", "td", "th"])

export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/<\/?(\w+)[^>]*>/g, (tag, name) => (ALLOWED_TAGS.has(name.toLowerCase()) ? tag : ""))
}
