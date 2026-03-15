# GitHub Push・PR・公開 完全手順書

- GitHub アカウント: `nonono4634`
- リポジトリ名: `hp_illust`
- 公開URL（完了後）: `https://nonono4634.github.io/hp_illust/`

---

## Step 1 — GitHub でリポジトリを作成

1. https://github.com/new を開く
2. 以下を入力して **「Create repository」** をクリック:
   - Repository name: `hp_illust`
   - Visibility: **Public**
   - ⚠️ README / .gitignore / license は **追加しない**（チェックを外す）

---

## Step 2 — Personal Access Token を発行

GitHubはパスワードによる認証を廃止しているため、トークンが必要です。

1. https://github.com/settings/tokens/new を開く
2. 以下を入力:
   - **Note**: `hp_illust deploy`
   - **Expiration**: 任意（90 days など）
   - **Scopes**: `repo` にチェック ✅
3. 「**Generate token**」をクリック
4. 表示されたトークン（`ghp_xxxxx...`）をコピー
   ⚠️ このページを閉じると二度と確認できません

---

## Step 3 — Windows で push する

PowerShell を開いて以下を順番に実行してください。
`YOUR_TOKEN` は Step 2 でコピーしたトークンに置き換えてください。

```powershell
# フォルダに移動
cd C:\Users\nono\Downloads\hp_illust

# 依存関係インストール
npm install

# トークンをURLに埋め込んでremoteを更新
git remote set-url origin https://nonono4634:YOUR_TOKEN@github.com/nonono4634/hp_illust.git

# main ブランチを push（初回ベースライン）
git push -u origin main

# feature ブランチを push（PR用）
git push -u origin feature/initial-portfolio
```

---

## Step 4 — Pull Request を作成

1. https://github.com/nonono4634/hp_illust を開く
2. 黄色いバナー **「Compare & pull request」** をクリック
3. 以下を入力して **「Create pull request」**:

**タイトル:**
```
feat: Vite React イラストポートフォリオ SPA 初回実装
```

**本文:**
```
## 概要
イラスト作品を展示するSPAポートフォリオサイトの初回実装です。

## 実装内容
- Home ページ: 全8作品をフルスクリーンスクロールで一枚ずつ表示
- Gallery ページ: カテゴリフィルター付きマソングリッド
- Lightbox: クリックで拡大表示（←→キーで前後移動）
- パーティクル背景: Canvas API による浮遊アニメーション
- CSS Modules: コンポーネントごとのスコープ付きスタイリング

## 技術スタック
- React 18 + Vite 5
- CSS Modules
- IntersectionObserver API（スクロールアニメーション）
```

4. **「Create pull request」** をクリック
5. **「Merge pull request」→「Confirm merge」** でマージ

---

## Step 5 — GitHub Pages を有効にする

PRをマージした後に設定します。

1. https://github.com/nonono4634/hp_illust/settings/pages を開く
2. **Build and deployment** セクションで:
   - Source: **GitHub Actions** を選択
3. **Save** をクリック

---

## Step 6 — 自動デプロイを確認する

mainへのマージが完了すると、GitHub Actionsが自動でビルド＆デプロイを開始します。

1. https://github.com/nonono4634/hp_illust/actions を開く
2. **「Deploy to GitHub Pages」** ワークフローが実行中または完了しているのを確認
3. 完了（✅ 緑）になったら公開完了

---

## Step 7 — 公開サイトを確認

🎉 以下のURLでサイトが公開されています:

```
https://nonono4634.github.io/hp_illust/
```

---

## セキュリティ: push完了後にトークンをURLから除去

```powershell
git remote set-url origin https://github.com/nonono4634/hp_illust.git
```

---

## ローカルで動作確認したい場合

```powershell
npm run dev
# → http://localhost:5173/hp_illust/ でプレビュー
```
