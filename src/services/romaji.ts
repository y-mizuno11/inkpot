import { toRomaji as convert } from "wanakana";

export function toRomaji(text: string): string {
  return convert(text);
}
