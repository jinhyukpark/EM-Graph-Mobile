import { Link } from "wouter";
import { ChevronLeft, Search, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const IssueStockCard = ({
  code,
  name,
  tag,
  score,
  isPositive
}: {
  code: string;
  name: string;
  tag: string;
  score: string;
  isPositive: boolean;
}) => (
  <Card className="bg-[#1e232b] border border-white/5 p-4 rounded-xl flex justify-between items-center mb-3">
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] text-gray-500">{code}</span>
        <Badge variant="secondary" className="bg-[#2a3038] text-gray-300 border-none text-[10px] px-1.5 py-0.5 font-normal">
          {tag}
        </Badge>
      </div>
      <h3 className="text-base font-bold text-white">{name}</h3>
    </div>
    
    <div className="flex flex-col items-end">
       <div className="text-[10px] text-gray-500 mb-1">AI 점수</div>
       <div className="text-lg font-bold text-white flex items-center gap-1">
         {score}
         <span className={`text-[10px] ${isPositive ? "text-[#ff3b30]" : "text-blue-400"}`}>
           {isPositive ? "▲" : "▼"}
         </span>
       </div>
    </div>
  </Card>
);

export default function NotificationsPage() {
  const fearGreedScore = 98;
  
  return (
    <div className="min-h-screen bg-background pb-20 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-white/5">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <ChevronLeft className="w-6 h-6 text-white cursor-pointer" />
            </Link>
            <h1 className="text-lg font-bold text-white">알림</h1>
          </div>
          <Search className="w-5 h-5 text-white" />
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Fear & Greed Index */}
        <section>
          <Card className="bg-[#151921] border border-white/5 p-5 rounded-2xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-sm font-bold text-gray-300">공포 & 탐욕 지수</h2>
              <div className="text-right">
                <div className="text-4xl font-black text-[#ff3b30] tracking-tighter">{fearGreedScore}<span className="text-lg font-bold text-gray-500 ml-1">점</span></div>
                <div className="text-xs text-gray-400 mt-1 flex items-center justify-end gap-1">
                  <span>🕒</span> 일주일(극도의 탐욕)
                </div>
              </div>
            </div>

            {/* Gauge Chart Visualization */}
            <div className="relative h-32 w-full flex justify-center items-end mb-4">
               <div className="w-[240px] h-[120px] relative overflow-hidden">
                 {/* Gauge Background */}
                 <div className="absolute top-0 left-0 w-full h-full rounded-t-full bg-gray-800 opacity-30"></div>
                 
                 {/* Gradient Arc (Using CSS conic-gradient) */}
                 <div 
                   className="absolute top-0 left-0 w-full h-full rounded-t-full"
                   style={{
                     background: "conic-gradient(from 180deg at 50% 100%, #3b82f6 0deg, #10b981 60deg, #eab308 120deg, #ff3b30 180deg)",
                     maskImage: "radial-gradient(at 50% 100%, transparent 60%, black 61%)",
                     WebkitMaskImage: "radial-gradient(at 50% 100%, transparent 60%, black 61%)"
                   }}
                 ></div>

                 {/* Needle */}
                 <div 
                   className="absolute bottom-0 left-1/2 w-1 h-[110px] bg-white origin-bottom rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 transition-transform duration-1000 ease-out"
                   style={{ transform: `translateX(-50%) rotate(${(fearGreedScore / 100) * 180 - 90}deg)` }}
                 >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-md"></div>
                 </div>
                 
                 {/* Center Pivot */}
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full z-20"></div>
               </div>
               
               <div className="absolute bottom-0 left-8 text-xs text-gray-500 font-bold">EF</div>
               <div className="absolute bottom-0 right-8 text-xs text-gray-500 font-bold">EG</div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" className="bg-[#252b36] border-none text-gray-300 hover:bg-[#2f3642] text-xs h-8 rounded-full">
                <CheckCircle2 className="w-3 h-3 mr-1.5" />
                체크포인트
              </Button>
            </div>
          </Card>
        </section>

        {/* Buy/Sell Counts */}
        <section className="grid grid-cols-2 gap-4">
          <Card className="bg-[#151921] border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:bg-[#1a1f29] transition-colors">
            <h3 className="text-sm font-bold text-blue-400 mb-2">강한매도</h3>
            <div className="text-3xl font-black text-white mb-1">345<span className="text-sm font-normal text-gray-500 ml-0.5">개</span></div>
            <div className="text-[10px] text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">
              7일간 이내 -0.51%
            </div>
          </Card>
          
          <Card className="bg-[#151921] border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:bg-[#1a1f29] transition-colors">
            <h3 className="text-sm font-bold text-[#ff3b30] mb-2">강한매수</h3>
            <div className="text-3xl font-black text-white mb-1">245<span className="text-sm font-normal text-gray-500 ml-0.5">개</span></div>
            <div className="text-[10px] text-[#ff3b30] bg-[#ff3b30]/10 px-2 py-0.5 rounded-full">
              7일간 이내 -0.30%
            </div>
          </Card>
        </section>

        {/* Issue Stocks */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-200">이슈 종목</h3>
              <p className="text-xs text-gray-500 mt-0.5">오늘 22:20 기준</p>
            </div>
            <Button variant="ghost" className="text-xs text-gray-500 hover:text-white bg-[#1e232b] h-7 rounded-full">
              자세히보기
            </Button>
          </div>

          <div className="space-y-3">
            <IssueStockCard 
              code="006800" 
              name="미래에셋증권" 
              tag="사상최고치" 
              score="9.2" 
              isPositive={true} 
            />
            <IssueStockCard 
              code="005930" 
              name="삼성전자" 
              tag="수급급증" 
              score="8.5" 
              isPositive={true} 
            />
            <IssueStockCard 
              code="035720" 
              name="카카오" 
              tag="낙폭과대" 
              score="7.8" 
              isPositive={false} 
            />
          </div>
        </section>
      </main>
    </div>
  );
}
