import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  Bell, 
  Search, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  Star,
  Building2,
  Puzzle,
  Plane,
  Clock,
  CheckCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonDashboard = () => (
  <div className="pb-8">
    {/* Header Skeleton */}
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="h-8 bg-background border-b border-white/5 px-4 flex items-center">
         <Skeleton className="h-4 w-64 bg-gray-800" />
      </div>
      <div className="px-4 py-3 flex items-center justify-between">
        <Skeleton className="h-8 w-32 bg-gray-800" />
        <div className="flex gap-2">
          <Skeleton className="w-8 h-8 rounded-full bg-gray-800" />
          <Skeleton className="w-8 h-8 rounded-full bg-gray-800" />
          <Skeleton className="w-8 h-8 rounded-full bg-gray-800" />
        </div>
      </div>
    </header>

    <main className="px-4 space-y-6 pt-6">
      {/* Gauge Skeleton */}
      <Skeleton className="h-44 w-full rounded-2xl bg-[#1e232b]" />
      
      {/* Signal Cards Skeleton */}
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-32 rounded-2xl bg-[#1e232b]" />
        <Skeleton className="h-32 rounded-2xl bg-[#1e232b]" />
      </div>

      {/* Sections Skeleton */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-24 bg-gray-800" />
            <Skeleton className="h-6 w-16 bg-gray-800 rounded-full" />
          </div>
          <div className="flex gap-3 overflow-hidden">
            <Skeleton className="h-40 w-40 rounded-xl bg-[#1e232b] shrink-0" />
            <Skeleton className="h-40 w-40 rounded-xl bg-[#1e232b] shrink-0" />
            <Skeleton className="h-40 w-40 rounded-xl bg-[#1e232b] shrink-0" />
          </div>
        </div>
      ))}
    </main>
  </div>
);

const StockCard = ({  
  code, 
  name, 
  price, 
  diff, 
  percent, 
  isUp, 
  badge,
  aiScore 
}: { 
  code: string, 
  name: string, 
  price: string, 
  diff: string, 
  percent: string, 
  isUp: boolean,
  badge?: string,
  aiScore?: number
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
           
           <div className="mt-2 text-[10px] text-gray-500">
             뉴스 언급 횟수 <span className="text-white font-bold">263회</span>
           </div>
        </div>

        {aiScore && (
          <div className="flex flex-col items-end gap-1 bg-black/40 backdrop-blur-md rounded-lg p-3 border border-white/10 shadow-lg relative z-20">
            <div className="text-[11px] text-gray-300 font-medium">AI 점수</div>
            <div className="text-3xl font-bold text-white font-mono flex items-baseline gap-1 shadow-black drop-shadow-md">
               {aiScore}
               <span className="text-sm text-gray-400 font-normal">/10</span>
            </div>
            <div className="h-2 w-28 bg-[#252b36] rounded-full overflow-hidden mt-2 border border-white/5">
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

const RealTimeRow = ({ 
  icon, 
  name, 
  price, 
  percent, 
  amount, 
  isUp 
}: { 
  icon?: React.ReactNode, 
  name: string, 
  price: string, 
  percent: string, 
  amount: string, 
  isUp: boolean 
}) => (
  <Link href={`/stock/005930`}>
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 cursor-pointer active:bg-white/5 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white overflow-hidden">
          {icon}
        </div>
        <div>
          <div className="font-bold text-sm text-white">{name}</div>
          <div className="text-xs text-gray-400">
            {price}원 <span className={isUp ? 'text-[#ff3b30]' : 'text-blue-400'}>{percent}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm text-gray-300 font-medium">{amount}</div>
      </div>
    </div>
  </Link>
);

const FearGreedGauge = () => (
  <div className="relative h-44 w-full bg-[#1e232b] rounded-2xl border border-white/5 p-5 overflow-hidden">
    <div className="flex justify-between items-start relative z-10">
      <div className="text-base text-gray-200 font-medium pt-1">
        공포 & 탐욕 지수
      </div>
      
      <div className="flex flex-col items-end">
        <div className="flex items-baseline">
          <span className="text-5xl font-bold text-[#ff3b30] tracking-tighter">98</span>
          <span className="text-lg text-gray-400 ml-1 font-medium">점</span>
        </div>
        <div className="flex items-center gap-1.5 text-base text-white/90 font-medium mt-1 mb-6">
          <Clock className="w-4 h-4" />
          <span>일주일(극도의 탐욕)</span>
        </div>
        <Button variant="ghost" size="sm" className="h-10 text-sm rounded-full bg-[#0f1115] border border-white/5 text-white hover:bg-[#1a1d24] hover:text-white px-5 transition-all shadow-lg">
          <CheckCircle className="w-4 h-4 mr-2" />
          체크포인트
        </Button>
      </div>
    </div>

    {/* Gauge Positioned Absolute Center-Bottom-Leftish */}
    <div className="absolute bottom-5 left-4 w-48 h-28">
       <svg viewBox="0 0 200 110" className="w-full h-full overflow-visible">
         <defs>
           <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
             <stop offset="0%" stopColor="#10b981" />
             <stop offset="50%" stopColor="#fbbf24" />
             <stop offset="100%" stopColor="#ff3b30" />
           </linearGradient>
         </defs>
         {/* Background Arc */}
         <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#334155" strokeWidth="16" strokeLinecap="round" opacity="0.5" />
         {/* Value Arc (Full for 98) */}
         <path d="M 20 100 A 80 80 0 0 1 175 95" fill="none" stroke="url(#gaugeGradient)" strokeWidth="16" strokeLinecap="round" />
         
         {/* Needle */}
         <line x1="100" y1="100" x2="160" y2="60" stroke="white" strokeWidth="5" />
         <circle cx="100" cy="100" r="8" fill="white" />
         
         {/* Labels */}
         <text x="20" y="120" fill="#94a3b8" fontSize="12" fontWeight="500" textAnchor="middle">EF</text>
         <text x="180" y="120" fill="#94a3b8" fontSize="12" fontWeight="500" textAnchor="middle">EG</text>
       </svg>
    </div>
  </div>
);

const CategoryCard = ({ 
  icon: Icon, 
  rank, 
  title, 
  total, 
  upCount, 
  avgPercent, 
  bgColor = "bg-gray-800" 
}: any) => (
  <Card className={`min-w-[140px] p-4 ${bgColor} border-none rounded-xl text-white flex flex-col justify-between h-[180px]`}>
    <div className="flex justify-center py-4">
      <Icon className="w-12 h-12 opacity-80" />
    </div>
    <div>
      <div className="flex justify-between items-end mb-1">
        <span className="font-bold text-lg">{rank}위</span>
        <span className="text-[10px] text-white/60">{total}개 중 {upCount}종목 상승</span>
      </div>
      <div className="font-bold mb-2 truncate">{title}</div>
      <div className="text-xs text-[#ff3b30] font-medium">평균 등락률 {avgPercent}</div>
    </div>
  </Card>
);

const Bubble = ({ 
  text, 
  color, 
  size, 
  top, 
  left, 
  delay = 0 
}: { 
  text: string, 
  color: string, 
  size: string, 
  top: string, 
  left: string,
  delay?: number 
}) => {
  const isGreen = color === "#10b981";
  
  return (
    <motion.div 
      className={`absolute rounded-full flex items-center justify-center text-center text-[11px] font-bold text-white z-10 cursor-pointer hover:scale-110 transition-transform duration-300`}
      style={{ 
        width: size, 
        height: size, 
        top: top, 
        left: left,
        background: isGreen 
          ? `radial-gradient(circle at 30% 30%, #34d399, #059669)` 
          : `radial-gradient(circle at 30% 30%, #9ca3af, #4b5563)`,
        boxShadow: isGreen 
          ? `0 0 15px rgba(16, 185, 129, 0.4), inset 0 2px 4px rgba(255,255,255,0.3)` 
          : `0 0 5px rgba(107, 114, 128, 0.2), inset 0 2px 4px rgba(255,255,255,0.1)`,
      }}
      animate={{ 
        y: [0, -10, 0],
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: delay
      }}
    >
      <span className="px-1 leading-tight drop-shadow-md">{text}</span>
    </motion.div>
  );
};

import StockTicker from "@/components/ui/stock-ticker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonDashboard />;
  }

  return (
    <div className="pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-white/5">
        {/* Ticker Bar */}
        <div className="h-8 bg-background flex items-center justify-start border-b border-white/5 overflow-hidden px-4">
          <StockTicker />
        </div>
        
        {/* Main Header */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Stock<span className="font-light text-gray-300">link</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-gray-800 text-white">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-gray-800 text-white relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#ff3b30] rounded-full border-2 border-[#151921]" />
            </Button>
            <Avatar className="w-8 h-8 border border-white/10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="px-4 space-y-6">
        {/* Fear & Greed + Signal Counts */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <FearGreedGauge />
          
          <div className="grid grid-cols-2 gap-3">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative bg-[#1e232b] p-5 rounded-2xl border border-white/5 text-center shadow-lg overflow-hidden"
            >
              {/* Blue Gradient Flare */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />
              
              <div className="relative z-10">
                <div className="text-blue-400 text-lg font-bold mb-1">강한매도</div>
                <div className="flex items-baseline justify-center gap-0.5 mb-2">
                    <span className="text-4xl font-bold text-white tracking-tight">345</span>
                    <span className="text-base font-normal text-gray-500 mb-1">개</span>
                </div>
                <div className="text-xs text-gray-400 font-medium">7일간 이내 <span className="text-blue-400">-0.51%</span></div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative bg-[#1e232b] p-5 rounded-2xl border border-white/5 text-center shadow-lg overflow-hidden"
            >
               {/* Red Gradient Flare */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#ff3b30]/20 blur-3xl rounded-full pointer-events-none" />

              <div className="relative z-10">
                <div className="text-[#ff3b30] text-lg font-bold mb-1">강한매수</div>
                <div className="flex items-baseline justify-center gap-0.5 mb-2">
                    <span className="text-4xl font-bold text-white tracking-tight">245</span>
                    <span className="text-base font-normal text-gray-500 mb-1">개</span>
                </div>
                <div className="text-xs text-gray-400 font-medium">7일간 이내 <span className="text-blue-400">-0.30%</span></div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Issue Stocks */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-lg font-bold text-white">이슈 종목</h2>
              <p className="text-xs text-gray-500">오늘 22:20 기준</p>
            </div>
            <Button variant="ghost" size="sm" className="h-7 text-xs rounded-full bg-gray-800 text-gray-300">
              자세히보기
            </Button>
          </div>
          
          <div className="flex flex-col gap-3">
            <StockCard 
              code="006800"
              name="미래에셋증권"
              price="28,700"
              diff="+3,200"
              percent="+12.55"
              isUp={true}
              badge="사상최고치"
              aiScore={3.27}
            />
            <StockCard 
              code="001510"
              name="SK증권"
              price="683"
              diff="+34"
              percent="+5.24"
              isUp={true}
              badge="사상최고치"
            />
             <StockCard 
              code="003530"
              name="한화투자증권"
              price="5,000"
              diff="+190"
              percent="+3.95"
              isUp={true}
              badge="사상최고치"
            />
          </div>
        </motion.section>

        {/* Real Time Chart */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-lg font-bold text-white">실시간 차트</h2>
              <p className="text-xs text-gray-500">오늘 13:11 기준</p>
            </div>
            <Button variant="ghost" size="sm" className="h-7 text-xs rounded-full bg-gray-800 text-gray-300">
              자세히보기
            </Button>
          </div>

          <div className="flex gap-4 border-b border-gray-800 mb-4">
            <button className="pb-2 text-sm font-bold text-white border-b-2 border-white">거래대금</button>
            <button className="pb-2 text-sm font-medium text-gray-500">급상승</button>
            <button className="pb-2 text-sm font-medium text-gray-500">급하락</button>
          </div>

          <div className="space-y-1">
            <RealTimeRow 
              icon={<div className="bg-blue-600 w-full h-full flex items-center justify-center font-bold text-[10px]">SAM</div>}
              name="삼성전자"
              price="138,900원"
              percent="0.58%"
              amount="6조 1,409억원"
              isUp={false}
            />
             <RealTimeRow 
              icon={<div className="bg-[#ff3b30] w-full h-full flex items-center justify-center font-bold text-[10px]">SK</div>}
              name="SK하이닉스"
              price="726,000원"
              percent="4.31%"
              amount="3조 3,530억원"
              isUp={true}
            />
             <RealTimeRow 
              icon={<div className="bg-gray-600 w-full h-full flex items-center justify-center font-bold text-[10px]">ETF</div>}
              name="KODEX 레버리지"
              price="56,375원"
              percent="3.45%"
              amount="1조 3,322억원"
              isUp={true}
            />
             <RealTimeRow 
              icon={<div className="bg-blue-500 w-full h-full flex items-center justify-center font-bold text-[10px]">HM</div>}
              name="한미반도체"
              price="183,700원"
              percent="9.8%"
              amount="1조 693억원"
              isUp={true}
            />
          </div>
        </motion.section>

        {/* Popular Categories */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
           <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-lg font-bold text-white">인기 카테고리</h2>
              <p className="text-xs text-gray-500">오늘 13:10 기준</p>
            </div>
          </div>
          
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
            <CategoryCard 
              icon={Building2}
              rank="1"
              title="증권"
              total="21"
              upCount="21"
              avgPercent="+3.99%"
              bgColor="bg-gray-700/50"
            />
            <CategoryCard 
              icon={Puzzle}
              rank="2"
              title="스페이스X"
              total="11"
              upCount="7"
              avgPercent="+3.41%"
              bgColor="bg-gray-700/50"
            />
            <CategoryCard 
              icon={Plane}
              rank="3"
              title="항공기부품"
              total="14"
              upCount="11"
              avgPercent="+3.09%"
              bgColor="bg-blue-600/80"
            />
          </div>
        </motion.section>

        {/* Popular Keywords (Bubble Chart Mock) */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-white">인기 키워드</h2>
            <div className="flex gap-2 text-xs">
              <span className="flex items-center gap-1 text-gray-400"><span className="w-2 h-2 rounded-full bg-[#ff3b30]"></span>부정</span>
              <span className="flex items-center gap-1 text-gray-400"><span className="w-2 h-2 rounded-full bg-gray-500"></span>중립</span>
              <span className="flex items-center gap-1 text-gray-400"><span className="w-2 h-2 rounded-full bg-[#10b981]"></span>긍정</span>
            </div>
          </div>
          
          <div className="relative h-[360px] w-full bg-[#151921] rounded-2xl overflow-hidden border border-white/5 shadow-inner flex items-center justify-center">
             {/* Background Glow Effect */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

             {/* Center Cluster */}
             <div className="relative w-[320px] h-[320px]">
                {/* Center Big One */}
                <Bubble text="사상최고치" color="#10b981" size="90px" top="40%" left="40%" delay={0} />
                
                {/* Inner Ring */}
                <Bubble text="코스피지수" color="#10b981" size="75px" top="25%" left="25%" delay={0.2} />
                <Bubble text="금리인하" color="#10b981" size="72px" top="25%" left="55%" delay={0.4} />
                <Bubble text="실적호조" color="#10b981" size="68px" top="55%" left="58%" delay={0.6} />
                <Bubble text="외국인매수" color="#10b981" size="65px" top="58%" left="30%" delay={0.8} />
                
                {/* Middle Ring */}
                <Bubble text="목표주가상향" color="#10b981" size="60px" top="10%" left="45%" delay={1.0} />
                <Bubble text="피지컬AI" color="#10b981" size="58px" top="35%" left="10%" delay={1.2} />
                <Bubble text="휴머노이드" color="#10b981" size="55px" top="65%" left="15%" delay={1.4} />
                <Bubble text="신성장동력" color="#10b981" size="52px" top="75%" left="45%" delay={1.6} />
                <Bubble text="배당확대" color="#10b981" size="50px" top="50%" left="75%" delay={1.8} />
                <Bubble text="전고점돌파" color="#10b981" size="48px" top="20%" left="70%" delay={2.0} />

                {/* Outer/Negative Ring */}
                <Bubble text="유상증자" color="#ff3b30" size="55px" top="5%" left="25%" delay={2.2} />
                <Bubble text="외환보유액" color="#ff3b30" size="52px" top="15%" left="5%" delay={2.4} />
                <Bubble text="공매도" color="#ff3b30" size="48px" top="50%" left="5%" delay={2.6} />
                <Bubble text="실적악화" color="#ff3b30" size="45px" top="80%" left="25%" delay={2.8} />
                <Bubble text="금리인상" color="#ff3b30" size="44px" top="85%" left="55%" delay={3.0} />
                <Bubble text="환율상승" color="#ff3b30" size="42px" top="70%" left="75%" delay={3.2} />
                
                {/* Neutral/Mixed */}
                <Bubble text="리스크관리" color="#6b7280" size="45px" top="5%" left="65%" delay={3.4} />
                <Bubble text="지급여력" color="#6b7280" size="40px" top="35%" left="80%" delay={3.6} />
                <Bubble text="관망세" color="#6b7280" size="38px" top="85%" left="35%" delay={3.8} />
             </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
