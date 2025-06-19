
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Clock } from 'lucide-react';

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

interface ActiveOrdersProps {
  orders: Order[];
}

const ActiveOrders = ({ orders }: ActiveOrdersProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="mr-2 h-5 w-5" />
          Ordres Conditionnels
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
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
  );
};

export default ActiveOrders;
