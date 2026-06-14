import { Nav, Footer } from '../components';

export const metadata = {
  title: 'Contact | ひかりニュース',
  description: 'ひかりニュースへのお問い合わせ',
};

export default function ContactPage() {
  return (
    <div style={{ background: '#0a0f0a', minHeight: '100vh', color: '#e8f0e8' }}>
      <Nav />
      <main style={{ maxWidth: 640, margin: '0 auto', padding: '3rem 1.5rem', textAlign: 'center' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.3em', color: '#4ade80', marginBottom: 8 }}>CONTACT</p>
        <h1 style={{ fontSize: 26, fontWeight: 300, color: '#f0faf0', marginBottom: '1rem' }}>お問い合わせ</h1>
        <p style={{ fontSize: 14, color: '#6b8c6b', lineHeight: 1.9, marginBottom: '2.5rem' }}>
          ご意見・ご要望・メディア掲載のご相談など、<br />
          お気軽にお送りください。
        </p>

        <a
          href="https://docs.google.com/forms/create"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#4ade80', color: '#0a1a0a',
            border: 'none', borderRadius: 100, padding: '12px 28px',
            fontSize: 14, fontWeight: 600, letterSpacing: '0.04em',
            textDecoration: 'none', marginBottom: '2rem',
          }}
        >
          ✉️ フォームを開く
        </a>

        <p style={{ fontSize: 12, color: '#3a4a3a', lineHeight: 1.8 }}>
          ※ お返事まで数日いただく場合があります。<br />
          ※ スパム・広告目的のお問い合わせはお断りしています。
        </p>
      </main>
      <Footer />
    </div>
  );
}
