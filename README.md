# Illustration Portfolio

オリジナルイラストを展示するSPAポートフォリオサイトです。

## 技術スタック

- **React 18** + **Vite 5**
- **CSS Modules** — スコープ付きスタイリング
- **IntersectionObserver** — スクロール連動アニメーション
- **Canvas API** — パーティクル背景

## ページ構成

| ページ | 説明 |
|--------|------|
| Home | 全イラストをフルスクリーンスクロールで表示 |
| Gallery | カテゴリフィルター付きマソングリッド |

## セットアップ

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

## GitHub Pages へのデプロイ

`vite.config.js` の `base` を `/hp_illust/` に設定済みです。
