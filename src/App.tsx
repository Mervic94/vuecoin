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
import WhitepaperPage from "./pages/Whitepaper";
import Documentation from "./pages/Documentation";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LegalNotice from "./pages/LegalNotice";
import CookiesPolicy from "./pages/CookiesPolicy";
import VueConsensus from "./pages/VueConsensus";
import KycDashboard from "@/pages/admin/KycDashboard";

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
            <Route path="/whitepaper" element={<WhitepaperPage />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/legal-notice" element={<LegalNotice />} />
            <Route path="/cookies" element={<CookiesPolicy />} />
            <Route path="/vueconsensus" element={<VueConsensus />} />
            <Route path="/admin/kyc" element={<KycDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
