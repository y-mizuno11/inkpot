import { renderV1 } from "./markdown-v1";
import { renderV2 } from "./markdown-v2";
import { sanitizeHtml } from "./sanitize";

/** 本文を HTML にする。v2 はコードハイライト・表・脚注に対応（INK-34） */
export function render(markdown: string, rendererVersion = 2): string {
  const html = renderV2(markdown);
  return sanitizeHtml(html);
}
