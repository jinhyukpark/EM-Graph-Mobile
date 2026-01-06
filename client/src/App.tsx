import { Route, Switch } from "wouter";
import DashboardPage from "@/pages/dashboard";
import MobileNav from "@/components/layout/mobile-nav";
import { Toaster } from "@/components/ui/toaster";

import AIRecommendPage from "@/pages/ai-recommend";
import MomentumDetailPage from "@/pages/momentum-detail";
import StockDetailPage from "@/pages/stock-detail";

import TrendPage from "@/pages/trend";

// Placeholder pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen bg-background text-foreground flex items-center justify-center pb-20">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground">준비 중인 페이지입니다.</p>
    </div>
  </div>
);

function Router() {
  return (
    <Switch>
      <Route path="/" component={DashboardPage} />
      <Route path="/favorites">
        <PlaceholderPage title="즐겨찾기" />
      </Route>
      <Route path="/ai-recommend" component={AIRecommendPage} />
      <Route path="/momentum/:code" component={MomentumDetailPage} />
      <Route path="/stock/:code" component={StockDetailPage} />
      <Route path="/trends" component={TrendPage} />
      <Route path="/my-page">
        <PlaceholderPage title="마이페이지" />
      </Route>
      <Route>404 Not Found</Route>
    </Switch>
  );
}

function App() {
  return (
    <div className="min-h-screen w-full flex justify-center bg-[#09090b]">
      <div className="w-full max-w-md min-h-screen bg-background font-sans text-foreground pb-20 relative shadow-2xl border-x border-white/5">
        <Router />
        <MobileNav />
        <Toaster />
      </div>
    </div>
  );
}

export default App;
