
import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

// Mock data for the market overview
const marketData = [
  { name: 'VueCoin', symbol: 'VC', price: 2.45, change: 5.2, volume: '15.0M', trend: 'up' },
  { name: 'Bitcoin', symbol: 'BTC', price: 58750, change: -1.2, volume: '45,000.0M', trend: 'down' },
  { name: 'Ethereum', symbol: 'ETH', price: 3250, change: 2.8, volume: '22,000.0M', trend: 'up' },
  { name: 'Solana', symbol: 'SOL', price: 103.75, change: 7.5, volume: '8,500.0M', trend: 'up' },
  { name: 'Cardano', symbol: 'ADA', price: 0.58, change: -0.7, volume: '1,200.0M', trend: 'down' },
];

const MarketTable = () => {
  return (
    <Card className="p-6 shadow-sm mt-6">
      <div className="flex items-center mb-4">
        <TrendingUp className="mr-2 h-5 w-5" />
        <h2 className="text-xl font-semibold">Aperçu du marché</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2">Crypto</th>
              <th className="text-right py-3 px-2">Prix</th>
              <th className="text-right py-3 px-2">24h %</th>
              <th className="text-right py-3 px-2">Volume 24h</th>
            </tr>
          </thead>
          <tbody>
            {marketData.map((crypto) => (
              <tr key={crypto.symbol} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2">
                  {crypto.name} <span className="text-xs text-gray-500">{crypto.symbol}</span>
                </td>
                <td className="text-right py-3 px-2">
                  ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className={`text-right py-3 px-2 ${crypto.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {crypto.trend === 'up' ? '▲' : '▼'} {Math.abs(crypto.change)}%
                </td>
                <td className="text-right py-3 px-2">${crypto.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default MarketTable;
