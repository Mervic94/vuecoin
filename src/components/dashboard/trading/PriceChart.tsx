
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';
import TechnicalIndicators from './TechnicalIndicators';

interface PriceData {
  time: string;
  price: number;
  volume: number;
}

interface TechnicalIndicator {
  name: string;
  value: number;
  signal: 'buy' | 'sell' | 'neutral';
  description: string;
}

interface PriceChartProps {
  selectedPair: string;
  onPairChange: (pair: string) => void;
  priceData: PriceData[];
  technicalIndicators: TechnicalIndicator[];
}

const PriceChart = ({ selectedPair, onPairChange, priceData, technicalIndicators }: PriceChartProps) => {
  const pairs = ['VC/USD', 'BTC/USD', 'ETH/USD'];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Analyse Technique - {selectedPair}
          </CardTitle>
          <div className="flex space-x-2">
            {pairs.map((pair) => (
              <Button
                key={pair}
                variant={selectedPair === pair ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPairChange(pair)}
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

        <TechnicalIndicators indicators={technicalIndicators} />
      </CardContent>
    </Card>
  );
};

export default PriceChart;
