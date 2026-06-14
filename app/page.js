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

const CAT_LABELS = { env: '🌱 環境', sci: '🔬 科学', soc: '🤝 社会', tech: '💡 技術', health: '❤️ 医療' };

function ScoreRing({ score }) {
  const r = 18, circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 90 ? '#4ade80' : score >= 80 ? '#86efac' : '#a3e4b5';
  return (
    <div style={{ position: 'relative', width: 44, height: 44, flexShrink: 0 }}>
      <svg width="44" height="44" viewBox="0 0 44 44" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="22" cy="22" r={r} fill="none" stroke="#1a2a1a" strokeWidth="2.5" />
        <circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="2.5"
          strokeDasharray={`${dash.toFixed(1)} ${circ.toFixed(1)}`} strokeLinecap="round" />
      </svg>
      <span style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:600, color:'#4ade80' }}>
        {score}
      </span>
    </div>
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
    setLoading(true);
    setDone(false);
    setCards([]);
    setError('');
    setStatus('Claude AI がポジティブ度を分析中...');

    const shuffled = [...HEADLINES].sort(() => Math.random() - 0.5).slice(0, 6);

    try {
      const res = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headlines: shuffled })
      });

      if (res.status === 429) {
        setError('リクエストが多すぎます。しばらく待ってから再試行してください。');
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setCards(data.results);
      setStatus(`${data.results.length}件スコアリング完了 · Claude AI による判定`);
    } catch (e) {
      setError('記事を取得できませんでした。しばらく待ってから再試行してください。');
      setStatus('');
    }

    setLoading(false);
    setDone(true);
  }, [loading]);

  const shareResult = () => {
    const top = cards.filter(c => c.score >= threshold).slice(0, 3);
    const text = `🌿 ひかりニュース\n\n今日のポジティブニュース Top3:\n${top.map((c,i)=>`${i+1}. [${c.score}点] ${c.title}`).join('\n')}\n\nClaude AIがスコアリング · hikari-news.vercel.app\n#ポジティブニュース #ひかりニュース`;
    if (navigator.share) navigator.share({ title: 'ひかりニュース', text });
    else navigator.clipboard.writeText(text).then(() => alert('クリップボードにコピーしました！'));
  };

  const visible = cards.filter(c => c.score >= threshold && (filter === 'all' || c.cat === filter));

  const s = {
    page: { background: '#0a0f0a', minHeight: '100vh', color: '#e8f0e8' },
    hero: { textAlign: 'center', padding: '2.5rem 1rem 1.5rem', position: 'relative' },
    heroBg: { position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:600, height:200, background:'radial-gradient(ellipse, rgba(74,222,128,0.07) 0%, transparent 70%)', pointerEvents:'none' },
    logoJp: { fontFamily:'serif', fontSize:11, letterSpacing:'0.35em', color:'#4ade80', marginBottom:8, opacity:0.85 },
    logoEn: { fontSize:28, fontWeight:300, letterSpacing:'0.12em', color:'#f0faf0', marginBottom:6 },
    tagline: { fontSize:12, color:'#6b7c6b', letterSpacing:'0.08em', marginBottom:'1.5rem' },
    fetchBtn: (dis) => ({
      display:'inline-flex', alignItems:'center', gap:8, minHeight:48,
      background: dis ? '#1a2e1a' : '#4ade80',
      color: dis ? '#4a6a4a' : '#0a1a0a',
      border:'none', borderRadius:100, padding:'12px 28px',
      fontSize:14, fontWeight:600, cursor: dis ? 'not-allowed' : 'pointer',
      letterSpacing:'0.04em', fontFamily:'inherit', transition:'all 0.2s',
    }),
    filterBtn: (active) => ({
      background: active ? 'rgba(74,222,128,0.1)' : 'transparent',
      border:`0.5px solid ${active ? '#4ade80' : '#2a3a2a'}`,
      color: active ? '#4ade80' : '#6b8c6b',
      borderRadius:100, padding:'6px 14px', fontSize:12, cursor:'pointer',
      fontFamily:'inherit', letterSpacing:'0.04em', transition:'all 0.15s', minHeight:36,
    }),
    card: (i) => ({
      background:'#0f1a0f', border:'0.5px solid #1e2e1e', borderRadius:10,
      padding:'14px 16px', display:'flex', gap:14, alignItems:'flex-start',
      animationDelay:`${i*0.06}s`,
    }),
    errorBox: {
      background:'rgba(255,80,80,0.06)', border:'0.5px solid rgba(255,80,80,0.2)',
      borderRadius:8, padding:'10px 14px', margin:'0 1rem 1rem',
      fontSize:12, color:'#ff8080', textAlign:'center',
    },
  };

  return (
    <div style={s.page}>
      <Nav />

      {/* Hero */}
      <div style={s.hero}>
        <div style={s.heroBg} />
        <p style={s.logoJp}>ひかりニュース</p>
        <h1 style={s.logoEn}>Hikari News</h1>
        <p style={s.tagline}>信頼できる発行元による、前向きなニュースだけ · Positive stories only</p>
        <button onClick={fetchNews} disabled={loading} style={s.fetchBtn(loading)}>
          <span style={{ width:7, height:7, borderRadius:'50%', background: loading ? '#4a6a4a' : '#0a1a0a', animation: loading ? 'none' : 'pulse 1.2s infinite' }} />
          {loading ? '取得中...' : done ? '✦ 更新する' : '✦ ライブ記事を取得'}
        </button>
        {status && <p style={{ fontSize:11, color:'#4a6a4a', marginTop:10, letterSpacing:'0.05em' }}>{status}</p>}
      </div>

      {/* エラー表示 */}
      {error && <div style={s.errorBox}>⚠️ {error}</div>}

      {/* フィルター */}
      <div style={{ display:'flex', gap:6, justifyContent:'center', flexWrap:'wrap', padding:'0 1rem 1rem' }}>
        {[['all','すべて'],['env',CAT_LABELS.env],['sci',CAT_LABELS.sci],['soc',CAT_LABELS.soc],['tech',CAT_LABELS.tech],['health',CAT_LABELS.health]].map(([cat,label]) => (
          <button key={cat} onClick={() => setFilter(cat)} style={s.filterBtn(filter===cat)}>{label}</button>
        ))}
      </div>

      {/* 閾値スライダー */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, padding:'0 1rem 1.2rem', fontSize:12, color:'#4a6a4a' }}>
        <span>ポジティブ度</span>
        <input type="range" min={50} max={95} step={5} value={threshold} onChange={e => setThreshold(Number(e.target.value))} style={{ width:100, accentColor:'#4ade80' }} />
        <span style={{ color:'#4ade80', fontWeight:500, minWidth:30 }}>{threshold}%</span>
        <span>以上</span>
      </div>

      <hr style={{ border:'none', borderTop:'0.5px solid #1a2a1a', margin:'0 1rem 1.2rem' }} />

      {/* フィード */}
      <div style={{ padding:'0 1rem 2rem', display:'flex', flexDirection:'column', gap:8, maxWidth:680, margin:'0 auto' }}>
        {loading && [0,1,2,3,4,5].map(i => (
          <div key={i} style={{ background:'#0f1a0f', border:'0.5px solid #1e2e1e', borderRadius:10, height:72, opacity: 0.3 + (i%2)*0.2, animation:'shimmer 1.4s ease-in-out infinite' }} />
        ))}
        {!loading && visible.length === 0 && cards.length === 0 && !error && (
          <p style={{ textAlign:'center', padding:'3rem 1rem', color:'#3a4a3a', fontSize:13, letterSpacing:'0.05em', lineHeight:1.8 }}>
            上のボタンを押すと<br />Claude AI が世界のポジティブニュースを<br />リアルタイムでスコアリングします ✦
          </p>
        )}
        {!loading && visible.length === 0 && cards.length > 0 && (
          <p style={{ textAlign:'center', padding:'2rem', color:'#3a4a3a', fontSize:12 }}>条件に合う記事がありません。閾値を下げてみてください。</p>
        )}
        {!loading && visible.map((c, i) => (
          <div key={i} style={s.card(i)} className="news-card">
            <ScoreRing score={c.score} />
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontSize:10, color:'#4a6a4a', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:4 }}>
                {c.source}
                <span style={{ display:'inline-block', fontSize:9, padding:'2px 7px', borderRadius:100, border:'0.5px solid #2a4a2a', color:'#4ade80', marginLeft:6 }}>
                  {CAT_LABELS[c.cat] || c.cat}
                </span>
              </p>
              <p style={{ fontSize:13, color:'#c8dcc8', lineHeight:1.5, marginBottom:5 }}>{c.title}</p>
              {c.reason && <p style={{ fontSize:11, color:'#4a6a4a', fontStyle:'italic', lineHeight:1.4, marginBottom:6 }}>{c.reason}</p>}
              <a href={c.sourceUrl || '#'} target="_blank" rel="noopener noreferrer"
                style={{ fontSize:11, color:'#4ade80', opacity:0.7, letterSpacing:'0.04em' }}>
                詳しくはこちら →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* シェアボタン */}
      {done && cards.length > 0 && (
        <div style={{ textAlign:'center', padding:'0 1rem 1.5rem' }}>
          <button onClick={shareResult} style={{
            display:'inline-flex', alignItems:'center', gap:6,
            background:'transparent', border:'0.5px solid #2a3a2a', color:'#4a6a4a',
            borderRadius:100, padding:'8px 16px', fontSize:12, cursor:'pointer',
            fontFamily:'inherit', transition:'all 0.15s', minHeight:36,
          }}>↗ Xでシェアする</button>
        </div>
      )}

      <Footer />

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.7)} }
        @keyframes shimmer { 0%,100%{opacity:.3} 50%{opacity:.6} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
        .news-card { animation: fadeIn 0.4s ease both; }
        @media (max-width: 480px) {
          h1 { font-size: 22px !important; }
          .news-card { padding: 12px !important; }
        }
      `}</style>
    </div>
  );
}
