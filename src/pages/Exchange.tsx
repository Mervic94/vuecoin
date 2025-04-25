
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight, Coins, TrendingUp, TrendingDown, Wallet, ExternalLink } from 'lucide-react';

// Mock data for the chart
const chartData = [
  { date: '10/03', price: 2.32 },
  { date: '15/03', price: 2.38 },
  { date: '20/03', price: 2.41 },
  { date: '25/03', price: 2.37 },
  { date: '30/03', price: 2.43 },
  { date: '04/04', price: 2.45 },
];

// Mock data for the market overview
const marketData = [
  { name: 'VueCoin', symbol: 'VC', price: 2.45, change: 5.2, volume: '15.0M', trend: 'up' },
  { name: 'Bitcoin', symbol: 'BTC', price: 58750, change: -1.2, volume: '45,000.0M', trend: 'down' },
  { name: 'Ethereum', symbol: 'ETH', price: 3250, change: 2.8, volume: '22,000.0M', trend: 'up' },
  { name: 'Solana', symbol: 'SOL', price: 103.75, change: 7.5, volume: '8,500.0M', trend: 'up' },
  { name: 'Cardano', symbol: 'ADA', price: 0.58, change: -0.7, volume: '1,200.0M', trend: 'down' },
];

// Mock wallet data
const walletData = [
  { currency: 'VueCoin', symbol: 'VC', balance: 1010.00, usdValue: 2474.50 },
  { currency: 'Bitcoin', symbol: 'BTC', balance: 0.04958180, usdValue: 2912.93 },
  { currency: 'Ethereum', symbol: 'ETH', balance: 1.20, usdValue: 3900.00 },
  { currency: 'Solana', symbol: 'SOL', balance: 15.00, usdValue: 1556.25 },
  { currency: 'Cardano', symbol: 'ADA', balance: 500.00, usdValue: 290.00 }
];

const Exchange = () => {
  const [activeCrypto, setActiveCrypto] = useState('VC');
  const [tradeType, setTradeType] = useState('buy');
  const [tradeCurrency, setTradeCurrency] = useState('Bitcoin');
  const [tradeAmount, setTradeAmount] = useState(10);
  const [notification, setNotification] = useState<string | null>(null);

  const handleTrade = () => {
    // Show success notification after a trade
    setNotification(
      `${tradeType === 'buy' ? 'Achat' : 'Vente'} réussi: ${tradeType === 'buy' ? '+' : '-'}${tradeAmount} VC ${
        tradeType === 'buy' ? 'pour' : 'contre'
      } ${tradeCurrency === 'Bitcoin' ? '0.00041820 BTC' : tradeCurrency === 'Ethereum' ? '0.00769 ETH' : '0.0965 SOL'}`
    );

    // Clear notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const totalWalletValue = walletData.reduce((sum, item) => sum + item.usdValue, 0);

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
          {/* Left Column - Chart */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Évolution du prix
                </h2>
                <div className="flex space-x-1">
                  {['VC', 'BTC', 'ETH', 'SOL'].map((crypto) => (
                    <Button
                      key={crypto}
                      variant={activeCrypto === crypto ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveCrypto(crypto)}
                    >
                      {crypto}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Market Table */}
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
          </div>

          {/* Right Column - Trading + Wallet */}
          <div className="space-y-6">
            {/* Trading Card */}
            <Card className="p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Trader VueCoin</h2>
              
              <div className="space-y-6">
                {/* Buy/Sell Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant={tradeType === 'buy' ? 'default' : 'outline'} 
                    onClick={() => setTradeType('buy')}
                    className="w-full"
                  >
                    Acheter
                  </Button>
                  <Button 
                    variant={tradeType === 'sell' ? 'default' : 'outline'}
                    onClick={() => setTradeType('sell')}
                    className="w-full"
                  >
                    Vendre
                  </Button>
                </div>
                
                {/* Currency Select */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {tradeType === 'buy' ? 'Acheter VueCoin avec' : 'Vendre VueCoin contre'}
                  </label>
                  <select 
                    className="w-full p-2 border border-gray-200 rounded-md"
                    value={tradeCurrency}
                    onChange={(e) => setTradeCurrency(e.target.value)}
                  >
                    <option>Bitcoin</option>
                    <option>Ethereum</option>
                    <option>Solana</option>
                    <option>Cardano</option>
                  </select>
                </div>
                
                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Quantité à {tradeType === 'buy' ? 'acheter' : 'vendre'} (VC)
                  </label>
                  <Input 
                    type="number" 
                    placeholder="0.00"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(parseFloat(e.target.value))}
                  />
                </div>
                
                {/* Trade Summary */}
                <div className="bg-gray-50 p-3 rounded-md space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Taux d'échange:</span>
                    <span>1 VC = 0.00004182 BTC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total estimé:</span>
                    <span>0.00041820 BTC</span>
                  </div>
                </div>
                
                {/* Trade Button */}
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleTrade}
                >
                  {tradeType === 'buy' ? 'Acheter' : 'Vendre'} VueCoin
                </Button>
                
                {/* Notification */}
                {notification && (
                  <div className="bg-blue-50 text-blue-800 p-3 rounded-md">
                    {notification}
                  </div>
                )}
              </div>
            </Card>

            {/* Wallet Card */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
