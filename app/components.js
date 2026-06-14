'use client';

// ── 共通ナビゲーション ──────────────────────────────────────────
export function Nav() {
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 20px', borderBottom: '0.5px solid #1a2a1a',
      position: 'sticky', top: 0, background: 'rgba(10,15,10,0.92)',
      backdropFilter: 'blur(8px)', zIndex: 100,
    }}>
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: 'serif', fontSize: 10, letterSpacing: '0.3em', color: '#4ade80', opacity: 0.8 }}>ひかり</span>
        <span style={{ fontSize: 15, fontWeight: 300, letterSpacing: '0.1em', color: '#f0faf0' }}>Hikari News</span>
      </a>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <a href="/news" style={{ fontSize: 12, color: '#6b8c6b', letterSpacing: '0.04em' }}>記事一覧</a>
        <a href="/about" style={{ fontSize: 12, color: '#6b8c6b', letterSpacing: '0.04em' }}>About</a>
        <a href="/contact" style={{ fontSize: 12, color: '#6b8c6b', letterSpacing: '0.04em' }}>Contact</a>
        <a href="/privacy" style={{ fontSize: 12, color: '#6b8c6b', letterSpacing: '0.04em' }}>Privacy</a>
      </div>
    </nav>
  );
}

// ── 共通フッター ────────────────────────────────────────────────
export function Footer({ bmcUrl = 'https://buymeacoffee.com/' }) {
  return (
    <footer style={{ borderTop: '0.5px solid #1a2a1a', padding: '1.5rem 1rem', textAlign: 'center' }}>
      <a
        href={bmcUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'transparent', border: '0.5px solid #2a3a2a',
          color: '#6b8c6b', borderRadius: 100, padding: '6px 16px',
          fontSize: 12, marginBottom: 14, transition: 'all 0.15s',
        }}
        onMouseEnter={e => { e.target.style.borderColor='#4ade80'; e.target.style.color='#4ade80'; }}
        onMouseLeave={e => { e.target.style.borderColor='#2a3a2a'; e.target.style.color='#6b8c6b'; }}
      >
        ☕ このサイトを応援する
      </a>
      <p style={{ fontSize: 10, color: '#2a3a2a', letterSpacing: '0.08em', marginTop: 4 }}>
        Hikari News · Reuters · BBC · Guardian · NHK · Claude AI
      </p>
      <p style={{ fontSize: 10, color: '#2a3a2a', marginTop: 4 }}>
        <a href="/privacy" style={{ marginRight: 12 }}>Privacy Policy</a>
        <a href="/about">About</a>
      </p>
    </footer>
  );
}
