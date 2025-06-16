
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const RealtimePrice = () => {
  const [price, setPrice] = useState(2.45);
  const [change, setChange] = useState(0.05);
  const [changePercent, setChangePercent] = useState(2.08);

  useEffect(() => {
    // Simuler des mises à jour de prix en temps réel
    const interval = setInterval(() => {
      const variation = (Math.random() - 0.5) * 0.02; // Variation de ±1%
      const newPrice = Math.max(0.01, price + variation);
      const newChange = newPrice - 2.40; // Prix de base
      const newChangePercent = (newChange / 2.40) * 100;
      
      setPrice(newPrice);
      setChange(newChange);
      setChangePercent(newChangePercent);
    }, 3000); // Mise à jour toutes les 3 secondes

    return () => clearInterval(interval);
  }, [price]);

  const isPositive = change >= 0;

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground">VueCoin (VC)</h3>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">${price.toFixed(4)}</span>
          <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span className="font-medium">
              {isPositive ? '+' : ''}{change.toFixed(4)} ({changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
      
      <div className="ml-auto text-right">
        <div className="text-sm text-muted-foreground">Volume 24h</div>
        <div className="font-medium">$15.2M</div>
      </div>
    </div>
  );
};

export default RealtimePrice;
