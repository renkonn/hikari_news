# ひかりニュース — Hikari News

ポジティブなニュースだけを集め、Claude AI がリアルタイムでスコアリングするニュースサイト。

## 構成

```
hikari-news/
├── public/
│   └── index.html      # フロントエンド (HTML/CSS/JS)
├── api/
│   └── score.js        # Vercel Edge Function (APIキーを安全に隠す)
├── vercel.json         # Vercel ルーティング設定
└── README.md
```

## Vercel へのデプロイ手順

### 1. GitHubにリポジトリを作成

1. https://github.com/new でリポジトリを作成（例: `hikari-news`）
2. このフォルダの中身を全部プッシュ

```bash
git init
git add .
git commit -m "初回コミット"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/hikari-news.git
git push -u origin main
```

### 2. Vercel にデプロイ

1. https://vercel.com にアクセス → GitHubでログイン
2. "New Project" → 作ったリポジトリを選択
3. **Environment Variables** に以下を追加:
   - Key: `ANTHROPIC_API_KEY`
   - Value: あなたの Anthropic APIキー（https://console.anthropic.com/keys）
4. "Deploy" を押す → 数秒で完了 🎉

### 3. カスタムドメイン（任意）

Vercel の Project Settings → Domains から独自ドメインを設定できます。

## コスト目安

- Vercel: 無料プラン (月100GBまで)
- Claude Haiku API: 1記事スコアリング ≈ $0.0002 (約¥0.03)
- 月1,000回ボタン押下でも ≈ ¥240/月

## 今後の改善アイデア

- [ ] 本物のRSSフィード取得 (Vercel Cronで1時間ごと自動更新)
- [ ] 記事キャッシュ (Vercel KV、同じ記事の重複スコアリングを防ぐ)
- [ ] Google AdSense 追加
- [ ] メール配信 (Resend + Beehiiv)
