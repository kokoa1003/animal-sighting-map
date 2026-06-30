# Lyric Reader

貼り付けた英語歌詞を、単語やフレーズごとにタップして日本語の意味を確認できる無料のWebアプリです。

## 特徴

- AI API、課金API、ログイン、データベースは使いません。
- アプリ側で歌詞を取得・配信・保存しません。
- 入力された歌詞はブラウザ画面上だけで処理します。
- 熟語は単語より先に検出し、長い熟語を優先します。
- 英和辞書は `dictionary.json` としてローカルに置いています。現在は45,000語以上を収録しています。

## 起動方法

```bash
python3 -m http.server 5173
```

ブラウザで `http://127.0.0.1:5173/` を開いてください。

## 辞書生成

開発時だけ `harurow-ejdict` を使って `dictionary.json` を生成できます。`harurow-ejdict` は PUBLIC DOMAIN の `ejdic-hand` を元にした英和辞書です。

```bash
pnpm add -D harurow-ejdict
node tools/build-dictionary.mjs
```
