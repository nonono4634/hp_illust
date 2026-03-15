# Vercel デプロイ完全手順書

- GitHub アカウント: `nonono4634`
- リポジトリ名: `hp_illust`
- 公開URL（完了後）: `https://hp-illust.vercel.app`（またはVercelが自動生成するURL）

---

## ⚠️ 事前準備（まだ push していない場合）

GitHubにすでにリポジトリ・コードが push 済みであることが前提です。
まだの場合は `PUSH_GUIDE.md` の **Step 1〜3** を先に完了させてください。

---

## Step 1 — 最新コードを GitHub に push する

PowerShell を開いて以下を実行してください。
`YOUR_TOKEN` は GitHub の Personal Access Token（PAT）に置き換えてください。

```powershell
cd C:\Users\nono\Downloads\hp_illust

# トークンをURLに埋め込んでremoteを更新
git remote set-url origin https://nonono4634:YOUR_TOKEN@github.com/nonono4634/hp_illust.git

# feature ブランチを push
git push -u origin feature/initial-portfolio

# main ブランチも push
git checkout main
git push -u origin main

# セキュリティ: push完了後にトークンをURLから除去
git remote set-url origin https://github.com/nonono4634/hp_illust.git
```

---

## Step 2 — main ブランチに最新変更をマージする

Vercel は **main ブランチ** を参照してデプロイします。
feature ブランチの変更を main にマージしてください。

### 方法A：GitHub でマージ（推奨）

1. https://github.com/nonono4634/hp_illust を開く
2. 黄色いバナー **「Compare & pull request」** をクリック
3. タイトル・本文を入力して **「Create pull request」**
4. **「Merge pull request」→「Confirm merge」** でマージ

### 方法B：PowerShell でローカルマージ

```powershell
cd C:\Users\nono\Downloads\hp_illust

git checkout main
git merge feature/initial-portfolio

# トークン付きでpush
git remote set-url origin https://nonono4634:YOUR_TOKEN@github.com/nonono4634/hp_illust.git
git push origin main

# トークン除去
git remote set-url origin https://github.com/nonono4634/hp_illust.git
```

---

## Step 3 — Vercel に登録・ログイン

1. https://vercel.com を開く
2. 右上の **「Sign Up」** をクリック
3. **「Continue with GitHub」** を選択
4. GitHubの認証画面が表示されたら **「Authorize Vercel」** をクリック
5. ログイン完了 → Vercelダッシュボードが開く

---

## Step 4 — プロジェクトをインポート

1. ダッシュボード右上の **「Add New...」→「Project」** をクリック
2. **「Import Git Repository」** セクションに `hp_illust` が表示される
3. 表示されない場合は **「Adjust GitHub App Permissions」** からリポジトリへのアクセスを許可
4. `hp_illust` の右の **「Import」** をクリック

---

## Step 5 — デプロイ設定

以下の設定を確認します（基本はそのままでOK）：

| 項目 | 設定値 |
|------|--------|
| Framework Preset | **Vite** （自動検出される） |
| Root Directory | `.`（そのまま） |
| Build Command | `npm run build`（自動入力） |
| Output Directory | `dist`（自動入力） |
| Install Command | `npm install`（自動入力） |

設定確認後、**「Deploy」** ボタンをクリック

---

## Step 6 — デプロイ完了を確認

1. デプロイが開始されます（1〜2分かかります）
2. ビルドログが流れて **「Congratulations!」** と表示されたら成功
3. 公開URLが表示されます：
   ```
   https://hp-illust-xxxxxxxxx.vercel.app
   ```

---

## Step 7 — 公開サイトを確認

🎉 表示されたURLをブラウザで開いてサイトを確認してください。

---

## Step 8 — カスタムドメインを設定する（任意）

Vercelでは独自ドメインを無料で設定できます。

1. プロジェクトダッシュボード → **「Settings」→「Domains」**
2. 使いたいドメインを入力して **「Add」**
3. 表示されたDNSレコードをドメイン管理サービスに設定

---

## 今後の更新方法

コードを変更して GitHub に push するだけで **自動デプロイ**されます。

```powershell
cd C:\Users\nono\Downloads\hp_illust

# 変更をコミット
git add .
git commit -m "update: 変更内容を記述"

# トークン付きでpush
git remote set-url origin https://nonono4634:YOUR_TOKEN@github.com/nonono4634/hp_illust.git
git push origin main

# トークン除去
git remote set-url origin https://github.com/nonono4634/hp_illust.git
```

Vercel が main への push を検知して自動でビルド・デプロイします。

---

## トラブルシューティング

### ビルドエラーが出た場合

Vercel ダッシュボード → プロジェクト → **「Deployments」** タブでエラーログを確認できます。

### 画像が表示されない場合

`public/images/` フォルダに8枚のPNGが正しく入っているか確認してください。

### ページが白くなる場合

`vercel.json` が正しくアップロードされているか確認してください。
`vercel.json` の中身：
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
