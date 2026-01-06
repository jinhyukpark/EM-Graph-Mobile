import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#1e232b] to-transparent pointer-events-none" />
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-50px] left-[-50px] w-[200px] h-[200px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <main className="flex-1 flex flex-col justify-center px-6 relative z-10">
        {/* Brand Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-8 h-8 text-white fill-white/20" />
          </div>
          <h1 className="text-3xl font-bold mb-2 tracking-tight">
            Stock<span className="font-light text-gray-400">link</span>
          </h1>
          <p className="text-gray-400 text-sm font-medium">
            AI 기반 데이터 분석으로<br />
            당신의 투자를 더 확실하게
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs text-gray-400">이메일</Label>
            <div className="relative">
              <Input 
                id="email" 
                type="email" 
                placeholder="example@email.com" 
                className="bg-[#1e232b] border-white/10 text-white h-12 pl-4 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-xs text-gray-400">비밀번호</Label>
              <Link href="#" className="text-xs text-blue-400 hover:text-blue-300">비밀번호 찾기</Link>
            </div>
            <div className="relative">
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="bg-[#1e232b] border-white/10 text-white h-12 pl-4 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                로그인 중...
              </span>
            ) : (
              "로그인"
            )}
          </Button>
        </motion.form>

        {/* Social Login */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 space-y-4"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="bg-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#09090b] px-2 text-gray-500">
                또는 소셜 계정으로 계속하기
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="h-12 bg-[#FEE500] border-none hover:bg-[#FEE500]/90 text-[#191919] rounded-xl font-medium text-xs">
              Kakao
            </Button>
            <Button variant="outline" className="h-12 bg-white border-none hover:bg-gray-100 text-black rounded-xl font-medium text-xs">
              Google
            </Button>
            <Button variant="outline" className="h-12 bg-black border border-white/20 hover:bg-white/10 text-white rounded-xl font-medium text-xs">
              Apple
            </Button>
          </div>
        </motion.div>
      </main>

      {/* Footer Trust Indicators */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="p-6 text-center"
      >
        <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>암호화된 보안 연결</span>
          </div>
          <div className="w-px h-2 bg-white/10" />
          <div className="flex items-center gap-1">
            <Lock className="w-3 h-3" />
            <span>개인정보 보호</span>
          </div>
        </div>
        <div className="mt-4">
          <Link href="/signup">
            <span className="text-sm text-gray-400">계정이 없으신가요? <span className="text-white font-bold ml-1 cursor-pointer">회원가입</span></span>
          </Link>
        </div>
      </motion.footer>
    </div>
  );
}
