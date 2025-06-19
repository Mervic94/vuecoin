
import React, { useState } from 'react';
import PriceChart from './trading/PriceChart';
import ActiveOrders from './trading/ActiveOrders';
import TradingHistory from './trading/TradingHistory';

interface Order {
  id: string;
  type: 'buy' | 'sell';
  orderType: 'market' | 'limit' | 'stop' | 'stop-limit';
  pair: string;
  amount: number;
  price?: number;
  stopPrice?: number;
  status: 'active' | 'filled' | 'cancelled';
  timestamp: string;
}

interface TechnicalIndicator {
  name: string;
  value: number;
  signal: 'buy' | 'sell' | 'neutral';
  description: string;
}

const activeOrders: Order[] = [
  {
    id: '1',
    type: 'buy',
    orderType: 'limit',
    pair: 'VC/USD',
    amount: 100,
    price: 2.40,
    status: 'active',
    timestamp: '2024-06-19 14:30'
  },
  {
    id: '2',
    type: 'sell',
    orderType: 'stop-limit',
    pair: 'BTC/USD',
    amount: 0.01,
    price: 42000,
    stopPrice: 41500,
    status: 'active',
    timestamp: '2024-06-19 13:15'
  }
];

const technicalIndicators: TechnicalIndicator[] = [
  { name: 'RSI (14)', value: 65.4, signal: 'neutral', description: 'Relativement neutre' },
  { name: 'MACD', value: 0.12, signal: 'buy', description: 'Signal d\'achat' },
  { name: 'MA 20', value: 2.38, signal: 'buy', description: 'Prix au-dessus de la moyenne' },
  { name: 'Bollinger', value: 0.75, signal: 'neutral', description: 'Milieu de bande' }
];

const priceData = [
  { time: '09:00', price: 2.35, volume: 1200 },
  { time: '10:00', price: 2.42, volume: 1500 },
  { time: '11:00', price: 2.38, volume: 980 },
  { time: '12:00', price: 2.45, volume: 1800 },
  { time: '13:00', price: 2.47, volume: 2100 },
  { time: '14:00', price: 2.43, volume: 1600 },
];

const TradingOverview = () => {
  const [selectedPair, setSelectedPair] = useState('VC/USD');

  return (
    <div className="space-y-6">
      <PriceChart 
        selectedPair={selectedPair}
        onPairChange={setSelectedPair}
        priceData={priceData}
        technicalIndicators={technicalIndicators}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <ActiveOrders orders={activeOrders} />
        <TradingHistory />
      </div>
    </div>
  );
};

export default TradingOverview;
