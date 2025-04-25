
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PriceChart from '@/components/exchange/PriceChart';
import MarketTable from '@/components/exchange/MarketTable';
import TradeForm from '@/components/exchange/TradeForm';
import WalletOverview from '@/components/exchange/WalletOverview';

const Exchange = () => {
  const { toast } = useToast();

  const handleTrade = (tradeType: string, amount: number, currency: string) => {
    toast({
      title: 'Transaction réussie',
      description: `${tradeType === 'buy' ? 'Achat' : 'Vente'} de ${amount} VC ${
        tradeType === 'buy' ? 'avec' : 'contre'
      } ${currency === 'Bitcoin' ? '0.00041820 BTC' : currency === 'Ethereum' ? '0.00769 ETH' : '0.0965 SOL'}`,
    });
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#334155]">
      {/* Navigation */}
      <nav className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo className="text-white" />
          <div className="flex items-center gap-4">
            <div className="bg-primary-dark px-3 py-1 rounded-md font-medium">
              VC: 2.45 $
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ExternalLink size={20} />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Chart and Market Table */}
          <div className="lg:col-span-2">
            <PriceChart />
            <MarketTable />
          </div>

          {/* Right Column - Trading + Wallet */}
          <div className="space-y-6">
            <TradeForm onTrade={handleTrade} />
            <WalletOverview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
