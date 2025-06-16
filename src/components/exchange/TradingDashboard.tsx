
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface TradingDashboardProps {
  onTrade: (type: string, orderType: string, amount: number, price?: number) => void;
}

const TradingDashboard = ({ onTrade }: TradingDashboardProps) => {
  const [orderType, setOrderType] = useState('market');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const { toast } = useToast();

  const handleSubmit = (tradeType: string) => {
    if (!amount) {
      toast({
        title: 'Erreur',
        description: 'Veuillez entrer une quantité',
        variant: 'destructive'
      });
      return;
    }

    if (orderType === 'limit' && !price) {
      toast({
        title: 'Erreur',
        description: 'Veuillez entrer un prix pour un ordre limite',
        variant: 'destructive'
      });
      return;
    }

    onTrade(tradeType, orderType, parseFloat(amount), orderType === 'limit' ? parseFloat(price) : undefined);
    
    // Reset form
    setAmount('');
    setPrice('');
  };

  return (
    <Card className="p-6">
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="buy" className="text-green-600">Acheter</TabsTrigger>
          <TabsTrigger value="sell" className="text-red-600">Vendre</TabsTrigger>
        </TabsList>
        
        <div className="mt-4 space-y-4">
          {/* Type d'ordre */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Type d'ordre</label>
            <Select value={orderType} onValueChange={setOrderType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="market">Marché</SelectItem>
                <SelectItem value="limit">Limite</SelectItem>
                <SelectItem value="stop">Stop</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Prix (pour ordres limite) */}
          {orderType === 'limit' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Prix (USD)</label>
              <Input
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.01"
              />
            </div>
          )}

          {/* Quantité */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quantité (VC)</label>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
            />
          </div>

          {/* Boutons de pourcentage */}
          <div className="grid grid-cols-4 gap-2">
            {['25%', '50%', '75%', '100%'].map((percent) => (
              <Button
                key={percent}
                variant="outline"
                size="sm"
                onClick={() => {
                  // Simuler un solde de 1000 VC
                  const balance = 1000;
                  const percentage = parseInt(percent) / 100;
                  setAmount((balance * percentage).toString());
                }}
              >
                {percent}
              </Button>
            ))}
          </div>

          {/* Estimation */}
          <div className="bg-gray-50 p-3 rounded-md space-y-2">
            <div className="flex justify-between text-sm">
              <span>Estimation total:</span>
              <span className="font-medium">
                ${amount && price ? (parseFloat(amount) * parseFloat(price)).toFixed(2) : '0.00'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Frais:</span>
              <span>$0.25 (0.1%)</span>
            </div>
          </div>
        </div>

        <TabsContent value="buy" className="mt-4">
          <Button 
            className="w-full bg-green-600 hover:bg-green-700" 
            size="lg"
            onClick={() => handleSubmit('buy')}
          >
            Acheter VueCoin
          </Button>
        </TabsContent>

        <TabsContent value="sell" className="mt-4">
          <Button 
            className="w-full bg-red-600 hover:bg-red-700" 
            size="lg"
            onClick={() => handleSubmit('sell')}
          >
            Vendre VueCoin
          </Button>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default TradingDashboard;
