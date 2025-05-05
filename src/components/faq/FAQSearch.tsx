
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { FAQItem } from './FAQAccordion';

interface FAQSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FAQSearch = ({ searchQuery, setSearchQuery }: FAQSearchProps) => {
  return (
    <div className="relative max-w-lg mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
      <Input 
        placeholder="Rechercher une question..." 
        className="pl-10 h-12 text-lg"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default FAQSearch;
