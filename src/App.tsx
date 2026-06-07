import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import LoginAttemptLogger from "@/components/security/LoginAttemptLogger";
import SupportChat from "@/components/support/SupportChat";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Exchange from "./pages/Exchange";
import Funding from "./pages/Funding";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import Security from "./pages/Security";
import VueConsensus from "./pages/VueConsensus";
import Documentation from "./pages/Documentation";
import Help from "./pages/Help";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Whitepaper from "./pages/Whitepaper";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LegalNotice from "./pages/LegalNotice";
import CookiesPolicy from "./pages/CookiesPolicy";
import NotFound from "./pages/NotFound";
import KycDashboard from "./pages/admin/KycDashboard";
import Testimonials from "./pages/Testimonials";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LoginAttemptLogger />
          <SupportChat />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/funding" element={<Funding />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/security" element={<Security />} />
            <Route path="/vue-consensus" element={<VueConsensus />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/help" element={<Help />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/whitepaper" element={<Whitepaper />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/legal-notice" element={<LegalNotice />} />
            <Route path="/cookies-policy" element={<CookiesPolicy />} />
            <Route path="/admin/kyc" element={<KycDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
