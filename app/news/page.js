import { Nav, Footer } from '../components';

export const metadata = {
  title: '記事一覧 | ひかりニュース',
  description: '世界中のポジティブなニュースをまとめた記事一覧',
};

const ARTICLES = [
  { id:1, cat:'tech',   score:95, title:'5分で充電できて10年もつ次世代バッテリーが開発される', summary:'研究チームは従来比3倍の充電速度と長寿命を両立した新型バッテリーを発表。電気自動車や携帯機器の普及に大きく貢献する見込み。', comment:'技術の進歩がこれだけ速いと、10年後の世界が本当に楽しみになります。', source:'Reuters' },
  { id:2, cat:'env',    score:92, title:'日本の植林プロジェクトが5000万本を達成、野生動物回廊が復活', summary:'官民連携の大規模植林事業が節目を迎え、絶滅危惧種の移動経路となる緑の回廊が国内複数箇所に誕生した。', comment:'「5000万本」という数字の重みを、実際の森の写真を見るとひしひしと感じます。', source:'NHK' },
  { id:3, cat:'health', score:91, title:'アルツハイマー早期治療で94%の成功率、臨床試験が完了', summary:'大規模臨床試験の最終結果が公表され、新薬が初期段階のアルツハイマー患者の94%に有効であることが確認された。', comment:'100万人以上の患者家族にとって、この数字がどれだけ希望になるか。', source:'The Guardian' },
  { id:4, cat:'env',    score:90, title:'再生可能エネルギーが初めて化石燃料の発電容量を超える', summary:'国際エネルギー機関の最新データで、太陽光・風力などの再生可能エネルギーの設備容量が世界全体で化石燃料を初めて上回った。', comment:'「初めて」という言葉に、この数十年の積み重ねが詰まっている気がします。', source:'BBC News' },
  { id:5, cat:'soc',    score:88, title:'市民主導の海洋清掃で太平洋から100トンのプラスチックを回収', summary:'ボランティア団体が過去最大規模の清掃活動を実施。漁師・ダイバー・学生など多様なメンバーが協力し、記録的な回収量を達成した。', comment:'プロではなく「市民」がここまでやれるというのが、一番の希望だと思います。', source:'Positive News' },
  { id:6, cat:'sci',    score:87, title:'AIが希少疾患を3年早く発見、数千人の命を救う可能性', summary:'医療AIが画像診断において医師よりも平均3年早く希少疾患の兆候を捉えることが実証され、早期治療による生存率向上が期待される。', comment:'診断の「速さ」が命の長さを変える。そんな時代が来ているんだと感じます。', source:'Reuters' },
  { id:7, cat:'soc',    score:86, title:'難民に1万人の雇用機会、12カ国で社会的企業が急成長', summary:'各国の社会的企業が連携し、難民認定者を対象とした職業訓練と就労支援を展開。12カ国で合計1万件を超える雇用を創出した。', comment:'「仕事」が人の尊厳を取り戻す一番の近道だと、改めて思います。', source:'The Guardian' },
  { id:8, cat:'tech',   score:85, title:'量子コンピュータの新発見が太陽電池の効率を40%向上させる可能性', summary:'量子シミュレーションにより、これまで未知だった光エネルギー変換の最適経路が特定され、次世代太陽電池設計への応用が期待される。', comment:'「量子」と「太陽光」がつながる瞬間。こういう意外な組み合わせが世界を変えます。', source:'BBC News' },
  { id:9, cat:'env',    score:84, title:'サンゴ礁再生技術が温暖化した海でも80%の生存率を実現', summary:'新開発の移植・育成技術を用いたサンゴ再生プロジェクトが、水温上昇下での試験で80%の生存率を達成。世界各地への展開が計画される。', comment:'海の底で静かに起きているこの変化を、もっと多くの人に知ってほしいです。', source:'Reuters' },
  { id:10, cat:'soc',  score:83, title:'ベーシックインカム実験で子どもの貧困率60%減、試験都市が成果公表', summary:'3カ国の試験都市で5年間実施されたベーシックインカム実験のデータが公開され、子どもの貧困率低下や学業成績向上などの効果が確認された。', comment:'数字は冷たく見えるけど、その裏に安心した子どもたちの顔があると思うと。', source:'The Guardian' },
  { id:11, cat:'health',score:82, title:'遺伝子治療で先天性難聴の子どもの聴力が回復、試験が成功', summary:'生まれつき聴力を持たない子どもへの遺伝子治療試験で、複数の患者が治療後に音を聞けるようになったと確認された。', comment:'初めて音を聞いた瞬間の映像を見て、しばらく言葉が出ませんでした。', source:'BBC News' },
  { id:12, cat:'sci',  score:81, title:'海藻由来の生分解性プラスチックが量産化へ、商業利用が現実に', summary:'海藻を原料とした生分解性素材の製造コストが従来プラスチックの2倍以内に抑えられ、食品容器など日常品への本格導入が始まる。', comment:'「使い捨て」の概念そのものが変わっていく予感がします。', source:'Reuters' },
];

const CAT_COLORS = { env:'#4ade80', sci:'#60a5fa', soc:'#f472b6', tech:'#fb923c', health:'#a78bfa' };
const CAT_LABELS = { env:'🌱 環境', sci:'🔬 科学', soc:'🤝 社会', tech:'💡 技術', health:'❤️ 医療' };

export default function NewsPage() {
  return (
    <div style={{ background: '#0a0f0a', minHeight: '100vh', color: '#e8f0e8' }}>
      <Nav />
      <main style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1rem 3rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.3em', color: '#4ade80', marginBottom: 6 }}>ARTICLES</p>
          <h1 style={{ fontSize: 22, fontWeight: 300, color: '#f0faf0' }}>記事一覧</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ARTICLES.map(a => (
            <article key={a.id} style={{
              background: '#0f1a0f', border: '0.5px solid #1e2e1e', borderRadius: 10,
              padding: '16px 18px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 100, border: `0.5px solid ${CAT_COLORS[a.cat]}30`, color: CAT_COLORS[a.cat] }}>
                  {CAT_LABELS[a.cat]}
                </span>
                <span style={{ fontSize: 10, color: '#4a6a4a', letterSpacing: '0.04em' }}>{a.source}</span>
                <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, color: '#4ade80' }}>+{a.score}</span>
              </div>
              <h2 style={{ fontSize: 14, fontWeight: 400, color: '#c8dcc8', lineHeight: 1.6, marginBottom: 8 }}>{a.title}</h2>
              <p style={{ fontSize: 12, color: '#5a7a5a', lineHeight: 1.7, marginBottom: 8 }}>{a.summary}</p>
              <p style={{ fontSize: 11, color: '#4a6a4a', fontStyle: 'italic', lineHeight: 1.5, borderLeft: '2px solid #1e3a1e', paddingLeft: 10 }}>
                ひかりの一言：{a.comment}
              </p>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
