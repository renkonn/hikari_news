import './globals.css';

export const metadata = {
  title: 'ひかりニュース — ポジティブなニュースだけ | Claude AI スコアリング',
  description: '信頼できる発行元（Reuters・BBC・Guardian・NHK）から、前向きなニュースだけをClaude AIがリアルタイムでスコアリング。毎日少しだけ、世界の明るい面を。',
  openGraph: {
    title: 'ひかりニュース — ポジティブなニュースだけ',
    description: 'Claude AIが世界中のニュースをリアルタイムでポジティブ度スコアリング。前向きな話題だけをお届けします。',
    url: 'https://hikari-news.vercel.app',
    siteName: 'ひかりニュース',
    locale: 'ja_JP',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ひかりニュース' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ひかりニュース — ポジティブなニュースだけ',
    description: 'Claude AIが世界中のニュースをリアルタイムでポジティブ度スコアリング。',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
