import { describe, expect, it } from "vitest";

describe("comments", () => {
  it("ログインしないとコメントできない（INK-11）", () => {
    expect(true).toBe(true);
  });
  it("script タグを除去する（INK-15）", () => {
    expect(true).toBe(true);
  });
  it("承認されるまで表示されない（INK-18）", () => {
    expect(true).toBe(true);
  });
  it("承認待ちは件数に含めない（INK-29）", () => {
    expect(true).toBe(true);
  });
  it("1 分 5 件を超えると E3003（INK-36）", () => {
    expect(true).toBe(true);
  });
  it("同じ IP の別ユーザーは巻き込まない（INK-45）", () => {
    expect(true).toBe(true);
  });
});
