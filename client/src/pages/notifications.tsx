import { useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, Search, Bell, TrendingUp, TrendingDown, Info, Sparkles, FileText, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Mock Data for Notifications
const initialNotifications = [
  {
    id: 1,
    category: "AI 추천",
    title: "삼성전자 AI 점수 변동",
    message: "삼성전자의 AI 점수가 8.5점에서 8.8점으로 상승했습니다. 수급 분석 결과 기관 매수세가 포착되었습니다.",
    time: "방금 전",
    read: false,
    icon: Sparkles,
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  },
  {
    id: 2,
    category: "지수",
    title: "공포 & 탐욕 지수 변동 알림",
    message: "현재 시장은 '극도의 탐욕' 단계(98점)에 진입했습니다. 과열 구간 진입에 유의하세요.",
    time: "10분 전",
    read: false,
    icon: TrendingUp,
    color: "text-[#ff3b30]",
    bg: "bg-[#ff3b30]/10"
  },
  {
    id: 3,
    category: "키워드",
    title: "관심 키워드 '사상최고치' 발생",
    message: "미래에셋증권 종목에서 '사상최고치' 키워드가 발생했습니다.",
    time: "30분 전",
    read: true,
    icon: Bell,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    id: 4,
    category: "종목",
    title: "SK하이닉스 목표가 상향",
    message: "주요 증권사 3곳에서 SK하이닉스 목표주가를 상향 조정했습니다. 평균 목표가: 210,000원",
    time: "1시간 전",
    read: true,
    icon: TrendingUp,
    color: "text-[#10b981]",
    bg: "bg-[#10b981]/10"
  },
  {
    id: 5,
    category: "공지",
    title: "시스템 점검 안내",
    message: "안정적인 서비스 제공을 위해 금일 새벽 2시부터 4시까지 서버 점검이 진행될 예정입니다.",
    time: "2시간 전",
    read: true,
    icon: Info,
    color: "text-gray-400",
    bg: "bg-gray-400/10"
  },
  {
    id: 6,
    category: "AI 추천",
    title: "오늘의 급등 예상 종목",
    message: "AI가 분석한 장시작 전 급등 예상 종목 리포트가 도착했습니다. 지금 확인해보세요.",
    time: "5시간 전",
    read: true,
    icon: Sparkles,
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  },
  {
    id: 7,
    category: "지수",
    title: "코스피 2,600선 회복",
    message: "코스피 지수가 외국인 매수세에 힘입어 2,600선을 회복 마감했습니다.",
    time: "어제",
    read: true,
    icon: TrendingUp,
    color: "text-[#ff3b30]",
    bg: "bg-[#ff3b30]/10"
  }
];

const categories = ["전체", "AI 추천", "종목", "지수", "키워드", "공지"];

export default function NotificationsPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [notifications, setNotifications] = useState(initialNotifications);

  const filteredNotifications = activeCategory === "전체" 
    ? notifications 
    : notifications.filter(n => n.category === activeCategory);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const hasUnread = notifications.some(n => !n.read);

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
          <div className="flex items-center gap-4">
             {hasUnread && (
               <button 
                 onClick={handleMarkAllRead}
                 className="text-xs text-gray-400 hover:text-white transition-colors"
               >
                 모두 읽음
               </button>
             )}
             <Search className="w-5 h-5 text-white" />
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex px-4 py-3 gap-2 overflow-x-auto no-scrollbar border-b border-white/5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
                activeCategory === category
                  ? "bg-white text-black font-bold"
                  : "bg-[#1e232b] text-gray-400 border border-white/5 hover:bg-[#2a3038]"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 py-2">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-white/5">
            {filteredNotifications.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className={cn("py-4 flex gap-4 group cursor-pointer", !item.read && "bg-white/[0.02] -mx-4 px-4")}>
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1", item.bg)}>
                    <Icon className={cn("w-5 h-5", item.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                         <Badge variant="outline" className="text-[10px] h-5 px-1.5 border-white/10 text-gray-400 font-normal">
                           {item.category}
                         </Badge>
                         <span className="text-xs text-gray-500">{item.time}</span>
                      </div>
                      {!item.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b30]"></span>
                      )}
                    </div>
                    <h3 className={cn("text-sm font-bold mb-1 leading-tight group-hover:text-blue-400 transition-colors", item.read ? "text-gray-300" : "text-white")}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {item.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-[#1e232b] rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-gray-500 text-sm">새로운 알림이 없습니다.</p>
          </div>
        )}
      </main>
    </div>
  );
}
