// SPDX-License-Identifier: MIT
// Copyright 2026 Inkpot contributors

import { marked } from "marked";
import { highlight } from "./highlight";

/** v2 レンダラ。GFM の表・脚注・コードハイライト */
export function renderV2(markdown: string): string {
  const html = marked.parse(markdown, { gfm: true, async: false }) as string;
  return html.replace(/<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g, (_, lang: string, code: string) =>
    `<pre><code class="language-${lang}">${highlight(code, lang)}</code></pre>`,
  );
}
