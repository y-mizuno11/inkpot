// SPDX-License-Identifier: MIT
// Copyright 2026 Inkpot contributors

import hljs from "highlight.js";

export function highlight(code: string, lang: string) {
  return hljs.getLanguage(lang) ? hljs.highlight(code, { language: lang }).value : code;
}
