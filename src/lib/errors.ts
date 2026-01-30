// エラーコード体系（INK-6）。利用者に表示し、問い合わせはこのコードで来る
export const ERROR_MESSAGES = {
  E1001: "記事が見つかりません",
  E1004: "本文は 100,000 字までです",
  E1005: "スラッグが重複しています",
  E4001: "メールアドレスまたはパスワードが違います",
  E4003: "セッションの有効期限が切れました",
} as const

export type ErrorCode = keyof typeof ERROR_MESSAGES

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    public readonly status = 400,
  ) {
    super(ERROR_MESSAGES[code])
  }
}
