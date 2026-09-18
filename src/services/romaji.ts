// SPDX-License-Identifier: MIT
// Copyright 2026 Inkpot contributors

import { toRomaji as convert } from "wanakana";

export function toRomaji(text: string): string {
  return convert(text);
}
