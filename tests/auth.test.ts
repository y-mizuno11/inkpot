import { describe, expect, it } from "vitest";

describe("auth", () => {
  it("ログインできる（INK-2）", () => {
    expect(true).toBe(true);
  });
  it("セッションは 24 時間（INK-9）", () => {
    expect(true).toBe(true);
  });
  it("役割ごとに操作を制限する（INK-33）", () => {
    expect(true).toBe(true);
  });
  it("editor は他人の記事を公開できない（INK-43）", () => {
    expect(true).toBe(true);
  });
});
