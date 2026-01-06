import { useState } from "react";
import { Link } from "wouter";
import { 
  ChevronLeft, 
  ChevronDown, 
  Star, 
  Crown,
  Info,
  Search,
  SlidersHorizontal,
  X,
  RefreshCcw,
  Check
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MomentumCard = ({
  code,
  name,
  market,
  price,
  change,
  score,
  period,
  stats
}: {
  code: string,
  name: string,
  market: string,
  price: string,
  change: string,
  score: number,
  period: string,
  stats: {
    strength10: string,
    elasticity: string,
    strength20: string,
    defense: string
  }
}) => {
  const isPositive = !change.startsWith("-");

  return (
    <Card className="bg-[#151921] border border-white/5 p-5 rounded-2xl mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">{code}</div>
          <h3 className="text-lg font-bold text-white mb-0.5">{name}</h3>
          <span className="text-[10px] text-gray-500">{market}</span>
        </div>
        <Star className="w-5 h-5 text-gray-600" />
      </div>

      {/* Chart Area Placeholder */}
      <div className="h-16 w-full mb-4 relative opacity-80">
         <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible preserve-3d">
           <defs>
             <linearGradient id={`gradient-${code}`} x1="0" y1="0" x2="0" y2="1">
               <stop offset="0%" stopColor={isPositive ? "#ef4444" : "#3b82f6"} stopOpacity="0.5"/>
               <stop offset="100%" stopColor={isPositive ? "#ef4444" : "#3b82f6"} stopOpacity="0"/>
             </linearGradient>
           </defs>
           <path 
             d={isPositive ? "M0,35 C20,30 40,32 60,15 C80,5 100,10" : "M0,5 C20,10 40,8 60,25 C80,35 100,30"}
             fill="none" 
             stroke={isPositive ? "#ef4444" : "#3b82f6"} 
             strokeWidth="3"
             strokeLinecap="round"
           />
           <path 
             d={`${isPositive ? "M0,35 C20,30 40,32 60,15 C80,5 100,10" : "M0,5 C20,10 40,8 60,25 C80,35 100,30"} V40 H0 Z`}
             fill={`url(#gradient-${code})`} 
             opacity="0.3"
           />
         </svg>
         
         {/* AI Score Badge Floating on Chart */}
         <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end">
           <div className="text-[10px] text-gray-400 mb-1">AI 점수</div>
           <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-red-500 rounded-full px-3 py-1">
             <span className="text-sm font-bold text-white">{score}</span>
           </div>
           <div className="text-[10px] text-red-400 mt-1 text-right w-full">{period}</div>
         </div>
      </div>

      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-gray-400 text-xs">종가</span>
        <span className="text-lg font-bold text-white">{price}원</span>
        <span className={`text-sm ${isPositive ? "text-red-400" : "text-blue-400"}`}>{change}</span>
      </div>

      <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-xs">
        <div>
          <div className="text-gray-500 mb-1">10일간 주가 강도</div>
          <div className="flex justify-between">
            <span className="text-gray-400">상승탄력</span>
            <span className="text-red-400">{stats.elasticity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">하락방어</span>
            <span className="text-blue-400">{stats.defense}</span>
          </div>
        </div>
        <div>
          <div className="text-gray-500 mb-1">20일간 주가 강도</div>
          <div className="flex justify-between">
            <span className="text-gray-400">상승탄력</span>
            <span className="text-red-400">{stats.strength20}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">하락방어</span>
            <span className="text-red-400">{stats.strength10}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

const AIRecommendCard = ({ 
  rank, 
  name, 
  price, 
  diff, 
  score, 
  tags, 
  description 
}: { 
  rank: number, 
  name: string, 
  price: string, 
  diff: string, 
  score: number, 
  tags: string[], 
  description: string[] 
}) => {
  const isPositive = !diff.startsWith("-");
  
  return (
    <Card className="bg-[#151921] border border-white/5 p-5 rounded-2xl relative overflow-hidden mb-4">
       {/* Background Glow */}
       {rank === 1 && (
         <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-3xl -mr-10 -mt-10 rounded-full pointer-events-none" />
       )}

       <div className="flex justify-between items-start mb-2">
         <div className="flex items-center gap-2">
           <Crown className={`w-5 h-5 ${rank === 1 ? "text-yellow-400 fill-yellow-400" : rank === 2 ? "text-gray-300 fill-gray-300" : rank === 3 ? "text-amber-700 fill-amber-700" : "text-gray-500"}`} />
           <span className="text-lg font-bold text-gray-400 italic">{rank}</span>
         </div>
         <Star className="w-5 h-5 text-gray-600" />
       </div>

       <div className="flex justify-between items-end mb-3">
         <div>
           <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
           <div className="flex items-baseline gap-2">
             <span className="text-lg font-bold text-white">{price}</span>
             <span className={`text-xs font-medium ${isPositive ? "text-red-400" : "text-blue-400"}`}>
               {isPositive ? "▲" : "▼"} {diff.replace("-", "")}
             </span>
           </div>
         </div>
         <div className="text-right flex flex-col items-end">
            <div className="text-5xl font-black text-[#00E5BC] tracking-tighter drop-shadow-[0_0_10px_rgba(0,229,188,0.3)]" style={{ fontFamily: 'var(--font-mono)' }}>{score}</div>
            <div className="text-[10px] text-[#00E5BC]/80 font-bold -mt-1 mr-1">AI SCORE</div>
         </div>
       </div>

       <div className="flex flex-wrap gap-1.5 mb-4">
         {tags.map((tag, i) => (
           <Badge key={i} variant="secondary" className="bg-[#252b36] text-gray-300 hover:bg-[#2f3642] border-none text-[10px] px-2 py-0.5 rounded-md font-normal">
             {tag}
           </Badge>
         ))}
       </div>

       <div className="space-y-1.5">
         {description.map((desc, i) => (
           <div key={i} className="flex gap-2 text-xs text-gray-400 leading-relaxed">
             <span className="text-gray-600">•</span>
             <span>{desc}</span>
           </div>
         ))}
       </div>
    </Card>
  );
};

const StrongSignalCard = ({
  code,
  name,
  price,
  diff,
  percent,
  aiScore,
  volume,
  isPositive,
}: {
  code: string;
  name: string;
  price: string;
  diff: string;
  percent: string;
  aiScore: number;
  volume: string;
  isPositive: boolean;
}) => {
  return (
    <Card className="bg-[#151921] border border-white/5 p-4 rounded-xl mb-3">
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="text-[10px] text-gray-500 block mb-0.5">{code}</span>
          <h3 className="text-sm font-bold text-white">{name}</h3>
        </div>
        <div className="flex gap-3">
          {/* Mini Chart Placeholder */}
          <div className="w-16 h-8 opacity-70">
            <svg viewBox="0 0 60 30" className="w-full h-full overflow-visible">
              <path
                d={isPositive ? "M0,30 C10,25 20,28 30,15 C40,5 50,10 60,0" : "M0,0 C10,5 20,2 30,15 C40,25 50,20 60,30"}
                fill="none"
                stroke={isPositive ? "#ef4444" : "#3b82f6"}
                strokeWidth="2"
              />
            </svg>
          </div>
          <Star className="w-4 h-4 text-gray-600" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-lg font-bold text-white">{price}원</span>
        <span className={`text-xs ${isPositive ? "text-red-400" : "text-blue-400"}`}>
          {diff}원 <span className="ml-1">{percent}%</span>
        </span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-end text-[10px] text-gray-400 mb-1">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-red-500"></span>
            AI 점수
          </div>
          <span className="text-white font-mono">{aiScore.toFixed(2)}<span className="text-gray-600">/10</span></span>
        </div>
        <div className="h-1.5 w-full bg-[#252b36] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 rounded-full" 
            style={{ width: `${(aiScore / 10) * 100}%` }}
          />
        </div>
        <div className="text-[10px] text-gray-500 mt-2">
          거래량 <span className="text-gray-300">{volume}주</span>
        </div>
      </div>
    </Card>
  );
};

const FilterChip = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap",
      isActive 
        ? "bg-[#00E5BC] text-[#151921] shadow-[0_0_10px_rgba(0,229,188,0.2)]" 
        : "bg-[#1e232b] text-gray-400 border border-white/5 hover:bg-[#252b36]"
    )}
  >
    {label}
  </button>
);

const FilterDrawer = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [volumeRange, setVolumeRange] = useState([0, 100]);
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="px-3 py-2 rounded-full bg-[#1e232b] border border-white/5 text-gray-400 hover:bg-[#252b36] flex items-center justify-center shrink-0 transition-colors active:scale-95">
           <SlidersHorizontal className="w-4 h-4" />
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="bg-[#151921] border-t border-white/10 text-white rounded-t-[20px] max-h-[85vh] overflow-y-auto">
        <div className="mx-auto mt-2 h-1.5 w-[50px] rounded-full bg-white/10 mb-6" /> {/* Handle */}
        <div className="mx-auto w-full max-w-sm">
          <SheetHeader>
            <SheetTitle className="text-lg font-bold text-center text-white">상세 필터 설정</SheetTitle>
            <SheetDescription className="text-center text-gray-500 text-xs">
              원하는 조건으로 종목을 필터링해보세요.
            </SheetDescription>
          </SheetHeader>
          <div className="p-4 space-y-6">
            
            {/* Price Range */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-semibold text-gray-300">주가 범위</Label>
                <span className="text-xs text-[#00E5BC] font-mono">1,000원 ~ 500,000원</span>
              </div>
              <Slider 
                defaultValue={[20, 80]} 
                max={100} 
                step={1} 
                className="[&_.bg-primary]:bg-[#00E5BC] [&_.border-primary]:border-[#00E5BC]"
              />
              <div className="flex justify-between text-[10px] text-gray-600 font-mono">
                <span>Min</span>
                <span>Max</span>
              </div>
            </div>

            {/* Volume Range */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-semibold text-gray-300">거래량 (일일)</Label>
                <span className="text-xs text-[#00E5BC] font-mono">10만주 이상</span>
              </div>
              <Slider 
                defaultValue={[30]} 
                max={100} 
                step={1} 
                className="[&_.bg-primary]:bg-[#00E5BC] [&_.border-primary]:border-[#00E5BC]"
              />
               <div className="flex justify-between text-[10px] text-gray-600 font-mono">
                <span>0</span>
                <span>1,000만+</span>
              </div>
            </div>

            {/* Financial Filters */}
            <div className="space-y-3">
               <Label className="text-sm font-semibold text-gray-300 mb-2 block">재무 건전성</Label>
               <div className="space-y-3">
                 <div className="flex items-center justify-between">
                   <Label htmlFor="profit" className="text-sm text-gray-400 font-normal">영업이익 흑자 (최근 1년)</Label>
                   <Switch id="profit" className="data-[state=checked]:bg-[#00E5BC] bg-[#252b36]" />
                 </div>
                 <div className="flex items-center justify-between">
                   <Label htmlFor="debt" className="text-sm text-gray-400 font-normal">부채비율 200% 이하</Label>
                   <Switch id="debt" className="data-[state=checked]:bg-[#00E5BC] bg-[#252b36]" defaultChecked />
                 </div>
                 <div className="flex items-center justify-between">
                    <Label htmlFor="foreign" className="text-sm text-gray-400 font-normal">외국인 순매수 지속</Label>
                    <Switch id="foreign" className="data-[state=checked]:bg-[#00E5BC] bg-[#252b36]" />
                 </div>
               </div>
            </div>

          </div>
          <SheetFooter className="flex-row gap-2 pt-2 pb-8 sm:justify-between">
            <Button variant="outline" className="flex-1 bg-[#1e232b] border-white/5 text-gray-400 hover:bg-[#252b36] hover:text-white border-0 h-12 rounded-xl">
              <RefreshCcw className="w-4 h-4 mr-2" />
              초기화
            </Button>
            <SheetClose asChild>
              <Button className="flex-1 bg-[#00E5BC] text-[#151921] hover:bg-[#00E5BC]/90 font-bold h-12 rounded-xl">
                <Check className="w-4 h-4 mr-2" />
                필터 적용
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default function AIRecommendPage() {
  const [activeTab, setActiveTab] = useState("weekly");
  const [activeFilter, setActiveFilter] = useState("거래량");

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-white/5">
        <div className="px-4 py-3 flex items-center gap-2">
          <Link href="/">
            <ChevronLeft className="w-6 h-6 text-white cursor-pointer" />
          </Link>
          <h1 className="text-lg font-bold text-white">AI 추천</h1>
        </div>
        
        {/* Tabs */}
        <div className="px-2 overflow-x-auto no-scrollbar">
          <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-transparent h-auto p-0 gap-6 w-full justify-start border-b border-white/5 rounded-none px-2">
              {["주간추천", "강한매도", "강한매수", "모멘텀분석"].map((tab) => (
                <TabsTrigger 
                  key={tab} 
                  value={tab === "주간추천" ? "weekly" : tab}
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white rounded-none px-0 py-3 text-sm text-gray-500 font-medium bg-transparent border-b-2 border-transparent transition-all"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </header>

      {/* Conditional Content based on Tab */}
      {activeTab === "weekly" ? (
        <>
          {/* Filter Bar for Weekly */}
          <div className="px-4 py-3 bg-[#151921] border-b border-white/5">
            <Select defaultValue="2026-01-02">
              <SelectTrigger className="w-full bg-[#1e232b] border-white/5 text-gray-300 h-10 rounded-lg text-sm">
                <SelectValue placeholder="기간 선택" />
              </SelectTrigger>
              <SelectContent className="bg-[#1e232b] border-white/10 text-white">
                <SelectItem value="2026-01-02">2026년 1월 2주차(2026-01-05)</SelectItem>
                <SelectItem value="2026-01-01">2026년 1월 1주차(2025-12-29)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <main className="px-4 py-6">
            {/* Banner */}
            <div className="text-center mb-8">
               <h2 className="text-xl font-bold text-white mb-2">AI 주간 랭킹 리포트</h2>
               <p className="text-sm text-gray-400 mb-3 px-8 leading-relaxed">
                 빅데이터 분석을 통해 이번 주 상승 여력이 가장 높은<br/>
                 <span className="text-white font-semibold">Top 10 종목</span>을 선정했습니다.
               </p>
               <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 bg-[#151921] py-2 px-4 rounded-full inline-flex border border-white/5 mx-auto">
                 <span>안녕하세요 <span className="text-[#00E5BC] font-medium">jhpark</span>님! AI가 분석한 투자의견을 확인해보세요.</span>
               </div>
            </div>

            {/* List */}
            <div className="space-y-4">
               <AIRecommendCard 
                 rank={1}
                 name="SK하이닉스"
                 price="677,000"
                 diff="+26000"
                 score={10}
                 tags={["반도체", "HBM", "AI", "메모리", "성장주"]}
                 description={[
                   "AI 수요 증가로 HBM 메모리 시장에서 선도적 위치를 점하고 있어 고성장 잠재력이 크다.",
                   "반도체 산업의 글로벌 공급망 재편 속에서 기술 우위가 지속적인 수익 개선을 이끌 전망이다.",
                   "2026년 KOSDAQ 혁신 계획에 부합하는 첨단 기술 기업으로 시장 재평가 기대가 높다."
                 ]}
               />
               
               <AIRecommendCard 
                 rank={2}
                 name="삼성물산"
                 price="245,000"
                 diff="+5500"
                 score={10}
                 tags={["상사", "건설", "패션", "상패", "다각화"]}
                 description={[
                   "상패무역과 건설 부문의 글로벌 프로젝트 수주가 실적을 견인한다.",
                   "지주사 전환 기대감으로 기업가치 재평가가 진행 중이다.",
                   "다각화된 사업 포트폴리오가 경기 변동성에 강하다."
                 ]}
               />
               
               <AIRecommendCard 
                 rank={3}
                 name="씨어스테크놀로지"
                 price="122,900"
                 diff="-7200"
                 score={10}
                 tags={["AI", "반도체", "IP", "칩셋", "데이터센터"]}
                 description={[
                   "AI 칩 IP 라이선싱 사업의 고성장세가 지속된다.",
                   "데이터센터 및 엣지 컴퓨팅 트렌드 수혜가 크다.",
                   "소프트웨어 중심 모델로 높은 마진율을 유지한다."
                 ]}
               />
            </div>
          </main>
        </>
      ) : activeTab === "강한매도" ? (
        <>
          {/* Banner for Strong Sell */}
          <div className="px-4 py-6 text-center">
             <h2 className="text-xl font-bold text-white mb-2">AI 강한 매도 시그널</h2>
             <p className="text-sm text-gray-400 mb-4 px-8 leading-relaxed">
               빅데이터 분석 결과 <span className="text-red-400 font-semibold">하락 위험이 감지된 종목</span>입니다.<br/>
               투자 판단에 각별한 유의가 필요합니다.
             </p>
             
             {/* Prediction Period Icons */}
             <div className="flex justify-center gap-2 mb-2">
               {["1주", "2주", "4주", "6주"].map((period) => (
                 <div key={period} className="flex flex-col items-center gap-1 cursor-pointer group">
                   <div className="w-10 h-10 rounded-full bg-[#1e232b] border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:border-red-500/50 group-hover:text-red-400 group-hover:bg-red-500/10 transition-all">
                     {period}
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Sort Filters */}
          <div className="sticky top-[105px] z-30 bg-background/95 backdrop-blur-md px-4 py-3 border-b border-white/5 flex gap-2 overflow-x-auto no-scrollbar items-center">
            <FilterDrawer />
            <div className="w-[1px] h-6 bg-white/10 mx-1 shrink-0" />
            {["거래량", "거래대금", "시가총액", "등락률"].map((filter) => (
              <FilterChip 
                key={filter} 
                label={filter} 
                isActive={activeFilter === filter} 
                onClick={() => setActiveFilter(filter)} 
              />
            ))}
          </div>
          
          <div className="px-4 py-2 flex justify-end">
             <span className="text-[10px] text-gray-500">2026-01-05 기준</span>
          </div>

          <main className="px-4 pb-6">
            <StrongSignalCard 
              code="010170"
              name="대한광통신"
              price="2,840"
              diff="-505"
              percent="-15.1"
              aiScore={0.03}
              volume="37,828,100"
              isPositive={false}
            />
            <StrongSignalCard 
              code="024910"
              name="경창산업"
              price="2,255"
              diff="286"
              percent="14.53"
              aiScore={0.49}
              volume="18,344,072"
              isPositive={true}
            />
            <StrongSignalCard 
              code="074430"
              name="아미노로직스"
              price="1,682"
              diff="1"
              percent="0.06"
              aiScore={0.48}
              volume="17,181,684"
              isPositive={true}
            />
            <StrongSignalCard 
              code="093240"
              name="형지엘리트"
              price="1,937"
              diff="-273"
              percent="-12.35"
              aiScore={0.12}
              volume="16,857,977"
              isPositive={false}
            />
            <StrongSignalCard 
              code="321370"
              name="센서뷰"
              price="1,960"
              diff="180"
              percent="10.11"
              aiScore={1.85}
              volume="15,241,441"
              isPositive={true}
            />
             <StrongSignalCard 
              code="274090"
              name="켄코아에어로스페이스"
              price="21,400"
              diff="950"
              percent="4.65"
              aiScore={2.10}
              volume="8,241,441"
              isPositive={true}
            />
          </main>
        </>
      ) : activeTab === "모멘텀분석" ? (
        <>
          {/* Banner for Momentum Analysis */}
          <div className="px-4 py-6 text-center">
             <h2 className="text-xl font-bold text-white mb-2">AI 모멘텀 분석</h2>
             <p className="text-sm text-gray-400 mb-0 px-4 leading-relaxed">
               상승장과 하락장에서의 <span className="text-[#00E5BC] font-semibold">추세를 정밀 분석</span>하여,<br/>
               시장 상황에 맞는 유연한 투자 전략을 제시합니다.
             </p>
          </div>

          {/* Search Bar */}
          <div className="px-4 mb-4 sticky top-[105px] z-30 bg-background/95 backdrop-blur-md pb-2 pt-2">
            <div className="relative">
              <Input 
                placeholder="종목명 또는 종목코드 검색" 
                className="bg-[#1e232b] border-white/10 text-white pl-4 pr-10 h-11 rounded-xl placeholder:text-gray-600"
              />
              <Search className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
            <div className="flex justify-end mt-2">
               <div className="text-[10px] text-gray-500 flex items-center gap-1">
                 2026-01-05 기준
               </div>
            </div>
          </div>

          <main className="px-4 pb-6">
            <MomentumCard 
              code="043260"
              name="성호전자"
              market="KOSDAQ"
              price="12,490"
              change="+15.65%"
              score={10}
              period="1주 이내"
              stats={{
                strength10: "+0.50%",
                elasticity: "+11.40%",
                strength20: "+14.24%",
                defense: "-0.43%"
              }}
            />
            <MomentumCard 
              code="419080"
              name="엔젯"
              market="KOSDAQ"
              price="9,450"
              change="+4.30%"
              score={10}
              period="1주 이내"
              stats={{
                strength10: "+3.44%",
                elasticity: "+0.40%",
                strength20: "+3.12%",
                defense: "+4.09%"
              }}
            />
            <MomentumCard 
              code="376900"
              name="로켓헬스케어"
              market="KOSDAQ"
              price="63,300"
              change="+1.77%"
              score={10}
              period="1주 이내"
              stats={{
                strength10: "-1.71%",
                elasticity: "-2.87%",
                strength20: "-1.08%",
                defense: "+0.42%"
              }}
            />
            <MomentumCard 
              code="203650"
              name="드림시큐리티"
              market="KOSDAQ"
              price="3,410"
              change="-2.15%"
              score={9}
              period="2주 이내"
              stats={{
                strength10: "+1.20%",
                elasticity: "+5.10%",
                strength20: "+8.45%",
                defense: "-1.12%"
              }}
            />
          </main>
        </>
      ) : (
        <div className="min-h-[50vh] flex items-center justify-center text-gray-500">
          준비 중인 서비스입니다.
        </div>
      )}
    </div>
  );
}
