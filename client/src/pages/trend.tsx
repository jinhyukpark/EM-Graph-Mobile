import { useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

export default function TrendPage() {
  const [activeTab, setActiveTab] = useState("상세뉴스");

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
          <div className="flex justify-end gap-3 mb-3 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ff3b30]"></span>
              <span className="text-gray-400">부정</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gray-500"></span>
              <span className="text-gray-400">중립</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
              <span className="text-gray-400">긍정</span>
            </div>
          </div>

          <div className="bg-[#1e232b] rounded-2xl aspect-[4/3] relative overflow-hidden shadow-inner border border-white/5">
            {trendKeywords.map((item, index) => (
              <div
                key={index}
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
              <h2 className="text-lg font-bold">전체 뉴스</h2>
              <span className="text-sm text-gray-500">50개</span>
            </div>

            <div className="space-y-4">
              {newsList.map((news, index) => (
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
            </div>
          </section>
        )}
        
        {activeTab === "관련종목" && (
           <div className="px-4 py-10 text-center text-gray-500">
             준비 중인 기능입니다.
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
