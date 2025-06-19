
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, CandlestickChart } from 'recharts';
import { TrendingUp, TrendingDown, Target, Clock, DollarSign, BarChart3 } from 'lucide-react';

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

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'buy': return 'text-green-600';
      case 'sell': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSignalBadge = (signal: string) => {
    switch (signal) {
      case 'buy': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Achat</Badge>;
      case 'sell': return <Badge variant="destructive">Vente</Badge>;
      default: return <Badge variant="outline">Neutre</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Graphique de prix avec indicateurs techniques */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Analyse Technique - {selectedPair}
            </CardTitle>
            <div className="flex space-x-2">
              {['VC/USD', 'BTC/USD', 'ETH/USD'].map((pair) => (
                <Button
                  key={pair}
                  variant={selectedPair === pair ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPair(pair)}
                >
                  {pair}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={['dataMin - 0.05', 'dataMax + 0.05']} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Indicateurs techniques */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {technicalIndicators.map((indicator) => (
              <div key={indicator.name} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{indicator.name}</span>
                  {getSignalBadge(indicator.signal)}
                </div>
                <div className={`text-lg font-bold ${getSignalColor(indicator.signal)}`}>
                  {indicator.value.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">{indicator.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Ordres conditionnels actifs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Ordres Conditionnels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <div key={order.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant={order.type === 'buy' ? 'default' : 'destructive'}>
                        {order.type === 'buy' ? 'Achat' : 'Vente'}
                      </Badge>
                      <span className="text-sm font-medium">{order.pair}</span>
                    </div>
                    <Badge variant="outline">{order.orderType}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Quantité: </span>
                      <span className="font-medium">{order.amount}</span>
                    </div>
                    {order.price && (
                      <div>
                        <span className="text-muted-foreground">Prix: </span>
                        <span className="font-medium">${order.price}</span>
                      </div>
                    )}
                    {order.stopPrice && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Stop: </span>
                        <span className="font-medium">${order.stopPrice}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">
                      <Clock className="inline h-3 w-3 mr-1" />
                      {order.timestamp}
                    </span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        Modifier
                      </Button>
                      <Button size="sm" variant="destructive" className="text-xs">
                        Annuler
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button className="w-full" variant="outline">
                <Target className="mr-2 h-4 w-4" />
                Nouvel Ordre Conditionnel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Historique de trading détaillé */}
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
                {[
                  { pair: 'VC/USD', type: 'buy', amount: 50, price: 2.45, profit: +12.5, time: '14:30' },
                  { pair: 'BTC/USD', type: 'sell', amount: 0.005, price: 42500, profit: -8.2, time: '13:15' },
                  { pair: 'ETH/USD', type: 'buy', amount: 0.1, price: 2850, profit: +25.8, time: '12:00' }
                ].map((trade, i) => (
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
      </div>
    </div>
  );
};

export default TradingOverview;
