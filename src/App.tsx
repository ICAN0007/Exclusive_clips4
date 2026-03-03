import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import AppSidebar from "./components/AppSidebar";
import Index from "./pages/Index";
import Trending from "./pages/Trending";
import MostViewed from "./pages/MostViewed";
import NewReleases from "./pages/NewReleases";
import TopRated from "./pages/TopRated";
import Popular from "./pages/Popular";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AgeVerification />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              {/* Menu button header */}
              <header className="sticky top-0 z-50 h-14 flex items-center gap-4 border-b border-white/10 bg-black/95 backdrop-blur-xl px-4">
                <SidebarTrigger className="text-foreground hover:bg-white/10 p-2 rounded-lg">
                  <Menu className="h-5 w-5" />
                </SidebarTrigger>
                <div className="text-xl font-black flex items-center gap-1">
                  <span>🔥</span>
                   <span className="gradient-text">Exclusiveclips4</span>
                </div>
              </header>
              
              {/* Main content */}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/trending" element={<Trending />} />
                  <Route path="/most-viewed" element={<MostViewed />} />
                  <Route path="/new-releases" element={<NewReleases />} />
                  <Route path="/top-rated" element={<TopRated />} />
                  <Route path="/popular" element={<Popular />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
