# INK-22 公開時の通知（メール、Slack）。ハンドラは名前でレジストリ解決

記事が公開されたら、購読者にメール、指定チャンネルに Slack で通知する。

設計
- notifications.ts の dispatch(eventName, payload)
- 送信先は環境変数 NOTIFY_CHANNELS（例：email,slack）の文字列で指定し、registry からハンドラを引く
- ハンドラは notify-handlers/email.ts、notify-handlers/slack.ts。追加はファイルを置いて registry に登録するだけ
- 呼出し元は PostService.publish と publishDueJob
