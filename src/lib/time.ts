// INK-25: 入力はJST。UTC解釈で9時間早く公開された事故の再発防止
// 日時は必ずこのファイルの関数を通す（new Date(入力値) を直接使わない）
const JST_OFFSET_MINUTES = 9 * 60;

/** フォームの "2026-05-30T10:00" を JST として解釈する */
export function parseJstInput(value: string): Date {
  const [date, time = "00:00"] = value.split("T");
  return new Date(`${date}T${time}:00+09:00`);
}

export function nowJst(): Date {
  return new Date();
}

export function toJstLabel(date: Date): string {
  const jst = new Date(date.getTime() + JST_OFFSET_MINUTES * 60_000);
  return jst.toISOString().slice(0, 16).replace("T", " ");
}
