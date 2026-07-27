// エラーコード体系（INK-6）。利用者に表示し、問い合わせはこのコードで来る
export const ERROR_MESSAGES = {
  E1001: "記事が見つかりません",
  E1002: "下書きの記事は公開 URL では表示できません",
  E1003: "予約公開の日時が過去です",
  E1004: "本文は 100,000 字までです",
  E1005: "スラッグが重複しています",
  E2001: "タグは 5 個までです",
  E2002: "このタグ名は使えません（予約語）",
  E2003: "タグ名に使えない文字が含まれています",
  E3001: "コメントするにはログインが必要です",
  E3002: "コメントは承認待ちです",
  E3003: "短時間に多くのコメントが投稿されました。1 分ほど待ってから再度お試しください",
  E3004: "コメントは 2,000 字までです",
  E4001: "メールアドレスまたはパスワードが違います",
  E4002: "この操作の権限がありません",
  E4003: "セッションの有効期限が切れました",
  E5001: "フィードの生成に失敗しました",
  E6001: "画像は 5MB までです",
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
