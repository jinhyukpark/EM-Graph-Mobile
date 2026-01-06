import { useState } from "react";
import { Link, useRoute } from "wouter";
import { ChevronLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#3b82f6", "#00E5BC", "#eab308", "#f97316", "#10b981", "#6b7280"];
const COLORS_MARKET = ["#3b82f6", "#00E5BC", "#eab308", "#f97316", "#10b981"];

const salesData = [
  { name: "DX(가전, 스마트폰 등)", value: 59.69, color: "#3b82f6" },
  { name: "DS(반도체 등)", value: 35.97, color: "#00E5BC" },
  { name: "SDC(OLED 패널 등)", value: 9.34, color: "#eab308" },
  { name: "Harman", value: 4.60, color: "#f97316" },
  { name: "기타", value: 9.60, color: "#10b981" }, // Adjusted to match visual roughly, note: visual has negative but pie needs positive, treating as slice
];

// Note: Pie charts need positive values. The image shows "Other -9.6%" which is accounting adjustment. 
// For visual mock purposes, I will normalize or just display positive slices that match the donut visual.
// The image shows a donut. I'll use positive values for the visual.

const marketShareData = [
  { name: "스마트폰 패널", value: 56.7, color: "#3b82f6" },
  { name: "DRAM", value: 43.0, color: "#00E5BC" },
  { name: "TV", value: 29.7, color: "#eab308" },
  { name: "디지털 콕핏", value: 24.7, color: "#f97316" },
  { name: "스마트폰", value: 21.8, color: "#10b981" },
];

import stockImage from '@assets/stock_images/samsung_logo_c86f1f2f.jpg';

export default function StockDetailPage() {
  const [match, params] = useRoute("/stock/:code");
  const code = params?.code || "005930"; // Default to Samsung
  
  // Mock data - in a real app this would fetch based on code
  const stockInfo = {
    name: "삼성전자",
    code: "005930",
    market: "코스피",
    sector: "제조업",
    price: "138,900",
    diff: "800",
    percent: "0.58",
    isUp: true
  };

  const [activeTab, setActiveTab] = useState("기업소개");

  return (
    <div className="min-h-screen bg-background pb-20 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-white/5">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <ChevronLeft className="w-6 h-6 text-white cursor-pointer" />
            </Link>
            <h1 className="text-lg font-bold text-white">종목 상세</h1>
          </div>
        </div>
      </header>

      {/* Basic Info */}
      <div className="px-4 py-6">
        {/* Row 1: Logo & Chart */}
        <div className="flex items-start justify-between mb-2 h-16 relative">
          <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-white flex items-center justify-center">
            <img 
              src={stockImage}
              alt="SAMSUNG" 
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Sparkline Chart - Right Aligned */}
          <div className="h-16 w-32 absolute top-0 right-0">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff3b30" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ff3b30" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d="M0,35 L5,34 L10,36 L15,32 L20,33 L25,28 L30,30 L35,25 L40,28 L45,20 L50,22 L55,15 L60,18 L65,10 L70,12 L75,8 L80,10 L85,5 L90,8 L95,2 L100,5" 
                fill="none" 
                stroke="#ff3b30" 
                strokeWidth="2" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path 
                d="M0,35 L5,34 L10,36 L15,32 L20,33 L25,28 L30,30 L35,25 L40,28 L45,20 L50,22 L55,15 L60,18 L65,10 L70,12 L75,8 L80,10 L85,5 L90,8 L95,2 L100,5 V40 H0 Z" 
                fill="url(#sparklineGradient)" 
                stroke="none" 
              />
            </svg>
          </div>
        </div>

        <div className="mb-4 mt-4">
             <div className="flex items-center gap-2 mb-1">
               <h2 className="text-2xl font-bold text-white">{stockInfo.name}</h2>
               <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
             </div>
             <div className="text-xs text-gray-500">제{stockInfo.code} | {stockInfo.market} | {stockInfo.sector}</div>
        </div>
        
        <div className="flex items-baseline gap-2">
           <span className="text-4xl font-bold text-white tracking-tight">{stockInfo.price}원</span>
           <span className="text-lg font-bold text-[#ff3b30]">▲ {stockInfo.diff} +{stockInfo.percent}%</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[60px] z-30 bg-background border-b border-white/5">
        <div className="px-2 overflow-x-auto no-scrollbar">
          <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-transparent h-auto p-0 gap-6 w-full justify-start rounded-none px-2">
              {["기업소개", "실적", "배당", "뉴스", "공시", "투자자 동향", "재무분석", "투자지표"].map((tab) => (
                <TabsTrigger 
                  key={tab} 
                  value={tab}
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white rounded-none px-0 py-3 text-sm text-gray-500 font-medium bg-transparent border-b-2 border-transparent transition-all whitespace-nowrap"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <main className="px-4 py-6 space-y-8">
        {/* Company Info */}
        <section>
          <h3 className="text-lg font-bold text-gray-200 mb-4">기업 소개</h3>
          
          <div className="grid grid-cols-[100px_1fr] gap-y-3 text-sm mb-6">
             <div className="text-gray-500">사업자번호</div>
             <div className="text-gray-300">1248100998</div>
             
             <div className="text-gray-500">대표이사</div>
             <div className="text-gray-300">전영현</div>
             
             <div className="text-gray-500">설립일자</div>
             <div className="text-gray-300">19690113</div>
             
             <div className="text-gray-500">기업규모</div>
             <div className="text-gray-300">대기업</div>
             
             <div className="text-gray-500">직원 수</div>
             <div className="text-gray-300">124917</div>
             
             <div className="text-gray-500">주소</div>
             <div className="text-gray-300">경기 수원시 영통구 삼성로 129</div>
             
             <div className="text-gray-500">홈페이지</div>
             <div className="text-blue-400">www.samsung.com/sec</div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">소개</div>
              <ul className="list-disc pl-4 space-y-2 text-sm text-gray-300 leading-relaxed">
                <li>한국 및 DX부문 해외 9개 지역총괄과 DS부문 해외 5개 지역총괄, SDC, Harman 등 229개의 종속기업으로 구성된 글로벌 전자기업임.</li>
                <li>세트사업은 TV를 비롯 모니터, 냉장고, 세탁기, 에어컨, 스마트폰, 네트워크시스템, 컴퓨터 등을 생산하는 DX부문이 있음.</li>
                <li>부품 사업에는 DRAM, NAND Flash, 모바일AP 등의 제품을 생산하고 있는 DS 부문과 스마트폰용 OLED 패널을 생산하고 있는 SDC가 있음.</li>
              </ul>
            </div>
            
            <div>
              <div className="text-xs text-gray-500 mb-1">실적</div>
              <ul className="list-disc pl-4 space-y-2 text-sm text-gray-300 leading-relaxed">
                <li>3분기에 기대 이하의 실적을 기록했지만, HBM 매출이 전분기 대비 70% 이상 급증하는 등 AI 관련 고부가 제품을 중심으로 실적 개선이 기대됨.</li>
                <li>DS부문은 재고평가손실 환입 축소와 성과급 충당 등 일회성 비용에 따른 메모리 사업 이익감소와 파운드리도 수요회복 지연으로 인해 영업이익이 4조원에 미달함.</li>
                <li>모바일 사업은 스마트폰, 태블릿, 웨어러블 신제품 출시로 매출 및 영업이익이 모두 성장했으나, 네트워크 부문의 실적이 부진했음.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Shareholder Info */}
        <section className="bg-[#151921] -mx-4 px-4 py-6 border-y border-white/5">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-bold text-gray-200">주주 정보</h3>
             <span className="text-xs text-gray-500">2025년 1월 6일 기준</span>
           </div>
           
           <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                 <span className="text-gray-400">삼성생명보험 외 16인</span>
                 <span className="text-gray-200 text-right">1,198,120,000주 / 20.07%</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-gray-400">국민연금공단</span>
                 <span className="text-gray-200 text-right">458,638,000주 / 7.68%</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-gray-400">BlackRock Fund Advisors 외 15인</span>
                 <span className="text-gray-200 text-right">300,391,000주 / 5.03%</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-gray-400">자사주</span>
                 <span className="text-gray-200 text-right">34,700,000주 / 0.58%</span>
              </div>
           </div>
        </section>

        {/* Product Sales Composition Chart */}
        <section>
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold text-gray-200">주요 제품 매출 구성</h3>
             <span className="text-xs text-gray-500">2024년 9월</span>
           </div>

           <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {salesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text (Mocking visual) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                 {/* Empty center as per donut style */}
              </div>
           </div>
           
           <div className="mt-4 space-y-2">
             {salesData.map((item, index) => (
               <div key={index} className="flex items-center justify-between text-xs">
                 <div className="flex items-center gap-2">
                   <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                   <span className="text-gray-300">{item.name}</span>
                 </div>
                 <span className="text-gray-200 font-medium">{item.value}%</span>
               </div>
             ))}
           </div>
        </section>

        {/* Product Market Share Chart */}
        <section className="pt-6 border-t border-white/5">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold text-gray-200">주요 제품 시장 점유율</h3>
             <span className="text-xs text-gray-500">2022년 12월</span>
           </div>

           <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketShareData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {marketShareData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
           </div>
           
           <div className="mt-4 space-y-2">
             {marketShareData.map((item, index) => (
               <div key={index} className="flex items-center justify-between text-xs">
                 <div className="flex items-center gap-2">
                   <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                   <span className="text-gray-300">{item.name}</span>
                 </div>
                 <span className="text-gray-200 font-medium">{item.value}%</span>
               </div>
             ))}
           </div>
        </section>

      </main>
    </div>
  );
}
