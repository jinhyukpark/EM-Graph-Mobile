import { useRoute, Link } from "wouter";
import { ChevronLeft, Star, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

// Mock Data Generators
const generateMomentumData = () => {
  const data = [];
  let baseValue = 0;
  for (let i = 0; i < 60; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (60 - i));
    
    // Simulate some trend
    if (i > 30) baseValue += Math.random() * 2 - 0.5;
    else baseValue += Math.random() - 0.5;

    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      day5: baseValue + Math.random() * 2,
      day10: baseValue + Math.random() * 1.5 - 0.5,
      day20: baseValue + Math.random() - 1
    });
  }
  return data;
};

const generateElasticityData = () => {
  const data = [];
  for (let i = 0; i < 40; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (40 - i));
    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      day5: Math.random() * 10,
      day10: Math.random() * 8,
      day20: Math.random() * 6
    });
  }
  return data;
};

const generateDefenseData = () => {
  const data = [];
  for (let i = 0; i < 40; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (40 - i));
    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      day5: Math.random() * -5,
      day10: Math.random() * -3,
      day20: Math.random() * -2
    });
  }
  return data;
};

const momentumData = generateMomentumData();
const elasticityData = generateElasticityData();
const defenseData = generateDefenseData();

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e232b] border border-white/10 p-2 rounded-lg shadow-xl text-xs">
        <p className="text-gray-400 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-0.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-300">{entry.name}:</span>
            <span className="font-mono text-white">{entry.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function MomentumDetailPage() {
  const [match, params] = useRoute("/momentum/:code");
  const code = params?.code || "043260";
  
  // Mock Stock Info
  const stockInfo = {
    name: "성호전자",
    price: "12,550",
    percent: "+0.48%",
    isUp: true
  };

  return (
    <div className="min-h-screen bg-background pb-20 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-white/5">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/ai-recommend">
              <ChevronLeft className="w-6 h-6 text-white cursor-pointer" />
            </Link>
            <h1 className="text-lg font-bold text-white">AI 추천</h1>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {/* Top Info Card */}
        <Card className="bg-white p-4 rounded-xl border-none">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">{code}</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{stockInfo.name}</h2>
                <div className="flex items-baseline gap-2 text-sm">
                  <span className="text-gray-500">종가</span>
                  <span className="font-bold text-green-600">{stockInfo.price}원 {stockInfo.percent}</span>
                </div>
              </div>
              
              {/* Sparkline Chart */}
              <div className="h-12 w-28 opacity-80">
                <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="detailSparkline" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M0,35 L5,34 L10,36 L15,32 L20,33 L25,28 L30,30 L35,25 L40,28 L45,20 L50,22 L55,15 L60,18 L65,10 L70,12 L75,8 L80,10 L85,5 L90,8 L95,2 L100,5" 
                    fill="none" 
                    stroke="#ef4444" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M0,35 L5,34 L10,36 L15,32 L20,33 L25,28 L30,30 L35,25 L40,28 L45,20 L50,22 L55,15 L60,18 L65,10 L70,12 L75,8 L80,10 L85,5 L90,8 L95,2 L100,5 V40 H0 Z" 
                    fill="url(#detailSparkline)" 
                    stroke="none" 
                  />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex bg-gray-100 rounded-lg p-0.5">
                {["1일", "1주", "1월", "1년"].map((period) => (
                  <button 
                    key={period}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                      period === "1주" 
                        ? "bg-white text-gray-900 shadow-sm" 
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 mb-2">
            <h3 className="text-sm font-bold text-gray-900 mb-3">AI 점수</h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "1주", score: "10.00", high: "14.738", low: "13.427" },
                { label: "2주", score: "10.00", high: "14.738", low: "13.427" },
                { label: "4주", score: "10.00", high: "14.738", low: "13.427" },
                { label: "6주", score: "10.00", high: "14.738", low: "13.427" },
              ].map((item, i) => (
                <div key={i} className="text-left">
                  <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-[#ff3b30] leading-none">{item.score}</span>
                    <div className="text-[9px] text-gray-400 leading-tight mb-0.5">
                      <div>최고: {item.high}</div>
                      <div>최저: {item.low}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Summary Section */}
          <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 bg-[#ff3b30] rounded-full"/>
              <h3 className="text-sm font-bold text-gray-900">모멘텀 총평</h3>
              <Smile className="w-4 h-4 text-orange-500 ml-1" />
            </div>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              현재 장은 상승장에 돌입했으며 <span className="text-blue-600 font-bold">{stockInfo.name}</span>은 
              상승 탄력지수를 분석한 결과 충분한 상승여력이 남아있는 상태로, 단기적인 조정이 있더라도 
              우상향 추세를 이어갈 가능성이 높습니다.
            </p>
          </div>
        </Card>

        {/* Main Momentum Chart */}
        <Card className="bg-white p-4 rounded-xl border-none overflow-hidden">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-800">모멘텀 차트 (최근 6개월) <span className="text-gray-500 font-normal">{stockInfo.name}({code})</span></h3>
          </div>
          
          <div className="h-[250px] w-full -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={momentumData}>
                <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  tick={{fontSize: 10, fill: '#6b7280'}} 
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                  interval={6}
                />
                <YAxis 
                  tick={{fontSize: 10, fill: '#6b7280'}} 
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                  domain={['auto', 'auto']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="square" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="day5" name="5일" stroke="#fbbf24" strokeWidth={2} dot={{ r: 2, fill: '#fbbf24', strokeWidth: 0 }} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="day10" name="10일" stroke="#f87171" strokeWidth={2} dot={{ r: 2, fill: '#f87171', strokeWidth: 0 }} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="day20" name="20일" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg mt-4 border border-blue-100">
             <h4 className="text-blue-600 font-bold text-xs mb-1">모멘텀 차트란?</h4>
             <p className="text-[10px] text-gray-600 leading-relaxed">
               특정 기간 동안 시장 지수(코스피/코스닥) 대비 해당 종목이 얼마나 꾸준히 성과를 냈는지를 보여주는 차트입니다. 
               일일 성과가 아닌 시장을 이겨온 힘의 '추세'와 '지속성'을 나타내므로 '상대 모멘텀'이라고도 부릅니다.
               차트가 상승 추세 혹은 양의 영역에 있다면, 해당 종목이 최근 시장보다 꾸준히 강한 흐름을 보여왔음을 의미합니다.
             </p>
          </div>
        </Card>

        {/* Elasticity Chart */}
        <Card className="bg-white p-4 rounded-xl border-none overflow-hidden">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-800">상승 탄력 지수 <span className="text-gray-500 font-normal">{stockInfo.name}({code})</span></h3>
          </div>
          
          <div className="h-[200px] w-full -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={elasticityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  tick={{fontSize: 10, fill: '#6b7280'}} 
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                  interval={4}
                />
                <YAxis 
                  tick={{fontSize: 10, fill: '#6b7280'}} 
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="square" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="day5" name="5일" stroke="#fbbf24" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="day10" name="10일" stroke="#f97316" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="day20" name="20일" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg mt-4 border border-blue-100">
             <h4 className="text-blue-600 font-bold text-xs mb-1">상승 탄력 지수란?</h4>
             <p className="text-[10px] text-gray-600 leading-relaxed">
               시장 지수가 상승할 때 해당 종목의 주가가 시장보다 얼마나 더 상승했는지를 나타내는 지표입니다. 
               쉽게 말해, 강세장에서 주가가 얼마나 더 '탄력적'으로 튀어오르는지를 보여주는 지표로, 
               이 수치가 높을수록 시장 상승기에 더 높은 수익률을 기대할 수 있습니다.
             </p>
          </div>
        </Card>

        {/* Defense Chart */}
        <Card className="bg-white p-4 rounded-xl border-none overflow-hidden">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-800">하락 방어 지수 <span className="text-gray-500 font-normal">{stockInfo.name}({code})</span></h3>
          </div>
          
          <div className="h-[200px] w-full -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={defenseData}>
                <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  tick={{fontSize: 10, fill: '#6b7280'}} 
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                  interval={4}
                />
                <YAxis 
                  tick={{fontSize: 10, fill: '#6b7280'}} 
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="square" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="day5" name="5일" stroke="#22d3ee" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="day10" name="10일" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="day20" name="20일" stroke="#1d4ed8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg mt-4 border border-blue-100">
             <h4 className="text-blue-600 font-bold text-xs mb-1">하락 방어 지수란?</h4>
             <p className="text-[10px] text-gray-600 leading-relaxed">
               시장 지수가 하락할 때 해당 종목의 주가가 얼마나 하락을 잘 견디는지를 나타내는 지표입니다. 
               약세장에서 얼마나 손실을 최소화했는지, 혹은 오히려 얼마나 상승했는지를 보여주는 지표로, 
               종목의 안정성과 방어력을 측정합니다.
             </p>
          </div>
        </Card>

      </main>
    </div>
  );
}