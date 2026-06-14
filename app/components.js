'use client';

export function Nav() {
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 24px', borderBottom: '1px solid #e8e2d8',
      position: 'sticky', top: 0,
      background: 'rgba(248,246,242,0.96)',
      backdropFilter: 'blur(8px)', zIndex: 100,
    }}>
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: 'serif', fontSize: 11, letterSpacing: '0.35em', color: '#8a6a3a' }}>ひかり</span>
        <span style={{ fontSize: 15, fontWeight: 400, letterSpacing: '0.08em', color: '#2a3550' }}>Hikari News</span>
      </a>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        {[['記事一覧','/news'],['About','/about'],['Contact','/contact'],['Privacy','/privacy']].map(([label, href]) => (
          <a key={href} href={href} style={{ fontSize: 13, color: '#6b6560', letterSpacing: '0.03em' }}>{label}</a>
        ))}
      </div>
    </nav>
  );
}

export function Footer({ bmcUrl = 'https://buymeacoffee.com/' }) {
  return (
    <footer style={{ borderTop: '1px solid #e8e2d8', padding: '2rem 1rem', textAlign: 'center', background: '#f0ece4' }}>
      <a
        href={bmcUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: '#fff', border: '1px solid #c8a878',
          color: '#8a6a3a', borderRadius: 100, padding: '8px 20px',
          fontSize: 13, marginBottom: 16, fontWeight: 500,
        }}
      >
        ☕ このサイトを応援する
      </a>
      <p style={{ fontSize: 11, color: '#9a9088', letterSpacing: '0.06em', marginBottom: 6 }}>
        Hikari News · Reuters · BBC · Guardian · NHK · Claude AI
      </p>
      <p style={{ fontSize: 11, color: '#9a9088' }}>
        <a href="/privacy" style={{ marginRight: 16 }}>Privacy Policy</a>
        <a href="/about">About</a>
      </p>
    </footer>
  );
}
