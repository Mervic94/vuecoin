
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

// Mock data for the chart
const chartData = [
  { date: '10/03', price: 2.32 },
  { date: '15/03', price: 2.38 },
  { date: '20/03', price: 2.41 },
  { date: '25/03', price: 2.37 },
  { date: '30/03', price: 2.43 },
  { date: '04/04', price: 2.45 },
];

const PriceChart = () => {
  const [activeCrypto, setActiveCrypto] = useState('VC');

  return (
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
  );
};

export default PriceChart;
