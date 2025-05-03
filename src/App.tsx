
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import CookieConsent from "./components/CookieConsent";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Exchange from "./pages/Exchange";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Transactions from "./pages/Transactions";
import Help from "./pages/Help";
import Funding from "./pages/Funding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CookieConsent />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/help" element={<Help />} />
            <Route path="/funding" element={<Funding />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
