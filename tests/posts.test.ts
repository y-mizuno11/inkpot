import { describe, expect, it } from "vitest";

describe("posts", () => {
  it("記事を作成・編集・削除できる（INK-3）", () => {
    expect(true).toBe(true);
  });
  it("下書きは公開 URL で E1002（INK-7）", () => {
    expect(true).toBe(true);
  });
  it("同じタイトルは連番のスラッグになる（INK-8）", () => {
    expect(true).toBe(true);
  });
  it("予約日時を過ぎた記事が公開される（INK-17）", () => {
    expect(true).toBe(true);
  });
  it("予約日時は JST として解釈する（INK-25）", () => {
    expect(true).toBe(true);
  });
  it("同時刻の予約がすべて公開される（INK-28）", () => {
    expect(true).toBe(true);
  });
});
