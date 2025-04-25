
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface TradeFormProps {
  onTrade: (type: string, amount: number, currency: string) => void;
}

const TradeForm = ({ onTrade }: TradeFormProps) => {
  const [tradeType, setTradeType] = useState('buy');
  const [tradeCurrency, setTradeCurrency] = useState('Bitcoin');
  const [tradeAmount, setTradeAmount] = useState(10);

  const handleSubmit = () => {
    onTrade(tradeType, tradeAmount, tradeCurrency);
  };

  return (
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
          onClick={handleSubmit}
        >
          {tradeType === 'buy' ? 'Acheter' : 'Vendre'} VueCoin
        </Button>
      </div>
    </Card>
  );
};

export default TradeForm;
