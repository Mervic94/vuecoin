
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign } from 'lucide-react';

const TradingHistory = () => {
  const recentTrades = [
    { pair: 'VC/USD', type: 'buy', amount: 50, price: 2.45, profit: +12.5, time: '14:30' },
    { pair: 'BTC/USD', type: 'sell', amount: 0.005, price: 42500, profit: -8.2, time: '13:15' },
    { pair: 'ETH/USD', type: 'buy', amount: 0.1, price: 2850, profit: +25.8, time: '12:00' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <DollarSign className="mr-2 h-5 w-5" />
          Historique de Trading
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recent">Récent</TabsTrigger>
            <TabsTrigger value="profitable">Profitable</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-3">
            {recentTrades.map((trade, i) => (
              <div key={i} className="flex items-center justify-between p-2 border rounded text-sm">
                <div>
                  <div className="font-medium">{trade.pair}</div>
                  <div className="text-xs text-muted-foreground">
                    {trade.type === 'buy' ? 'Achat' : 'Vente'} • {trade.time}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${trade.profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {trade.profit > 0 ? '+' : ''}${trade.profit}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {trade.amount} @ ${trade.price}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="profitable" className="space-y-3">
            <div className="text-center text-muted-foreground text-sm">
              Affichage des trades les plus rentables
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-3 border rounded">
                <div className="text-lg font-bold text-green-600">68%</div>
                <div className="text-muted-foreground">Taux de réussite</div>
              </div>
              <div className="text-center p-3 border rounded">
                <div className="text-lg font-bold">$1,247</div>
                <div className="text-muted-foreground">Profit total</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TradingHistory;
