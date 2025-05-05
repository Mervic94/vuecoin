
import React from 'react';
import FAQAccordion, { FAQItem } from './FAQAccordion';

interface FAQSearchResultsProps {
  searchQuery: string;
  filteredFaqs: FAQItem[];
}

const FAQSearchResults = ({ searchQuery, filteredFaqs }: FAQSearchResultsProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6">Résultats de recherche pour "{searchQuery}"</h2>
      {filteredFaqs.length > 0 ? (
        <FAQAccordion faqs={filteredFaqs} category="search" />
      ) : (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-muted-foreground mb-4">Aucun résultat trouvé pour votre recherche.</p>
          <p>Essayez avec des termes différents ou parcourez les catégories ci-dessous.</p>
        </div>
      )}
    </div>
  );
};

export default FAQSearchResults;
