
import { useState, useMemo } from 'react';
import { FAQItem } from '@/components/faq/FAQAccordion';
import { getAllFaqs } from '@/components/faq/FAQData';

export const useFAQSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const allFaqs = getAllFaqs();
  
  const filteredFaqs = useMemo(() => {
    if (!searchQuery) return [];
    
    return allFaqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allFaqs]);

  return {
    searchQuery,
    setSearchQuery,
    filteredFaqs,
    hasResults: filteredFaqs.length > 0,
    isSearching: searchQuery.length > 0
  };
};
