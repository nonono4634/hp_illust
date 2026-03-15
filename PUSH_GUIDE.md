# GitHub Push & PR 手順書

## 前提条件
- GitHub アカウント: `otsuka4634`
- リポジトリ名: `hp_illust`（新規作成）
- Git インストール済み

---

## Step 1 — GitHubでリポジトリを作成

1. https://github.com/new を開く
2. 以下を入力して **「Create repository」**:
   - Repository name: `hp_illust`
   - Visibility: **Public**（GitHub Pages を使うため）
   - ⚠️ README / .gitignore / license は **追加しない**

---

## Step 2 — Windows でコマンドプロンプト/PowerShell を開く

`hp_illust` フォルダに移動:

```bash
cd C:\Users\nono\Downloads\hp_illust
```

---

## Step 3 — npm install

```bash
npm install
```

---

## Step 4 — main ブランチを push

```bash
git push -u origin main
```

> GitHub のユーザー名とパスワード（またはPersonal Access Token）を求められたら入力してください。

---

## Step 5 — feature ブランチを push

```bash
git push -u origin feature/initial-portfolio
```

---

## Step 6 — Pull Request を作成

1. https://github.com/otsuka4634/hp_illust を開く
2. 黄色いバナー「Compare & pull request」をクリック
3. 以下を入力して **「Create pull request」**:

**タイトル:**
```
feat: Vite React イラストポートフォリオ SPA 初回実装
```

**説明:**
```
## 概要
イラスト作品を展示するSPAポートフォリオサイトの初回実装です。

## 実装内容
- **Home ページ**: 全8作品をフルスクリーンスクロールで一枚ずつ表示
- **Gallery ページ**: カテゴリフィルター付きマソングリッド
- **Lightbox**: クリックで拡大表示（←→キーで前後移動）
- **パーティクル背景**: Canvas API による浮遊アニメーション
- **CSS Modules**: コンポーネントごとのスコープ付きスタイリング

## 技術スタック
- React 18 + Vite 5
- CSS Modules
- IntersectionObserver API（スクロールアニメーション）

## 動作確認
- `npm install && npm run dev` でローカル確認済み
```

---

## (オプション) Step 7 — GitHub Pages で公開

PR マージ後:

1. リポジトリの **Settings → Pages**
2. Source: **GitHub Actions**
3. 以下の `.github/workflows/deploy.yml` を追加:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

公開URL: `https://otsuka4634.github.io/hp_illust/`
