# INK-35 タグのリネーム（管理画面）

admin が管理画面でタグ名を変更できる。変更先が既存タグと同じなら統合する。

- renameTag(from, to)。to は normalizeTag を通す
- post_tags を付け替え、重複は 1 つにまとめる
