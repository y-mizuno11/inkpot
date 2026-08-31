import { renderV1 } from "./markdown-v1";
import { renderV2 } from "./markdown-v2";
import { sanitizeHtml } from "./sanitize";

/** 本文を HTML にする。v2 はコードハイライト・表・脚注に対応（INK-34） */
export function render(markdown: string, rendererVersion = 2): string {
  // INK-40: v1時代の記事は表の記法が違うため renderer_version で分岐
  const html = rendererVersion === 1 ? renderV1(markdown) : renderV2(markdown);
  return sanitizeHtml(html);
}
