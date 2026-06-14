'use client';
import { useState, useCallback } from 'react';
import { Nav, Footer } from './components';

const HEADLINES = [
  { title: "Scientists develop breakthrough battery that charges in 5 minutes and lasts 10 years", source: "Reuters", sourceUrl: "https://reuters.com", cat: "tech" },
  { title: "Japan's reforestation project plants 50 million trees, creating new wildlife corridors", source: "NHK", sourceUrl: "https://www3.nhk.or.jp", cat: "env" },
  { title: "New treatment shows 94% success rate in early-stage Alzheimer's clinical trials", source: "Guardian", sourceUrl: "https://theguardian.com", cat: "health" },
  { title: "Global renewable energy capacity surpasses fossil fuels for first time in history", source: "BBC", sourceUrl: "https://bbc.com", cat: "env" },
  { title: "Community-led ocean cleanup removes 100 tonnes of plastic from Pacific in record time", source: "Positive News", sourceUrl: "https://positive.news", cat: "soc" },
  { title: "AI tool helps doctors detect rare diseases 3 years earlier, saving thousands of lives", source: "Reuters", sourceUrl: "https://reuters.com", cat: "sci" },
  { title: "Social enterprise creates 10,000 jobs for refugees in 12 countries", source: "Guardian", sourceUrl: "https://theguardian.com", cat: "soc" },
  { title: "Quantum computing breakthrough could make solar panels 40% more efficient", source: "BBC", sourceUrl: "https://bbc.com", cat: "tech" },
  { title: "New coral reef restoration technique shows 80% survival rate in warming oceans", source: "Reuters", sourceUrl: "https://reuters.com", cat: "env" },
  { title: "Universal basic income pilot reduces child poverty by 60% in trial cities", source: "Guardian", sourceUrl: "https://theguardian.com", cat: "soc" },
  { title: "Gene therapy restores hearing in children born deaf, study confirms", source: "BBC", sourceUrl: "https://bbc.com", cat: "health" },
  { title: "Biodegradable plastic alternative made from seaweed now scales to mass production", source: "Reuters", sourceUrl: "https://reuters.com", cat: "sci" },
];

const CAT_LABELS = { env: '🌿 環境', sci: '🔭 科学', soc: '🤝 社会', tech: '💡 技術', health: '🌸 医療' };

// アクセシブルなカラーパレット（白背景・茶・紺・グレー）
// WCAG AA基準（コントラスト比 4.5:1以上）準拠
const C = {
  bg:         '#f8f6f2',   // 温かみのあるオフホワイト
  bgCard:     '#ffffff',   // カード白
  bgHero:     '#f0ece4',   // ヒーロー背景（薄い茶）
  border:     '#ddd8ce',   // 薄いグレー枠
  border2:    '#c8c0b4',   // 少し濃い枠

  // テキスト（コントラスト確保）
  textPrimary:  '#1e1a16', // ほぼ黒（背景に対し15:1）
  textSecond:   '#4a4540', // 濃いグレー（7:1）
  textMuted:    '#6b6560', // グレー（4.8:1）
  textLight:    '#9a9088', // 薄いグレー（見出し補助のみ）

  // アクセント3色
  brown:      '#7a5428',   // 茶（濃め・AA基準）
  brownLight: '#f5ede0',   // 薄茶（背景用）
  brownBorder:'#c8a060',   // 茶枠
  navy:       '#1e3060',   // 紺（濃め・AA基準）
  navyLight:  '#e8ecf4',   // 薄紺（背景用）
  navyBorder: '#3a5090',   // 紺枠
  gray:       '#4a4540',   // グレー（濃め）
  grayLight:  '#f0ede8',   // 薄グレー（背景用）
};

function ScoreRing({ score }) {
  const r = 18, circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 90 ? C.brown : score >= 80 ? C.navy : C.gray;
  return (
    <div style={{ position: 'relative', width: 48, height: 48, flexShrink: 0 }}>
      <svg width="48" height="48" viewBox="0 0 48 48" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="24" cy="24" r={r} fill="none" stroke={C.border} strokeWidth="3" />
        <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`} strokeLinecap="round" />
      </svg>
      <span style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 700, color,
      }}>
        {score}
      </span>
    </div>
  );
}

function CatBadge({ cat }) {
  const colors = {
    env:    { bg: C.brownLight, color: C.brown,  border: C.brownBorder },
    health: { bg: C.brownLight, color: C.brown,  border: C.brownBorder },
    tech:   { bg: C.navyLight,  color: C.navy,   border: C.navyBorder },
    sci:    { bg: C.navyLight,  color: C.navy,   border: C.navyBorder },
    soc:    { bg: C.grayLight,  color: C.gray,   border: C.border2 },
  };
  const s = colors[cat] || colors.soc;
  return (
    <span style={{
      display: 'inline-block', fontSize: 10, padding: '2px 8px', borderRadius: 100,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      marginLeft: 8, fontWeight: 500, letterSpacing: '0.03em',
    }}>
      {CAT_LABELS[cat] || cat}
    </span>
  );
}

export default function Page() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [filter, setFilter] = useState('all');
  const [threshold, setThreshold] = useState(70);
  const [done, setDone] = useState(false);

  const fetchNews = useCallback(async () => {
    if (loading) return;
    setLoading(true); setDone(false); setCards([]); setError('');
    setStatus('Claude AI がポジティブ度を分析中...');

    const shuffled = [...HEADLINES].sort(() => Math.random() - 0.5).slice(0, 6);
    try {
      const res = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headlines: shuffled })
      });
      if (res.status === 429) {
        setError('リクエストが多すぎます。少し待ってから再試行してください。');
        setLoading(false); return;
      }
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setCards(data.results);
      setStatus(`${data.results.length}件スコアリング完了 · Claude AI による判定`);
    } catch {
      setError('記事を取得できませんでした。しばらく待ってから再試行してください。');
      setStatus('');
    }
    setLoading(false); setDone(true);
  }, [loading]);

  const shareResult = () => {
    const top = cards.filter(c => c.score >= threshold).slice(0, 3);
    const text = `🌿 ひかりニュース\n\n今日のポジティブニュース Top3:\n${top.map((c,i)=>`${i+1}. [${c.score}点] ${c.title}`).join('\n')}\n\nClaude AIがスコアリング · hikari-news.vercel.app\n#ポジティブニュース #ひかりニュース`;
    if (navigator.share) navigator.share({ title: 'ひかりニュース', text });
    else navigator.clipboard.writeText(text).then(() => alert('コピーしました！'));
  };

  const visible = cards.filter(c => c.score >= threshold && (filter === 'all' || c.cat === filter));

  return (
    <div style={{ background: C.bg, minHeight: '100vh', color: C.textPrimary }}>
      <Nav />

      {/* Hero */}
      <div style={{ background: C.bgHero, borderBottom: `1px solid ${C.border}`, textAlign: 'center', padding: '3.5rem 1rem 2.5rem' }}>
        <p style={{ fontFamily: 'serif', fontSize: 12, letterSpacing: '0.5em', color: C.brown, marginBottom: 10 }}>ひかりニュース</p>
        <h1 style={{ fontFamily: 'serif', fontSize: 36, fontWeight: 400, letterSpacing: '0.1em', color: C.navy, marginBottom: 10 }}>
          Hikari News
        </h1>
        <p style={{ fontSize: 15, color: C.textSecond, marginBottom: 4, letterSpacing: '0.02em' }}>
          信頼できる発行元による、前向きなニュースだけ
        </p>
        <p style={{ fontSize: 12, color: C.textMuted, marginBottom: '2.5rem', letterSpacing: '0.03em' }}>
          Positive stories from trusted sources · scored by Claude AI
        </p>

        <button onClick={fetchNews} disabled={loading} style={{
          display: 'inline-flex', alignItems: 'center', gap: 10, minHeight: 52,
          background: loading ? C.grayLight : C.navy,
          color: loading ? C.textMuted : '#ffffff',
          border: 'none', borderRadius: 100, padding: '14px 32px',
          fontSize: 15, fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer',
          letterSpacing: '0.05em', fontFamily: 'inherit', transition: 'all 0.2s',
          boxShadow: loading ? 'none' : '0 2px 12px rgba(30,48,96,0.18)',
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: loading ? C.textMuted : '#ffffff',
            animation: loading ? 'none' : 'pulse 1.4s infinite',
            flexShrink: 0,
          }} />
          {loading ? '取得中...' : done ? '✦ 更新する' : '✦ ライブ記事を取得'}
        </button>

        {status && (
          <p style={{ fontSize: 12, color: C.textMuted, marginTop: 14, letterSpacing: '0.04em' }}>{status}</p>
        )}
      </div>

      {/* エラー */}
      {error && (
        <div style={{
          background: '#fdf0e8', border: `1px solid ${C.brownBorder}`,
          borderRadius: 8, padding: '12px 16px', margin: '1rem',
          fontSize: 13, color: C.brown, textAlign: 'center', maxWidth: 680, marginLeft: 'auto', marginRight: 'auto',
        }}>⚠️ {error}</div>
      )}

      {/* フィルター */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '1.5rem 1rem 0.5rem' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[['all','すべて'], ['env', CAT_LABELS.env], ['sci', CAT_LABELS.sci], ['soc', CAT_LABELS.soc], ['tech', CAT_LABELS.tech], ['health', CAT_LABELS.health]].map(([cat, label]) => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              background: filter === cat ? C.navy : C.bgCard,
              border: `1px solid ${filter === cat ? C.navy : C.border}`,
              color: filter === cat ? '#ffffff' : C.textSecond,
              borderRadius: 100, padding: '7px 16px', fontSize: 13, cursor: 'pointer',
              fontFamily: 'inherit', letterSpacing: '0.03em', transition: 'all 0.15s',
              minHeight: 40, fontWeight: filter === cat ? 500 : 400,
            }}>{label}</button>
          ))}
        </div>

        {/* 閾値 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, fontSize: 13, color: C.textSecond }}>
          <span style={{ minWidth: 80 }}>ポジティブ度</span>
          <input type="range" min={50} max={95} step={5} value={threshold}
            onChange={e => setThreshold(Number(e.target.value))}
            style={{ flex: 1, maxWidth: 140, accentColor: C.navy, height: 4 }} />
          <span style={{ color: C.navy, fontWeight: 700, minWidth: 36, fontSize: 15 }}>{threshold}%</span>
          <span style={{ color: C.textMuted }}>以上</span>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: `1px solid ${C.border}`, margin: '1.2rem 1rem' }} />

      {/* フィード */}
      <div style={{ padding: '0 1rem 3rem', display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 680, margin: '0 auto' }}>

        {loading && [0,1,2,3,4,5].map(i => (
          <div key={i} style={{
            background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12,
            height: 88, animation: 'shimmer 1.4s ease-in-out infinite',
            opacity: 0.6,
          }} />
        ))}

        {!loading && visible.length === 0 && cards.length === 0 && !error && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <div style={{ fontSize: 32, marginBottom: 16, opacity: 0.3 }}>✦</div>
            <p style={{ fontSize: 15, color: C.textMuted, lineHeight: 2 }}>
              上のボタンを押すと<br />
              Claude AI が世界のポジティブニュースを<br />
              リアルタイムでスコアリングします
            </p>
          </div>
        )}

        {!loading && visible.length === 0 && cards.length > 0 && (
          <p style={{ textAlign: 'center', padding: '2rem', color: C.textMuted, fontSize: 13 }}>
            条件に合う記事がありません。閾値を下げてみてください。
          </p>
        )}

        {!loading && visible.map((c, i) => (
          <article key={i} className="news-card" style={{
            background: C.bgCard,
            border: `1px solid ${C.border}`,
            borderRadius: 12, padding: '16px 18px',
            display: 'flex', gap: 16, alignItems: 'flex-start',
            animationDelay: `${i * 0.07}s`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            <ScoreRing score={c.score} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 11, color: C.textMuted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
                {c.source}
                <CatBadge cat={c.cat} />
              </p>
              <p style={{ fontSize: 15, color: C.textPrimary, lineHeight: 1.7, marginBottom: 6, fontWeight: 400 }}>
                {c.title}
              </p>
              {c.reason && (
                <p style={{ fontSize: 12, color: C.textMuted, fontStyle: 'italic', lineHeight: 1.5, marginBottom: 8, borderLeft: `2px solid ${C.border2}`, paddingLeft: 10 }}>
                  {c.reason}
                </p>
              )}
              <a href={c.sourceUrl || '#'} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 12, color: C.navy, fontWeight: 500, letterSpacing: '0.03em' }}>
                詳しくはこちら →
              </a>
            </div>
          </article>
        ))}
      </div>

      {done && cards.length > 0 && (
        <div style={{ textAlign: 'center', padding: '0 1rem 2rem' }}>
          <button onClick={shareResult} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: C.bgCard, border: `1px solid ${C.brownBorder}`,
            color: C.brown, borderRadius: 100, padding: '10px 22px',
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
            fontFamily: 'inherit', minHeight: 44,
          }}>↗ Xでシェアする</button>
        </div>
      )}

      <Footer />

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.6)} }
        @keyframes shimmer { 0%,100%{opacity:.5} 50%{opacity:.8} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
        .news-card { animation: fadeIn 0.35s ease both; }
        @media (max-width: 480px) {
          h1 { font-size: 26px !important; }
          .news-card { padding: 14px 14px !important; }
        }
      `}</style>
    </div>
  );
}
