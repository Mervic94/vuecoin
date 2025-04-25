
import { Card } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

// Mock wallet data
const walletData = [
  { currency: 'VueCoin', symbol: 'VC', balance: 1010.00, usdValue: 2474.50 },
  { currency: 'Bitcoin', symbol: 'BTC', balance: 0.04958180, usdValue: 2912.93 },
  { currency: 'Ethereum', symbol: 'ETH', balance: 1.20, usdValue: 3900.00 },
  { currency: 'Solana', symbol: 'SOL', balance: 15.00, usdValue: 1556.25 },
  { currency: 'Cardano', symbol: 'ADA', balance: 500.00, usdValue: 290.00 }
];

const WalletOverview = () => {
  const totalWalletValue = walletData.reduce((sum, item) => sum + item.usdValue, 0);

  return (
    <Card className="p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <Wallet className="mr-2 h-5 w-5" />
        <h2 className="text-xl font-semibold">Mon Portefeuille</h2>
      </div>
      
      <div className="space-y-4">
        {walletData.map((item) => (
          <div key={item.symbol} className="flex justify-between py-2 border-b border-gray-100">
            <div>
              <div>{item.currency} <span className="text-xs text-gray-500">{item.symbol}</span></div>
            </div>
            <div className="text-right">
              <div>
                {item.balance.toLocaleString(undefined, { 
                  minimumFractionDigits: item.balance < 1 ? 8 : 2, 
                  maximumFractionDigits: item.balance < 1 ? 8 : 2 
                })}
              </div>
              <div className="text-xs text-gray-500">
                ≈ ${item.usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex justify-between pt-2 font-semibold">
          <span>Valeur totale estimée:</span>
          <span>${totalWalletValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>
    </Card>
  );
};

export default WalletOverview;
