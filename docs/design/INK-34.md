# INK-34 Markdown レンダラ v2（コードハイライト、表、脚注）

コードハイライト、脚注、タスクリストに対応するため、Markdown ライブラリを置き換える。

- markdown-v2.ts を新設。markdown.render は v2 を呼ぶ
- v1 の実装は markdown-v1.ts に移動（削除予定）
- 表は CommonMark/GFM 準拠。先頭パイプの省略は不可（v1 の独自前処理は廃止）
