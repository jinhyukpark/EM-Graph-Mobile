import { Link, useLocation } from "wouter";
import { LayoutDashboard, Bookmark, Sparkles, TrendingUp, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "대시보드", path: "/" },
    { icon: Bookmark, label: "즐겨찾기", path: "/favorites" },
    { icon: Sparkles, label: "AI 추천", path: "/ai-recommend", highlight: true },
    { icon: TrendingUp, label: "트렌드", path: "/trends" },
    { icon: User, label: "MY", path: "/my-page" },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 bg-[#151921] border-t border-white/5 pb-safe">
      <div className="flex items-center justify-between px-2 h-16">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;
          
          if (item.highlight) {
            return (
              <Link key={item.path} href={item.path}>
                <div className="relative -top-5 flex flex-col items-center justify-center cursor-pointer">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95",
                    "bg-gradient-to-br from-blue-500 to-indigo-600 text-white",
                    "shadow-blue-500/20"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={cn(
                    "text-[10px] mt-1 font-medium",
                    isActive ? "text-blue-400" : "text-gray-400"
                  )}>
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          }

          return (
            <Link key={item.path} href={item.path}>
              <div className="flex flex-col items-center justify-center w-full h-full px-2 cursor-pointer active:scale-95 transition-transform">
                <Icon className={cn(
                  "w-6 h-6 mb-1 transition-colors",
                  isActive ? "text-[#00C896]" : "text-gray-500"
                )} />
                <span className={cn(
                  "text-[10px] font-medium transition-colors",
                  isActive ? "text-[#00C896]" : "text-gray-500"
                )}>
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
