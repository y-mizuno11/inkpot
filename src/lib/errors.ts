// エラーコード体系（INK-6）。利用者に表示し、問い合わせはこのコードで来る
export const ERROR_MESSAGES = {
  E1001: "記事が見つかりません",
  E1002: "下書きの記事は公開 URL では表示できません",
  E1004: "本文は 100,000 字までです",
  E1005: "スラッグが重複しています",
  E2001: "タグは 5 個までです",
  E2002: "このタグ名は使えません（予約語）",
  E3001: "コメントするにはログインが必要です",
  E3004: "コメントは 2,000 字までです",
  E4001: "メールアドレスまたはパスワードが違います",
  E4003: "セッションの有効期限が切れました",
  E5001: "フィードの生成に失敗しました",
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
