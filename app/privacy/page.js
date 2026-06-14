import { Nav, Footer } from '../components';

export const metadata = {
  title: 'Privacy Policy | ひかりニュース',
  description: 'ひかりニュースのプライバシーポリシー',
};

const Section = ({ title, children }) => (
  <section style={{ marginBottom: '2rem' }}>
    <h2 style={{ fontSize: 14, fontWeight: 500, color: '#4ade80', marginBottom: 10, letterSpacing: '0.06em' }}>{title}</h2>
    {children}
  </section>
);

const P = ({ children }) => (
  <p style={{ fontSize: 13, color: '#a0b8a0', lineHeight: 1.9, marginBottom: 8 }}>{children}</p>
);

export default function PrivacyPage() {
  return (
    <div style={{ background: '#0a0f0a', minHeight: '100vh', color: '#e8f0e8' }}>
      <Nav />
      <main style={{ maxWidth: 640, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.3em', color: '#4ade80', marginBottom: 8 }}>LEGAL</p>
        <h1 style={{ fontSize: 26, fontWeight: 300, color: '#f0faf0', marginBottom: '0.5rem' }}>プライバシーポリシー</h1>
        <p style={{ fontSize: 12, color: '#3a4a3a', marginBottom: '2.5rem' }}>最終更新：2026年06月14日</p>

        <Section title="基本方針">
          <P>ひかりニュース（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。</P>
        </Section>

        <Section title="Cookieについて">
          <P>当サイトはCookieを使用することがあります。Cookieはブラウザに保存される小さなデータファイルで、サイトの利便性向上に使用されます。</P>
          <P>ブラウザの設定からCookieを無効にすることができますが、一部の機能が正常に動作しない場合があります。</P>
        </Section>

        <Section title="広告配信について">
          <P>当サイトは、第三者配信事業者（Google LLC、以下「Google」）によるインターネット広告サービス「Google AdSense」を利用する場合があります。</P>
          <P>Googleはユーザーの興味に応じた広告を表示するために、Cookie（DoubleClick Cookieを含む）を使用することがあります。ユーザーはGoogleの広告設定ページにて、パーソナライズ広告を無効化することができます。</P>
          <P>詳細は以下をご確認ください：<br />
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80' }}>
              https://policies.google.com/technologies/ads
            </a>
          </P>
        </Section>

        <Section title="アクセス解析について">
          <P>当サイトはVercel Analytics（Vercel Inc.提供）を使用してアクセス状況を把握しています。このツールはCookieを使用せず、個人を特定する情報は収集しません。</P>
        </Section>

        <Section title="外部リンクについて">
          <P>当サイトには外部サイトへのリンクが含まれています。リンク先のプライバシーポリシーは各サイトのものが適用されます。</P>
        </Section>

        <Section title="お問い合わせ">
          <P>プライバシーポリシーに関するご質問は <a href="/contact" style={{ color: '#4ade80' }}>Contactページ</a> よりご連絡ください。</P>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
