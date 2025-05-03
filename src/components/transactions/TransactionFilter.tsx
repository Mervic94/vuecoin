
import React from 'react';
import { Filter, Download, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TransactionFilterProps {
  onSearch: (query: string) => void;
}

const TransactionFilter: React.FC<TransactionFilterProps> = ({ onSearch }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6 justify-between items-center">
      <div className="relative w-full md:w-auto flex-1 md:max-w-md">
        <Input 
          placeholder="Rechercher une transaction..." 
          className="pl-10"
          onChange={(e) => onSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Filter className="h-4 w-4" />
          Filtres
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </div>
    </div>
  );
};

export default TransactionFilter;
