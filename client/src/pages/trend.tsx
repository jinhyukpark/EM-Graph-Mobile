import { useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, Info, Crown, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock Data for Trend Keywords
const trendKeywords = [
  { text: "사상최고치", type: "positive", size: 90, x: 70, y: 30 },
  { text: "코스피지수", type: "positive", size: 80, x: 75, y: 70 },
  { text: "휴머노이드 로봇", type: "positive", size: 75, x: 50, y: 50 },
  { text: "외환보유액 감소", type: "neutral", size: 70, x: 55, y: 20 },
  { text: "유상증자", type: "neutral", size: 65, x: 35, y: 30 },
  { text: "피지컬AI", type: "positive", size: 70, x: 25, y: 45 },
  { text: "지급여력비율", type: "positive", size: 65, x: 50, y: 75 },
  { text: "리스크관리", type: "positive", size: 60, x: 35, y: 65 },
  { text: "목표주가상향", type: "positive", size: 75, x: 20, y: 70 },
  { text: "사상최고치 경신", type: "positive", size: 70, x: 30, y: 85 },
];

const newsList = [
  {
    title: "보험사, 지난해 3분기 지급여력비율 210.8%… 전 분기 대비 4%p 상승",
    source: "조선비즈",
    timeAgo: "4시간 전",
    sentiment: "positive",
    summary: "보험사들의 재무 건전성을 나타내는 지급여력비율(K-ICS)이 전분기 대비 개선된 것으로 나타났다."
  },
  {
    title: "[4대 금융, 새 전략을 묻다]진옥동 신한금융 회장 \"AI 시대 기민한 대응 중요\"",
    source: "아시아경제",
    timeAgo: "4시간 전",
    sentiment: "positive",
    summary: "신한금융지주 진옥동 회장이 신년사를 통해 AI 기술 도입과 디지털 전환의 중요성을 강조했다."
  },
  {
    title: "보험사 지급여력비율 210%대로 '반등'...캐롯·KDB 등 일부는 '경고등'",
    source: "머니투데이",
    timeAgo: "5시간 전",
    sentiment: "neutral",
    summary: "전반적인 보험업계의 지급여력비율은 상승했으나, 일부 중소형 보험사들은 여전히 기준치를 밑돌며 우려를 낳고 있다."
  },
  {
    title: "코스피, 외국인 매수세에 2600선 회복...삼성전자 1%대 상승",
    source: "이데일리",
    timeAgo: "6시간 전",
    sentiment: "positive",
    summary: "코스피 지수가 외국인 투자자들의 매수세 유입에 힘입어 2600선을 회복하며 마감했다."
  },
  {
    title: "테슬라, 휴머노이드 로봇 '옵티머스 2세대' 공개...주가 5% 급등",
    source: "한국경제",
    timeAgo: "7시간 전",
    sentiment: "positive",
    summary: "테슬라가 더욱 정교해진 휴머노이드 로봇 옵티머스 2세대를 공개하며 로봇 시장 선점 의지를 보였다."
  }
];

const relatedStocks = [
  {
    code: "006800",
    name: "미래에셋증권",
    price: "28,700",
    diff: "+3,200",
    percent: "+12.55",
    isUp: true,
    badge: "사상최고치",
    aiScore: 3.27,
    newsCount: 263
  },
  {
    code: "005930",
    name: "삼성전자",
    price: "138,900",
    diff: "+800",
    percent: "+0.58",
    isUp: true,
    badge: "수급급증",
    aiScore: 8.5,
    newsCount: 154
  },
  {
    code: "000660",
    name: "SK하이닉스",
    price: "726,000",
    diff: "+30,000",
    percent: "+4.31",
    isUp: true,
    badge: "실적호조",
    aiScore: 9.1,
    newsCount: 128
  },
  {
    code: "035720",
    name: "카카오",
    price: "43,500",
    diff: "-200",
    percent: "-0.46",
    isUp: false,
    badge: "낙폭과대",
    aiScore: 4.2,
    newsCount: 89
  }
];

const StockCard = ({  
  code, 
  name, 
  price, 
  diff, 
  percent, 
  isUp, 
  badge,
  aiScore,
  isLocked,
  newsCount
}: { 
  code: string, 
  name: string, 
  price: string, 
  diff: string, 
  percent: string, 
  isUp: boolean,
  badge?: string,
  aiScore?: number,
  isLocked?: boolean,
  newsCount?: number
}) => {
  // Generate random-ish jagged path based on code to make them look different but consistent
  const seed = code.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const generatePath = (isUp: boolean) => {
    // A simple jagged trend
    const points = [];
    const segments = 10;
    let y = isUp ? 80 : 20;
    
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * 100;
      // Random fluctuation
      const noise = Math.sin((seed + i) * 123) * 15;
      
      // Trend
      if (isUp) {
        y = 80 - (i / segments) * 60 + noise; // End higher (smaller y)
      } else {
        y = 20 + (i / segments) * 60 + noise; // End lower (larger y)
      }
      
      // Clamp
      y = Math.max(5, Math.min(95, y));
      points.push(`${x},${y}`);
    }
    
    return `M${points.join(' L')}`;
  };

  const linePath = generatePath(isUp);
  const areaPath = `${linePath} V 100 H 0 Z`;
  const gradientId = `grad-${code}`;

  return (
  <Link href={`/stock/${code}`}>
    <Card className="w-full p-4 bg-[#1e232b] border border-white/5 shadow-md rounded-xl relative overflow-hidden group cursor-pointer transition-transform active:scale-[0.98]">
      {/* Background Chart */}
      <div className="absolute top-0 right-0 bottom-0 w-[60%] opacity-30 pointer-events-none mask-image-linear-to-l">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isUp ? "#ff3b30" : "#3b82f6"} stopOpacity="0.5" />
              <stop offset="100%" stopColor={isUp ? "#ff3b30" : "#3b82f6"} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path 
            d={areaPath} 
            fill={`url(#${gradientId})`} 
            stroke="none"
          />
          <path 
            d={linePath} 
            fill="none" 
            stroke={isUp ? "#ff3b30" : "#3b82f6"} 
            strokeWidth="2" 
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      <div className="flex justify-between items-center relative z-10">
        <div className="flex flex-col gap-1">
           <div className="flex items-center gap-2">
             <span className="text-xs text-muted-foreground font-medium">{code}</span>
             {badge && (
                <Badge variant="secondary" className="bg-gray-700/50 text-gray-300 text-[10px] px-1.5 py-0 border-none">
                  {badge}
                </Badge>
              )}
           </div>
           
           <h3 className="font-bold text-white text-lg">{name}</h3>
           
           <div className="flex items-baseline gap-2 mt-1">
             <span className="text-xl font-bold text-white tracking-tight">{price}원</span>
             <span className={`text-sm font-bold ${isUp ? 'text-[#ff3b30]' : 'text-blue-400'}`}>
               {isUp ? '▲' : '▼'} {diff} ({percent}%)
             </span>
           </div>
           
           {newsCount && (
             <div className="mt-2 text-[10px] text-gray-500">
               뉴스 언급 횟수 <span className="text-white font-bold">{newsCount}회</span>
             </div>
           )}
        </div>

        {isLocked ? (
          <div className="flex flex-col items-center justify-center gap-3 bg-black/20 backdrop-blur-[2px] rounded-lg py-4 px-3 border border-white/10 shadow-lg relative z-20 min-w-[130px]">
            <div className="text-sm text-gray-300 font-bold">AI 점수</div>
            
            <Button 
              variant="outline" 
              className="h-9 w-full bg-[#1e232b]/80 border-[#00E5BC]/30 hover:bg-[#00E5BC]/10 hover:border-[#00E5BC] text-[#00E5BC] text-xs font-bold transition-all px-2 shadow-lg"
            >
              <Crown className="w-3.5 h-3.5 mr-1.5" />
              Business
            </Button>
          </div>
        ) : aiScore && (
          <div className="flex flex-col items-end gap-1 bg-black/20 backdrop-blur-[2px] rounded-lg p-3 border border-white/10 shadow-lg relative z-20 min-w-[130px]">
            <div className="text-[11px] text-gray-300 font-medium">AI 점수</div>
            <div className="text-3xl font-bold text-white font-mono flex items-baseline gap-1 shadow-black drop-shadow-md">
               {aiScore}
               <span className="text-sm text-gray-400 font-normal">/10</span>
            </div>
            <div className="h-2 w-full bg-[#252b36] rounded-full overflow-hidden mt-2 border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-[#ff3b30] rounded-full shadow-[0_0_10px_rgba(255,59,48,0.5)]" 
                style={{ width: `${(aiScore / 10) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  </Link>
)};

export default function TrendPage() {
  const [activeTab, setActiveTab] = useState("상세뉴스");
  const [selectedSentiment, setSelectedSentiment] = useState<string | null>(null);
  const [stockFilter, setStockFilter] = useState("거래량");

  const filteredKeywords = selectedSentiment 
    ? trendKeywords.filter(k => k.type === selectedSentiment)
    : trendKeywords;

  const filteredNews = selectedSentiment
    ? newsList.filter(n => n.sentiment === selectedSentiment)
    : newsList;

  const handleSentimentClick = (sentiment: string) => {
    if (selectedSentiment === sentiment) {
      setSelectedSentiment(null);
    } else {
      setSelectedSentiment(sentiment);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-white/5">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <ChevronLeft className="w-6 h-6 text-white cursor-pointer" />
            </Link>
            <h1 className="text-lg font-bold text-white">뉴스 트렌드 키워드</h1>
          </div>
        </div>
      </header>

      <main className="space-y-6">
        {/* Trend Map Section */}
        <section className="px-4 pt-4">
          <div className="flex justify-end gap-4 mb-3 text-xs font-medium items-center">
            <span className="text-[10px] text-gray-500 mr-2 animate-pulse hidden sm:inline-block">
              ← 범례선택하면 필터링 됩니다.
            </span>
            <button 
              onClick={() => handleSentimentClick('negative')}
              className={cn(
                "flex items-center gap-2 transition-opacity",
                selectedSentiment && selectedSentiment !== 'negative' ? "opacity-30" : "opacity-100"
              )}
            >
              <span className="w-3 h-3 rounded-full bg-[#ff3b30]"></span>
              <span className="text-gray-400">부정</span>
            </button>
            <button 
              onClick={() => handleSentimentClick('neutral')}
              className={cn(
                "flex items-center gap-2 transition-opacity",
                selectedSentiment && selectedSentiment !== 'neutral' ? "opacity-30" : "opacity-100"
              )}
            >
              <span className="w-3 h-3 rounded-full bg-gray-500"></span>
              <span className="text-gray-400">중립</span>
            </button>
            <button 
              onClick={() => handleSentimentClick('positive')}
              className={cn(
                "flex items-center gap-2 transition-opacity",
                selectedSentiment && selectedSentiment !== 'positive' ? "opacity-30" : "opacity-100"
              )}
            >
              <span className="w-3 h-3 rounded-full bg-[#10b981]"></span>
              <span className="text-gray-400">긍정</span>
            </button>
          </div>

          <div className="bg-[#1e232b] rounded-2xl aspect-[4/3] relative overflow-hidden shadow-inner border border-white/5 transition-all">
            {filteredKeywords.map((item, index) => (
              <div
                key={`${item.text}-${index}`}
                className={cn(
                  "absolute flex items-center justify-center text-center p-2 rounded-full shadow-lg transition-transform hover:scale-110 cursor-pointer animate-float",
                  item.type === "positive" ? "bg-[#10b981] text-[#0a2e22]" : 
                  item.type === "negative" ? "bg-[#ff3b30] text-[#3a0b08]" : 
                  "bg-[#6b7280] text-[#1f2937]"
                )}
                style={{
                  width: `${item.size}px`,
                  height: `${item.size}px`,
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: 'translate(-50%, -50%)',
                  fontSize: `${Math.max(10, item.size / 6)}px`,
                  fontWeight: 'bold',
                  zIndex: Math.floor(item.size),
                  opacity: 0.9
                }}
              >
                {item.text}
              </div>
            ))}
            {filteredKeywords.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                해당하는 키워드가 없습니다.
              </div>
            )}
          </div>
        </section>

        {/* Tab Navigation */}
        <section>
          <div className="flex border-b border-white/5 px-4">
            {["상세뉴스", "관련종목"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 py-3 text-sm font-medium border-b-2 transition-colors relative",
                  activeTab === tab 
                    ? "border-white text-white" 
                    : "border-transparent text-gray-500 hover:text-gray-300"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* News List */}
        {activeTab === "상세뉴스" && (
          <section className="px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                {selectedSentiment === 'positive' ? '긍정 뉴스' :
                 selectedSentiment === 'negative' ? '부정 뉴스' :
                 selectedSentiment === 'neutral' ? '중립 뉴스' :
                 '전체 뉴스'}
              </h2>
              <span className="text-sm text-gray-500">{filteredNews.length}개</span>
            </div>

            <div className="space-y-4">
              {filteredNews.map((news, index) => (
                <div key={index} className="bg-[#1e232b] p-5 rounded-2xl border border-white/5 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "border-0 px-2 py-0.5 text-[10px] font-bold shrink-0",
                        news.sentiment === "positive" ? "bg-[#10b981]/20 text-[#10b981]" : 
                        news.sentiment === "negative" ? "bg-[#ff3b30]/20 text-[#ff3b30]" : 
                        "bg-[#6b7280]/20 text-[#9ca3af]"
                      )}
                    >
                      {news.sentiment === "positive" ? "긍정" : news.sentiment === "negative" ? "부정" : "중립"}
                    </Badge>
                  </div>
                  
                  <h3 className="text-sm font-bold leading-snug text-white">
                    {news.title}
                  </h3>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                    <span className="font-medium text-gray-400">{news.source}</span>
                    <span>{news.timeAgo}</span>
                  </div>
                </div>
              ))}
              
              {filteredNews.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  해당하는 뉴스가 없습니다.
                </div>
              )}
            </div>
          </section>
        )}
        
        {activeTab === "관련종목" && (
           <div className="px-4">
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-bold">전체 관련 종목</h2>
               <span className="text-sm text-gray-500">263개</span>
             </div>

             <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar mb-4 -mx-4 px-4">
               <button className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1e232b] border border-white/5 shrink-0">
                 <SlidersHorizontal className="w-4 h-4 text-gray-400" />
               </button>
               <div className="h-4 w-px bg-white/10 shrink-0 mx-1"></div>
               {["거래량", "거래대금", "시가총액", "등락률"].map((filter) => (
                 <button
                   key={filter}
                   onClick={() => setStockFilter(filter)}
                   className={cn(
                     "px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                     stockFilter === filter
                       ? "bg-[#00E5BC] text-[#151921] font-bold"
                       : "bg-[#1e232b] text-gray-400 border border-white/5 hover:bg-[#2a3038]"
                   )}
                 >
                   {filter}
                 </button>
               ))}
             </div>
             
             <div className="space-y-3 pb-8">
               {relatedStocks.map((stock) => (
                 <StockCard key={stock.code} {...stock} />
               ))}
             </div>
           </div>
        )}
      </main>
      
      <style>{`
        @keyframes float {
          0% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-5px); }
          100% { transform: translate(-50%, -50%) translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        /* Add slight random delays to animations */
        .animate-float:nth-child(2n) { animation-delay: 0.5s; }
        .animate-float:nth-child(3n) { animation-delay: 1s; }
        .animate-float:nth-child(5n) { animation-delay: 1.5s; }
      `}</style>
    </div>
  );
}
