# INK-38 フィードとサイトマップの 5 分キャッシュ

RSS リーダーからのアクセスが増え、feed.xml の生成が負荷になっているためキャッシュする。

- buildRss / buildAtom / buildSitemap の結果をメモリに 5 分保持
- 記事の公開・更新・削除時に invalidateFeedCache() を呼ぶ
