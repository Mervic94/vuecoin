
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface OrderBookItem {
  price: number;
  amount: number;
  total: number;
}

const OrderBook = () => {
  // Données simulées pour le carnet d'ordres
  const buyOrders: OrderBookItem[] = [
    { price: 2.44, amount: 150, total: 366 },
    { price: 2.43, amount: 200, total: 486 },
    { price: 2.42, amount: 100, total: 242 },
    { price: 2.41, amount: 300, total: 723 },
    { price: 2.40, amount: 250, total: 600 },
  ];

  const sellOrders: OrderBookItem[] = [
    { price: 2.46, amount: 120, total: 295.2 },
    { price: 2.47, amount: 180, total: 444.6 },
    { price: 2.48, amount: 220, total: 545.6 },
    { price: 2.49, amount: 160, total: 398.4 },
    { price: 2.50, amount: 300, total: 750 },
  ];

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4 flex items-center">
        <TrendingUp className="mr-2 h-4 w-4" />
        Carnet d'ordres - VC/USD
      </h3>
      
      <div className="space-y-4">
        {/* Ordres de vente */}
        <div>
          <div className="grid grid-cols-3 gap-2 text-xs font-medium text-muted-foreground mb-2">
            <span>Prix (USD)</span>
            <span className="text-right">Quantité (VC)</span>
            <span className="text-right">Total (USD)</span>
          </div>
          <div className="space-y-1">
            {sellOrders.reverse().map((order, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 text-xs hover:bg-red-50 p-1 rounded">
                <span className="text-red-600 font-medium">${order.price.toFixed(2)}</span>
                <span className="text-right">{order.amount}</span>
                <span className="text-right">${order.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prix actuel */}
        <div className="border-y py-2 text-center">
          <div className="text-lg font-bold text-green-600">$2.45</div>
          <div className="text-xs text-muted-foreground">Prix actuel</div>
        </div>

        {/* Ordres d'achat */}
        <div>
          <div className="space-y-1">
            {buyOrders.map((order, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 text-xs hover:bg-green-50 p-1 rounded">
                <span className="text-green-600 font-medium">${order.price.toFixed(2)}</span>
                <span className="text-right">{order.amount}</span>
                <span className="text-right">${order.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderBook;
