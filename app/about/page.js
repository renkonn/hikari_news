import { Nav, Footer } from '../components';

export const metadata = {
  title: 'About | ひかりニュース',
  description: 'ひかりニュースについて — サイトの目的と運営者の紹介',
};

export default function AboutPage() {
  return (
    <div style={{ background: '#0a0f0a', minHeight: '100vh', color: '#e8f0e8' }}>
      <Nav />
      <main style={{ maxWidth: 640, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.3em', color: '#4ade80', marginBottom: 8 }}>ABOUT</p>
        <h1 style={{ fontSize: 26, fontWeight: 300, letterSpacing: '0.08em', color: '#f0faf0', marginBottom: '2rem' }}>
          ひかりニュースについて
        </h1>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: 14, fontWeight: 500, color: '#4ade80', marginBottom: 10, letterSpacing: '0.06em' }}>このサイトの目的</h2>
          <p style={{ fontSize: 14, color: '#a0b8a0', lineHeight: 1.9 }}>
            ニュースを開くたびに、重たい話題ばかりが目に入る。<br />
            そんな毎日に、少しだけ違う景色を届けたくて作りました。
          </p>
          <p style={{ fontSize: 14, color: '#a0b8a0', lineHeight: 1.9, marginTop: 12 }}>
            Reuters・BBC・Guardian・NHK など信頼できるメディアから記事を収集し、<br />
            Claude AI がリアルタイムでポジティブ度をスコアリング。<br />
            前向きな話題だけを、毎日お届けします。
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: 14, fontWeight: 500, color: '#4ade80', marginBottom: 10, letterSpacing: '0.06em' }}>使用しているメディア・技術</h2>
          <ul style={{ fontSize: 13, color: '#6b8c6b', lineHeight: 2.2, listStyle: 'none', paddingLeft: 0 }}>
            {['Reuters', 'BBC News', 'The Guardian', 'NHK World', 'Positive News', 'Good News Network'].map(s => (
              <li key={s} style={{ borderBottom: '0.5px solid #1a2a1a', paddingBottom: 4 }}>
                <span style={{ color: '#4ade80', marginRight: 10 }}>✦</span>{s}
              </li>
            ))}
            <li style={{ paddingTop: 4 }}><span style={{ color: '#4ade80', marginRight: 10 }}>🤖</span>Claude AI（Anthropic）— ポジティブ度スコアリング</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: 14, fontWeight: 500, color: '#4ade80', marginBottom: 10, letterSpacing: '0.06em' }}>運営者</h2>
          <p style={{ fontSize: 14, color: '#a0b8a0', lineHeight: 1.9 }}>
            個人運営のサイトです。<br />
            ご意見・ご感想は <a href="/contact" style={{ color: '#4ade80' }}>Contact</a> からお気軽にどうぞ。
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
