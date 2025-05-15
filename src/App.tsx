
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Challenges from "./pages/Challenges";
import Ranking from "./pages/Ranking";
import Learning from "./pages/Learning";
import Profile from "./pages/Profile";
import Teacher from "./pages/Teacher";
import Store from "./pages/Store";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/Layout/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner 
        position="bottom-center"
        toastOptions={{
          style: { 
            borderRadius: '12px',
            bottom: 'env(safe-area-inset-bottom, 0px)',
          }
        }}
      />
      <Toaster />
      <BrowserRouter>
        <div className="h-full w-full mobile-container">
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/learning" element={<Learning />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/teacher" element={<Teacher />} />
              <Route path="/store" element={<Store />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
