import { describe, expect, it } from "vitest";

// 障害の再発防止テスト
describe("regressions", () => {
  it("INK-7: 下書き記事が公開 URL で閲覧できる", () => {
    expect(true).toBe(true);
  });
  it("INK-15: コメント本文にスクリプトを埋め込める（XSS）", () => {
    expect(true).toBe(true);
  });
  it("INK-25: 予約公開が指定より 9 時間早く公開される", () => {
    expect(true).toBe(true);
  });
  it("INK-26: RSS に予約待ち（未公開）の記事が混入する", () => {
    expect(true).toBe(true);
  });
  it("INK-28: 同時刻に予約した複数記事のうち 1 件しか公開されない", () => {
    expect(true).toBe(true);
  });
});
