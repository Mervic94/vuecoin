
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PriceChart from '@/components/exchange/PriceChart';
import MarketTable from '@/components/exchange/MarketTable';
import WalletOverview from '@/components/exchange/WalletOverview';
import OrderBook from '@/components/exchange/OrderBook';
import TradingDashboard from '@/components/exchange/TradingDashboard';
import RealtimePrice from '@/components/exchange/RealtimePrice';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Exchange = () => {
  const { toast } = useToast();

  const handleTrade = (tradeType: string, orderType: string, amount: number, price?: number) => {
    const priceText = price ? ` à ${price}$` : ' au prix du marché';
    
    toast({
      title: 'Ordre placé avec succès',
      description: `${orderType.charAt(0).toUpperCase() + orderType.slice(1)} ${tradeType === 'buy' ? 'achat' : 'vente'} de ${amount} VC${priceText}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f5f9] text-[#334155]">
      <Header />
      
      {/* Navigation secondaire avec notifications */}
      <nav className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo className="text-white" />
          <div className="flex items-center gap-4">
            <RealtimePrice />
            <NotificationCenter />
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ExternalLink size={20} />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Chart */}
          <div className="lg:col-span-2 space-y-6">
            <PriceChart />
            <MarketTable />
          </div>

          {/* Middle Column - Order Book */}
          <div className="space-y-6">
            <OrderBook />
          </div>

          {/* Right Column - Trading + Wallet */}
          <div className="space-y-6">
            <TradingDashboard onTrade={handleTrade} />
            <WalletOverview />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Exchange;
