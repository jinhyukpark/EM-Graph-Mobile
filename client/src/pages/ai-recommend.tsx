import { useState } from "react";
import { Link } from "wouter";
import { 
  ChevronLeft, 
  ChevronDown, 
  Star, 
  Crown,
  Info
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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

export default function AIRecommendPage() {
  const [activeTab, setActiveTab] = useState("weekly");

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
          <Tabs defaultValue="weekly" className="w-full" onValueChange={setActiveTab}>
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

      {/* Filter Bar */}
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
             <span className="text-white font-semibold">Top 3 종목</span>을 선정했습니다.
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
    </div>
  );
}
