
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TechnicalIndicator {
  name: string;
  value: number;
  signal: 'buy' | 'sell' | 'neutral';
  description: string;
}

interface TechnicalIndicatorsProps {
  indicators: TechnicalIndicator[];
}

const TechnicalIndicators = ({ indicators }: TechnicalIndicatorsProps) => {
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {indicators.map((indicator) => (
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
  );
};

export default TechnicalIndicators;
